/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.GlobxSiteEnhancements = publicWidget.Widget.extend({
    selector: "#wrapwrap",

    start() {
        const res = this._super(...arguments);
        this._insertProgressBar();
        return res;
    },

    _insertProgressBar() {
        const bar = document.createElement("div");
        bar.className = "globx-scroll-progress";
        document.body.prepend(bar);

        const updateBar = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + "%";
        };
        window.addEventListener("scroll", updateBar, { passive: true });
        updateBar();
    },
});

export default publicWidget.registry.GlobxSiteEnhancements;