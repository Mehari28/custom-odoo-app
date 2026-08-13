/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Generic scroll-reveal: adds "globx-visible" to any element with the
 * .globx-reveal class once it's scrolled into view. Combined with CSS
 * transition-delay per item (nth-child), this creates a staggered
 * fade-in effect - e.g. the four "Our process" cards appearing one
 * after another rather than all at once.
 */
publicWidget.registry.GlobxScrollReveal = publicWidget.Widget.extend({
    selector: ".globx-reveal-group",

    start() {
        const res = this._super(...arguments);

        const items = this.el.querySelectorAll(".globx-reveal");
        if (!items.length) {
            return res;
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) {
            items.forEach((item) => item.classList.add("globx-visible"));
            return res;
        }

        // Deliberate short delay before we even start observing. This
        // guarantees the browser has painted the initial opacity:0 state
        // and gives a real, visible gap - even if the section happens to
        // already be within the viewport threshold on page load (in which
        // case an IntersectionObserver alone would fire almost instantly,
        // with no perceptible fade).
        setTimeout(() => {
            this._observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("globx-visible");
                            this._observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );
            items.forEach((item) => this._observer.observe(item));
        }, 300);

        return res;
    },

    destroy() {
        if (this._observer) {
            this._observer.disconnect();
        }
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxScrollReveal;