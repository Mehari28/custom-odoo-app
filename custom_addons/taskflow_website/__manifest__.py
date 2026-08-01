{
    'name': 'TaskFlow Website',

    'version': '19.0.1.0.0',

    'summary': 'Professional Company Website built with Odoo',


    'description': """

TaskFlow Solutions Website

Features:
- Modern Landing Page
- About Section
- Services Section
- Dynamic Service Details
- Contact Form
- CRM Lead Creation
- Responsive Design

""",



    'author': 'Mehari Kahsay',


    'category': 'Website',


    'license': 'LGPL-3',





    'depends': [

        'website',
        'crm',

    ],





    'data': [

        'views/home.xml',

        'views/about.xml',

        'views/services.xml',

        'views/service_detail.xml',

        'views/contact.xml',

        'views/thank_you.xml',

        'views/website_menu.xml',

    ],







    'assets': {


        'web.assets_frontend': [


            'taskflow_website/static/src/css/style.css',

            'taskflow_website/static/src/js/main.js',


        ],


    },






    'installable': True,


    'application': True,


    'auto_install': False,

}