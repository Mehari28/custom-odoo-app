(function () {
    function initNewsFilter() {
        var filterBtns = document.querySelectorAll('.globx-news-filter-btn');
        var items = document.querySelectorAll('.globx-news-item');
        var emptyEl = document.querySelector('.globx-news-empty');
        if (!filterBtns.length || !items.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('globx-news-filter-active');
                });
                btn.classList.add('globx-news-filter-active');

                var region = btn.getAttribute('data-region');
                var visibleCount = 0;

                items.forEach(function (item) {
                    var itemRegion = item.getAttribute('data-region');
                    var show = region === 'all' || itemRegion === region;
                    item.style.display = show ? '' : 'none';
                    if (show) visibleCount++;
                });

                if (emptyEl) {
                    emptyEl.classList.toggle('globx-news-empty-visible', visibleCount === 0);
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsFilter);
    } else {
        initNewsFilter();
    }
})();
