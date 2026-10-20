/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Counts numeric stats up from 0 to their final value once they
 * scroll into view. Targets existing .globx-stat-box and
 * .globx-hero-chip bold values - non-numeric ones (e.g. "Silver")
 * are detected and left untouched, no template edits needed.
 */
publicWidget.registry.GlobxStatCounter = publicWidget.Widget.extend({
    selector: "#wrapwrap",

    start() {
        const res = this._super(...arguments);

        const targets = this.el.querySelectorAll(".globx-stat-box b, .globx-hero-chip b");
        if (!targets.length) {
            return res;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    this._animateCount(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.4 }
        );

        targets.forEach((el) => observer.observe(el));
        return res;
    },

    _animateCount(el) {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (!match) {
            return; // not numeric (e.g. "Silver", "High Risk") - leave as-is
        }

        const target = parseInt(match[1], 10);
        const suffix = match[2] || "";
        const duration = 1000;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        };
        requestAnimationFrame(step);
    },
});

export default publicWidget.registry.GlobxStatCounter;