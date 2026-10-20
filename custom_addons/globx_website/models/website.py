import base64

from odoo import api, models
from odoo.tools import file_open

FAVICON_PATH = 'globx_website/static/src/img/favicon/favicon_512.png'
DONE_PARAM = 'globx_website.favicon_set'


class Website(models.Model):
    _inherit = 'website'

    @api.model
    def _globx_set_favicon(self):
        """Use the GlobX "x" mark as the browser-tab icon.

        Called from data/website_data.xml on install/upgrade (Odoo protects the
        default website record from XML updates, so it is written here). Runs
        only once, so a favicon changed later in Website settings is kept.
        """
        params = self.env['ir.config_parameter'].sudo()
        if params.get_param(DONE_PARAM):
            return
        with file_open(FAVICON_PATH, 'rb') as f:
            icon = base64.b64encode(f.read())
        self.sudo().search([]).write({'favicon': icon})
        params.set_param(DONE_PARAM, '1')
