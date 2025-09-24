const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

// Добавление _header-scroll к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
    } else {
      header.classList.remove('_header-scroll');
    }
  });
}

//========================================================================================================================================================

//Меню
const iconMenu = document.querySelector('.header__burger');
const headerTop = document.querySelector('.menu-header');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
  });
  document.addEventListener('click', function (e) {
    const isClickInsideHeaderTop = headerTop && headerTop.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideHeaderTop && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

const menuItems = document.querySelectorAll('.menu-header__item');
const docEl = document.documentElement;
const breakpoint = 992;

if (menuItems) {
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      if (window.innerWidth >= breakpoint) {
        docEl.classList.add('menu-hover');
        this.classList.add('menu-hover');
      }
    });

    item.addEventListener('mouseleave', function () {
      if (window.innerWidth >= breakpoint) {
        docEl.classList.remove('menu-hover');
        this.classList.remove('menu-hover');
      }
    });

    item.addEventListener('click', function (e) {
      if (window.innerWidth < breakpoint) {
        const isLinkClick = e.target.closest('.menu-header__dropdowm a');

        if (!isLinkClick) {
          e.preventDefault(); 
          e.stopPropagation();

          const wasActive = this.classList.contains('menu-click');

          menuItems.forEach(el => {
            el.classList.remove('menu-click');
          });

          if (!wasActive) {
            this.classList.add('menu-click');
            docEl.classList.add('menu-click');
          } else {
            docEl.classList.remove('menu-click');
          }
        }
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (
      window.innerWidth < breakpoint &&
      docEl.classList.contains('menu-click') &&
      !e.target.closest('.menu-header__nav') &&
      !e.target.closest('.menu-header__dropdowm')
    ) {
      docEl.classList.remove('menu-click');
      menuItems.forEach(item => {
        item.classList.remove('menu-click');
      });
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= breakpoint) {
      docEl.classList.remove('menu-click');
      menuItems.forEach(item => {
        item.classList.remove('menu-click');
      });
    }
  });
}

//========================================================================================================================================================

//Каталог фильтр
const categoryButtons = document.querySelectorAll('.block-catalog__title');
const catalogItems = document.querySelectorAll('.cart-catalog');

if (categoryButtons) {
  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      const selectedCategory = this.getAttribute('data-category');
      const isActive = this.classList.contains('_active');

      if (isActive) {
        categoryButtons.forEach(btn => {
          btn.classList.remove('_active');
        });

        catalogItems.forEach(item => {
          item.classList.remove('_hide');
        });
      } else {
        categoryButtons.forEach(btn => {
          btn.classList.remove('_active');
        });

        this.classList.add('_active');

        catalogItems.forEach(item => {
          const itemCategories = item.getAttribute('data-category').split(',');

          if (itemCategories.includes(selectedCategory)) {
            item.classList.remove('_hide');
          } else {
            item.classList.add('_hide');
          }
        });
      }
    });
  });
}

//========================================================================================================================================================

//Яндекс карта
const map = document.querySelector('#map');
if (map) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.699781, 37.619423],
      zoom: 9,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap.geoObjects
      .add(new ymaps.Placemark([55.694843, 37.435023], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.831903, 37.411961], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.744522, 37.616378], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))

  };
}

const map2 = document.querySelector('#map2');
if (map2) {
  ymaps.ready(init);

  function init() {
    var myMap2 = new ymaps.Map('map2', {
      center: [55.699781, 37.619423],
      zoom: 9,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

  };
}

const map3 = document.querySelector('#map3');
if (map3) {
  ymaps.ready(init);

  function init() {
    var myMap3 = new ymaps.Map('map3', {
      center: [55.699781, 37.619423],
      zoom: 9,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap3.geoObjects
      .add(new ymaps.Placemark([55.694843, 37.435023], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.831903, 37.411961], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.744522, 37.616378], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))

  };
}

const map4 = document.querySelector('#map4');
if (map4) {
  ymaps.ready(init);

  function init() {
    var myMap4 = new ymaps.Map('map4', {
      center: [55.699781, 37.619423],
      zoom: 9,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap4.geoObjects
      .add(new ymaps.Placemark([55.694843, 37.435023], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.831903, 37.411961], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.763338, 37.565466], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))
      .add(new ymaps.Placemark([55.744522, 37.616378], {
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],
      }))

  };
}

//========================================================================================================================================================

if (document.querySelector('.block-sale__slider')) {
  const swiperSale = new Swiper('.block-sale__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 25,
    speed: 400,
    navigation: {
      prevEl: '.block-sale__arrow-prev',
      nextEl: '.block-sale__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });
}

if (document.querySelector('.block-video-reviews__slider')) {
  const swiperVideoReviews = new Swiper('.block-video-reviews__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 25,
    speed: 400,
    navigation: {
      prevEl: '.block-video-reviews__arrow-prev',
      nextEl: '.block-video-reviews__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });
}

if (document.querySelector('.images-product')) {
  const thumbsSwiper = new Swiper('.images-product__thumb', {
    observer: true,
    observeParents: true,
    slidesPerView: 7,
    spaceBetween: 12,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 4, spaceBetween: 3,
      },
      700: {
        slidesPerView: 7, spaceBetween: 15,
      },
      1100: {
        slidesPerView: 7, spaceBetween: 5,
      },
      1450: {
        slidesPerView: 7, spaceBetween: 12,
      },
    },
  });

  const mainThumbsSwiper = new Swiper('.images-product__slider', {
    thumbs: {
      swiper: thumbsSwiper
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 25,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
  });
}

//========================================================================================================================================================

// Квиз
const quizColumns = document.querySelectorAll('.block-quiz__column');
if (quizColumns.length > 0) {
  const prevButtons = document.querySelectorAll('.block-quiz__arrow-prev');
  const nextButtons = document.querySelectorAll('.block-quiz__arrow-next');
  let currentQuestion = 0;

  initQuiz();

  function initQuiz() {
    showQuestion(currentQuestion);

    prevButtons.forEach(btn => btn.addEventListener('click', showPrevQuestion));
    nextButtons.forEach(btn => btn.addEventListener('click', showNextQuestion));
  }

  function showPrevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  }

  function showNextQuestion() {
    if (currentQuestion < quizColumns.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  }

  function showQuestion(index) {
    if (quizColumns[index]) {
      quizColumns.forEach(column => {
        column.classList.remove('_active');
      });

      quizColumns[index].classList.add('_active');
      updateButtonsState();
    }
  }

  function updateButtonsState() {
    prevButtons.forEach(btn => {
      if (currentQuestion === 0) {
        btn.classList.add('_disabled');
      } else {
        btn.classList.remove('_disabled');
      }
    });

    nextButtons.forEach(btn => {
      if (currentQuestion === quizColumns.length - 1) {
        btn.classList.add('_disabled');
      } else {
        btn.classList.remove('_disabled');
      }
    });
  }
}

//========================================================================================================================================================

//Спойллер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            } else {
              setTimeout(() => initShowMoreInSpoller(spollerTitle.nextElementSibling), 10);
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");
        const spollerItem = spollerTitle.closest(".spollers__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          const contentBlock = spollerTitle.nextElementSibling;
          _slideToggle(contentBlock, spollerSpeed, () => {
            // Инициализируем showonly при открытии спойлера
            if (spollerTitle.classList.contains("_spoller-active")) {
              setTimeout(() => initShowMoreInSpoller(contentBlock), 10);
            }
          });

          e.preventDefault();
        }
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }
  }
}
spollers();

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Фильтр
document.addEventListener('DOMContentLoaded', function () {
  const filterCatalog = document.querySelector('.filter-catalog');
  const filterButton = document.querySelector('.filter-catalog__button');
  const filterBody = document.querySelector('.filter-catalog__body');
  const filterClose = document.querySelector('.filter-catalog__close');

  if (filterButton) {
    filterButton.addEventListener('click', function () {
      filterCatalog.classList.add('_active');
      document.documentElement.classList.add('filter-open');
    });

    filterClose.addEventListener('click', function () {
      filterCatalog.classList.remove('_active');
      document.documentElement.classList.remove('filter-open');
    });

    document.addEventListener('click', function (event) {
      const isClickInsideFilter = filterBody.contains(event.target);
      const isClickOnButton = filterButton.contains(event.target);

      if (!isClickInsideFilter && !isClickOnButton && filterCatalog.classList.contains('_active')) {
        filterCatalog.classList.remove('_active');
        document.documentElement.classList.remove('filter-open');
      }
    });

    filterBody.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && filterCatalog.classList.contains('_active')) {
        filterCatalog.classList.remove('_active');
        document.documentElement.classList.remove('filter-open');
      }
    });
  }
});

//========================================================================================================================================================

//Избранное
let favoritesIcons = document.querySelectorAll('.favorites__icons');
if (favoritesIcons) {
  favoritesIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      this.classList.toggle('_active');
    });
  });
}

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    document.documentElement.classList.contains("menu-open") ? menuClose() : null;

    if (typeof SmoothScroll !== 'undefined') {
      new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: "smooth"
      });
    }
  }
};
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
        if (modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
        }
      }
    }
  }
}
pageNavigation()

//========================================================================================================================================================

//Калькулятор
let blockCalculator = document.querySelector('.block-calculator');
if (blockCalculator) {
  // Таблица скидок: {месяцы: скидка%}
  const discountTable = {
    12: 1.5,
    11: 3,
    10: 4.5,
    9: 6,
    8: 7.5,
    7: 9,
    6: 10.5,
    5: 12,
    4: 13.5,
    3: 15,
    2: 16.5,
    1: 18
  };

  // Годовая ставка = 0% (рассрочка без процентов)
  const annualRate = 0;
  const monthlyRate = 0;

  function calculate() {
    // Получаем и очищаем значение стоимости участка
    const priceStr = document.getElementById('price').value.replace(/\s/g, '');
    const price = parseFloat(priceStr) || 0;

    // Процент первоначального взноса
    const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value) || 0;

    // Срок рассрочки в месяцах
    const months = parseInt(document.getElementById('months').value) || 1;

    // Определяем скидку по таблице
    let discount = discountTable[months] || 0;

    // Стоимость участка со скидкой
    const discountedPrice = price * (1 - discount / 100);

    // Первоначальный взнос — от суммы со скидкой
    const downPayment = discountedPrice * (downPaymentPercent / 100);

    // Сумма рассрочки (тело)
    const loanAmount = discountedPrice - downPayment;

    // Ежемесячный платёж (без процентов)
    const monthlyPayment = loanAmount / months;

    // Общая сумма выплат
    const totalPayment = monthlyPayment * months;

    // Переплата (при 0% будет 0)
    const overpayment = totalPayment - loanAmount;

    // Форматирование чисел: целые, с пробелами, без дробной части
    function format(num) {
      return Math.round(num).toLocaleString('ru-RU');
    }

    // Обновляем все результаты на странице
    document.getElementById('result-discount').textContent = `${discount}%`;
    document.getElementById('result-down-payment').textContent = `${format(downPayment)} р.`;
    document.getElementById('result-rate').textContent = `${annualRate}%`;
    document.getElementById('result-total-payment').textContent = `${format(totalPayment)} р.`;
    document.getElementById('result-discounted-price').textContent = `${format(discountedPrice)} р.`;
    document.getElementById('result-loan-amount').textContent = `${format(loanAmount)} р.`;
    document.getElementById('result-monthly-payment').textContent = `${format(monthlyPayment)} р.`;
    document.getElementById('result-overpayment').textContent = `${format(overpayment)} р.`;
  }

  // Добавляем слушатели на поля ввода
  document.getElementById('price').addEventListener('input', calculate);
  document.getElementById('downPaymentPercent').addEventListener('input', calculate);
  document.getElementById('months').addEventListener('input', calculate);

  // Пересчитываем при загрузке страницы
  window.addEventListener('load', calculate);
}