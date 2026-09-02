/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.GlobxCurtainReveal = publicWidget.Widget.extend({
    selector: ".js_globx_curtain",

    start() {
        const res = this._super(...arguments);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.el.classList.add("globx-curtain-open");
            return res;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.el.classList.add("globx-curtain-open");
                        observer.unobserve(this.el);
                    }
                });
            },
            { threshold: 0.4 }
        );
        observer.observe(this.el);

        return res;
    },
});

export default publicWidget.registry.GlobxCurtainReveal;