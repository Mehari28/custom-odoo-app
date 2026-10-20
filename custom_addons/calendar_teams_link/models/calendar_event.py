from odoo import _, api, fields, models
from odoo.exceptions import UserError

TEAMS_HOSTS = ('teams.microsoft.com', 'teams.live.com')


class CalendarEvent(models.Model):
    _inherit = 'calendar.event'

    videocall_source = fields.Selection(
        selection_add=[('teams', 'Microsoft Teams')],
        ondelete={'teams': 'set custom'},
    )

    @api.depends('videocall_location')
    def _compute_videocall_source(self):
        teams_events = self.filtered(
            lambda e: any(host in (e.videocall_location or '') for host in TEAMS_HOSTS))
        teams_events.videocall_source = 'teams'
        super(CalendarEvent, self - teams_events)._compute_videocall_source()

    def set_teams_videocall_location(self):
        url = (self.env.company.teams_meeting_url or '').strip()
        if not url:
            raise UserError(_(
                'No Teams meeting link is configured yet. '
                'Add one in Settings > Calendar > Microsoft Teams.'))
        self.write({'videocall_location': url})
        return True
