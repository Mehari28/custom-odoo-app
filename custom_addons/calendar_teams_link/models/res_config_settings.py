from odoo import _, api, fields, models
from odoo.exceptions import ValidationError


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    teams_meeting_url = fields.Char(related='company_id.teams_meeting_url', readonly=False)

    @api.constrains('teams_meeting_url')
    def _check_teams_meeting_url(self):
        for settings in self:
            url = (settings.teams_meeting_url or '').strip()
            if url and not url.startswith('https://'):
                raise ValidationError(_('The Teams meeting link must be a full URL starting with https://'))
