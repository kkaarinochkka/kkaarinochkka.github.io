// Инициализация слайдера сертификатов
function initCertificatesSlider() {
    const certificatesSwiper = new Swiper('.certificatesSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        effect: 'slide',
        grabCursor: true,
        pagination: {
            el: '.certificates-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.certificates-next',
            prevEl: '.certificates-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                this.update();
            },
            slideChange: function () {
                this.update();
            },
            touchEnd: function () {
                this.update();
            },
            beforeTransitionStart: function () {
                this.update();
            },
            afterTransitionEnd: function () {
                this.update();
            }
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        preventInteractionOnTransition: true,
        allowTouchMove: true,
        resistance: true,
        resistanceRatio: 0.85,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        followFinger: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        slideToClickedSlide: true,
        uniqueNavElements: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
        slideDuplicateVisibleClass: 'swiper-slide-duplicate-visible',
        slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
        slideDuplicateNextClass: 'swiper-slide-duplicate-next',
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: false,
        initialSlide: 0,
        direction: 'horizontal',
        cssMode: false,
        preloadImages: true,
        lazy: false,
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
        slideDuplicateVisibleClass: 'swiper-slide-duplicate-visible',
        slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
        slideDuplicateNextClass: 'swiper-slide-duplicate-next'
    });

    // Добавляем обработчик для обновления слайдера при изменении видимости
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            certificatesSwiper.update();
        }
    });

    // Добавляем обработчик для обновления слайдера при изменении размера окна
    window.addEventListener('resize', function () {
        certificatesSwiper.update();
    });

    return certificatesSwiper;
} 