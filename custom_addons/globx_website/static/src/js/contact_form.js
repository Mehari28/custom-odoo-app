/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { rpc } from "@web/core/network/rpc";
import { fireConfetti } from "./confetti";

const FIELDS = ["fullName", "workEmail", "company", "phone", "industry", "industryOther", "problem", "website_hp"];

publicWidget.registry.GlobxContactForm = publicWidget.Widget.extend({
    selector: "#globx_contact_form",

    events: {
        "change #industry": "_onIndustryChange",
        "submit": "_onSubmit",
    },

    _onIndustryChange(ev) {
        const otherField = this.el.querySelector(".globx-industry-other-field");
        const otherInput = this.el.querySelector("#industryOther");
        if (ev.target.value === "Other") {
            otherField.style.display = "block";
            otherInput.setAttribute("required", "required");
        } else {
            otherField.style.display = "none";
            otherInput.removeAttribute("required");
            otherInput.value = "";
        }
    },

    _collect() {
        const values = {};
        for (const name of FIELDS) {
            const input = this.el.querySelector(`[name="${name}"]`);
            values[name] = input ? input.value : "";
        }
        // Figures passed from the cost calculator (?hours=&cost=&weeks=)
        const params = new URLSearchParams(window.location.search);
        if (params.get("cost")) {
            values.calc_cost = "$" + Number(params.get("cost")).toLocaleString();
            values.calc_hours = params.get("hours") || "";
            values.calc_weeks = params.get("weeks") || "";
        }
        return values;
    },

    _clearErrors() {
        this.el.querySelectorAll(".globx-field-error").forEach((el) => el.remove());
        this.el.querySelectorAll(".globx-invalid").forEach((el) => el.classList.remove("globx-invalid"));
        const box = this.el.querySelector(".globx-form-error");
        box.classList.remove("globx-visible");
        box.textContent = "";
    },

    _showFieldErrors(errors) {
        for (const [name, message] of Object.entries(errors)) {
            const input = this.el.querySelector(`[name="${name}"]`);
            if (!input) {
                continue;
            }
            input.classList.add("globx-invalid");
            const hint = document.createElement("span");
            hint.className = "globx-field-error";
            hint.textContent = message;
            input.insertAdjacentElement("afterend", hint);
        }
        const first = this.el.querySelector(".globx-invalid");
        if (first) {
            first.focus();
        }
    },

    _showGeneralError(message) {
        const box = this.el.querySelector(".globx-form-error");
        box.textContent = message;
        box.classList.add("globx-visible");
    },

    _showThankYou() {
        fireConfetti();
        const card = this.el.closest(".globx-contact-form-card");
        const panel = card ? card.querySelector(".globx-thankyou-panel") : null;
        this.el.style.display = "none";
        if (panel) {
            panel.classList.add("globx-thankyou-visible");
        }
    },

    async _onSubmit(ev) {
        ev.preventDefault();
        if (this._sending) {
            return;
        }
        this._clearErrors();

        const button = this.el.querySelector(".globx-form-submit");
        const label = button.textContent;
        this._sending = true;
        button.disabled = true;
        button.textContent = "Sending…";

        try {
            const result = await rpc("/globx/contact/submit", this._collect());
            if (result && result.ok) {
                this._showThankYou();
                return;
            }
            if (result && result.errors) {
                this._showFieldErrors(result.errors);
            } else {
                this._showGeneralError("Something went wrong. Please try again.");
            }
        } catch {
            this._showGeneralError(
                "We couldn't send your request. Please check your connection and try again, " +
                "or message us on WhatsApp at +250 790 100 100."
            );
        } finally {
            this._sending = false;
            button.disabled = false;
            button.textContent = label;
        }
    },
});

export default publicWidget.registry.GlobxContactForm;
