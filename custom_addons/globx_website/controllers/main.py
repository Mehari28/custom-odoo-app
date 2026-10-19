import re

from markupsafe import Markup

from odoo import _, http
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

class GlobxContactForm(http.Controller):
    """Turns a contact-page submission into a CRM lead.

    Called from static/src/js/contact_form.js. Website settings decide which
    sales team / salesperson receives the lead (Website > Configuration >
    Settings > Contact Form: "Sales Team" and "Salesperson").
    """

    _MAX = {'fullName': 120, 'workEmail': 254, 'company': 160, 'phone': 40,
            'industry': 80, 'industryOther': 80, 'problem': 4000}
    _EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

    @http.route('/globx/contact/submit', type='jsonrpc', auth='public', website=True, methods=['POST'])
    def globx_contact_submit(self, **post):
        # Spam bots fill every input, including the hidden honeypot field.
        # Pretend success so they don't retry.
        if (post.get('website_hp') or '').strip():
            return {'ok': True}

        data = {key: (str(post.get(key) or '').strip())[:limit] for key, limit in self._MAX.items()}
        errors = {}
        if not data['fullName']:
            errors['fullName'] = _("Please enter your name.")
        if not self._EMAIL_RE.match(data['workEmail']):
            errors['workEmail'] = _("Please enter a valid email address.")
        if not data['company']:
            errors['company'] = _("Please enter your company name.")
        if errors:
            return {'ok': False, 'errors': errors}

        industry = data['industryOther'] if data['industry'] == 'Other' and data['industryOther'] else data['industry']
        calc = {k: str(post.get(k) or '').strip()[:20] for k in ('calc_hours', 'calc_cost', 'calc_weeks')}

        rows = [
            (_("Industry"), industry or '-'),
            (_("Phone / WhatsApp"), data['phone'] or '-'),
        ]
        if calc['calc_cost']:
            rows.append((_("Cost calculator"), _("%(cost)s per year, %(hours)s hours (%(weeks)s work-weeks)",
                                                cost=calc['calc_cost'], hours=calc['calc_hours'] or '?',
                                                weeks=calc['calc_weeks'] or '?')))
        description = Markup('<p><b>%s</b></p><p>%s</p><ul>%s</ul>') % (
            _("What they want to solve:"),
            Markup('<br/>').join((data['problem'] or '-').splitlines()),
            Markup('').join(Markup('<li><b>%s:</b> %s</li>') % (label, value) for label, value in rows),
        )

        website = request.website
        Lead = request.env['crm.lead'].sudo()
        tag = request.env['crm.tag'].sudo().search([('name', '=', 'GlobX Website')], limit=1) \
            or request.env['crm.tag'].sudo().create({'name': 'GlobX Website'})
        vals = {
            'name': _("Discovery call: %s", data['company']),
            'contact_name': data['fullName'],
            'partner_name': data['company'],
            'email_from': data['workEmail'],
            'phone': data['phone'] or False,
            'description': description,
            'tag_ids': [(4, tag.id)],
            'medium_id': request.env.ref('utm.utm_medium_website', raise_if_not_found=False).id or False,
            'company_id': website.company_id.id,
        }
        if website.crm_default_team_id:
            vals['team_id'] = website.crm_default_team_id.id
        if website.crm_default_user_id:
            vals['user_id'] = website.crm_default_user_id.id
        lead = Lead.create(vals)

        # Email the salesperson (or the team leader) so the lead isn't missed.
        notify = lead.user_id.partner_id or lead.team_id.user_id.partner_id
        if notify:
            lead.message_subscribe(partner_ids=notify.ids)
            lead.message_post(
                body=_("New discovery call request from the website: %(name)s (%(company)s).",
                       name=data['fullName'], company=data['company']),
                message_type='comment', subtype_xmlid='mail.mt_comment', partner_ids=notify.ids,
            )
        return {'ok': True}
