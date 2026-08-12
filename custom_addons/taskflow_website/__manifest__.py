{
    "name": "TaskFlow Website",

    "version": "19.0.1.0.0",

    "category": "Website",

    "author": "TaskFlow",

    "summary": "TaskFlow Services Website",

    "description": """
        TaskFlow website service management module.
        Provides service management, website pages,
        and customized login branding.
    """,

    "depends": [
        "website",
        "web",
        "crm",
    ],


    "data": [

        # Security
        "security/ir.model.access.csv",


        # Service Data
        "data/services.xml",


        # Backend
        "views/service_backend.xml",
        "views/menu.xml",


        # Website Menu
        "views/website_menu.xml",


        # Website Pages
        "views/home.xml",
        "views/about.xml",
        "views/contact.xml",
        "views/contact_thank_you.xml",
        "views/services.xml",
        "views/service_detail.xml",


        # Login Page Branding
        "views/login.xml",

    ],


    "assets": {

        "web.assets_frontend": [

            "taskflow_website/static/src/css/style.css",
            "taskflow_website/static/src/css/service_detail.css",
            "taskflow_website/static/src/js/main.js",

        ],

    },


    "installable": True,

    "application": True,

    "license": "LGPL-3",
}