{
    'name': 'GlobX Website',
    'version': '19.0.1.0.0',
    'category': 'Website',
    'summary': 'GlobX custom landing page (built from the approved prototype)',
    'description': """
        Custom website pages for GlobX.
        Milestone 1: Home page.
        Milestone 2: Solutions page.
        Milestone 3: Case Studies page + three case study detail pages.
        Milestone 4: News page.
        Milestone 5: About page.
        Milestone 6: Contact page.
        Extras: global font, scroll progress bar, hero cursor glow,
        animated stat counters, before/after slider on Manual Chaos,
        manual work cost calculator, confetti on contact form submit,
        tab title change on away, process carousel with leaning
        character, shimmering Silver Partner badge, footer social
        links, Solutions page finder, scroll-driven journey timeline
        on About, and a curtain reveal section on Home.
    """,
    'author': 'GlobX',
    'depends': ['website'],
    'data': [
        'views/assets_head_templates.xml',
        'views/home_templates.xml',
        'views/solutions_templates.xml',
        'views/casestudies_templates.xml',
        'views/casestudy_rwanda_2026_templates.xml',
        'views/casestudy_acoa_2025_templates.xml',
        'views/casestudy_rw_ke_2025_templates.xml',
        'views/news_templates.xml',
        'views/about_templates.xml',
        'views/contact_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'globx_website/static/src/scss/variables.scss',
            'globx_website/static/src/scss/site_enhancements.scss',
            'globx_website/static/src/scss/home.scss',
            'globx_website/static/src/scss/solutions.scss',
            'globx_website/static/src/scss/casestudies.scss',
            'globx_website/static/src/scss/casestudy_detail.scss',
            'globx_website/static/src/scss/news.scss',
            'globx_website/static/src/scss/about.scss',
            'globx_website/static/src/scss/contact.scss',
            'globx_website/static/src/js/manual_chaos_video.js',
            'globx_website/static/src/js/scroll_reveal.js',
            'globx_website/static/src/js/mobile_nav.js',
            'globx_website/static/src/js/module_cycle.js',
            'globx_website/static/src/js/region_cycle.js',
            'globx_website/static/src/js/flip_card.js',
            'globx_website/static/src/js/process_accordion.js',
            'globx_website/static/src/js/confetti.js',
            'globx_website/static/src/js/contact_form.js',
            'globx_website/static/src/js/site_enhancements.js',
            'globx_website/static/src/js/hero_cursor_glow.js',
            'globx_website/static/src/js/stat_counter.js',
            'globx_website/static/src/js/before_after_slider.js',
            'globx_website/static/src/js/cost_calculator.js',
            'globx_website/static/src/js/tab_title.js',
            'globx_website/static/src/js/process_carousel.js',
            'globx_website/static/src/js/solution_finder.js',
            'globx_website/static/src/js/journey_timeline.js',
            'globx_website/static/src/js/curtain_reveal.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}