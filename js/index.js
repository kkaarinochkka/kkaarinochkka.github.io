function initializeContentLinks() {
    const contentLinks = document.querySelectorAll('.link-to-page');

    contentLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); // Предотвращаем всплытие события до страницы

            // Получаем номер целевой страницы из data-атрибута
            const targetPageNumber = parseInt(this.getAttribute('data-target-page'));
            if (!targetPageNumber) return;

            // Получаем текущую открытую страницу
            const currentPage = document.querySelector('.page_project.page-open:not(.page-turned)');
            const currentPageNumber = parseInt(currentPage.getAttribute('data-number'));

            // Используем существующую функцию для анимированного перелистывания
            animateToPage(currentPageNumber, targetPageNumber);
        });
    });
}

function beforeAfter() {
    document.getElementById('compare').style.width = document.getElementById('slider').value + "%";
}

function animateToPage(currentPage, targetPage) {
    if (currentPage === targetPage) return;

    const direction = currentPage < targetPage ? 'forward' : 'back';
    const pages = document.getElementsByClassName('page_project');
    let isAnimating = false;

    function turnPage() {
        if (isAnimating) return;

        if (direction === 'forward' && currentPage < targetPage) {
            isAnimating = true;
            performOperation(pages[currentPage], 'forward');
            currentPage++;
            setTimeout(() => {
                isAnimating = false;
                turnPage();
            }, 1000);
        } else if (direction === 'back' && currentPage > targetPage) {
            isAnimating = true;
            performOperation(pages[currentPage - 1], 'back');
            currentPage--;
            setTimeout(() => {
                isAnimating = false;
                turnPage();
            }, 1000);
        }
    }

    turnPage();
}

function startpage() {
    let allPagesProject = document.getElementsByClassName('page_project');

    if (allPagesProject.length !== 0) {
        for (var y = 0; y < allPagesProject.length; y++) {
            allPagesProject[y].setAttribute('data-number', y.toString());
            allPagesProject[y].style.zIndex = (500 - (y + 1)).toString();
        }
    }
    else {
        console.log('Страниц книги не найдено');
    }

    // Присвоим нулевой странице обработчик
    allPagesProject[0].addEventListener('click', pageclick);

    // Найдем кнопку влево и прикрепим листенер
    let leftButton = document.getElementById('pressLeft');
    leftButton.addEventListener('click', leftClick);

    // Найдем кнопку вправо и прикрепим листенер
    let rightButton = document.getElementById('pressRight');
    rightButton.addEventListener('click', rightClick);

    // Инициализируем обработчики для ссылок содержания
    initializeContentLinks();

    // Инициализируем слайдер сертификатов
    initCertificatesSlider();

    setTimeout(killPreloader, 3000);

    function killPreloader() {
        let preloader = document.getElementsByClassName('picture_preloader');
        preloader[0].style.display = "none";
    }
}

function leftClick() {
    var allPagesProject = document.getElementsByClassName('page_project');
    let target = undefined;

    if (allPagesProject.length !== 0) {
        for (var y = allPagesProject.length - 1; y > -1; y--) {
            if (allPagesProject[y].classList.contains('page-turned')) {
                target = allPagesProject[y];
                break;
            }
        }
    }

    if (typeof target === "undefined") {
        console.log("Не найдена страница для переворота назад");
        return;
    }

    console.log("Переворачиваем назад страницу:", target.getAttribute('data-number'));
    performOperation(target, 'back');
}


function rightClick() {

    var allPagesProject = document.getElementsByClassName('page_project');
    let target;

    if (allPagesProject.length !== 0) {
        for (var y = 0; y < allPagesProject.length; y++) {

            if (allPagesProject[y].classList.contains('page-open')) {
                target = allPagesProject[y];
                break;
            }
        }
    }

    if (typeof (target) != "undefined") performOperation(target, 'forward');

}

function pageclick(e) {
    let target = e.target || e.srcElement; // Для совместимости с разными браузерами

    // Проверяем, не является ли целевой элемент или его родитель ссылкой, слайдером или кнопкой
    while (target != this) {
        if (target.classList.contains('link-to-page') || target.closest('.swiper-button-next:not(button)')
            || target.closest('.swiper-button-prev:not(button)') || target.closest('.swiper-pagination:not(button)')
            || target.closest('.slider:not(button)') || target.closest('.slider-container:not(button)')
            || target.closest('.product-button:not(button)') || target.closest('.close-modal:not(button)')
            || target.closest('.containerProducr:not(button)') || target.closest('.product-content:not(button)')
            || target.closest('.videoMilkavita:not(button)') || target.closest('.image-container:not(button)')
            || target.closest('.year:not(button)') || target.closest('.fullscreen-image:not(button)')
            || target.closest('.content-image-left:not(button)') || target.closest('.content-image-right:not(button)')
            || target.closest('.content-image-large:not(button)') || target.closest('.awards-swiper-button-next:not(button)')
            || target.closest('.swiper-wrapper:not(button)') || target.closest('.swiper-slide:not(button)')
            || target.closest('.play-game-button:not(button)')
        ) {
            return; // Если клик был по ссылке, слайдеру (не кнопке), прерываем обработку
        }
        target = target.parentNode;
    }

    // Сбрасываем `target`, чтобы пройти вверх по дереву и найти страницу книги
    target = e.target || e.srcElement;
    while (!target.classList.contains('page_project') && target.tagName !== 'BODY') {
        target = target.parentElement;
    }

    // Если нашли страницу книги, выполняем нужную операцию
    if (target.classList.contains('page_project')) {
        if (target.classList.contains('page-open')) {
            performOperation(target, 'forward');
        } else {
            expertSystem(target);
        }
    }
}
// Экспертная система при щелчке по странице в google chrome
function expertSystem(target) {

    let operation;

    if (target.classList.contains('page-open')) {

        operation = "forward";

    }
    else {

        operation = "back";

    }

    performOperation(target, operation);

}

function performOperation(target, operation) {

    // Определим номер страницы в списке
    let page_number = parseInt(target.getAttribute('data-number'));

    console.log(`Выполняем операцию ${operation} для страницы ${page_number}`);

    if (operation === "back") {
        console.log("Текущие классы перед изменением:", target.classList);
    }

    // Удалим классы анимации у страницы
    target.classList.remove("flip-right-to-left");
    target.classList.remove("flip-left-to-right");

    // Найдем объект книги, для последующего изменения
    let styleBook = document.getElementById('book');

    // Объявим объект для расстановки приоритетов визуализации
    let orderPages = {};
    let clickPages = [];

    switch (operation) {

        // Если пользователь идет вперед по книге
        case "forward":

            // ******** Выполним действия с размерами книги ********

            // Если это открытие первой страницы, увеличим размер книги
            if (target.classList.contains("page-first")) {
                // Получаем текущую ширину книги из CSS
                const computedStyle = window.getComputedStyle(styleBook);
                const currentWidth = parseInt(computedStyle.width);
                styleBook.style.width = (currentWidth * 2) + "px";
            }

            // Если это открытие последней страницы, уменьшим размер книги
            // и сдвинем ее расположение в центр
            if (target.classList.contains("page-last")) {
                const computedStyle = window.getComputedStyle(styleBook);
                const currentWidth = parseInt(computedStyle.width);
                styleBook.style.width = (currentWidth / 2) + "px";
                styleBook.style.left = (currentWidth / 2) + "px";
            }

            // ******** Выполним действия с выбранной страницей ********

            // Удалим класс открыто и применим класс перевернуто
            target.classList.remove("page-open");
            target.classList.add("page-turned");

            // Применим класс анимация переворота страницы
            target.classList.add("flip-right-to-left");

            // ******** Выполним действия с видимостью страниц и назначим обработку событий нажатия страницы ********

            // Если это открытие первой страницы, сделаем видимой ее и вторую страницу
            if (target.classList.contains("page-first")) {

                orderPages[page_number] = 600;
                orderPages[page_number + 1] = 599;
                clickPages.push(page_number);
                clickPages.push(page_number + 1);
            }
            else {

                // Если это открытие последней страницы, сделаем видимой ее и предыдущую ей страницу
                if (target.classList.contains("page-last")) {
                    orderPages[page_number] = 600;
                    orderPages[page_number - 1] = 599;
                    clickPages.push(page_number);
                }
                // Если это открытие страниц в середине книжки
                else {
                    orderPages[page_number - 1] = 598;
                    orderPages[page_number] = 600;
                    orderPages[page_number + 1] = 599;
                    clickPages.push(page_number);
                    clickPages.push(page_number + 1);
                }
            }

            break;

        // Если пользователь идет назад по книге
        case "back":

            // ******** Выполним действия с размерами книги ********

            // Если последняя страница книги была закрыта и книгу открывают, размер книги надо увеличить
            if (target.classList.contains("page-last")) {
                const computedStyle = window.getComputedStyle(styleBook);
                const currentWidth = parseInt(computedStyle.width);
                styleBook.style.width = (currentWidth * 2) + "px";
                styleBook.style.left = "0px";
            }

            // Если первая страница книги была открыта и ее закрывают, размер книги надо уменьшить
            if (target.classList.contains("page-first")) {
                const computedStyle = window.getComputedStyle(styleBook);
                const currentWidth = parseInt(computedStyle.width);
                styleBook.style.width = (currentWidth / 2) + "px";
            }

            // ******** Выполним действия с выбранной страницей ********

            // Удалим класс открыто и применим класс перевернуто
            target.classList.remove("page-turned");
            target.classList.add("page-open");

            // Применим класс анимации переворота страницы
            target.classList.add("flip-left-to-right");

            // ******** Выполним действия с видимостью страниц ********

            // Если первая страница книги была открыта и ее закрывают
            if (target.classList.contains("page-first")) {

                // orderPages = {  [page_number] : 600, [page_number+1] : 599 };
                orderPages[page_number] = 600;
                orderPages[page_number + 1] = 599;
                clickPages.push(page_number);


            }
            else {

                // Если последняя страница книги была закрыта и ее открывают
                if (target.classList.contains("page-last")) {

                    // orderPages = { [page_number-1] : 599, [page_number] : 600 };
                    orderPages[page_number - 1] = 599;
                    orderPages[page_number] = 600;
                    clickPages.push(page_number);
                    clickPages.push(page_number - 1);


                }
                // Если это возврат к началу книги ( открывает страницы в обратном направлении)
                else {
                    // orderPages = { [page_number-1] : 599, [page_number] : 600, [page_number+1] : 598};
                    orderPages[page_number - 1] = 599;
                    orderPages[page_number] = 600;
                    orderPages[page_number + 1] = 598;
                    clickPages.push(page_number - 1);
                    clickPages.push(page_number);

                }
            }

            break;
        default:
            console.log('Не возможно выполнить неизвестную операцию');
            break;
    }

    setZIndexPages(orderPages);
    console.log("Z-index после обновления:", orderPages);
    setListenerClick(clickPages);

}

function setZIndexPages(orderPages) {

    var allPagesProject = document.getElementsByClassName('page_project');

    if (allPagesProject.length !== 0) {
        for (var y = 0; y < allPagesProject.length; y++) {

            allPagesProject[y].style.zIndex = (500 - (y + 1)).toString();
        }
    }

    if (typeof (orderPages) != "undefined") {
        for (key in orderPages) {

            allPagesProject[key].style.zIndex = orderPages[key];
        }
    }
    else {
        console.log('Приоритет визаулизации страниц не получен');
    }

}

function setListenerClick(clickPages) {

    if ((typeof (clickPages) !== "undefined")) {

        var allPagesProject = document.getElementsByClassName('page_project');

        // Удалим все обработчики событий у страниц.
        // Присвоем новые если они нужны
        if (allPagesProject.length !== 0) {
            for (var y = 0; y < allPagesProject.length; y++) {

                // Если этой странице не требуется листенер, а у нее он был - удалим
                if (clickPages.indexOf(y) == -1) {

                    allPagesProject[y].removeEventListener('click', pageclick, false);
                }
                // Если этой странице требуется листенер, а у нее его не было - присвоим
                else {

                    allPagesProject[y].addEventListener('click', pageclick);
                }
            }

        }
    }
    else {
        console.log('Номера страниц для присвоения обработчика нажатия на страницу не получены');
    }
}

let modal3DSwiper;

function open3DModel(urls) {
    const modal = document.getElementById('modal3D');
    const iframe1 = document.getElementById('modelFrame1');
    const iframe2 = document.getElementById('modelFrame2');

    // Устанавливаем URL для iframe'ов
    iframe1.src = urls[0];
    iframe2.src = urls[1] || ''; // Если второй URL не предоставлен, оставляем пустым

    // Показываем модальное окно
    modal.style.display = 'flex';

    // Инициализируем слайдер
    if (!modal3DSwiper) {
        modal3DSwiper = new Swiper('.modal-3d-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            pagination: {
                el: '.modal-3d-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.modal-3d-swiper .swiper-button-next',
                prevEl: '.modal-3d-swiper .swiper-button-prev',
            },
        });
    }

    // Блокируем прокрутку основной страницы
    document.body.style.overflow = 'hidden';
}

function close3DModal() {
    const modal = document.getElementById('modal3D');
    const iframe1 = document.getElementById('modelFrame1');
    const iframe2 = document.getElementById('modelFrame2');

    // Скрываем модальное окно
    modal.style.display = 'none';

    // Очищаем URL iframe'ов
    iframe1.src = '';
    iframe2.src = '';

    // Разблокируем прокрутку основной страницы
    document.body.style.overflow = '';
}

// Функции для управления модальным окном игры
function openGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
}

// Закрытие модального окна при клике вне его области
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gameModal');
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeGameModal();
        }
    });
});