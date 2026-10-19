{
    'name': 'Calendar - Microsoft Teams Link',
    'version': '19.0.1.0.0',
    'category': 'Productivity/Calendar',
    'summary': 'One-click Microsoft Teams link on calendar events (Community)',
    'description': """
Adds a "+ Teams meeting" button next to "+ Odoo meeting" on calendar events.
The Teams link is configured once in Settings > Calendar and is placed in the
event's Video Link, so it appears in invitations, the .ics file and the Join
button. Works in Odoo Community (no Appointments app needed).
""",
    'author': 'GlobX',
    'depends': ['calendar'],
    'data': [
        'views/res_config_settings_views.xml',
        'views/calendar_event_views.xml',
    ],
    'installable': True,
    'license': 'LGPL-3',
}
