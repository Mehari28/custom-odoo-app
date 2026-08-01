from odoo import models, fields


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
        string="Assigned To"
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
            ("draft", "Draft"),
            ("progress", "In Progress"),
            ("done", "Done"),
        ],
        string="Status",
        default="draft",
        tracking=True
    )


    def action_start(self):
        for task in self:
            task.state = "progress"


    def action_done(self):
        for task in self:
            task.state = "done"