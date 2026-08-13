/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Hero "Odoo modules" chip: floats statically until clicked, then expands
 * into a heptagon showing all seven modules, each with its own icon.
 * Click again, or click anywhere outside, to collapse back to one chip.
 */
publicWidget.registry.GlobxModuleCycle = publicWidget.Widget.extend({
    selector: ".js_globx_module_cycle",

    events: {
        "click .globx-hero-chip-orbit": "_onChipClick",
    },

    start() {
        const res = this._super(...arguments);
        this._expanded = false;

        this._onDocClick = (ev) => {
            if (this._expanded && !this.el.contains(ev.target)) {
                this._collapse();
            }
        };
        document.addEventListener("click", this._onDocClick);

        return res;
    },

    destroy() {
        document.removeEventListener("click", this._onDocClick);
        this._super(...arguments);
    },

    _onChipClick(ev) {
        ev.stopPropagation();
        this._expanded ? this._collapse() : this._expand();
    },

    _expand() {
        this._expanded = true;
        this.el.classList.add("globx-expanded");
    },

    _collapse() {
        this._expanded = false;
        this.el.classList.remove("globx-expanded");
    },
});

export default publicWidget.registry.GlobxModuleCycle;