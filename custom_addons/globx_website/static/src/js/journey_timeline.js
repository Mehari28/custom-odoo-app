/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.GlobxJourneyTimeline = publicWidget.Widget.extend({
    selector: ".js_globx_journey_scroll",

    start() {
        const res = this._super(...arguments);

        this.dot = this.el.querySelector(".globx-journey-dot");
        this.track = this.el.querySelector(".globx-journey-track");
        this.items = Array.from(this.el.querySelectorAll(".globx-journey-item"));

        this.viewportHeight = window.innerHeight;
        this._onResize = () => { this.viewportHeight = window.innerHeight; };
        window.addEventListener("resize", this._onResize);

        this._onScroll = this._onScroll.bind(this);
        window.addEventListener("scroll", this._onScroll, { passive: true });
        this._onScroll();

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("globx-journey-active");
                    }
                });
            },
            { rootMargin: "0px 0px -40% 0px", threshold: 0 }
        );
        this.items.forEach((item) => this.observer.observe(item));

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
        const viewportCenter = this.viewportHeight * 0.6;

        let progressPx = viewportCenter - trackRect.top;
        progressPx = Math.max(0, Math.min(trackRect.height, progressPx));

        this.dot.style.transform = `translate(-50%, ${progressPx}px)`;
    },

    destroy() {
        window.removeEventListener("scroll", this._onScroll);
        window.removeEventListener("resize", this._onResize);
        if (this.observer) {
            this.observer.disconnect();
        }
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxJourneyTimeline;
