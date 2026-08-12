from odoo import fields, models


class TaskManagementComment(models.Model):
    _name = "task.management.comment"
    _description = "Task Customer Update"
    _order = "create_date asc, id asc"

    task_id = fields.Many2one(
        "task.management",
        required=True,
        ondelete="cascade",
        index=True
    )
    partner_id = fields.Many2one(
        "res.partner",
        string="Author",
        required=True,
        readonly=True
    )
    body = fields.Text(required=True)
