/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Generic expand/collapse accordion. Click "Read more"/chevron (or
 * anywhere on the toggle button) to expand the detail block below the
 * summary. Click again to collapse.
 *
 * Buttons with an <svg> inside (icon-only chevrons, like on Solutions)
 * are left alone visually - only plain text buttons (like "Read more"
 * on Our Process) get their label swapped between "Read more"/"Read less".
 */
publicWidget.registry.GlobxProcessAccordion = publicWidget.Widget.extend({
    selector: ".js_globx_accordion",

    events: {
        "click .globx-timeline-toggle": "_onToggleClick",
    },

    _onToggleClick(ev) {
        ev.stopPropagation();
        const btn = this.el.querySelector(".globx-timeline-toggle");
        const isOpen = this.el.classList.toggle("globx-open");

        const hasIcon = btn.querySelector("svg");
        if (!hasIcon) {
            btn.textContent = isOpen ? "Read less" : "Read more";
        }
    },
});

export default publicWidget.registry.GlobxProcessAccordion;