/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Soft radial glow that follows the cursor inside the hero media box,
 * revealing the digital-pattern background as it moves. Disabled on
 * touch devices (no meaningful cursor to follow) and respects
 * prefers-reduced-motion.
 */
publicWidget.registry.GlobxHeroCursorGlow = publicWidget.Widget.extend({
    selector: ".globx_hero_media",

    start() {
        const res = this._super(...arguments);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouchDevice = window.matchMedia("(hover: none)").matches;
        if (prefersReducedMotion || isTouchDevice) {
            return res;
        }

        const glow = document.createElement("div");
        glow.className = "globx-cursor-glow";
        this.el.prepend(glow);

        this._onMouseMove = (ev) => {
            const rect = this.el.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            glow.style.left = x + "px";
            glow.style.top = y + "px";
            glow.style.opacity = "1";
        };
        this._onMouseLeave = () => {
            glow.style.opacity = "0";
        };

        this.el.addEventListener("mousemove", this._onMouseMove);
        this.el.addEventListener("mouseleave", this._onMouseLeave);

        return res;
    },

    destroy() {
        if (this._onMouseMove) {
            this.el.removeEventListener("mousemove", this._onMouseMove);
            this.el.removeEventListener("mouseleave", this._onMouseLeave);
        }
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxHeroCursorGlow;