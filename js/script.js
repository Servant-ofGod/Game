"use strict"
// меню-бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
// плавна навігація 
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();

		}
	}
}

// ================================================================================================================================================



// const swiper = new Swiper('.swiper', {
// 	slidesPerView: 1,
// 	breakpoints: {
// 		375: {
// 			slidesPerView: 1.1,
// 		},
// 		500: {
// 			slidesPerView: 1.3,
// 		},
// 		610: {
// 			slidesPerView: 1.5,
// 		},
// 		760: {
// 			slidesPerView: 1.7,
// 		},
// 		900: {
// 			slidesPerView: 1.9,
// 		},
// 		1000: {
// 			slidesPerView: 2.1,
// 		},
// 		1100: {
// 			slidesPerView: 2.3,
// 		},
// 	},
// });

// ================================================================================================================================================

// const spollersArray = document.querySelectorAll('[data-spollers]');
// if (spollersArray.length > 0) {
// 	// здобуття звичайних спойлерів
// 	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
// 		return !item.dataset.spollers.split(",")[0];
// 	});
// 	// ініцалізація звичайних спойлерів
// 	if (spollersRegular.length > 0) {
// 		initSpollers(spollersRegular);
// 	}

// 	// здобуття спойлерів з медіа запитами
// 	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
// 		return item.dataset.spollers.split(",")[0];
// 	});

// 	// ініцалізація спойлерів з медіа запитами
// 	if (spollersMedia.length > 0) {
// 		const breakpointsArray = [];
// 		spollersMedia.forEach(item => {
// 			const params = item.dataset.spollers;
// 			const breakpoint = {};
// 			const paramsArray = params.split(",");
// 			breakpoint.value = paramsArray[0];
// 			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
// 			breakpoint.item = item;
// 			breakpointsArray.push(breakpoint);
// 		});

// 		// здобуваємо унікальні брекпоїнти
// 		let mediaQueries = breakpointsArray.map(function (item) {
// 			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
// 		});
// 		mediaQueries = mediaQueries.filter(function (item, index, self) {
// 			return self.indexOf(item) === index;
// 		});

// 		// працюємо з кожним брекпоїнтом
// 		mediaQueries.forEach(breakpoint => {
// 			const paramsArray = breakpoint.split(",");
// 			const mediaBreakpoint = paramsArray[1];
// 			const mediaType = paramsArray[2];
// 			const matchMedia = window.matchMedia(paramsArray[0]);

// 			// обєкти з потрібними вимогами
// 			const spollersArray = breakpointsArray.filter(function (item) {
// 				if (item.value === mediaBreakpoint && item.type === mediaType) {
// 					return true;
// 				}
// 			});
// 			// подія
// 			matchMedia.addListener(function () {
// 				initSpollers(spollersArray, matchMedia);
// 			});
// 			initSpollers(spollersArray, matchMedia);
// 		});
// 	}
// 	// ініцалізація
// 	function initSpollers(spollersArray, matchMedia = false) {
// 		spollersArray.forEach(spollersBlock => {
// 			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
// 			if (matchMedia.matches || !matchMedia) {
// 				spollersBlock.classList.add('_init');
// 				initSpollerBody(spollersBlock);
// 				spollersBlock.addEventListener("click", setSpollerAction);
// 			} else {
// 				spollersBlock.classList.remove('_init');
// 				initSpollerBody(spollersBlock, false);
// 				spollersBlock.removeEventListener("click", setSpollerAction);
// 			}
// 		});
// 	}
// 	// робота з контейнером
// 	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
// 		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
// 		if (spollerTitles.length > 0) {
// 			spollerTitles.forEach(spollerTitle => {
// 				if (hideSpollerBody) {
// 					spollerTitle.removeAttribute('tabindex');
// 					if (!spollerTitle.classList.contains('_active')) {
// 						spollerTitle.nextElementSibling.hidden = true;
// 					}
// 				} else {
// 					spollerTitle.setAttribute('tabindex', '-1');
// 					spollerTitle.nextElementSibling.hidden = false;
// 				}
// 			});
// 		}
// 	}
// 	function setSpollerAction(e) {
// 		const el = e.target;
// 		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
// 			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
// 			const spollersBlock = spollerTitle.closest('[data-spollers]');
// 			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
// 			if (!spollersBlock.querySelectorAll('._slide').length) {
// 				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
// 					hideSpollersBody(spollersBlock);
// 				}
// 				spollerTitle.classList.toggle('_active');
// 				_slideToggle(spollerTitle.nextElementSibling, 500);
// 			}
// 			e.preventDefault();
// 		}
// 	}
// 	function hideSpollersBody(spollersBlock) {
// 		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
// 		if (spollerActiveTitle) {
// 			spollerActiveTitle.classList.remove('_active');
// 			_slideUp(spollerActiveTitle.nextElementSibling, 500);
// 		}
// 	}
// }

// // ---------------------------------------------------
// // sasasasasas
// let _slideUp = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = target.offsetHeight + 'px';
// 		target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		window.setTimeout(() => {
// 			target.hidden = true;
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('padding-top');
// 			target.style.removeProperty('padding-bottom');
// 			target.style.removeProperty('margin-top');
// 			target.style.removeProperty('margin-bottom');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// };

// let _slideDown = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		if (target.hidden) {
// 			target.hidden = false;
// 		}
// 		let height = target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = height + 'px';
// 		target.style.removeProperty('padding-top');
// 		target.style.removeProperty('padding-bottom');
// 		target.style.removeProperty('margin-top');
// 		target.style.removeProperty('margin-bottom');
// 		window.setTimeout(() => {
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// };

// let _slideToggle = (target, duration = 500) => {
// 	if (target.hidden) {
// 		return _slideDown(target, duration);
// 	} else {
// 		return _slideUp(target, duration);
// 	}
// };