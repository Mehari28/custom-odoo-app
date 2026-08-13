{
    'name': 'GlobX Website',
    'version': '19.0.1.0.0',
    'category': 'Website',
    'summary': 'GlobX custom landing page (built from the approved prototype)',
    'description': """
        Custom website pages for GlobX.
        Milestone 1: Home page - Hero + "Manual Chaos" section (with video).
        More sections (process, feature rows, testimonials) to follow.
    """,
    'author': 'GlobX',
    'depends': ['website'],
    'data': [
        'views/home_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'globx_website/static/src/scss/variables.scss',
            'globx_website/static/src/scss/home.scss',
            'globx_website/static/src/js/manual_chaos_video.js',
            'globx_website/static/src/js/scroll_reveal.js',
            'globx_website/static/src/js/mobile_nav.js',
            'globx_website/static/src/js/module_cycle.js',
            'globx_website/static/src/js/region_cycle.js',
            'globx_website/static/src/js/flip_card.js',
            'globx_website/static/src/js/process_accordion.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}