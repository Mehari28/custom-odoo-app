from odoo import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    teams_meeting_url = fields.Char(
        string='Teams Meeting Link',
        help='Microsoft Teams meeting link added by the "Teams meeting" button on calendar events.',
    )
