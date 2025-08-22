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

    // Обработка клика (только для мобильных)
    item.addEventListener('click', function (e) {
      if (window.innerWidth < breakpoint) {
        e.preventDefault();
        e.stopPropagation(); // Останавливаем всплытие, чтобы не закрылось сразу

        const wasActive = this.classList.contains('menu-click');

        // Сброс всех состояний
        menuItems.forEach(el => {
          el.classList.remove('menu-click');
        });

        // Переключение состояния
        if (!wasActive) {
          this.classList.add('menu-click');
          docEl.classList.add('menu-click');
        } else {
          docEl.classList.remove('menu-click');
        }
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (
      window.innerWidth < breakpoint &&
      docEl.classList.contains('menu-click') &&
      !e.target.closest('.menu-header__nav') &&
      !e.target.closest('.menu-header__dropdown')
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

/*
//========================================================================================================================================================

// Меню
const iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
    document.documentElement.classList.toggle("lock");

    if (document.documentElement.classList.contains("menu-open")) {
      document.documentElement.classList.remove("services-open");
    }
  });
}

//========================================================================================================================================================

// Услуги
const headerItem = document.querySelector('.header__item');
const dropdownContainer = document.querySelector('.header__services');

if (headerItem && dropdownContainer) {
  headerItem.addEventListener('click', function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle('services-open');

    if (document.documentElement.classList.contains("services-open")) {
      document.documentElement.classList.remove("menu-open", "lock");
    }
  });

  document.addEventListener('click', function (e) {
    if (!dropdownContainer.contains(e.target) && !headerItem.contains(e.target)) {
      document.documentElement.classList.remove('services-open');
    }
  });

  dropdownContainer.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-portfolio__slider')) {
  const swiperPortfolio = new Swiper('.block-portfolio__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-portfolio__arrow-prev',
      nextEl: '.block-portfolio__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.block-reviews__slider')) {
  const swiperReviews = new Swiper('.block-reviews__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-reviews__arrow-prev',
      nextEl: '.block-reviews__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 12,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function () {
        updateSlideClasses(this);
      },
      slideChange: function () {
        updateSlideClasses(this);
      },
    }
  });

  function updateSlideClasses(swiper) {
    const slides = swiper.slides;
    const visibleSlides = swiper.params.slidesPerView;

    slides.forEach((slide, index) => {
      if (index >= swiper.activeIndex && index < swiper.activeIndex + visibleSlides) {
        slide.classList.remove('swiper-slide-inactive');
      } else {
        slide.classList.add('swiper-slide-inactive');
      }
    });
  }
}

//========================================================================================================================================================



//========================================================================================================================================================

function indents() {
  const blockDescr = document.querySelector('.block-descr');
  const container = document.querySelector('.container');

  if (blockDescr) {
    let wblockDescr = window.getComputedStyle(blockDescr).width;
    wblockDescr = parseFloat(wblockDescr);

    let wcontainer = window.getComputedStyle(container).width;
    wcontainer = parseFloat(wcontainer);

    const blockDescrSum = (wblockDescr - wcontainer) / 2;

    const tabsBodies = document.querySelectorAll('.tabs__body');

    tabsBodies.forEach(tabsBody => {
      tabsBody.style.marginLeft = `-${blockDescrSum + 15}px`;
      tabsBody.style.width = `calc(100% + ${blockDescrSum * 2 + 30}px)`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  indents();
});
window.addEventListener('resize', indents);
window.addEventListener('scroll', indents);

//========================================================================================================================================================

//Карта
const mapContainer = document.querySelector("#map");

function loadYandexMapScript() {
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
  script.onload = () => {
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(initMainMap);
    } else {
      console.warn('Yandex Maps API не загружено');
    }
  };
  script.onerror = () => console.error('Ошибка загрузки Yandex Maps API');
  document.body.appendChild(script);
}

function initMainMap() {
  try {
    const myMap = new ymaps.Map("map", {
      center: [55.812818, 37.755859],
      zoom: 18,
      controls: ["zoomControl"],
      behaviors: ["drag"]
    }, {
      searchControlProvider: "yandex#search"
    });

    const placemark1 = new ymaps.Placemark([55.812818, 37.755859], {}, {});
    myMap.geoObjects.add(placemark1);
  } catch (error) {
    console.error("Ошибка при инициализации карты #map:", error);
  }
}

if (mapContainer) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadYandexMapScript();
      observer.unobserve(mapContainer);
    }
  }, { threshold: 0.1 });

  observer.observe(mapContainer);
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['title1', 'title2'];
  const visibleClass = 'is-visible';
  const isMobile = window.innerWidth < 768;

  const style = document.createElement('style');
  style.textContent = revealClasses.map(cls => `
    .${cls} {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      transition-delay: 0.12s;
      will-change: opacity, transform;
    }
    .${cls}.${visibleClass} {
      opacity: 1;
      transform: translateY(0);
    }
  `).join('\n');
  document.head.appendChild(style);

  const excludedSelectors = ['.no-reveal', '.disable-reveal'];

  function isExcluded(el) {
    return excludedSelectors.some(sel =>
      el.matches(sel) || el.closest(sel)
    );
  }

  const revealElements = revealClasses.flatMap(cls =>
    Array.from(document.querySelectorAll(`.${cls}`))
  );

  revealElements.forEach(el => {
    if (isMobile && isExcluded(el)) {
      revealClasses.forEach(cls => el.classList.remove(cls));
      // Сброс inline-стилей
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
        } else {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (!(isMobile && isExcluded(el))) {
        observer.observe(el);
      }
    });
  } else {
    console.warn('IntersectionObserver не поддерживается в этом браузере.');
  }
});


//========================================================================================================================================================

// Добавляем класс 'loaded' после полной загрузки страницы
window.addEventListener('load', function () {
  setTimeout(function () {
    document.documentElement.classList.add('loaded');
  }, 900);
});

//========================================================================================================================================================


function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение спойлеров с медиа-запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  // Инициализация табов
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  // Установка статуса (открыт/закрыт) и анимации
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  // Обработка кликов
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      if (isMobile && tabsBlock.classList.contains('_tab-spoller')) {
        if (tabTitle.classList.contains('_tab-active')) {
          tabTitle.classList.remove('_tab-active');
        } else {
          let tabActiveTitles = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
          tabActiveTitles.forEach(activeTitle => activeTitle.classList.remove('_tab-active'));
          tabTitle.classList.add('_tab-active');
        }
      } else {
        if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
          let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
          tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
          if (tabActiveTitle.length) tabActiveTitle[0].classList.remove('_tab-active');
          tabTitle.classList.add('_tab-active');
        }
      }

      setTabsStatus(tabsBlock);
      e.preventDefault();
    }
  }
}
tabs();


*/