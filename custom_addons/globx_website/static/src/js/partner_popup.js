(function () {
    function initPartnerPopup() {
        var popup = document.getElementById("globx_partner_popup");
        if (!popup) return;

        if (sessionStorage.getItem("globx_partner_popup_dismissed")) {
            // Stays hidden - the inline style="display:none" in the
            // template already covers this, nothing to do.
            return;
        }

        function close() {
            popup.style.display = "none";
            sessionStorage.setItem("globx_partner_popup_dismissed", "1");
        }

        popup.style.display = "flex";

        var closeBtn = popup.querySelector(".globx-partner-popup-close");
        var backdrop = popup.querySelector(".globx-partner-popup-backdrop");
        if (closeBtn) closeBtn.addEventListener("click", close);
        if (backdrop) backdrop.addEventListener("click", close);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPartnerPopup);
    } else {
        initPartnerPopup();
    }
})();