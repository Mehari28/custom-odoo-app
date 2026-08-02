from odoo import models, fields


class TaskflowService(models.Model):

    _name = "taskflow.service"
    _description = "TaskFlow Service"
    _order = "sequence asc, id asc"


    sequence = fields.Integer(
        string="Sequence",
        default=10,
        help="Controls the order in which services appear"
    )


    name = fields.Char(
        string="Service Name",
        required=True
    )


    short_description = fields.Char(
        string="Short Description",
        required=True
    )


    overview = fields.Html(
        string="Overview"
    )


    detailed_description = fields.Html(
        string="Detailed Description"
    )


    service_offer = fields.Html(
        string="What We Offer"
    )


    benefits = fields.Html(
        string="Business Benefits"
    )


    implementation_process = fields.Html(
        string="Implementation Process"
    )


    faq = fields.Html(
        string="Frequently Asked Questions"
    )


    icon = fields.Char(
        string="FontAwesome Icon",
        default="fa-cubes"
    )


    image = fields.Binary(
        string="Service Image"
    )


    button_text = fields.Char(
        string="Button Text",
        default="Request Demo"
    )


    button_link = fields.Char(
        string="Button Link",
        default="/contact"
    )


    active = fields.Boolean(
        string="Active",
        default=True
    )