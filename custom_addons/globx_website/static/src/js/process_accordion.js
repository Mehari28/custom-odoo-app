/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Timeline step accordion: click "Read more" (or anywhere on the step)
 * to expand the detail text below the summary. Click again to collapse.
 */
publicWidget.registry.GlobxProcessAccordion = publicWidget.Widget.extend({
    selector: ".js_globx_accordion",

    events: {
        "click .globx-timeline-toggle": "_onToggleClick",
    },

    _onToggleClick(ev) {
        ev.stopPropagation();
        const isOpen = this.el.classList.toggle("globx-open");
        const btn = this.el.querySelector(".globx-timeline-toggle");
        btn.textContent = isOpen ? "Read less" : "Read more";
    },
});

export default publicWidget.registry.GlobxProcessAccordion;