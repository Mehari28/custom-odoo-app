/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.GlobxJourneyTimeline = publicWidget.Widget.extend({
    selector: ".js_globx_journey_scroll",

    start() {
        const res = this._super(...arguments);

        this.dot = this.el.querySelector(".globx-journey-dot");
        this.track = this.el.querySelector(".globx-journey-track");
        this.items = Array.from(this.el.querySelectorAll(".globx-journey-item"));

        this._onScroll = this._onScroll.bind(this);
        window.addEventListener("scroll", this._onScroll, { passive: true });
        this._onScroll();

        return res;
    },

    _onScroll() {
        if (this._ticking) {
            return;
        }
        this._ticking = true;
        requestAnimationFrame(() => {
            this._update();
            this._ticking = false;
        });
    },

    _update() {
        const trackRect = this.track.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.6;

        let progressPx = viewportCenter - trackRect.top;
        progressPx = Math.max(0, Math.min(trackRect.height, progressPx));

        this.dot.style.transform = `translate(-50%, ${progressPx}px)`;

        const progressRatio = trackRect.height > 0 ? progressPx / trackRect.height : 0;

        this.items.forEach((item, index) => {
            const itemRatio = index / (this.items.length - 1);
            if (progressRatio >= itemRatio - 0.03) {
                item.classList.add("globx-journey-active");
            } else {
                item.classList.remove("globx-journey-active");
            }
        });
    },

    destroy() {
        window.removeEventListener("scroll", this._onScroll);
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxJourneyTimeline;