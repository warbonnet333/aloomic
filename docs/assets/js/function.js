window.onload = function () {
    const navBar = document.querySelector(".navigation-bar");
    const footerSection = document.querySelector("footer");
    navBar && navBar.classList.add('show');

    window.onscroll = function () {
        if (navBar) {
            const {top: topNav} = navBar.getBoundingClientRect();
            const {top: topFooter} = footerSection.getBoundingClientRect();
            topFooter <= topNav
                ? navBar.classList.remove('show')
                : navBar.classList.add('show');
        }
    }
}

jQuery(function () {
    var $hamburger = jQuery(".hamburger");
    var $body = jQuery("body");
    $hamburger.on("click", function (e) {

        $hamburger.toggleClass("is-active");
        $body.toggleClass('overflow-hidden')
        // Do something else, like open/close menu
    });

    window.dispatchEvent(new Event('resize'));

    jQuery(".nav-item").hover(function () {
        if (jQuery(document).width() <= 768) {
            jQuery(".menu-thumb").addClass("hidden")
        } else if (jQuery(document).width() <= 1080) {
            jQuery(".menu-thumb").addClass("hidden")
            jQuery(this).find(".menu-thumb").removeClass("hidden")
            if (jQuery(this).index() >= 3) {
                jQuery(this).find(".menu-thumb").css('top', 70 + 70 * (jQuery(this).index() - 3));
                if (jQuery(this).index() >= jQuery('#main-menu .nav-item').length - 3) {
                    jQuery(this).find(".menu-thumb").css('top', 70 * (jQuery('#main-menu .nav-item').length - 3) - 132);
                }
            }
        } else {

            jQuery(".menu-thumb").addClass("hidden")
            jQuery(this).find(".menu-thumb").removeClass("hidden")
            if (jQuery(this).index() >= 2) {
                jQuery(this).find(".menu-thumb").css('top', 88 + 100 * (jQuery(this).index() - 2));
                if (jQuery(this).index() >= jQuery('#main-menu .nav-item').length - 1) {
                    jQuery(this).find(".menu-thumb").css('top', 88 + 100 * (jQuery(this).index() - 3));
                }
            }
        }
    })

    // Control nave menu
    jQuery(".menu-button").click(function () {
        jQuery(".nav-menu").toggleClass("menu-open")
        jQuery("header").toggleClass("fix")
    })
    jQuery(".client-explain").click(function () {
        jQuery(".client-explain:last-child").removeClass("hidden")
        jQuery(this).addClass("hidden")
        jQuery(".our-clients-pre").css("margin-bottom", 0)
        jQuery("#clients-explain").removeClass('hidden')//css("height", "auto")
    })
    jQuery(".client-explain:last-child").click(function () {
        jQuery(".client-explain").removeClass("hidden")
        jQuery(this).addClass("hidden")
        jQuery(".our-clients-pre").css("margin-bottom", 100)
        jQuery("#clients-explain").addClass('hidden')//css("height", 0)
    })

    jQuery('#checkbox').change(function () {
        setInterval(function () {
            moveRight();
        }, 3000);
    });

    jQuery('#we-do-menu').on('click', function () {
        jQuery('#main-menu').addClass('hidden');
        jQuery('#we-do-submenu').addClass('hidden').removeClass('hidden');
    });
    /*jQuery('.back-to-mainmenu').on('click', function () {
        jQuery('#main-menu').addClass('hidden').removeClass('hidden');
        jQuery('#we-do-submenu').addClass('hidden');
    });*/
    
    var ypos = window.pageYOffset || document.documentElement.scrollTop;
    var maxYvalue = jQuery(document).height() - jQuery(window).height();
    var percent = parseInt(ypos * 100 / maxYvalue);

    if(percent){jQuery('#scroll_value').text(percent + "%")};
    // for scrolling beginning
    window.onscroll = function (e) {
        jQuery('.circle-mark path').css("opacity", 0);
        jQuery('#scroll_value').css("opacity", 0);
        // called when the window is scrolled.
        var ypos = window.pageYOffset || document.documentElement.scrollTop;
        var maxYvalue = jQuery(document).height() - jQuery(window).height();
        var percent = parseInt(ypos * 100 / maxYvalue);
        jQuery('#scroll_value').text(percent + "%");
    }
});

// for scrolling stop

jQuery(window).scroll(function () {
    clearTimeout(jQuery.data(this, 'scrollTimer'));
    jQuery.data(this, 'scrollTimer', setTimeout(function () {
        // do something
        jQuery('.circle-mark path').animate({ opacity: '1' });
        jQuery('#scroll_value').animate({ opacity: "1" });
    }, 250));

    jQuery('.btn-to-buttom').css('opacity', '0');
    jQuery('.btn-to-buttom').css('visibility', 'hidden');
    jQuery('.btn-to-buttom').css('transform', 'translateX(100%)');
    jQuery('header').addClass('header--scroll')

    clearTimeout( jQuery.data( this, "scrollCheck" ) );
    jQuery.data( this, "scrollCheck", setTimeout(function() {
        if ( jQuery(window).scrollTop() > 300 && jQuery(document).height() - jQuery(window).scrollTop() - jQuery(window).height() > 300  ) {
            jQuery('.btn-to-buttom').css('opacity', '1');
            jQuery('.btn-to-buttom').css('visibility', 'visible');
            jQuery('.btn-to-buttom').css('transform', 'translateX(0)');
        }

        jQuery('header').removeClass('header--scroll');
        
    }, 250) );

    // if ( jQuery(window).scrollTop() > 300 && jQuery(document).height() - jQuery(window).scrollTop() - jQuery(window).height() > 300  ) {
    //     jQuery('.btn-to-buttom').css('opacity', '1');
    //     jQuery('.btn-to-buttom').css('visibility', 'visible');
    // } else {
    //     jQuery('.btn-to-buttom').css('opacity', '0');
    //     jQuery('.btn-to-buttom').css('visibility', 'hidden');
    // }
});
let isHomePage = false;
if (document.querySelector(".vid")) {
    isHomePage = true;
    var vid = document.querySelector(".vid");
    
    jQuery(vid).prop('muted', true);
    setTimeout(function(){
        vid.play();
    }, 2000);
}

function playPause() {
    var vid = document.getElementById("vid");
    if (vid.paused == true) {
        vid.play();
        jQuery('.play-button img').attr('src', './assets/img/pause-icon.svg');
    } else {
        vid.pause();
        jQuery('.play-button img').attr('src', './assets/img/play-icon.svg');
    }
}
//
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

gsap.registerPlugin(ScrollTrigger);

jQuery('#we-do-page #we-do-submenu a').click(function(e) {
    e.preventDefault();

    var $hamburger = jQuery(".hamburger");
    var $body = jQuery("body");
    
    $hamburger.toggleClass("is-active");
    $body.toggleClass('overflow-hidden');
    jQuery(".nav-menu").removeClass("menu-open")
    jQuery("header").removeClass("fix")

    var href = jQuery(this).attr("href");
//     jQuery('html, body').animate({
//         scrollTop: jQuery(href).offset().top
//     }, 500);
    window.location.hash = href

});

if (window.location.hash) {
    const scrollTo = window.location.hash

    window.location.hash = '';
    jQuery(window).scroll((e) => {
        e.preventDefault();
    });
    setTimeout(() => {
        window.location.hash = scrollTo

//         jQuery('html, body').animate({
//             scrollTop: jQuery(scrollTo).offset().top
//         }, 500);
    }, 1000)
}

// ADVANTAGES TABS
class Tabs {
    constructor () {
        this.inProcess = false;
        this.activeAdvTab = jQuery('.advantages-tabs__item--active');
        this.advActiveLine = jQuery('.advantages-tabs__line-active');
    }

    setActiveLinePosition = (tabToActivate = this.activeAdvTab) => {
        this.advActiveLine.css('width', jQuery(tabToActivate).width());
        const leftOffset = jQuery(tabToActivate).position().left;
        this.advActiveLine.css('transform', `translateX(${leftOffset}px)`); 
    }

    setActiveClassToSelectedTab = tabToActivate => {
        jQuery('.advantages-tabs__item--active').removeClass('advantages-tabs__item--active');
        jQuery(tabToActivate).addClass('advantages-tabs__item--active');
    }

    disableTabContent = () => {
        jQuery('.advantages__content-item--active').fadeOut();
        jQuery('.advantages__content-item--active').removeClass('advantages__content-item--active');
    }

    showNewTabContent = tabContentToActivate => {
        jQuery(tabContentToActivate).fadeIn();
        jQuery(tabContentToActivate).addClass('advantages__content-item--active');
        // Set wrapper height after tab content changed
        jQuery('.advantages__content-inner').height(jQuery(tabContentToActivate).height())
        this.inProcess = false
    }

    tabActivate = tabToActivate => {
        if (!this.inProcess) {
            this.inProcess = true
    
            const tabIdPartToActivate = jQuery(tabToActivate).prop('hash');
            
            // Set active class to current tab
            this.setActiveClassToSelectedTab(tabToActivate)
    
            // Set init active line position
            this.setActiveLinePosition(tabToActivate)
    
            // Tab content class add/remove
            // tab content hide/show
            this.disableTabContent()
    
            const tabContentToActivate = document.getElementById(`advantage-${tabIdPartToActivate.substr(1)}`)
    
            setTimeout(() => this.showNewTabContent(tabContentToActivate), 500);
        }
    }
}

jQuery(document).ready(function() {
    const tabs = new Tabs();
    
    // Set init active line position
    if(document.querySelector('.advantages-tabs__item--active')) tabs.setActiveLinePosition();

    // On tab click
    jQuery('.advantages-tabs__item').click(function() {tabs.tabActivate(this)});

    // Click on arrows
    jQuery('.advantages-tabs__arrow--left').click(function() {
        // Check current tab number
        const allTabs = document.querySelectorAll('.advantages-tabs__item'),
            tabsCount = allTabs.length
        let currentTabIndex = 1

        allTabs.forEach((tab, key) => {
            if (tab.classList.contains('advantages-tabs__item--active')) currentTabIndex = key + 1
        });
        
        // if tab is first - move to last
        if (currentTabIndex == 1) tabs.tabActivate(allTabs[tabsCount - 1])
        // else - move to next
        else tabs.tabActivate(allTabs[currentTabIndex - 2])
    })

    jQuery('.our-thoughts__content-item').show();

    const ourContentTabs = document.querySelectorAll('.our-thoughts__content-item');

    let ourTabsMaxH = 0;
    
    jQuery(ourContentTabs).map((key,tab) => {
        jQuery(tab).height() > ourTabsMaxH && (ourTabsMaxH = jQuery(tab).height())
    });

    jQuery('.our-thoughts__content-item').hide();
    jQuery('.our-thoughts__content-item.advantages__content-item--active').show();

    if (jQuery( window ).width() > 767) jQuery('.our-thoughts__tabs-content-inner').css('min-height', `${ourTabsMaxH}px`);
    
    jQuery('.advantages-tabs__arrow--right').click(function() {
        // Check current tab number
        const allTabs = document.querySelectorAll('.advantages-tabs__item'),
            tabsCount = allTabs.length
        let currentTabIndex = 1

        allTabs.forEach((tab, key) => {
            if (tab.classList.contains('advantages-tabs__item--active')) currentTabIndex = key + 1
        });
        
        // if tab is first - move to last
        if (currentTabIndex == tabsCount) tabs.tabActivate(allTabs[0])
        // else - move to next
        else tabs.tabActivate(allTabs[currentTabIndex])
    })

    // Why us tabs
    jQuery('.why-us__title-item').click(e => {
        if (!e.target.closest('.why-us__title-item').classList.contains('why-us__title-item--active')) {
            // Tab title activate
            jQuery('.why-us__title-item--active').removeClass('why-us__title-item--active');
            jQuery(e.target).addClass('why-us__title-item--active');

            const hash = jQuery(e.target).prop('hash').substr(1);
            
            jQuery('.why-us__content-item').hide();
            jQuery(`#why-us-${hash}`).show();
        }
    })
    // End why us tabs

    // Principles slider
    jQuery('.principles__tab-btn').click((e) => {
        const clickedLink = e.target.closest('.principles__tab-btn'),
            toSlide = clickedLink.dataset.key;
        
        const xOffseet = toSlide * 100,
            xMargin = toSlide * 30;

        // Activate tab
        jQuery('.principles__tab-btn--active').removeClass('principles__tab-btn--active');
        jQuery(clickedLink).addClass('principles__tab-btn--active');

        // Transfrom slide
        jQuery('.principles__slides-inner').css('transform', `translateX(calc(-${xOffseet}% - ${xMargin}px))`);
    })
    // End Principles slider

    // FAQ
    jQuery('.faq-item__heading').click(e => {
        if ( e.target.closest('.faq-item__heading') ) jQuery(e.target.closest('.faq-item__heading')).next().slideToggle();
    })
    // End FAQ

    // Video
    // jQuery('#vid').prop('muted', true);
    // jQuery('#vid').trigger('play');

    let playClicked = false;

    jQuery('.visible-video').click(() => {
        if( jQuery('#vid').prop('muted') ) {
            !playClicked && (jQuery('#vid').get(0).currentTime = 0);
            playClicked = true;
            jQuery('#vid').trigger('play');
            jQuery('#vid').prop('muted', false);
            jQuery('.visible-video').addClass('play');
        } else {
            jQuery('#vid').prop('muted', true);
            jQuery('#vid').trigger('pause');
            jQuery('.visible-video').removeClass('play');
        }
    });

    jQuery('.visible-video').mousemove(() => {
        jQuery('.visible-video').addClass('mouse-move');
        setTimeout(() => {
            jQuery('.visible-video').removeClass('mouse-move');
        }, 1000);
    });
    // End video

    // Parts slider
    const sliderWrapper = jQuery('.parts__slider-items-wr'),
        sliderWrapperWidth = jQuery(sliderWrapper).width(),
        arrowPrev = jQuery('.parts__arrow--left'),
        arrowNext = jQuery('.parts__arrow--right'),
        sliderInner = jQuery('.parts__slider-items-inner'),
        slidesCount = document.querySelectorAll('.parts__slider-item').length;

    let activeSlideNumber = jQuery('.parts__slider-item--active').data('slide');

    let slideWIdth;

    // Set slides width
    if (jQuery( window ).width() > 660) {
        slideWidth = sliderWrapperWidth/2;

        jQuery('.parts__slider-item').css({
            'width':`${slideWidth}px`,
            'min-width':`${slideWidth}px`
        });

        const minSlH = jQuery('.parts__slider-items-wr').height();
    // console.log("🚀 ~ file: function.js ~ line 353 ~ $ ~ minSlH", minSlH)
        jQuery('.parts__slider-items-wr').css('min-height', `${minSlH}px`)
        jQuery('.parts__slider-wr').css('min-height', `${minSlH}px`);
    } else {
        slideWidth = sliderWrapperWidth;

        jQuery('.parts__slider-item').css({
            'width':`${slideWidth}px`,
            'min-width':`${slideWidth}px`
        });

        const minSlH = jQuery('.parts__slider-items-wr').height();
    // console.log("🚀 ~ file: function.js ~ line 353 ~ $ ~ minSlH", minSlH)
        // jQuery('.parts__slider-wr').css('min-height', `${minSlH}px`);
    }


    // Set slider height
    const activeSlideHeight = jQuery('.parts__slider-item--active').height();
    jQuery('.parts__slider-inner').css('height', `${activeSlideHeight}px`);

    if (isHomePage) {
        jQuery('.parts__slider-inner').onSwipe(function(results){

            if(results.right == true) toPrev()

            if(results.left == true) toNext()

        });
    }

    jQuery(arrowNext).click(() => {
        toNext()
    });

    jQuery(arrowPrev).click(() => {
        toPrev()
    });
    // End Parts slider

    const toNext = () => {
        const currentSlide = jQuery('.parts__slider-item--active');

        if (slidesCount !== activeSlideNumber + 1) {
            // Go to next slide
            const innerOffsetX = slideWidth * (activeSlideNumber + 1);

            // Slide toggle
            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(currentSlide).next().addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${innerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${activeSlideNumber + 1}`).addClass('parts__content-item--active');

            // Set new active slide number
            activeSlideNumber++;
        } else {
            // Go to first slide
            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(document.querySelector('.parts__slider-item')).addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(0)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-0`).addClass('parts__content-item--active');

            activeSlideNumber = 0;
        }
    }

    const toPrev = () => {
        const currentSlide = jQuery('.parts__slider-item--active');

        if (activeSlideNumber !== 0) {
            // Go to prev slide
            const innerOffsetX = slideWidth * (activeSlideNumber - 1);

            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(currentSlide).prev().addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${innerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${activeSlideNumber - 1}`).addClass('parts__content-item--active');

            // Set new active slide number
            activeSlideNumber--;
        } else {
            // Go to last slide
            const lastInnerOffsetX = slideWidth * (slidesCount - 1)

            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery('.parts__slider-item:last-child').addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${lastInnerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${slidesCount - 1}`).addClass('parts__content-item--active');

            activeSlideNumber = slidesCount - 1;
        }
    }

    jQuery('a[href^="#"]').on('click', function(event) {

        var target = jQuery(this.getAttribute('href'));

        if (target.length) {
          event.preventDefault();
          jQuery('html, body').stop().animate({
            scrollTop: target.offset().top+100
          }, 1000);
        }
    });

    // Image auto change
    const parentAutoChangeImgs = document.querySelectorAll('.img-autochange-parent');

    jQuery(parentAutoChangeImgs).map((key, el) => {
        const childrens = jQuery(el).find('.img-autochange'),
            firstChild = jQuery(childrens[0]);

        window.setInterval(function(){
            const currentImg = jQuery(el).find('.img-autochange--active');
            currentImg.removeClass('img-autochange--active');
            if (currentImg.next('.img-autochange').length > 0) currentImg.next().addClass('img-autochange--active');
            else jQuery(firstChild).addClass('img-autochange--active')
        },1000);
    })

    jQuery(window).resize(function() {
        const tabs = new Tabs();

    // Set init active line position
    if(document.querySelector('.advantages-tabs__item--active')) tabs.setActiveLinePosition();

    // On tab click
    jQuery('.advantages-tabs__item').click(function() {tabs.tabActivate(this)});

    // Click on arrows
    jQuery('.advantages-tabs__arrow--left').click(function() {
        // Check current tab number
        const allTabs = document.querySelectorAll('.advantages-tabs__item'),
            tabsCount = allTabs.length
        let currentTabIndex = 1

        allTabs.forEach((tab, key) => {
            if (tab.classList.contains('advantages-tabs__item--active')) currentTabIndex = key + 1
        });

        // if tab is first - move to last
        if (currentTabIndex == 1) tabs.tabActivate(allTabs[tabsCount - 1])
        // else - move to next
        else tabs.tabActivate(allTabs[currentTabIndex - 2])
    })

    jQuery('.our-thoughts__content-item').show();

    const ourContentTabs = document.querySelectorAll('.our-thoughts__content-item');

    let ourTabsMaxH = 0;

    jQuery(ourContentTabs).map((key,tab) => {
        jQuery(tab).height() > ourTabsMaxH && (ourTabsMaxH = jQuery(tab).height())
    });

    jQuery('.our-thoughts__content-item').hide();
    jQuery('.our-thoughts__content-item.advantages__content-item--active').show();

    if (jQuery( window ).width() > 767) jQuery('.our-thoughts__tabs-content-inner').css('min-height', `${ourTabsMaxH}px`);

    jQuery('.advantages-tabs__arrow--right').click(function() {
        // Check current tab number
        const allTabs = document.querySelectorAll('.advantages-tabs__item'),
            tabsCount = allTabs.length
        let currentTabIndex = 1

        allTabs.forEach((tab, key) => {
            if (tab.classList.contains('advantages-tabs__item--active')) currentTabIndex = key + 1
        });

        // if tab is first - move to last
        if (currentTabIndex == tabsCount) tabs.tabActivate(allTabs[0])
        // else - move to next
        else tabs.tabActivate(allTabs[currentTabIndex])
    })

    // Why us tabs
    jQuery('.why-us__title-item').click(e => {
        if (!e.target.closest('.why-us__title-item').classList.contains('why-us__title-item--active')) {
            // Tab title activate
            jQuery('.why-us__title-item--active').removeClass('why-us__title-item--active');
            jQuery(e.target).addClass('why-us__title-item--active');

            const hash = jQuery(e.target).prop('hash').substr(1);

            jQuery('.why-us__content-item').hide();
            jQuery(`#why-us-${hash}`).show();
        }
    })
    // End why us tabs

    // Principles slider
    jQuery('.principles__tab-btn').click((e) => {
        const clickedLink = e.target.closest('.principles__tab-btn'),
            toSlide = clickedLink.dataset.key;

        const xOffseet = toSlide * 100,
            xMargin = toSlide * 30;

        // Activate tab
        jQuery('.principles__tab-btn--active').removeClass('principles__tab-btn--active');
        jQuery(clickedLink).addClass('principles__tab-btn--active');

        // Transfrom slide
        jQuery('.principles__slides-inner').css('transform', `translateX(calc(-${xOffseet}% - ${xMargin}px))`);
    })
    // End Principles slider

    // FAQ
    jQuery('.faq-item__heading').click(e => {
        if ( e.target.closest('.faq-item__heading') ) jQuery(e.target.closest('.faq-item__heading')).next().slideToggle();
    })
    // End FAQ

    // Video
    // jQuery('#vid').prop('muted', true);
    // jQuery('#vid').trigger('play');

    // let playClicked = false;

    // jQuery('.visible-video').click(() => {
    //     if( jQuery('#vid').prop('muted') ) {
    //         !playClicked && (jQuery('#vid').get(0).currentTime = 0);
    //         playClicked = true;
    //         jQuery('#vid').trigger('play');
    //         jQuery('#vid').prop('muted', false);
    //         jQuery('.visible-video').addClass('play');
    //     } else {
    //         jQuery('#vid').prop('muted', true);
    //         jQuery('#vid').trigger('pause');
    //         jQuery('.visible-video').removeClass('play');
    //     }
    // });

    jQuery('.visible-video').mousemove(() => {
        jQuery('.visible-video').addClass('mouse-move');
        setTimeout(() => {
            jQuery('.visible-video').removeClass('mouse-move');
        }, 1000);
    });
    // End video

    // Parts slider
    const sliderWrapper = jQuery('.parts__slider-items-wr'),
        sliderWrapperWidth = jQuery(sliderWrapper).width(),
        arrowPrev = jQuery('.parts__arrow--left'),
        arrowNext = jQuery('.parts__arrow--right'),
        sliderInner = jQuery('.parts__slider-items-inner'),
        slidesCount = document.querySelectorAll('.parts__slider-item').length;

    let activeSlideNumber = jQuery('.parts__slider-item--active').data('slide');

    let slideWIdth;
    
    // Set slides width
    if (jQuery( window ).width() > 660) {
        slideWidth = sliderWrapperWidth/2;

        jQuery('.parts__slider-item').css({
            'width':`${slideWidth}px`,
            'min-width':`${slideWidth}px`
        });

        const minSlH = jQuery('.parts__slider-items-wr').height();
    // console.log("🚀 ~ file: function.js ~ line 353 ~ $ ~ minSlH", minSlH)
        jQuery('.parts__slider-items-wr').css('min-height', `${minSlH}px`)
        jQuery('.parts__slider-wr').css('min-height', `${minSlH}px`);
    } else {
        slideWidth = sliderWrapperWidth;

        jQuery('.parts__slider-item').css({
            'width':`${slideWidth}px`,
            'min-width':`${slideWidth}px`
        });

        const minSlH = jQuery('.parts__slider-items-wr').height();
    // console.log("🚀 ~ file: function.js ~ line 353 ~ $ ~ minSlH", minSlH)
        // jQuery('.parts__slider-wr').css('min-height', `${minSlH}px`);
    }


    // Set slider height
    const activeSlideHeight = jQuery('.parts__slider-item--active').height();
    jQuery('.parts__slider-inner').css('height', `${activeSlideHeight}px`);

    jQuery('.parts__slider-inner').onSwipe(function(results){
      
        if(results.right == true) toPrev()
      
        if(results.left == true) toNext()
      
    });

    jQuery(arrowNext).click(() => {
        toNext()
    });

    jQuery(arrowPrev).click(() => {
        toPrev()
    });
    // End Parts slider

    const toNext = () => {
        const currentSlide = jQuery('.parts__slider-item--active');

        if (slidesCount !== activeSlideNumber + 1) {
            // Go to next slide
            const innerOffsetX = slideWidth * (activeSlideNumber + 1);

            // Slide toggle
            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(currentSlide).next().addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${innerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${activeSlideNumber + 1}`).addClass('parts__content-item--active');

            // Set new active slide number
            activeSlideNumber++;
        } else {
            // Go to first slide
            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(document.querySelector('.parts__slider-item')).addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(0)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-0`).addClass('parts__content-item--active');

            activeSlideNumber = 0;
        }
    }

    const toPrev = () => {
        const currentSlide = jQuery('.parts__slider-item--active');

        if (activeSlideNumber !== 0) {
            // Go to prev slide
            const innerOffsetX = slideWidth * (activeSlideNumber - 1);

            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery(currentSlide).prev().addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${innerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${activeSlideNumber - 1}`).addClass('parts__content-item--active');

            // Set new active slide number
            activeSlideNumber--;
        } else {
            // Go to last slide
            const lastInnerOffsetX = slideWidth * (slidesCount - 1)

            jQuery(currentSlide).removeClass('parts__slider-item--active');
            jQuery('.parts__slider-item:last-child').addClass('parts__slider-item--active');
            jQuery(sliderInner).css('transform', `translateX(-${lastInnerOffsetX}px)`);

            // Content toggle
            jQuery('.parts__content-item--active').removeClass('parts__content-item--active');
            jQuery(`#part-${slidesCount - 1}`).addClass('parts__content-item--active');

            activeSlideNumber = slidesCount - 1;
        }
    }

    jQuery('a[href^="#"]').on('click', function(event) {

        var target = jQuery(this.getAttribute('href'));
      
        if (target.length) {
          event.preventDefault();
          jQuery('html, body').stop().animate({
            scrollTop: target.offset().top+100
          }, 1000);
        }
    });

    // Image auto change
    // const parentAutoChangeImgs = document.querySelectorAll('.img-autochange-parent');

    // jQuery(parentAutoChangeImgs).map((key, el) => {
    //     const childrens = jQuery(el).find('.img-autochange'),
    //         firstChild = jQuery(childrens[0]);

    //     window.setInterval(function(){
    //         const currentImg = jQuery(el).find('.img-autochange--active');
    //         currentImg.removeClass('img-autochange--active');
    //         if (currentImg.next('.img-autochange').length > 0) currentImg.next().addClass('img-autochange--active');
    //         else jQuery(firstChild).addClass('img-autochange--active')
    //     },1000);
    // })
    })
});
// END ADVANTAGES TABS

if (location.hash) {
    (e) => {
        e.preventDefault()
    }
}