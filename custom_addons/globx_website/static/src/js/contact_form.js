/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { fireConfetti } from "./confetti";

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

    _onSubmit(ev) {
        ev.preventDefault();
        fireConfetti();
        alert("Thanks — we'll be in touch shortly to schedule your discovery call.");
        return false;
    },
});

export default publicWidget.registry.GlobxContactForm;