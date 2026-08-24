/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const WORK_DAYS_PER_YEAR = 250;
const HOURS_PER_WORK_WEEK = 40;

publicWidget.registry.GlobxCostCalculator = publicWidget.Widget.extend({
    selector: ".js_globx_calculator",

    events: {
        "input .globx-calc-slider": "_onSliderInput",
    },

    start() {
        const res = this._super(...arguments);
        this._recalculate();
        return res;
    },

    _onSliderInput() {
        this._recalculate();
    },

    _recalculate() {
        const hours = parseFloat(this.el.querySelector("#globx_calc_hours").value);
        const rate = parseFloat(this.el.querySelector("#globx_calc_rate").value);

        const hoursPerYear = Math.round(hours * WORK_DAYS_PER_YEAR);
        const costPerYear = Math.round(hoursPerYear * rate);
        const weeks = (hoursPerYear / HOURS_PER_WORK_WEEK).toFixed(1);

        this.el.querySelector(".globx-calc-hours-value").textContent = hours;
        this.el.querySelector(".globx-calc-rate-value").textContent = rate;
        this.el.querySelector(".globx-calc-hours-year").textContent =
            hoursPerYear.toLocaleString();
        this.el.querySelector(".globx-calc-cost-year").textContent =
            "$" + costPerYear.toLocaleString();
        this.el.querySelector(".globx-calc-weeks").textContent = weeks;
    },
});

export default publicWidget.registry.GlobxCostCalculator;
