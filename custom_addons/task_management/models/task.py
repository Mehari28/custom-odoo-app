from odoo import models, fields, api


class TaskManagement(models.Model):

    _name = "task.management"
    _description = "Task Management"
    _inherit = ["mail.thread"]


    name = fields.Char(
        string="Task Name",
        required=True
    )


    description = fields.Text(
        string="Description"
    )


    assigned_to = fields.Many2one(
        "res.users",
        string="Assigned To",
        tracking=True
    )


    requester_partner_id = fields.Many2one(
        "res.partner",
        string="Requested By",
        readonly=True,
        tracking=True,
        help="Customer contact that submitted this task request."
    )


    submitted_at = fields.Datetime(
        string="Submitted At",
        readonly=True
    )


    service_id = fields.Many2one(
        "taskflow.service",
        string="Service",
        tracking=True
    )


    request_type = fields.Selection(
        [
            ("support", "Support Request"),
            ("change", "Change Request"),
            ("onboarding", "Onboarding"),
            ("bug", "Bug Report"),
            ("consultation", "Consultation"),
        ],
        string="Request Type",
        default="support",
        tracking=True
    )


    sla_deadline = fields.Datetime(
        string="SLA Target",
        readonly=True,
        tracking=True
    )


    attachment_ids = fields.Many2many(
        "ir.attachment",
        string="Attachments",
        compute="_compute_attachment_ids"
    )


    customer_comment_ids = fields.One2many(
        "task.management.comment",
        "task_id",
        string="Customer Updates"
    )


    deadline = fields.Date(
        string="Deadline"
    )


    priority = fields.Selection(
        [
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
        ],
        string="Priority",
        default="medium"
    )


    state = fields.Selection(
        [
            ("submitted", "Submitted"),
            ("review", "Under Review"),
            ("scheduled", "Scheduled"),
            ("draft", "Draft"),
            ("progress", "In Progress"),
            ("awaiting_customer", "Awaiting Customer"),
            ("done", "Done"),
        ],
        string="Status",
        default="draft",
        tracking=True
    )


    # --------------------------------
    # Dashboard Analytics Fields
    # --------------------------------


    is_overdue = fields.Boolean(
        string="Overdue",
        compute="_compute_is_overdue",
        store=True
    )


    days_remaining = fields.Integer(
        string="Days Remaining",
        compute="_compute_days_remaining",
        store=True
    )


    task_count = fields.Integer(
        string="Task Count",
        compute="_compute_task_count",
        store=True
    )


    # New KPI fields

    is_completed = fields.Boolean(
        string="Completed",
        compute="_compute_is_completed",
        store=True
    )


    completion_days = fields.Integer(
        string="Completion Days",
        compute="_compute_completion_days",
        store=True
    )



    # --------------------------------
    # Computed Fields
    # --------------------------------


    @api.depends("deadline", "state")
    def _compute_is_overdue(self):

        today = fields.Date.today()

        for task in self:

            task.is_overdue = (
                bool(task.deadline)
                and task.deadline < today
                and task.state != "done"
            )



    @api.depends("deadline")
    def _compute_days_remaining(self):

        today = fields.Date.today()

        for task in self:

            if task.deadline:
                task.days_remaining = (
                    task.deadline - today
                ).days

            else:
                task.days_remaining = 0



    @api.depends("name")
    def _compute_task_count(self):

        for task in self:
            task.task_count = 1



    @api.depends("state")
    def _compute_is_completed(self):

        for task in self:

            task.is_completed = (
                task.state == "done"
            )



    @api.depends("submitted_at", "state")
    def _compute_completion_days(self):

        now = fields.Datetime.now()

        for task in self:

            if task.state == "done" and task.submitted_at:

                task.completion_days = (
                    now - task.submitted_at
                ).days

            else:

                task.completion_days = 0



    @api.depends()
    def _compute_attachment_ids(self):

        attachments_by_task = {}

        if self.ids:

            attachments = self.env["ir.attachment"].search([
                ("res_model", "=", "task.management"),
                ("res_id", "in", self.ids),
            ])


            for attachment in attachments:

                attachments_by_task.setdefault(
                    attachment.res_id,
                    self.env["ir.attachment"]
                )

                attachments_by_task[attachment.res_id] |= attachment


        for task in self:

            task.attachment_ids = attachments_by_task.get(
                task.id,
                self.env["ir.attachment"]
            )



    # --------------------------------
    # Workflow Actions
    # --------------------------------


    def action_review(self):

        for task in self:
            task.state = "review"



    def action_schedule(self):

        for task in self:
            task.state = "scheduled"



    def action_start(self):

        for task in self:
            task.state = "progress"



    def action_awaiting_customer(self):

        for task in self:
            task.state = "awaiting_customer"



    def action_done(self):

        for task in self:
            task.state = "done"