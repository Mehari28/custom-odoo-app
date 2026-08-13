/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Generic click-to-flip card. Toggles .globx-flipped on the outer
 * element, which the CSS uses to 3D-rotate .globx-flip-inner and
 * reveal the back face. Click again to flip back.
 */
publicWidget.registry.GlobxFlipCard = publicWidget.Widget.extend({
    selector: ".js_globx_flip_card",

    events: {
        "click": "_onClick",
    },

    _onClick() {
        this.el.classList.toggle("globx-flipped");
    },
});

export default publicWidget.registry.GlobxFlipCard;