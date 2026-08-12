/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Plays the "Manual Chaos" section video only while it's actually on
 * screen (saves bandwidth / battery on long scroll), and skips autoplay
 * entirely for visitors who have "reduce motion" turned on at the OS
 * level - it just shows the poster frame for them instead.
 */
publicWidget.registry.GlobxManualChaosVideo = publicWidget.Widget.extend({
    selector: ".js_globx_chaos_video",

    start() {
        const res = this._super(...arguments);

        this.video = this.el.querySelector("video");
        if (!this.video) {
            return res;
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) {
            this.video.removeAttribute("autoplay");
            this.video.pause();
            return res;
        }

        this._observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.video.play().catch(() => {
                            // Autoplay can still be blocked by the browser -
                            // the poster image just stays visible, no error shown.
                        });
                    } else {
                        this.video.pause();
                    }
                });
            },
            { threshold: 0.35 }
        );
        this._observer.observe(this.el);

        return res;
    },

    destroy() {
        if (this._observer) {
            this._observer.disconnect();
        }
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxManualChaosVideo;