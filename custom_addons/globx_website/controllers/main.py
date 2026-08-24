from odoo import http
from odoo.http import request


class GlobxWebsite(http.Controller):

    @http.route('/home-globx', type='http', auth='public', website=True, sitemap=True)
    def globx_home(self, **kwargs):
        return request.render('globx_website.globx_home_page', {})

    @http.route('/solutions', type='http', auth='public', website=True, sitemap=True)
    def globx_solutions(self, **kwargs):
        return request.render('globx_website.globx_solutions_page', {})

    @http.route('/casestudies', type='http', auth='public', website=True, sitemap=True)
    def globx_casestudies(self, **kwargs):
        return request.render('globx_website.globx_casestudies_page', {})

    @http.route('/casestudies/rwanda-business-show-2026', type='http', auth='public', website=True, sitemap=True)
    def globx_cs_rwanda_2026(self, **kwargs):
        return request.render('globx_website.globx_cs_rwanda_2026_page', {})

    @http.route('/casestudies/acoa-2025', type='http', auth='public', website=True, sitemap=True)
    def globx_cs_acoa_2025(self, **kwargs):
        return request.render('globx_website.globx_cs_acoa_2025_page', {})

    @http.route('/casestudies/rw-ke-digital-transformation-2025', type='http', auth='public', website=True, sitemap=True)
    def globx_cs_rw_ke_2025(self, **kwargs):
        return request.render('globx_website.globx_cs_rw_ke_2025_page', {})

    @http.route('/news', type='http', auth='public', website=True, sitemap=True)
    def globx_news(self, **kwargs):
        return request.render('globx_website.globx_news_page', {})

    @http.route('/about', type='http', auth='public', website=True, sitemap=True)
    def globx_about(self, **kwargs):
        return request.render('globx_website.globx_about_page', {})

    @http.route('/contactus', type='http', auth='public', website=True, sitemap=True)
    def globx_contact(self, **kwargs):
        return request.render('globx_website.globx_contact_page', {})