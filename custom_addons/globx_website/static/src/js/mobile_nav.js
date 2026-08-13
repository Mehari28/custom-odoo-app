/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Mobile hamburger menu: toggles the dropdown nav panel open/closed,
 * flips the button into an "X" via CSS class, and closes automatically
 * if the visitor taps a link or clicks outside the panel.
 */
publicWidget.registry.GlobxMobileNav = publicWidget.Widget.extend({
    selector: ".globx_header",

    events: {
        "click .globx-nav-toggle": "_onToggleClick",
        "click .globx-mobile-nav a": "_onLinkClick",
    },

    start() {
        const res = this._super(...arguments);
        this.toggleBtn = this.el.querySelector(".globx-nav-toggle");
        this.panel = this.el.querySelector(".globx-mobile-nav");

        this._onDocClick = (ev) => {
            if (
                this.panel.classList.contains("globx-open") &&
                !this.panel.contains(ev.target) &&
                !this.toggleBtn.contains(ev.target)
            ) {
                this._closeMenu();
            }
        };
        document.addEventListener("click", this._onDocClick);

        return res;
    },

    destroy() {
        document.removeEventListener("click", this._onDocClick);
        this._super(...arguments);
    },

    _onToggleClick() {
        const isOpen = this.panel.classList.toggle("globx-open");
        this.toggleBtn.classList.toggle("globx-open", isOpen);
        this.toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    },

    _onLinkClick() {
        this._closeMenu();
    },

    _closeMenu() {
        this.panel.classList.remove("globx-open");
        this.toggleBtn.classList.remove("globx-open");
        this.toggleBtn.setAttribute("aria-expanded", "false");
    },
});

export default publicWidget.registry.GlobxMobileNav;