{
    "name": "Task Management",
    "version": "19.0.1.0",
    "category": "Productivity",
    "author": "Mehari",
    "license": "LGPL-3",

    "depends": [
        "base",
        "mail",
        "portal",
        "taskflow_website",
    ],

    "data": [

        # Security
        "security/task_security.xml",
        "security/ir.model.access.csv",

        # Backend views
        "views/task_views.xml",
        "views/task_comment_views.xml",

        # Portal
        "views/portal_templates.xml",
    ],

    "installable": True,
    "application": True,
}