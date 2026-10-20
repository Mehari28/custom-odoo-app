(function () {
    var WHATSAPP_NUMBER = '250790100100';

    function initChatWidget() {
        var widget = document.getElementById('globx_chat_widget');
        if (!widget) return;

        var toggleBtn = document.getElementById('globx_chat_toggle');
        var panel = document.getElementById('globx_chat_panel');
        var form = document.getElementById('globx_chat_form');
        var input = document.getElementById('globx_chat_input');
        var quickBtns = widget.querySelectorAll('.globx-chat-quick-btn');

        function openPanel() {
            panel.classList.add('globx-chat-panel-open');
            toggleBtn.classList.add('globx-chat-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }

        function closePanel() {
            panel.classList.remove('globx-chat-panel-open');
            toggleBtn.classList.remove('globx-chat-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }

        function sendToWhatsApp(message) {
            if (!message) return;
            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank', 'noopener');
        }

        toggleBtn.addEventListener('click', function (evt) {
            evt.stopPropagation();
            if (panel.classList.contains('globx-chat-panel-open')) {
                closePanel();
            } else {
                openPanel();
            }
        });

        document.addEventListener('click', function (evt) {
            if (!widget.contains(evt.target)) {
                closePanel();
            }
        });

        if (form) {
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();
                var message = input.value.trim();
                if (!message) return;
                sendToWhatsApp(message);
                input.value = '';
            });
        }

        quickBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                sendToWhatsApp(btn.getAttribute('data-msg'));
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatWidget);
    } else {
        initChatWidget();
    }
})();