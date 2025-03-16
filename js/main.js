/*---------------------------------------------------------
*	Author:			Travolgi
*	Theme:			Grapeland
*	Version:			1.0.0
*	Created: 		22/10/2024
*	Last update:	22/10/2024
---------------------------------------------------------*/

/*--------------------------------------------------------
*	HELPER FUNCTIONS
--------------------------------------------------------*/
const delay = (callback, ms) => setTimeout(callback, ms);

const getElement = (selector) => document.querySelector(selector);

const getAllElements = (selector) => document.querySelectorAll(selector);

const changeAttribute = (target, dataAttribute, val=true) => target.setAttribute(dataAttribute, val);

const changeClass = (target, removeClass, addClass) => {
	target.classList.remove(removeClass);
	target.classList.add(addClass);
}

/*--------------------------------------------------------
*	PRELOAD
--------------------------------------------------------*/
(() => {
	const preload = getElement('#preload');
	window.addEventListener('load', () => {
		delay(() => changeClass(preload, null, 'loaded'), 400);
	});
})();

/*--------------------------------------------------------
*	NAVBAR
--------------------------------------------------------*/
const navToggle = getElement('.nav-toggle'),
		navOverlay = getElement('.nav-overlay'),
		navPannel = getElement('#navbar');

const openNavBar = (val=true) => {
	changeAttribute(navPannel, 'data-visible', val);
	changeAttribute(navOverlay, 'data-visible', val);
	changeAttribute(navToggle, 'aria-expanded', val);
}

navToggle.addEventListener('click', () => {
	const visible = navPannel.getAttribute('data-visible');
	if(visible === 'false') {
		openNavBar();
	} else {
		openNavBar(false);
	}
});

const subMenuLi = getAllElements('.has-submenu');
subMenuLi.forEach(li => {
	li.addEventListener('click', e => {
		const li = e.target;
		const liActive = li.nodeName === 'SPAN' ? li.parentNode : li;
		if (liActive.classList.contains('active')) {
			liActive.classList.remove('active')
		} else {			
			liActive.classList.add('active')
		}
	})
});

/*--------------------------------------------------------
*	HERO SLIDER
--------------------------------------------------------*/
const heroSlider = getElement('#heroSlider');

if(heroSlider) {
	const heroBg = getElement('.hero-bg'),
			heroSlides = heroBg.children.length;

	let curSlide = 1;

	const heroPagination = slide => {
		heroBg
			.querySelectorAll('li')
			.forEach(item => changeAttribute(item, 'hidden', true));

			getElement(`.hero-bg li[data-slide="${CSS.escape(slide)}"]`).removeAttribute('hidden');

		curSlide >= heroSlides ? curSlide = 1 : curSlide++;
	};
	
	setInterval(() => heroPagination(curSlide), 4500);
}

/*--------------------------------------------------------
*	YOU TUBE VIDEO POP UP
--------------------------------------------------------*/
const ytPopupBtn = getElement('.yt-popup-btn');

if (ytPopupBtn) {
	const ytPopup = getElement('.yt-popup'),
			closeYtPopup = getElement('.close-yt-popup'),
			iframe = ytPopup.querySelector('iframe');

	ytPopupBtn.addEventListener('click', () => ytPopup.style.display = 'block');
	
	closeYtPopup.addEventListener('click', () => {
		iframe.src = iframe.src;
		ytPopup.style.display = 'none';
	});

	ytPopup.addEventListener('click', e => {
		if (e.target === ytPopup) {
			iframe.src = iframe.src;
			ytPopup.style.display = 'none';
		}
	});
}

/*--------------------------------------------------------
*	SWIPER
--------------------------------------------------------*/
const swiperPrevBtn = getElement('#swiper-previous'),
		swiperNextBtn = getElement('#swiper-next'),
		swiperBullets = getAllElements('.swiper-bullets > li'),
		swiperSlides = getAllElements('.swiper-slide'),
		dataBullets = 'data-slide-control';
		
let curSwiperSlide = getElement('.swiper-bullets > li.active');
if(curSwiperSlide) {
	curSwiperSlide = curSwiperSlide.getAttribute(dataBullets)
}

const showSwiperSlide = e => {
	const slide = e.target.attributes[dataBullets].nodeValue;

	curSwiperSlide = slide; 
	
	swiperSlides.forEach(item => changeAttribute(item, 'hidden', true));
	swiperBullets.forEach(bullet => changeClass(bullet, 'active', null));

	const setActiveSlide = getElement(`.swiper-slide[data-slide="${CSS.escape(slide)}"]`);
	const setActiveBullet = getElement(`.swiper-bullets li[${dataBullets}="${CSS.escape(slide)}"]`);

	setActiveSlide.removeAttribute('hidden');
	changeClass(setActiveBullet, null, 'active');
}

const swiperControls = e => {
	const btn = e.target.id;

	if (btn === 'swiper-next') {
		curSwiperSlide >= swiperSlides.length ? curSwiperSlide = 1 : curSwiperSlide++;
	} else {
		curSwiperSlide <= 1 ? curSwiperSlide = swiperSlides.length : curSwiperSlide--;
	}

	showSwiperSlide({
		target: {
			attributes: {
				[dataBullets]: { nodeValue: curSwiperSlide.toString() }
			}
		}
	});
}

if(swiperPrevBtn && swiperNextBtn) {
	swiperPrevBtn.addEventListener('click', swiperControls);
	swiperNextBtn.addEventListener('click', swiperControls);
}
if(swiperBullets) {
	swiperBullets.forEach(bullet => bullet.addEventListener('click', showSwiperSlide));
}

/*--------------------------------------------------------
*	FAQ
--------------------------------------------------------*/
const faqs = getAllElements('.faq'),
		dataFaq = 'data-faq-opened';

const toggleFaq = e => {
	const currentFaq = e.target.parentNode,
			iconFaq = currentFaq.querySelector('button'),
			visible = currentFaq.getAttribute(dataFaq);

	faqs.forEach(faq => {
		changeAttribute(faq, dataFaq, false);
		changeClass(faq.querySelector('button'), 'gg-chevron-up', 'gg-chevron-down');
	});
	
	if(visible === 'false') {
		changeAttribute(currentFaq, dataFaq);
		changeClass(iconFaq, 'gg-chevron-down', 'gg-chevron-up');
	} else {
		changeAttribute(currentFaq, dataFaq, false);
		changeClass(iconFaq, 'gg-chevron-up', 'gg-chevron-down');
	}
}

if (faqs) {
	faqs.forEach(faq => faq.addEventListener('click', toggleFaq));
}


/*--------------------------------------------------------
*	SCROOL TOP BUTTON
--------------------------------------------------------*/
const scroolTop = getElement('#goTop');

if (scroolTop) {
	window.onscroll = () => {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			changeClass(scroolTop, 'hidden', 'block');
		} else {
			changeClass(scroolTop, 'block', 'hidden');
		}
	}

	scroolTop.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
}

/*--------------------------------------------------------
*	AOS INIT
--------------------------------------------------------*/
AOS.init({
	duration: 800,
	easing: 'ease-in-sine'
});