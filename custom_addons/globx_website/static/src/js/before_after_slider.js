/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Draggable before/after slider. Dragging the handle reveals the
 * "after" layer (a tinted, chip-annotated version of the same photo),
 * clipped in from the right edge, simulating a transformation reveal.
 */
publicWidget.registry.GlobxBeforeAfterSlider = publicWidget.Widget.extend({
    selector: ".js_globx_before_after",

    start() {
        const res = this._super(...arguments);

        this.afterWrap = this.el.querySelector(".globx-ba-after-wrap");
        this.handle = this.el.querySelector(".globx-ba-handle");
        this.dragging = false;

        this._setPosition(50);

        this._onPointerDown = (ev) => {
            this.dragging = true;
            ev.preventDefault();
        };
        this._onPointerMove = (ev) => {
            if (!this.dragging) {
                return;
            }
            const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
            const rect = this.el.getBoundingClientRect();
            let pct = ((clientX - rect.left) / rect.width) * 100;
            pct = Math.max(0, Math.min(100, pct));
            this._setPosition(pct);
        };
        this._onPointerUp = () => {
            this.dragging = false;
        };

        this.handle.addEventListener("mousedown", this._onPointerDown);
        this.handle.addEventListener("touchstart", this._onPointerDown, { passive: false });
        window.addEventListener("mousemove", this._onPointerMove);
        window.addEventListener("touchmove", this._onPointerMove, { passive: false });
        window.addEventListener("mouseup", this._onPointerUp);
        window.addEventListener("touchend", this._onPointerUp);

        return res;
    },

    _setPosition(pct) {
        // Handle sits at pct from the left. The "after" layer clips
        // in from the right edge, so its width is the remaining
        // distance from the handle to the right side.
        this.afterWrap.style.width = (100 - pct) + "%";
        this.handle.style.left = pct + "%";
    },

    destroy() {
        window.removeEventListener("mousemove", this._onPointerMove);
        window.removeEventListener("touchmove", this._onPointerMove);
        window.removeEventListener("mouseup", this._onPointerUp);
        window.removeEventListener("touchend", this._onPointerUp);
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxBeforeAfterSlider;