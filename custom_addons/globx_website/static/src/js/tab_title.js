/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const AWAY_MESSAGES = [
    "Come back! 👋",
    "We'll be here...",
    "GlobX misses you",
];

/**
 * Swaps the browser tab title to a friendly message when the user
 * switches away from the tab, and restores the original title when
 * they return. Works identically across all pages since it reads
 * document.title dynamically rather than hardcoding a page name.
 */
publicWidget.registry.GlobxTabTitle = publicWidget.Widget.extend({
    selector: "#wrapwrap",

    start() {
        const res = this._super(...arguments);

        const originalTitle = document.title;
        const message = AWAY_MESSAGES[Math.floor(Math.random() * AWAY_MESSAGES.length)];

        this._onVisibilityChange = () => {
            if (document.hidden) {
                document.title = message;
            } else {
                document.title = originalTitle;
            }
        };

        document.addEventListener("visibilitychange", this._onVisibilityChange);

        return res;
    },

    destroy() {
        document.removeEventListener("visibilitychange", this._onVisibilityChange);
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxTabTitle;