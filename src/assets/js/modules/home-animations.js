import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";

// Timeline for hero heading scale
const tl = gsap.to('#headingInner', {opacity: .1, scale: .4});
tl.pause();

// Hero heading showing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        let tl2 = gsap.timeline();
        tl2
            // .to('.preloader', {opacity: 0, visibility: 'hidden'})
            .to('.hero__heading-inner .heading__words', {opacity: 1, y: '0', stagger: ".2", duration: .9});
    }, 1000)
})

// Locomotive scroll init
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

// Event on page scroll
scroll.on('scroll', (args) => {
    // Progress for hero heading scale on scroll
    if(typeof args.currentElements['homeHero'] === 'object') {
        let heroProgress = args.currentElements['homeHero'].progress;
        tl.progress(heroProgress < .6 ? 0 : heroProgress);
    }

    // Full page progress
    const pageProgress = args.scroll.y / args.limit.y * 100;
});

// Call evenets
scroll.on("call", (value, way, obj) => {
    // event on clients section in scroll
    if (value === "clients") {
        let tlClients = gsap.timeline();
        tlClients
            .to('.clients__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.clients__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1');
    }

    if (value === "portfolio") {
        let tlPortfolio = gsap.timeline();
        tlPortfolio
            .to(obj.el, {opacity: 1, y: 0, scale: 1})
    }

    if (value === "video") {
        let tlVideo = gsap.timeline();
        tlVideo
            .to('.video__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.video__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1');
    }

    if (value === "we-do") {
        let tlVideo = gsap.timeline();
        tlVideo
            .to('.we-do__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.we-do__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1');
    }

    if (value === "we-love") {
        let tlWeLove = gsap.timeline();
        tlWeLove
            .to('.we-love__circle-wrapper svg', {rotate: '720deg', duration: 1.5});
    }

    if (value === "we-know") {
        let tlWeKnow = gsap.timeline();
        tlWeKnow
            .to('.we-know__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.we-know__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1');
    }

    if (value === "reviews") {
        let tlReviews = gsap.timeline();
        tlReviews
            .to('.reviews__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.reviews__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1');
    }

    if (value === "our-blog") {
        let tlReviews = gsap.timeline();
        tlReviews
            .to('.our-blog .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.our-blog .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1')
            .to('.our-blog__item', {stagger: .3, y: 0, scale: 1, opacity: 1}, '-.1')
    }

    if (value === "lets-speak") {
        let tlLetsSpeak = gsap.timeline();
        tlLetsSpeak
            .to('.lets-speak__heading .heading__icon-wr', {opacity: 1, y: 0, duration: .9})
            .to('.lets-speak__heading .heading__words', {opacity: 1, y: 0, stagger: ".2", duration: .9}, '-.1')
    }
});


// Toggle clients on button click
const toggleClientsBtn = document.getElementById('toggleClients'),
    showMoreBtnText = 'See all our clients',
    showLessBtnText = 'Hide our clients'
toggleClientsBtn.addEventListener('click', () => {
    let tlShowClients = gsap.timeline();

    if (toggleClientsBtn.dataset.status == 'hide') {
        tlShowClients.to('.clients__items--all', {opacity: 1, visibility: 'visible', maxHeight: '100%'});
        toggleClientsBtn.dataset.status = 'show';
        toggleClientsBtn.innerText = showLessBtnText;
    } else {
        tlShowClients.to('.clients__items--all', {opacity: 0, visibility: 'hidden', maxHeight: '0px'});
        toggleClientsBtn.dataset.status = 'hide';
        toggleClientsBtn.innerText = showMoreBtnText;
    }
});

// We do arrow
document.querySelector('.we-do__items-wr').addEventListener('click', e => {
    if (e.target.closest('.we-do-item__title-arrow')) {
        e.target.closest('.we-do-item__title-arrow').parentElement.nextElementSibling.nextElementSibling.classList.toggle('active')
        e.target.closest('.we-do-item__title-arrow').classList.toggle('active')
    }
})

document.querySelector('.we-do__more-btn').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.we-do__items-wr').classList.toggle('active')
    document.querySelector('.we-do__more-btn').classList.toggle('active')
})

// ADVANTAGES TABS
class Tabs {
    constructor () {
        this.inProcess = false;
        this.activeAdvTab = document.querySelector('.advantages-tabs__item--active');
        this.advActiveLine = document.querySelector('.advantages-tabs__line-active');
    }

    setActiveLinePosition = (tabToActivate = this.activeAdvTab) => {
        const tabTl = gsap.timeline({});
        const leftOffset = tabToActivate.offsetLeft;

        tabTl.to(this.advActiveLine, {width: tabToActivate.offsetWidth})
            .to(this.advActiveLine, {x: leftOffset});
    }

    setActiveClassToSelectedTab = tabToActivate => {
        document.querySelector('.advantages-tabs__item--active').classList.remove('advantages-tabs__item--active');
        tabToActivate.classList.add('advantages-tabs__item--active');
    }

    disableTabContent = () => {
        const tabTl = gsap.timeline({});
        document.querySelector('.advantages__content-wr').style.minHeight = document.querySelector('.advantages__content-item--active').offsetHeight + 'px';
        tabTl.to('.advantages__content-item--active', {display: 'none'});
        document.querySelector('.advantages__content-item--active').classList.remove('advantages__content-item--active');
    }

    showNewTabContent = tabContentToActivate => {
        const tabTl = gsap.timeline({});
        tabTl.to(tabContentToActivate, {display: 'block'});
        tabContentToActivate.classList.add('advantages__content-item--active');

        this.inProcess = false
    }

    tabActivate = tabToActivate => {
        if (!this.inProcess) {
            this.inProcess = true;
    
            const tabIdPartToActivate = tabToActivate.hash;
            
            // Set active class to current tab
            this.setActiveClassToSelectedTab(tabToActivate);
    
            // Set init active line position
            this.setActiveLinePosition(tabToActivate);
    
            // Tab content class add/remove
            // tab content hide/show
            this.disableTabContent();
    
            const tabContentToActivate = document.getElementById(`advantage-${tabIdPartToActivate.substr(1)}`);
    
            setTimeout(() => this.showNewTabContent(tabContentToActivate), 500);
        }
    }
}

const getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

document.addEventListener('DOMContentLoaded', () => {
    if (getWidth() > 767) {
        const tabs = new Tabs();
        
        // Set init active line position
        if(document.querySelector('.advantages-tabs__item--active')) tabs.setActiveLinePosition();
    
        // On tab click
        document.querySelector('.advantages-tabs').addEventListener('click', e => {
            if (e.target.closest('.advantages-tabs__item')) {
                tabs.tabActivate(e.target.closest('.advantages-tabs__item'))
            }
            scroll.init();
        })

    } else {
        document.querySelector('.advantages__mobile').addEventListener('click', e => {
            const clickedEl = e.target;

            if (clickedEl.closest('.adv-mob-item__title')) {
                const advTitle = clickedEl.closest('.adv-mob-item__title')
                
                if (advTitle.parentElement.classList.contains('adv-mob-item--closed')) {
                    advTitle.parentElement.classList.remove('adv-mob-item--closed');
                    advTitle.parentElement.classList.add('adv-mob-item--active');
                    
                    // const faqTimline = gsap.timeline();
                    let advTl = gsap.timeline({});
                    advTl.to(advTitle.nextElementSibling, {opacity: 1, visibility: 'visible', maxHeight: '100%', lineHeight: '180%'});
                } else {
                    advTitle.parentElement.classList.add('adv-mob-item--closed');
                    advTitle.parentElement.classList.remove('adv-mob-item--active');
                    
                    // const faqTimline = gsap.timeline();
                    let advTl = gsap.timeline({});
                    advTl.to(advTitle.nextElementSibling, {opacity: 0, visibility: 'hidden', maxHeight: '0px', lineHeight: '80%'});
                }
            }

            scroll.init();
        })
    }

    document.querySelector('.faq__items-wrapper').addEventListener('click', e => {
        const clickedEl = e.target;
        
        if (clickedEl.closest('.faq-item__title-wr')) {
            const faqTitle = clickedEl.closest('.faq-item__title-wr')
            
            if (faqTitle.parentElement.classList.contains('faq-item--closed')) {
                faqTitle.parentElement.classList.remove('faq-item--closed');
                
                // const faqTimline = gsap.timeline();
                let faqTl = gsap.timeline({});
                faqTl.to(faqTitle.nextElementSibling, {opacity: 1, visibility: 'visible', maxHeight: '100%', lineHeight: '180%'});
            } else {
                faqTitle.parentElement.classList.add('faq-item--closed');
                let faqTl = gsap.timeline();
                faqTl.to(faqTitle.nextElementSibling, {opacity: 0, visibility: 'hidden', maxHeight: '0px', lineHeight: '70%'});
            }
        }

        scroll.update();
    })
});

document.querySelector('.faq__arrow-icon').addEventListener('click', e => {
    if (document.querySelector('.faq__items-wrapper').classList.contains('closed')) {
        document.querySelector('.faq__items-wrapper').classList.remove('faq-item--closed');
        
        // const faqTimline = gsap.timeline();
        let faq2Tl = gsap.timeline({});
        faq2Tl.to(document.querySelector('.faq__items-wrapper'), {opacity: 1, visibility: 'visible', maxHeight: '100%'});
    } else {
        document.querySelector('.faq__items-wrapper').classList.add('faq-item--closed');
        let faq2Tl = gsap.timeline();
        faq2Tl.to(document.querySelector('.faq__items-wrapper'), {opacity: 0, visibility: 'hidden', maxHeight: '0px'});
    }

    scroll.init();
})