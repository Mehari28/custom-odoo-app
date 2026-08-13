from odoo import http
from odoo.http import request


class GlobxWebsite(http.Controller):

    @http.route('/home-globx', type='http', auth='public', website=True, sitemap=True)
    def globx_home(self, **kwargs):
        return request.render('globx_website.globx_home_page', {})