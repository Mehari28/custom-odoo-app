from odoo import http
from odoo.http import request



class TaskflowWebsite(http.Controller):


    @http.route(
        '/',
        auth='public',
        website=True
    )
    def homepage(self, **kw):

        return request.render(
            'taskflow_website.homepage'
        )





    @http.route(
        '/about',
        auth='public',
        website=True
    )
    def about_page(self, **kw):

        return request.render(
            'taskflow_website.about_page'
        )






    @http.route(
        '/services',
        auth='public',
        website=True
    )
    def services_page(self, **kw):

        services = request.env[
            'taskflow.service'
        ].sudo().search([
            ('active', '=', True)
        ])


        return request.render(
            'taskflow_website.services_page',
            {
                'services': services
            }
        )







    @http.route(
        '/service/<int:service_id>',
        auth='public',
        website=True
    )
    def service_detail(
        self,
        service_id,
        **kw
    ):


        service = request.env[
            'taskflow.service'
        ].sudo().browse(service_id)



        if not service.exists():

            return request.not_found()



        return request.render(
            'taskflow_website.service_detail_page',
            {
                'service': service
            }
        )







    @http.route(
        '/contact',
        auth='public',
        website=True
    )
    def contact_page(
        self,
        **kw
    ):


        service = False



        if kw.get('service'):


            service = request.env[
                'taskflow.service'
            ].sudo().browse(
                int(kw.get('service'))
            )



        return request.render(
            'taskflow_website.contact_page',
            {
                'service': service
            }
        )








    @http.route(
        '/contact/submit',
        auth='public',
        website=True,
        methods=['POST'],
        csrf=True
    )
    def contact_submit(
        self,
        **post
    ):



        service_name = ""



        if post.get('service_id'):


            service = request.env[
                'taskflow.service'
            ].sudo().browse(
                int(post.get('service_id'))
            )


            if service.exists():

                service_name = service.name






        # CREATE CRM LEAD


        request.env[
            'crm.lead'
        ].sudo().create({


            'name': (
                service_name +
                " - " +
                post.get('name')
                if service_name
                else post.get('name')
            ),



            'email_from': post.get('email'),



            'partner_name': post.get('company'),



            'description': post.get('message'),


        })





        return request.render(
            'taskflow_website.contact_thank_you'
        )