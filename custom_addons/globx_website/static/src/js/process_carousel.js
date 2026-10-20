/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const STEPS = [
    { num: "01", title: "Discover" },
    { num: "02", title: "Design" },
    { num: "03", title: "Deploy" },
    { num: "04", title: "Drive" },
];

publicWidget.registry.GlobxProcessCarousel = publicWidget.Widget.extend({
    selector: ".js_globx_process_carousel",

    events: {
        "click .globx-carousel-next": "_onNextClick",
        "click .globx-carousel-prev": "_onPrevClick",
        "click .globx-carousel-dot": "_onDotClick",
        "click .globx-carousel-side-prev": "_onPrevClick",
        "click .globx-carousel-side-next": "_onNextClick",
    },

    start() {
        const res = this._super(...arguments);

        this.slides = Array.from(this.el.querySelectorAll(".globx-carousel-slide"));
        this.dots = Array.from(this.el.querySelectorAll(".globx-carousel-dot"));
        this.prevPreviewNum = this.el.querySelector(".globx-carousel-side-prev .globx-carousel-preview-num");
        this.prevPreviewTitle = this.el.querySelector(".globx-carousel-side-prev .globx-carousel-preview-title");
        this.nextPreviewNum = this.el.querySelector(".globx-carousel-side-next .globx-carousel-preview-num");
        this.nextPreviewTitle = this.el.querySelector(".globx-carousel-side-next .globx-carousel-preview-title");
        this.current = 0;
        this.autoplayPaused = false;

        this._updatePreviews();

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.autoplayTimer = setInterval(() => {
                if (!this.autoplayPaused) {
                    this._goTo(this.current + 1, "next");
                }
            }, 5000);
        }

        return res;
    },

    _pauseAutoplay() {
        this.autoplayPaused = true;
    },

    _onNextClick() {
        this._pauseAutoplay();
        this._goTo(this.current + 1, "next");
    },

    _onPrevClick() {
        this._pauseAutoplay();
        this._goTo(this.current - 1, "prev");
    },

    _onDotClick(ev) {
        this._pauseAutoplay();
        const index = this.dots.indexOf(ev.currentTarget);
        const direction = index > this.current ? "next" : "prev";
        this._goTo(index, direction);
    },

    _updatePreviews() {
        const total = STEPS.length;
        const prevIndex = ((this.current - 1) % total + total) % total;
        const nextIndex = (this.current + 1) % total;

        if (this.prevPreviewNum) {
            this.prevPreviewNum.textContent = STEPS[prevIndex].num;
            this.prevPreviewTitle.textContent = STEPS[prevIndex].title;
        }
        if (this.nextPreviewNum) {
            this.nextPreviewNum.textContent = STEPS[nextIndex].num;
            this.nextPreviewTitle.textContent = STEPS[nextIndex].title;
        }
    },

    _goTo(index, direction) {
        const total = this.slides.length;
        const nextIndex = ((index % total) + total) % total;
        if (nextIndex === this.current) {
            return;
        }

        const currentSlide = this.slides[this.current];
        const nextSlide = this.slides[nextIndex];

        currentSlide.classList.remove("globx-carousel-active");
        currentSlide.classList.add(
            direction === "next" ? "globx-carousel-push-out" : "globx-carousel-pull-out"
        );

        nextSlide.classList.add(
            direction === "next" ? "globx-carousel-push-in" : "globx-carousel-pull-in"
        );

        requestAnimationFrame(() => {
            nextSlide.classList.add("globx-carousel-active");
        });

        setTimeout(() => {
            currentSlide.classList.remove("globx-carousel-push-out", "globx-carousel-pull-out");
            nextSlide.classList.remove("globx-carousel-push-in", "globx-carousel-pull-in");
        }, 500);

        this.dots[this.current].classList.remove("globx-carousel-dot-active");
        this.dots[nextIndex].classList.add("globx-carousel-dot-active");

        this.current = nextIndex;
        this._updatePreviews();
    },

    destroy() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
        this._super(...arguments);
    },
});

export default publicWidget.registry.GlobxProcessCarousel;