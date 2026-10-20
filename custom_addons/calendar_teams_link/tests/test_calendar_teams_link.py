from datetime import datetime, timedelta

from odoo.exceptions import UserError
from odoo.tests import TransactionCase, tagged

TEAMS_URL = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_TEST%40thread.v2/0'


@tagged('post_install', '-at_install')
class TestCalendarTeamsLink(TransactionCase):

    def _create_event(self, **extra):
        start = datetime.now().replace(microsecond=0) + timedelta(days=1)
        return self.env['calendar.event'].create(dict(
            name='Team sync', start=start, stop=start + timedelta(hours=1), **extra))

    def test_button_sets_company_teams_link(self):
        self.env.company.teams_meeting_url = TEAMS_URL
        event = self._create_event()
        event.set_teams_videocall_location()
        self.assertEqual(event.videocall_location, TEAMS_URL)
        self.assertEqual(event.videocall_source, 'teams')

    def test_button_without_link_configured(self):
        self.env.company.teams_meeting_url = False
        event = self._create_event()
        with self.assertRaises(UserError):
            event.set_teams_videocall_location()

    def test_pasted_teams_link_is_detected(self):
        event = self._create_event(videocall_location=TEAMS_URL)
        self.assertEqual(event.videocall_source, 'teams')

    def test_discuss_still_works(self):
        event = self._create_event()
        event._set_discuss_videocall_location()
        self.assertEqual(event.videocall_source, 'discuss')

    def test_invitation_email_contains_teams_link(self):
        self.env.company.teams_meeting_url = TEAMS_URL
        guest = self.env['res.partner'].create({'name': 'Guest', 'email': 'guest@example.com'})
        event = self._create_event(videocall_location=TEAMS_URL,
                                   partner_ids=[(4, guest.id), (4, self.env.user.partner_id.id)])
        self.env.flush_all()
        messages = self.env['mail.message'].search([('partner_ids', 'in', guest.ids)])
        self.assertTrue(any('teams.microsoft.com' in str(m.body) for m in messages))
