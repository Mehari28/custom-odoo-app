/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.GlobxPartnersReveal = publicWidget.Widget.extend({
    selector: ".globx-partners-grid",

    start() {
        const res = this._super(...arguments);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.el.classList.add("globx-partners-visible");
            return res;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.el.classList.add("globx-partners-visible");
                        observer.unobserve(this.el);
                    }
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(this.el);

        return res;
    },
});

export default publicWidget.registry.GlobxPartnersReveal;