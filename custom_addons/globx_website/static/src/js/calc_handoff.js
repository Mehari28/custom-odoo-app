(function () {
    function initCalcHandoff() {
        var textarea = document.getElementById("problem");
        if (!textarea) return;

        var params = new URLSearchParams(window.location.search);
        var hours = params.get("hours");
        var cost = params.get("cost");
        var weeks = params.get("weeks");

        if (!hours || !cost) return;
        if (textarea.value.trim()) return; // don't overwrite something already typed

        var costFormatted = "$" + Number(cost).toLocaleString();
        var hoursFormatted = Number(hours).toLocaleString();

        textarea.value =
            "Based on the cost calculator, we're currently losing an " +
            "estimated " + costFormatted + " per year (" + hoursFormatted +
            " hours, roughly " + weeks + " work-weeks) to manual work. " +
            "We'd like a discovery call to help diagnose the issue.";
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCalcHandoff);
    } else {
        initCalcHandoff();
    }
})();
