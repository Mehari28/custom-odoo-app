from odoo import models, fields


class TaskflowService(models.Model):

    _name = "taskflow.service"
    _description = "TaskFlow Service"


    name = fields.Char(
        string="Service Name",
        required=True
    )


    short_description = fields.Text(
        string="Short Description"
    )


    description = fields.Text(
        string="Description"
    )


    detailed_description = fields.Html(
        string="Detailed Description"
    )


    icon = fields.Char(
        string="Icon Class"
    )


    active = fields.Boolean(
        string="Active",
        default=True
    )