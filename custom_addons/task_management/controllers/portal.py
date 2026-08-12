import base64
from datetime import timedelta

from odoo import http, fields
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


class TaskManagementPortal(CustomerPortal):

    _MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024
    _SLA_HOURS_BY_PRIORITY = {"low": 120, "medium": 72, "high": 24}

    def _task_domain_for_current_customer(self):
        """Limit customer-facing records to the customer's company."""
        partner = request.env.user.partner_id.commercial_partner_id
        return [("requester_partner_id", "=", partner.id)]

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)
        Task = request.env["task.management"].sudo()
        domain = self._task_domain_for_current_customer()
        if "task_request_count" in counters:
            values["task_request_count"] = Task.search_count(domain)
        if "task_open_count" in counters:
            values["task_open_count"] = Task.search_count(domain + [("state", "not in", ["done"])])
        if "task_waiting_count" in counters:
            values["task_waiting_count"] = Task.search_count(domain + [("state", "=", "awaiting_customer")])
        return values

    def _services(self):
        return request.env["taskflow.service"].sudo().search(
            [("active", "=", True)], order="sequence, name"
        )

    def _prepare_task_form_values(self, values=None):
        return {
            "error": None,
            "values": values or {},
            "services": self._services(),
            "page_name": "new_task_request",
        }

    def _get_owned_task(self, task_id):
        return request.env["task.management"].sudo().search(
            self._task_domain_for_current_customer() + [("id", "=", task_id)], limit=1
        )

    def _create_attachments(self, task, uploaded_files):
        attachments = []
        for uploaded_file in uploaded_files:
            if not uploaded_file or not uploaded_file.filename:
                continue
            content = uploaded_file.read()
            if len(content) > self._MAX_ATTACHMENT_SIZE:
                raise ValueError("Each attachment must be 10 MB or smaller.")
            attachments.append({
                "name": uploaded_file.filename,
                "datas": base64.b64encode(content),
                "res_model": "task.management",
                "res_id": task.id,
                "mimetype": uploaded_file.mimetype or "application/octet-stream",
            })
        if attachments:
            request.env["ir.attachment"].sudo().create(attachments)

    @http.route("/my/tasks", type="http", auth="user", website=True, methods=["GET"])
    def portal_my_tasks(self, submitted=False, **kwargs):
        tasks = request.env["task.management"].sudo().search(
            self._task_domain_for_current_customer(), order="create_date desc, id desc"
        )
        return request.render("task_management.portal_my_tasks", {
            "tasks": tasks,
            "open_count": len(tasks.filtered(lambda task: task.state != "done")),
            "waiting_count": len(tasks.filtered(lambda task: task.state == "awaiting_customer")),
            "completed_count": len(tasks.filtered(lambda task: task.state == "done")),
            "submitted": submitted,
            "page_name": "task_requests",
        })

    @http.route("/my/tasks/new", type="http", auth="user", website=True, methods=["GET"])
    def portal_new_task(self, error=None, values=None, **kwargs):
        render_values = self._prepare_task_form_values(values)
        render_values["error"] = error
        return request.render("task_management.portal_new_task", render_values)

    @http.route("/my/tasks/submit", type="http", auth="user", website=True, methods=["POST"], csrf=True)
    def portal_submit_task(self, **post):
        name = (post.get("name") or "").strip()
        description = (post.get("description") or "").strip()
        priority = post.get("priority") or "medium"
        deadline = post.get("deadline") or False
        request_type = post.get("request_type") or "support"
        service_id = post.get("service_id") or False

        values = {
            "name": name,
            "description": description,
            "priority": priority,
            "deadline": deadline,
            "request_type": request_type,
            "service_id": service_id,
        }
        if not name:
            return self.portal_new_task(error="A task title is required.", values=values)
        if priority not in {"low", "medium", "high"}:
            return self.portal_new_task(error="Please select a valid priority.", values=values)
        if request_type not in {"support", "change", "onboarding", "bug", "consultation"}:
            return self.portal_new_task(error="Please select a valid request type.", values=values)
        if service_id:
            try:
                service_id = int(service_id)
            except (TypeError, ValueError):
                return self.portal_new_task(error="Please select a valid service.", values=values)
            if not self._services().filtered(lambda service: service.id == service_id):
                return self.portal_new_task(error="Please select an available service.", values=values)
        if deadline:
            try:
                fields.Date.to_date(deadline)
            except (TypeError, ValueError):
                return self.portal_new_task(error="Please enter a valid requested deadline.", values=values)

        requester = request.env.user.partner_id.commercial_partner_id
        submitted_at = fields.Datetime.now()
        task = request.env["task.management"].sudo().create({
            "name": name,
            "description": description,
            "priority": priority,
            "deadline": deadline,
            "request_type": request_type,
            "service_id": service_id,
            "requester_partner_id": requester.id,
            "submitted_at": submitted_at,
            "sla_deadline": submitted_at + timedelta(hours=self._SLA_HOURS_BY_PRIORITY[priority]),
            "state": "submitted",
        })
        try:
            self._create_attachments(task, request.httprequest.files.getlist("attachments"))
        except ValueError as error:
            task.unlink()
            return self.portal_new_task(error=str(error), values=values)
        return request.redirect("/my/tasks?submitted=1")

    @http.route("/my/tasks/<int:task_id>", type="http", auth="user", website=True, methods=["GET"])
    def portal_task_detail(self, task_id, **kwargs):
        task = self._get_owned_task(task_id)
        if not task:
            return request.not_found()
        return request.render("task_management.portal_task_detail", {
            "task": task,
            "comments": task.customer_comment_ids,
            "page_name": "task_request",
        })

    @http.route("/my/tasks/<int:task_id>/comment", type="http", auth="user", website=True, methods=["POST"], csrf=True)
    def portal_add_task_comment(self, task_id, **post):
        task = self._get_owned_task(task_id)
        if not task:
            return request.not_found()
        body = (post.get("body") or "").strip()
        if not body:
            return request.redirect("/my/tasks/%s" % task.id)
        request.env["task.management.comment"].sudo().create({
            "task_id": task.id,
            "partner_id": request.env.user.partner_id.id,
            "body": body[:5000],
        })
        return request.redirect("/my/tasks/%s" % task.id)
