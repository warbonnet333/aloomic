function showOthers() {
    document.getElementById('weDoOther').classList.add('active'),
        document.getElementById('showOthers').classList.add('active');
}

function faqShowMore() {
    document.getElementById('faq-section').classList.toggle('active');
    document.getElementById('footer-section').classList.toggle('active');
}

function toggleMute() {
    var video = document.getElementById('myVideo');

    document.getElementById('video-control').classList.toggle('active');
    video.muted = !video.muted;
}

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

// cursor function
window.onload = function () {

    const navBar = document.querySelector(".navigation-bar");
    navBar.classList.add('show');

    const { gsap, CircleType } = window;
    const cursorWrapper = document.querySelector(".cursor");

    if(!cursorWrapper || window.innerWidth <= 768) return;

    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");
    const cursorTextContainerEl = document.querySelector(".cursor--text");
    const cursorTextEl = cursorTextContainerEl.querySelector(".text");

    const hoverItems = document.querySelectorAll(".with-custom-scroll");
    const hoverEffectDuration = 0.3;
    let isHovered = false;
    let initialCursorHeight;

    const cursorRotationDuration = 8;

    let circleType = new CircleType(cursorTextEl);
    circleType.radius(50);

    setTimeout(() => {
            initialCursorHeight = circleType.container.style.getPropertyValue("height");
        console.log(initialCursorHeight);
    }, 150);

    hoverItems.forEach((item) => {
        item.addEventListener("pointerenter", () => {
            cursorWrapper.style.opacity = 1;
        });
        item.addEventListener("pointerleave", () => {
            cursorWrapper.style.opacity = 0;
        });
        item.addEventListener("pointerenter", handlePointerEnter);
        item.addEventListener("pointerleave", handlePointerLeave);
    });

    let mouse = {
        x: -100,
        y: -100
    };

    document.body.addEventListener("pointermove", updateCursorPosition);

    function updateCursorPosition(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }

    function updateCursor() {
        gsap.set([cursorInner, cursorTextContainerEl], {
            x: mouse.x,
            y: mouse.y
        });

        gsap.to(cursorOuter, {
            duration: 0.15,
            x: mouse.x,
            y: mouse.y
        });

        if (!isHovered) {
            gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
                opacity: 0
            });
            gsap.set(cursorTextContainerEl, {
                rotate: 0
            });
        }

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    function handlePointerEnter(e) {
        isHovered = true;

        const target = e.currentTarget;
        updateCursorText(target);

        gsap.set([cursorTextContainerEl, cursorTextEl], {
            height: initialCursorHeight,
            width: initialCursorHeight
        });

        gsap.fromTo(
            cursorTextContainerEl,
            {
                rotate: 0
            },
            {
                duration: cursorRotationDuration,
                rotate: 360,
                ease: "none",
                repeat: -1
            }
        );

        gsap.to(cursorInner, hoverEffectDuration, {
            scale: 2
        });

        gsap.fromTo(
            cursorTextContainerEl,
            hoverEffectDuration,
            {
                scale: 1.2,
                opacity: 0
            },
            {
                delay: hoverEffectDuration * 0.75,
                scale: 1,
                opacity: 1
            }
        );
        gsap.to(cursorOuter, hoverEffectDuration, {
            scale: 1.2,
            opacity: 0
        });
    }

    function handlePointerLeave() {
        isHovered = false;
        gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
            scale: 1,
            opacity: 1
        });
    }

    function updateCursorText(textEl) {
        const cursorTextRepeatTimes = textEl.getAttribute("data-cursor-text-repeat");
        const cursorText = returnMultipleString(
            textEl.getAttribute("data-cursor-text"),
            cursorTextRepeatTimes
        );

        circleType.destroy();

        cursorTextEl.innerHTML = cursorText;
        circleType = new CircleType(cursorTextEl);
    }

    function returnMultipleString(string, count) {
        let s = "";
        for (let i = 0; i < count; i++) {
            s += ` ${string} `;
        }
        return s;
    }
}

// cursor function END

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
    jQuery('.back-to-mainmenu').on('click', function () {
        jQuery('#main-menu').addClass('hidden').removeClass('hidden');
        jQuery('#we-do-submenu').addClass('hidden');
    });

    var ypos = window.pageYOffset || document.documentElement.scrollTop;
    var maxYvalue = jQuery(document).height() - jQuery(window).height();
    var percent = parseInt(ypos * 100 / maxYvalue);

    if (percent) {
        jQuery('#scroll_value').text(percent + "%")
    }
    ;
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
const scrollTo = window.location.hash
if (window.location.hash) {
    window.location.hash = '';
    jQuery(window).scroll((e) => {
        e.preventDefault();
    });
    setTimeout(() => {
        // window.location.hash = scrollTo
    }, 3000)
}

jQuery(window).scroll(function () {
    clearTimeout(jQuery.data(this, 'scrollTimer'));
    jQuery.data(this, 'scrollTimer', setTimeout(function () {
        // do something
        jQuery('.circle-mark path').animate({opacity: '1'});
        jQuery('#scroll_value').animate({opacity: "1"});
    }, 250));

    jQuery('.btn-to-buttom').css('opacity', '0');
    jQuery('.btn-to-buttom').css('visibility', 'hidden');
    jQuery('.btn-to-buttom').css('transform', 'translateX(100%)');
    jQuery('header').addClass('header--scroll')

    clearTimeout(jQuery.data(this, "scrollCheck"));
    jQuery.data(this, "scrollCheck", setTimeout(function () {
        if (jQuery(window).scrollTop() > 300 && jQuery(document).height() - jQuery(window).scrollTop() - jQuery(window).height() > 300) {
            jQuery('.btn-to-buttom').css('opacity', '1');
            jQuery('.btn-to-buttom').css('visibility', 'visible');
            jQuery('.btn-to-buttom').css('transform', 'translateX(0)');
        }

        jQuery('header').removeClass('header--scroll');

    }, 250));

});
let isHomePage = false;
if (document.getElementById("vid")) {
    isHomePage = true;
    var vid = document.getElementById("vid");

    jQuery(vid).prop('muted', true);
    setTimeout(function () {
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

// gsap.registerPlugin(ScrollTrigger);

// jQuery('#we-do-page #we-do-submenu a').click(function(e) {
//     e.preventDefault();
//     var $hamburger = jQuery(".hamburger");
//     var $body = jQuery("body");
//
//     $hamburger.toggleClass("is-active");
//     $body.toggleClass('overflow-hidden');
//     jQuery(".nav-menu").removeClass("menu-open")
//     jQuery("header").removeClass("fix")
//
//     var href = jQuery(this).attr("href");
//     // window.location.hash = href
//     console.log('href', href);
// });

/*! For license information please see home.js.LICENSE.txt */
!(function (b) {
    var c = {};

    function a(d) {
        if (c[d]) return c[d].exports;
        var e = (c[d] = {i: d, l: !1, exports: {}});
        return b[d].call(e.exports, e, e.exports, a), (e.l = !0), e.exports;
    }

    (a.m = b),
        (a.c = c),
        (a.d = function (b, c, d) {
            a.o(b, c) || Object.defineProperty(b, c, {enumerable: !0, get: d});
        }),
        (a.r = function (a) {
            'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(a, Symbol.toStringTag, {value: 'Module'}),
                Object.defineProperty(a, '__esModule', {value: !0});
        }),
        (a.t = function (b, c) {
            if (
                (1 & c && (b = a(b)),
                8 & c || (4 & c && 'object' == typeof b && b && b.__esModule))
            )
                return b;
            var d = Object.create(null);
            if (
                (a.r(d),
                    Object.defineProperty(d, 'default', {enumerable: !0, value: b}),
                2 & c && 'string' != typeof b)
            )
                for (var e in b)
                    a.d(
                        d,
                        e,
                        function (a) {
                            return b[a];
                        }.bind(null, e)
                    );
            return d;
        }),
        (a.n = function (c) {
            var b =
                c && c.__esModule
                    ? function () {
                        return c.default;
                    }
                    : function () {
                        return c;
                    };
            return a.d(b, 'a', b), b;
        }),
        (a.o = function (a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
        }),
        (a.p = ''),
        a((a.s = 4));
})([
    function (b, c, a) {
        'use strict';
        (function (b) {
            function j(a, b) {
                if (!(a instanceof b))
                    throw new TypeError('Cannot call a class as a function');
            }

            function k(d, c) {
                for (var b = 0; b < c.length; b++) {
                    var a = c[b];
                    (a.enumerable = a.enumerable || !1),
                        (a.configurable = !0),
                    'value' in a && (a.writable = !0),
                        Object.defineProperty(d, a.key, a);
                }
            }

            function l(a, b, c) {
                return b && k(a.prototype, b), c && k(a, c), a;
            }

            function m(a, b, c) {
                return (
                    b in a
                        ? Object.defineProperty(a, b, {
                            value: c,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                        })
                        : (a[b] = c),
                        a
                );
            }

            function n(c, d) {
                var a = Object.keys(c);
                if (Object.getOwnPropertySymbols) {
                    var b = Object.getOwnPropertySymbols(c);
                    d &&
                    (b = b.filter(function (a) {
                        return Object.getOwnPropertyDescriptor(c, a).enumerable;
                    })),
                        a.push.apply(a, b);
                }
                return a;
            }

            function o(c) {
                for (var a = 1; a < arguments.length; a++) {
                    var b = null != arguments[a] ? arguments[a] : {};
                    a % 2
                        ? n(Object(b), !0).forEach(function (a) {
                            m(c, a, b[a]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(b))
                            : n(Object(b)).forEach(function (a) {
                                Object.defineProperty(
                                    c,
                                    a,
                                    Object.getOwnPropertyDescriptor(b, a)
                                );
                            });
                }
                return c;
            }

            function p(b, a) {
                if ('function' != typeof a && null !== a)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    );
                (b.prototype = Object.create(a && a.prototype, {
                    constructor: {value: b, writable: !0, configurable: !0},
                })),
                a && r(b, a);
            }

            function q(a) {
                return (q = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function (a) {
                        return a.__proto__ || Object.getPrototypeOf(a);
                    })(a);
            }

            function r(a, b) {
                return (r =
                    Object.setPrototypeOf ||
                    function (a, b) {
                        return (a.__proto__ = b), a;
                    })(a, b);
            }

            function s(a) {
                if (void 0 === a)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                    );
                return a;
            }

            function t(a) {
                var b = (function () {
                    if (
                        'undefined' == typeof Reflect ||
                        !Reflect.construct ||
                        Reflect.construct.sham
                    )
                        return !1;
                    if ('function' == typeof Proxy) return !0;
                    try {
                        return (
                            Date.prototype.toString.call(
                                Reflect.construct(Date, [], function () {
                                })
                            ),
                                !0
                        );
                    } catch (a) {
                        return !1;
                    }
                })();
                return function () {
                    var e,
                        c,
                        d,
                        f = q(a);
                    if (b) {
                        var g = q(this).constructor;
                        d = Reflect.construct(f, arguments, g);
                    } else d = f.apply(this, arguments);
                    return (
                        (e = this),
                            (c = d) && ('object' == typeof c || 'function' == typeof c)
                                ? c
                                : s(e)
                    );
                };
            }

            function u(a, b, c) {
                return (u =
                    'undefined' != typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function (d, b, e) {
                            var c = (function (a, b) {
                                for (
                                    ;
                                    !Object.prototype.hasOwnProperty.call(a, b) &&
                                    null !== (a = q(a));
                                ) ;
                                return a;
                            })(d, b);
                            if (c) {
                                var a = Object.getOwnPropertyDescriptor(c, b);
                                return a.get ? a.get.call(e) : a.value;
                            }
                        })(a, b, c || a);
            }

            function v(a, b) {
                return (
                    (function (a) {
                        if (Array.isArray(a)) return a;
                    })(a) ||
                    (function (d, e) {
                        if ('undefined' != typeof Symbol && Symbol.iterator in Object(d)) {
                            var a = [],
                                b = !0,
                                f = !1,
                                g = void 0;
                            try {
                                for (
                                    var h, c = d[Symbol.iterator]();
                                    !(b = (h = c.next()).done) &&
                                    (a.push(h.value), !e || a.length !== e);
                                    b = !0
                                ) ;
                            } catch (i) {
                                (f = !0), (g = i);
                            } finally {
                                try {
                                    b || null == c.return || c.return();
                                } finally {
                                    if (f) throw g;
                                }
                            }
                            return a;
                        }
                    })(a, b) ||
                    w(a, b) ||
                    (function () {
                        throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                        );
                    })()
                );
            }

            function w(a, c) {
                if (a) {
                    if ('string' == typeof a) return x(a, c);
                    var b = Object.prototype.toString.call(a).slice(8, -1);
                    return (
                        'Object' === b && a.constructor && (b = a.constructor.name),
                            'Map' === b || 'Set' === b
                                ? Array.from(a)
                                : 'Arguments' === b ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b)
                                    ? x(a, c)
                                    : void 0
                    );
                }
            }

            function x(c, a) {
                (null == a || a > c.length) && (a = c.length);
                for (var b = 0, d = new Array(a); b < a; b++) d[b] = c[b];
                return d;
            }

            var _ = {
                    el: document,
                    name: 'scroll',
                    offset: [0, 0],
                    repeat: !1,
                    smooth: !1,
                    initPosition: {x: 0, y: 0},
                    direction: 'vertical',
                    gestureDirection: 'vertical',
                    reloadOnContextChange: !1,
                    lerp: 0.1,
                    class: 'is-inview',
                    scrollbarContainer: !1,
                    scrollbarClass: 'c-scrollbar',
                    scrollingClass: 'has-scroll-scrolling',
                    draggingClass: 'has-scroll-dragging',
                    smoothClass: 'has-scroll-smooth',
                    initClass: 'has-scroll-init',
                    getSpeed: !1,
                    getDirection: !1,
                    scrollFromAnywhere: !1,
                    multiplier: 1,
                    firefoxMultiplier: 50,
                    touchMultiplier: 2,
                    resetNativeScroll: !0,
                    tablet: {
                        smooth: !1,
                        direction: 'vertical',
                        gestureDirection: 'vertical',
                        breakpoint: 1024,
                    },
                    smartphone: {
                        smooth: !1,
                        direction: 'vertical',
                        gestureDirection: 'vertical',
                    },
                },
                d = (function () {
                    function a() {
                        var b =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {};
                        j(this, a),
                            Object.assign(this, _, b),
                            (this.smartphone = _.smartphone),
                        b.smartphone && Object.assign(this.smartphone, b.smartphone),
                            (this.tablet = _.tablet),
                        b.tablet && Object.assign(this.tablet, b.tablet),
                            (this.namespace = 'locomotive'),
                            (this.html = document.documentElement),
                            (this.windowHeight = window.innerHeight),
                            (this.windowWidth = window.innerWidth),
                            (this.windowMiddle = {
                                x: this.windowWidth / 2,
                                y: this.windowHeight / 2,
                            }),
                            (this.els = {}),
                            (this.currentElements = {}),
                            (this.listeners = {}),
                            (this.hasScrollTicking = !1),
                            (this.hasCallEventSet = !1),
                            (this.checkScroll = this.checkScroll.bind(this)),
                            (this.checkResize = this.checkResize.bind(this)),
                            (this.checkEvent = this.checkEvent.bind(this)),
                            (this.instance = {
                                scroll: {x: 0, y: 0},
                                limit: {x: this.html.offsetWidth, y: this.html.offsetHeight},
                                currentElements: this.currentElements,
                            }),
                            this.isMobile
                                ? this.isTablet
                                    ? (this.context = 'tablet')
                                    : (this.context = 'smartphone')
                                : (this.context = 'desktop'),
                        this.isMobile && (this.direction = this[this.context].direction),
                            'horizontal' === this.direction
                                ? (this.directionAxis = 'x')
                                : (this.directionAxis = 'y'),
                        this.getDirection && (this.instance.direction = null),
                        this.getDirection && (this.instance.speed = 0),
                            this.html.classList.add(this.initClass),
                            window.addEventListener('resize', this.checkResize, !1);
                    }

                    return (
                        l(a, [
                            {
                                key: 'init',
                                value: function () {
                                    this.initEvents();
                                },
                            },
                            {
                                key: 'checkScroll',
                                value: function () {
                                    this.dispatchScroll();
                                },
                            },
                            {
                                key: 'checkResize',
                                value: function () {
                                    var a = this;
                                    this.resizeTick ||
                                    ((this.resizeTick = !0),
                                        requestAnimationFrame(function () {
                                            a.resize(), (a.resizeTick = !1);
                                        }));
                                },
                            },
                            {
                                key: 'resize', value: function () {
                                }
                            },
                            {
                                key: 'checkContext',
                                value: function () {
                                    if (this.reloadOnContextChange) {
                                        (this.isMobile =
                                            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                                navigator.userAgent
                                            ) ||
                                            ('MacIntel' === navigator.platform &&
                                                navigator.maxTouchPoints > 1) ||
                                            this.windowWidth < this.tablet.breakpoint),
                                            (this.isTablet =
                                                this.isMobile &&
                                                this.windowWidth >= this.tablet.breakpoint);
                                        var a = this.context;
                                        this.isMobile
                                            ? this.isTablet
                                                ? (this.context = 'tablet')
                                                : (this.context = 'smartphone')
                                            : (this.context = 'desktop'),
                                        a != this.context &&
                                        ('desktop' == a ? this.smooth : this[a].smooth) !=
                                        ('desktop' == this.context
                                            ? this.smooth
                                            : this[this.context].smooth) &&
                                        window.location.reload();
                                    }
                                },
                            },
                            {
                                key: 'initEvents',
                                value: function () {
                                    var a = this;
                                    (this.scrollToEls = this.el.querySelectorAll(
                                        '[data-'.concat(this.name, '-to]')
                                    )),
                                        (this.setScrollTo = this.setScrollTo.bind(this)),
                                        this.scrollToEls.forEach(function (b) {
                                            b.addEventListener('click', a.setScrollTo, !1);
                                        });
                                },
                            },
                            {
                                key: 'setScrollTo',
                                value: function (a) {
                                    a.preventDefault(),
                                        this.scrollTo(
                                            a.currentTarget.getAttribute(
                                                'data-'.concat(this.name, '-href')
                                            ) || a.currentTarget.getAttribute('href'),
                                            {
                                                offset: a.currentTarget.getAttribute(
                                                    'data-'.concat(this.name, '-offset')
                                                ),
                                            }
                                        );
                                },
                            },
                            {
                                key: 'addElements', value: function () {
                                }
                            },
                            {
                                key: 'detectElements',
                                value: function (c) {
                                    var d = this,
                                        a = this.instance.scroll.y,
                                        e = a + this.windowHeight,
                                        b = this.instance.scroll.x,
                                        f = b + this.windowWidth;
                                    Object.entries(this.els).forEach(function (j) {
                                        var i = v(j, 2),
                                            h = i[0],
                                            g = i[1];
                                        if (
                                            (!g ||
                                            (g.inView && !c) ||
                                            ('horizontal' === d.direction
                                                ? f >= g.left && b < g.right && d.setInView(g, h)
                                                : e >= g.top && a < g.bottom && d.setInView(g, h)),
                                            g && g.inView)
                                        ) {
                                            if ('horizontal' === d.direction) {
                                                var k = g.right - g.left;
                                                (g.progress =
                                                    (d.instance.scroll.x - (g.left - d.windowWidth)) /
                                                    (k + d.windowWidth)),
                                                (f < g.left || b > g.right) && d.setOutOfView(g, h);
                                            } else {
                                                var l = g.bottom - g.top;
                                                (g.progress =
                                                    (d.instance.scroll.y - (g.top - d.windowHeight)) /
                                                    (l + d.windowHeight)),
                                                (e < g.top || a > g.bottom) && d.setOutOfView(g, h);
                                            }
                                        }
                                    }),
                                        (this.hasScrollTicking = !1);
                                },
                            },
                            {
                                key: 'setInView',
                                value: function (a, b) {
                                    (this.els[b].inView = !0),
                                        a.el.classList.add(a.class),
                                        (this.currentElements[b] = a),
                                    a.call &&
                                    this.hasCallEventSet &&
                                    (this.dispatchCall(a, 'enter'),
                                    a.repeat || (this.els[b].call = !1));
                                },
                            },
                            {
                                key: 'setOutOfView',
                                value: function (a, b) {
                                    var c = this;
                                    (this.els[b].inView = !1),
                                        Object.keys(this.currentElements).forEach(function (a) {
                                            a === b && delete c.currentElements[a];
                                        }),
                                    a.call &&
                                    this.hasCallEventSet &&
                                    this.dispatchCall(a, 'exit'),
                                    a.repeat && a.el.classList.remove(a.class);
                                },
                            },
                            {
                                key: 'dispatchCall',
                                value: function (a, b) {
                                    (this.callWay = b),
                                        (this.callValue = a.call.split(',').map(function (a) {
                                            return a.trim();
                                        })),
                                        (this.callObj = a),
                                    1 == this.callValue.length &&
                                    (this.callValue = this.callValue[0]);
                                    var c = new Event(this.namespace + 'call');
                                    this.el.dispatchEvent(c);
                                },
                            },
                            {
                                key: 'dispatchScroll',
                                value: function () {
                                    var a = new Event(this.namespace + 'scroll');
                                    this.el.dispatchEvent(a);
                                },
                            },
                            {
                                key: 'setEvents',
                                value: function (a, c) {
                                    this.listeners[a] || (this.listeners[a] = []);
                                    var b = this.listeners[a];
                                    b.push(c),
                                    1 === b.length &&
                                    this.el.addEventListener(
                                        this.namespace + a,
                                        this.checkEvent,
                                        !1
                                    ),
                                    'call' === a &&
                                    ((this.hasCallEventSet = !0), this.detectElements(!0));
                                },
                            },
                            {
                                key: 'unsetEvents',
                                value: function (a, d) {
                                    if (this.listeners[a]) {
                                        var b = this.listeners[a],
                                            c = b.indexOf(d);
                                        c < 0 ||
                                        (b.splice(c, 1),
                                        0 === b.index &&
                                        this.el.removeEventListener(
                                            this.namespace + a,
                                            this.checkEvent,
                                            !1
                                        ));
                                    }
                                },
                            },
                            {
                                key: 'checkEvent',
                                value: function (b) {
                                    var d = this,
                                        c = b.type.replace(this.namespace, ''),
                                        a = this.listeners[c];
                                    a &&
                                    0 !== a.length &&
                                    a.forEach(function (a) {
                                        switch (c) {
                                            case 'scroll':
                                                return a(d.instance);
                                            case 'call':
                                                return a(d.callValue, d.callWay, d.callObj);
                                            default:
                                                return a();
                                        }
                                    });
                                },
                            },
                            {
                                key: 'startScroll', value: function () {
                                }
                            },
                            {
                                key: 'stopScroll', value: function () {
                                }
                            },
                            {
                                key: 'setScroll',
                                value: function (a, b) {
                                    this.instance.scroll = {x: 0, y: 0};
                                },
                            },
                            {
                                key: 'destroy',
                                value: function () {
                                    var a = this;
                                    window.removeEventListener('resize', this.checkResize, !1),
                                        Object.keys(this.listeners).forEach(function (b) {
                                            a.el.removeEventListener(
                                                a.namespace + b,
                                                a.checkEvent,
                                                !1
                                            );
                                        }),
                                        (this.listeners = {}),
                                        this.scrollToEls.forEach(function (b) {
                                            b.removeEventListener('click', a.setScrollTo, !1);
                                        }),
                                        this.html.classList.remove(this.initClass);
                                },
                            },
                        ]),
                            a
                    );
                })(),
                y =
                    'undefined' != typeof globalThis
                        ? globalThis
                        : 'undefined' != typeof window
                            ? window
                            : void 0 !== b
                                ? b
                                : 'undefined' != typeof self
                                    ? self
                                    : {};

            function e(b, a) {
                return b((a = {exports: {}}), a.exports), a.exports;
            }

            var g = e(function (a, b) {
                    a.exports = {
                        polyfill: function () {
                            var a = window,
                                d = document;
                            if (
                                !('scrollBehavior' in d.documentElement.style) ||
                                !0 === a.__forceSmoothScrollPolyfill__
                            ) {
                                var c,
                                    b = a.HTMLElement || a.Element,
                                    e = {
                                        scroll: a.scroll || a.scrollTo,
                                        scrollBy: a.scrollBy,
                                        elementScroll: b.prototype.scroll || h,
                                        scrollIntoView: b.prototype.scrollIntoView,
                                    },
                                    f =
                                        a.performance && a.performance.now
                                            ? a.performance.now.bind(a.performance)
                                            : Date.now,
                                    g =
                                        ((c = a.navigator.userAgent),
                                            new RegExp('MSIE |Trident/|Edge/').test(c) ? 1 : 0);
                                (a.scroll = a.scrollTo =
                                    function () {
                                        void 0 !== arguments[0] &&
                                        (!0 !== i(arguments[0])
                                            ? o.call(
                                                a,
                                                d.body,
                                                void 0 !== arguments[0].left
                                                    ? ~~arguments[0].left
                                                    : a.scrollX || a.pageXOffset,
                                                void 0 !== arguments[0].top
                                                    ? ~~arguments[0].top
                                                    : a.scrollY || a.pageYOffset
                                            )
                                            : e.scroll.call(
                                                a,
                                                void 0 !== arguments[0].left
                                                    ? arguments[0].left
                                                    : 'object' != typeof arguments[0]
                                                        ? arguments[0]
                                                        : a.scrollX || a.pageXOffset,
                                                void 0 !== arguments[0].top
                                                    ? arguments[0].top
                                                    : void 0 !== arguments[1]
                                                        ? arguments[1]
                                                        : a.scrollY || a.pageYOffset
                                            ));
                                    }),
                                    (a.scrollBy = function () {
                                        void 0 !== arguments[0] &&
                                        (i(arguments[0])
                                            ? e.scrollBy.call(
                                                a,
                                                void 0 !== arguments[0].left
                                                    ? arguments[0].left
                                                    : 'object' != typeof arguments[0]
                                                        ? arguments[0]
                                                        : 0,
                                                void 0 !== arguments[0].top
                                                    ? arguments[0].top
                                                    : void 0 !== arguments[1]
                                                        ? arguments[1]
                                                        : 0
                                            )
                                            : o.call(
                                                a,
                                                d.body,
                                                ~~arguments[0].left + (a.scrollX || a.pageXOffset),
                                                ~~arguments[0].top + (a.scrollY || a.pageYOffset)
                                            ));
                                    }),
                                    (b.prototype.scroll = b.prototype.scrollTo =
                                        function () {
                                            if (void 0 !== arguments[0]) {
                                                if (!0 !== i(arguments[0])) {
                                                    var a = arguments[0].left,
                                                        b = arguments[0].top;
                                                    o.call(
                                                        this,
                                                        this,
                                                        void 0 === a ? this.scrollLeft : ~~a,
                                                        void 0 === b ? this.scrollTop : ~~b
                                                    );
                                                } else {
                                                    if (
                                                        'number' == typeof arguments[0] &&
                                                        void 0 === arguments[1]
                                                    )
                                                        throw new SyntaxError(
                                                            'Value could not be converted'
                                                        );
                                                    e.elementScroll.call(
                                                        this,
                                                        void 0 !== arguments[0].left
                                                            ? ~~arguments[0].left
                                                            : 'object' != typeof arguments[0]
                                                                ? ~~arguments[0]
                                                                : this.scrollLeft,
                                                        void 0 !== arguments[0].top
                                                            ? ~~arguments[0].top
                                                            : void 0 !== arguments[1]
                                                                ? ~~arguments[1]
                                                                : this.scrollTop
                                                    );
                                                }
                                            }
                                        }),
                                    (b.prototype.scrollBy = function () {
                                        void 0 !== arguments[0] &&
                                        (!0 !== i(arguments[0])
                                            ? this.scroll({
                                                left: ~~arguments[0].left + this.scrollLeft,
                                                top: ~~arguments[0].top + this.scrollTop,
                                                behavior: arguments[0].behavior,
                                            })
                                            : e.elementScroll.call(
                                                this,
                                                void 0 !== arguments[0].left
                                                    ? ~~arguments[0].left + this.scrollLeft
                                                    : ~~arguments[0] + this.scrollLeft,
                                                void 0 !== arguments[0].top
                                                    ? ~~arguments[0].top + this.scrollTop
                                                    : ~~arguments[1] + this.scrollTop
                                            ));
                                    }),
                                    (b.prototype.scrollIntoView = function () {
                                        if (!0 !== i(arguments[0])) {
                                            var b = m(this),
                                                c = b.getBoundingClientRect(),
                                                f = this.getBoundingClientRect();
                                            b !== d.body
                                                ? (o.call(
                                                    this,
                                                    b,
                                                    b.scrollLeft + f.left - c.left,
                                                    b.scrollTop + f.top - c.top
                                                ),
                                                'fixed' !== a.getComputedStyle(b).position &&
                                                a.scrollBy({
                                                    left: c.left,
                                                    top: c.top,
                                                    behavior: 'smooth',
                                                }))
                                                : a.scrollBy({
                                                    left: f.left,
                                                    top: f.top,
                                                    behavior: 'smooth',
                                                });
                                        } else
                                            e.scrollIntoView.call(
                                                this,
                                                void 0 === arguments[0] || arguments[0]
                                            );
                                    });
                            }

                            function h(a, b) {
                                (this.scrollLeft = a), (this.scrollTop = b);
                            }

                            function i(a) {
                                if (
                                    null === a ||
                                    'object' != typeof a ||
                                    void 0 === a.behavior ||
                                    'auto' === a.behavior ||
                                    'instant' === a.behavior
                                )
                                    return !0;
                                if ('object' == typeof a && 'smooth' === a.behavior) return !1;
                                throw new TypeError(
                                    'behavior member of ScrollOptions ' +
                                    a.behavior +
                                    ' is not a valid value for enumeration ScrollBehavior.'
                                );
                            }

                            function j(a, b) {
                                return 'Y' === b
                                    ? a.clientHeight + g < a.scrollHeight
                                    : 'X' === b
                                        ? a.clientWidth + g < a.scrollWidth
                                        : void 0;
                            }

                            function k(c, d) {
                                var b = a.getComputedStyle(c, null)['overflow' + d];
                                return 'auto' === b || 'scroll' === b;
                            }

                            function l(a) {
                                var b = j(a, 'Y') && k(a, 'Y'),
                                    c = j(a, 'X') && k(a, 'X');
                                return b || c;
                            }

                            function m(a) {
                                for (; a !== d.body && !1 === l(a);)
                                    a = a.parentNode || a.host;
                                return a;
                            }

                            function n(b) {
                                var c,
                                    d,
                                    e,
                                    g = (f() - b.startTime) / 468;
                                (c = 0.5 * (1 - Math.cos(Math.PI * (g = g > 1 ? 1 : g)))),
                                    (d = b.startX + (b.x - b.startX) * c),
                                    (e = b.startY + (b.y - b.startY) * c),
                                    b.method.call(b.scrollable, d, e),
                                (d === b.x && e === b.y) ||
                                a.requestAnimationFrame(n.bind(a, b));
                            }

                            function o(b, k, l) {
                                var c,
                                    g,
                                    i,
                                    j,
                                    m = f();
                                b === d.body
                                    ? ((c = a),
                                        (g = a.scrollX || a.pageXOffset),
                                        (i = a.scrollY || a.pageYOffset),
                                        (j = e.scroll))
                                    : ((c = b), (g = b.scrollLeft), (i = b.scrollTop), (j = h)),
                                    n({
                                        scrollable: c,
                                        method: j,
                                        startTime: m,
                                        startX: g,
                                        startY: i,
                                        x: k,
                                        y: l,
                                    });
                            }
                        },
                    };
                }),
                z =
                    (g.polyfill,
                        (function (b) {
                            p(a, b);
                            var c = t(a);

                            function a() {
                                var b,
                                    d =
                                        arguments.length > 0 && void 0 !== arguments[0]
                                            ? arguments[0]
                                            : {};
                                return (
                                    j(this, a),
                                    (b = c.call(this, d)).resetNativeScroll &&
                                    (history.scrollRestoration &&
                                    (history.scrollRestoration = 'manual'),
                                        window.scrollTo(0, 0)),
                                        window.addEventListener('scroll', b.checkScroll, !1),
                                    void 0 === window.smoothscrollPolyfill &&
                                    ((window.smoothscrollPolyfill = g),
                                        window.smoothscrollPolyfill.polyfill()),
                                        b
                                );
                            }

                            return (
                                l(a, [
                                    {
                                        key: 'init',
                                        value: function () {
                                            (this.instance.scroll.y = window.pageYOffset),
                                                this.addElements(),
                                                this.detectElements(),
                                                u(q(a.prototype), 'init', this).call(this);
                                        },
                                    },
                                    {
                                        key: 'checkScroll',
                                        value: function () {
                                            var b = this;
                                            u(q(a.prototype), 'checkScroll', this).call(this),
                                            this.getDirection && this.addDirection(),
                                            this.getSpeed &&
                                            (this.addSpeed(), (this.speedTs = Date.now())),
                                                (this.instance.scroll.y = window.pageYOffset),
                                            Object.entries(this.els).length &&
                                            (this.hasScrollTicking ||
                                                (requestAnimationFrame(function () {
                                                    b.detectElements();
                                                }),
                                                    (this.hasScrollTicking = !0)));
                                        },
                                    },
                                    {
                                        key: 'addDirection',
                                        value: function () {
                                            window.pageYOffset > this.instance.scroll.y
                                                ? 'down' !== this.instance.direction &&
                                                (this.instance.direction = 'down')
                                                : window.pageYOffset < this.instance.scroll.y &&
                                                'up' !== this.instance.direction &&
                                                (this.instance.direction = 'up');
                                        },
                                    },
                                    {
                                        key: 'addSpeed',
                                        value: function () {
                                            window.pageYOffset != this.instance.scroll.y
                                                ? (this.instance.speed =
                                                    (window.pageYOffset - this.instance.scroll.y) /
                                                    Math.max(1, Date.now() - this.speedTs))
                                                : (this.instance.speed = 0);
                                        },
                                    },
                                    {
                                        key: 'resize',
                                        value: function () {
                                            Object.entries(this.els).length &&
                                            ((this.windowHeight = window.innerHeight),
                                                this.updateElements());
                                        },
                                    },
                                    {
                                        key: 'addElements',
                                        value: function () {
                                            var a = this;
                                            (this.els = {}),
                                                this.el
                                                    .querySelectorAll('[data-' + this.name + ']')
                                                    .forEach(function (b, m) {
                                                        b.getBoundingClientRect();
                                                        var f,
                                                            g,
                                                            c,
                                                            h = b.dataset[a.name + 'Class'] || a.class,
                                                            d =
                                                                'string' == typeof b.dataset[a.name + 'Id']
                                                                    ? b.dataset[a.name + 'Id']
                                                                    : m,
                                                            i =
                                                                'string' == typeof b.dataset[a.name + 'Offset']
                                                                    ? b.dataset[a.name + 'Offset'].split(',')
                                                                    : a.offset,
                                                            e = b.dataset[a.name + 'Repeat'],
                                                            n = b.dataset[a.name + 'Call'],
                                                            j = b.dataset[a.name + 'Target'],
                                                            k = (c =
                                                                void 0 !== j
                                                                    ? document.querySelector(''.concat(j))
                                                                    : b).getBoundingClientRect();
                                                        (f = k.top + a.instance.scroll.y),
                                                            (g = k.left + a.instance.scroll.x);
                                                        var o = f + c.offsetHeight,
                                                            p = g + c.offsetWidth;
                                                        e = 'false' != e && (null != e || a.repeat);
                                                        var l = a.getRelativeOffset(i),
                                                            q = {
                                                                el: b,
                                                                targetEl: c,
                                                                id: d,
                                                                class: h,
                                                                top: (f += l[0]),
                                                                bottom: (o -= l[1]),
                                                                left: g,
                                                                right: p,
                                                                offset: i,
                                                                progress: 0,
                                                                repeat: e,
                                                                inView: !1,
                                                                call: n,
                                                            };
                                                        (a.els[d] = q),
                                                        b.classList.contains(h) && a.setInView(a.els[d], d);
                                                    });
                                        },
                                    },
                                    {
                                        key: 'updateElements',
                                        value: function () {
                                            var a = this;
                                            Object.entries(this.els).forEach(function (g) {
                                                var c = v(g, 2),
                                                    d = c[0],
                                                    b = c[1],
                                                    e =
                                                        b.targetEl.getBoundingClientRect().top +
                                                        a.instance.scroll.y,
                                                    h = e + b.targetEl.offsetHeight,
                                                    f = a.getRelativeOffset(b.offset);
                                                (a.els[d].top = e + f[0]), (a.els[d].bottom = h - f[1]);
                                            }),
                                                (this.hasScrollTicking = !1);
                                        },
                                    },
                                    {
                                        key: 'getRelativeOffset',
                                        value: function (b) {
                                            var c = [0, 0];
                                            if (b)
                                                for (var a = 0; a < b.length; a++)
                                                    'string' == typeof b[a]
                                                        ? b[a].includes('%')
                                                            ? (c[a] = parseInt(
                                                                (b[a].replace('%', '') * this.windowHeight) /
                                                                100
                                                            ))
                                                            : (c[a] = parseInt(b[a]))
                                                        : (c[a] = b[a]);
                                            return c;
                                        },
                                    },
                                    {
                                        key: 'scrollTo',
                                        value: function (a) {
                                            var b =
                                                    arguments.length > 1 && void 0 !== arguments[1]
                                                        ? arguments[1]
                                                        : {},
                                                c = parseInt(b.offset) || 0,
                                                d = !!b.callback && b.callback;
                                            if ('string' == typeof a) {
                                                if ('top' === a) a = this.html;
                                                else if ('bottom' === a)
                                                    a = this.html.offsetHeight - window.innerHeight;
                                                else if (!(a = document.querySelector(a))) return;
                                            } else if ('number' == typeof a) a = parseInt(a);
                                            else if (!a || !a.tagName)
                                                return void console.warn(
                                                    '`target` parameter is not valid'
                                                );
                                            c =
                                                'number' != typeof a
                                                    ? a.getBoundingClientRect().top +
                                                    c +
                                                    this.instance.scroll.y
                                                    : a + c;
                                            var e = function () {
                                                return parseInt(window.pageYOffset) === parseInt(c);
                                            };
                                            if (d) {
                                                if (e()) return void d();
                                                var f = function a() {
                                                    e() && (window.removeEventListener('scroll', a), d());
                                                };
                                                window.addEventListener('scroll', f);
                                            }
                                            window.scrollTo({
                                                top: c,
                                                behavior: 0 === b.duration ? 'auto' : 'smooth',
                                            });
                                        },
                                    },
                                    {
                                        key: 'update',
                                        value: function () {
                                            this.addElements(), this.detectElements();
                                        },
                                    },
                                    {
                                        key: 'destroy',
                                        value: function () {
                                            u(q(a.prototype), 'destroy', this).call(this),
                                                window.removeEventListener(
                                                    'scroll',
                                                    this.checkScroll,
                                                    !1
                                                );
                                        },
                                    },
                                ]),
                                    a
                            );
                        })(d)),
                A = Object.getOwnPropertySymbols,
                B = Object.prototype.hasOwnProperty,
                C = Object.prototype.propertyIsEnumerable,
                D = !(function () {
                    try {
                        if (!Object.assign) return !1;
                        var b = new String('abc');
                        if (((b[5] = 'de'), '5' === Object.getOwnPropertyNames(b)[0]))
                            return !1;
                        for (var c = {}, a = 0; a < 10; a++)
                            c['_' + String.fromCharCode(a)] = a;
                        if (
                            '0123456789' !==
                            Object.getOwnPropertyNames(c)
                                .map(function (a) {
                                    return c[a];
                                })
                                .join('')
                        )
                            return !1;
                        var d = {};
                        return (
                            'abcdefghijklmnopqrst'.split('').forEach(function (a) {
                                d[a] = a;
                            }),
                            'abcdefghijklmnopqrst' ===
                            Object.keys(Object.assign({}, d)).join('')
                        );
                    } catch (e) {
                        return !1;
                    }
                })()
                    ? function (g, h) {
                        for (
                            var a,
                                b,
                                d = (function (a) {
                                    if (null == a)
                                        throw new TypeError(
                                            'Object.assign cannot be called with null or undefined'
                                        );
                                    return Object(a);
                                })(g),
                                e = 1;
                            e < arguments.length;
                            e++
                        ) {
                            for (var f in (a = Object(arguments[e])))
                                B.call(a, f) && (d[f] = a[f]);
                            if (A) {
                                b = A(a);
                                for (var c = 0; c < b.length; c++)
                                    C.call(a, b[c]) && (d[b[c]] = a[b[c]]);
                            }
                        }
                        return d;
                    }
                    : Object.assign;

            function f() {
            }

            f.prototype = {
                on: function (a, c, d) {
                    var b = this.e || (this.e = {});
                    return (b[a] || (b[a] = [])).push({fn: c, ctx: d}), this;
                },
                once: function (b, c, d) {
                    var e = this;

                    function a() {
                        e.off(b, a), c.apply(d, arguments);
                    }

                    return (a._ = c), this.on(b, a, d);
                },
                emit: function (c) {
                    for (
                        var d = [].slice.call(arguments, 1),
                            b = ((this.e || (this.e = {}))[c] || []).slice(),
                            a = 0,
                            e = b.length;
                        a < e;
                        a++
                    )
                        b[a].fn.apply(b[a].ctx, d);
                    return this;
                },
                off: function (c, d) {
                    var e = this.e || (this.e = {}),
                        a = e[c],
                        f = [];
                    if (a && d)
                        for (var b = 0, g = a.length; b < g; b++)
                            a[b].fn !== d && a[b].fn._ !== d && f.push(a[b]);
                    return f.length ? (e[c] = f) : delete e[c], this;
                },
            };
            var E = f,
                h = e(function (a, b) {
                    (function () {
                        (null !== b ? b : this).Lethargy = (function () {
                            function a(a, b, c, d) {
                                (this.stability = null != a ? Math.abs(a) : 8),
                                    (this.sensitivity = null != b ? 1 + Math.abs(b) : 100),
                                    (this.tolerance = null != c ? 1 + Math.abs(c) : 1.1),
                                    (this.delay = null != d ? d : 150),
                                    (this.lastUpDeltas = function () {
                                        var a, b, c;
                                        for (
                                            c = [], a = 1, b = 2 * this.stability;
                                            1 <= b ? a <= b : a >= b;
                                            1 <= b ? a++ : a--
                                        )
                                            c.push(null);
                                        return c;
                                    }.call(this)),
                                    (this.lastDownDeltas = function () {
                                        var a, b, c;
                                        for (
                                            c = [], a = 1, b = 2 * this.stability;
                                            1 <= b ? a <= b : a >= b;
                                            1 <= b ? a++ : a--
                                        )
                                            c.push(null);
                                        return c;
                                    }.call(this)),
                                    (this.deltasTimestamp = function () {
                                        var a, b, c;
                                        for (
                                            c = [], a = 1, b = 2 * this.stability;
                                            1 <= b ? a <= b : a >= b;
                                            1 <= b ? a++ : a--
                                        )
                                            c.push(null);
                                        return c;
                                    }.call(this));
                            }

                            return (
                                (a.prototype.check = function (a) {
                                    var b;
                                    return (
                                        null != (a = a.originalEvent || a).wheelDelta
                                            ? (b = a.wheelDelta)
                                            : null != a.deltaY
                                                ? (b = -40 * a.deltaY)
                                                : (null == a.detail && 0 !== a.detail) ||
                                                (b = -40 * a.detail),
                                            this.deltasTimestamp.push(Date.now()),
                                            this.deltasTimestamp.shift(),
                                            b > 0
                                                ? (this.lastUpDeltas.push(b),
                                                    this.lastUpDeltas.shift(),
                                                    this.isInertia(1))
                                                : (this.lastDownDeltas.push(b),
                                                    this.lastDownDeltas.shift(),
                                                    this.isInertia(-1))
                                    );
                                }),
                                    (a.prototype.isInertia = function (b) {
                                        var a, c, d, e, f, g, h;
                                        return null ===
                                        (a = -1 === b ? this.lastDownDeltas : this.lastUpDeltas)[0]
                                            ? b
                                            : !(
                                                this.deltasTimestamp[2 * this.stability - 2] +
                                                this.delay >
                                                Date.now() && a[0] === a[2 * this.stability - 1]
                                            ) &&
                                            ((d = a.slice(0, this.stability)),
                                                (c = a.slice(this.stability, 2 * this.stability)),
                                                (h = d.reduce(function (a, b) {
                                                    return a + b;
                                                })),
                                                (f = c.reduce(function (a, b) {
                                                    return a + b;
                                                })),
                                                (g = h / d.length),
                                                (e = f / c.length),
                                            Math.abs(g) < Math.abs(e * this.tolerance) &&
                                            this.sensitivity < Math.abs(e) &&
                                            b);
                                    }),
                                    (a.prototype.showLastUpDeltas = function () {
                                        return this.lastUpDeltas;
                                    }),
                                    (a.prototype.showLastDownDeltas = function () {
                                        return this.lastDownDeltas;
                                    }),
                                    a
                            );
                        })();
                    }.call(y));
                }),
                F = {
                    hasWheelEvent: 'onwheel' in document,
                    hasMouseWheelEvent: 'onmousewheel' in document,
                    hasTouch:
                        'ontouchstart' in window ||
                        window.TouchEvent ||
                        (window.DocumentTouch && document instanceof DocumentTouch),
                    hasTouchWin:
                        navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                    hasPointer: !!window.navigator.msPointerEnabled,
                    hasKeyDown: 'onkeydown' in document,
                    isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
                },
                G = Object.prototype.toString,
                H = Object.prototype.hasOwnProperty;

            function I(a, b) {
                return function () {
                    return a.apply(b, arguments);
                };
            }

            var $ = h.Lethargy,
                J = 'virtualscroll',
                K = a;

            function a(a) {
                !(function (a) {
                    if (!a)
                        return console.warn('bindAll requires at least one argument.');
                    var b = Array.prototype.slice.call(arguments, 1);
                    if (0 === b.length)
                        for (var c in a)
                            H.call(a, c) &&
                            'function' == typeof a[c] &&
                            '[object Function]' == G.call(a[c]) &&
                            b.push(c);
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d];
                        a[e] = I(a[e], a);
                    }
                })(
                    this,
                    '_onWheel',
                    '_onMouseWheel',
                    '_onTouchStart',
                    '_onTouchMove',
                    '_onKeyDown'
                ),
                    (this.el = window),
                a && a.el && ((this.el = a.el), delete a.el),
                    (this.options = D(
                        {
                            mouseMultiplier: 1,
                            touchMultiplier: 2,
                            firefoxMultiplier: 15,
                            keyStep: 120,
                            preventTouch: !1,
                            unpreventTouchClass: 'vs-touchmove-allowed',
                            limitInertia: !1,
                            useKeyboard: !0,
                            useTouch: !0,
                        },
                        a
                    )),
                this.options.limitInertia && (this._lethargy = new $()),
                    (this._emitter = new E()),
                    (this._event = {y: 0, x: 0, deltaX: 0, deltaY: 0}),
                    (this.touchStartX = null),
                    (this.touchStartY = null),
                    (this.bodyTouchAction = null),
                void 0 !== this.options.passive &&
                (this.listenerOptions = {passive: this.options.passive});
            }

            function L(b, c, a) {
                return (1 - a) * b + a * c;
            }

            function M(e) {
                var b = {};
                if (window.getComputedStyle) {
                    var c = getComputedStyle(e),
                        d = c.transform || c.webkitTransform || c.mozTransform,
                        a = d.match(/^matrix3d\((.+)\)$/);
                    return (
                        a
                            ? ((b.x = a ? parseFloat(a[1].split(', ')[12]) : 0),
                                (b.y = a ? parseFloat(a[1].split(', ')[13]) : 0))
                            : ((a = d.match(/^matrix\((.+)\)$/)),
                                (b.x = a ? parseFloat(a[1].split(', ')[4]) : 0),
                                (b.y = a ? parseFloat(a[1].split(', ')[5]) : 0)),
                            b
                    );
                }
            }

            function N(a) {
                for (var b = []; a && a !== document; a = a.parentNode) b.push(a);
                return b;
            }

            (a.prototype._notify = function (b) {
                var a = this._event;
                (a.x += a.deltaX),
                    (a.y += a.deltaY),
                    this._emitter.emit(J, {
                        x: a.x,
                        y: a.y,
                        deltaX: a.deltaX,
                        deltaY: a.deltaY,
                        originalEvent: b,
                    });
            }),
                (a.prototype._onWheel = function (a) {
                    var c = this.options;
                    if (!this._lethargy || !1 !== this._lethargy.check(a)) {
                        var b = this._event;
                        (b.deltaX = a.wheelDeltaX || -1 * a.deltaX),
                            (b.deltaY = a.wheelDeltaY || -1 * a.deltaY),
                        F.isFirefox &&
                        1 == a.deltaMode &&
                        ((b.deltaX *= c.firefoxMultiplier),
                            (b.deltaY *= c.firefoxMultiplier)),
                            (b.deltaX *= c.mouseMultiplier),
                            (b.deltaY *= c.mouseMultiplier),
                            this._notify(a);
                    }
                }),
                (a.prototype._onMouseWheel = function (a) {
                    if (!this.options.limitInertia || !1 !== this._lethargy.check(a)) {
                        var b = this._event;
                        (b.deltaX = a.wheelDeltaX ? a.wheelDeltaX : 0),
                            (b.deltaY = a.wheelDeltaY ? a.wheelDeltaY : a.wheelDelta),
                            this._notify(a);
                    }
                }),
                (a.prototype._onTouchStart = function (a) {
                    var b = a.targetTouches ? a.targetTouches[0] : a;
                    (this.touchStartX = b.pageX), (this.touchStartY = b.pageY);
                }),
                (a.prototype._onTouchMove = function (a) {
                    var b = this.options;
                    b.preventTouch &&
                    !a.target.classList.contains(b.unpreventTouchClass) &&
                    a.preventDefault();
                    var d = this._event,
                        c = a.targetTouches ? a.targetTouches[0] : a;
                    (d.deltaX = (c.pageX - this.touchStartX) * b.touchMultiplier),
                        (d.deltaY = (c.pageY - this.touchStartY) * b.touchMultiplier),
                        (this.touchStartX = c.pageX),
                        (this.touchStartY = c.pageY),
                        this._notify(a);
                }),
                (a.prototype._onKeyDown = function (b) {
                    var a = this._event;
                    a.deltaX = a.deltaY = 0;
                    var c = window.innerHeight - 40;
                    switch (b.keyCode) {
                        case 37:
                        case 38:
                            a.deltaY = this.options.keyStep;
                            break;
                        case 39:
                        case 40:
                            a.deltaY = -this.options.keyStep;
                            break;
                        case b.shiftKey:
                            a.deltaY = c;
                            break;
                        case 32:
                            a.deltaY = -c;
                            break;
                        default:
                            return;
                    }
                    this._notify(b);
                }),
                (a.prototype._bind = function () {
                    F.hasWheelEvent &&
                    this.el.addEventListener(
                        'wheel',
                        this._onWheel,
                        this.listenerOptions
                    ),
                    F.hasMouseWheelEvent &&
                    this.el.addEventListener(
                        'mousewheel',
                        this._onMouseWheel,
                        this.listenerOptions
                    ),
                    F.hasTouch &&
                    this.options.useTouch &&
                    (this.el.addEventListener(
                        'touchstart',
                        this._onTouchStart,
                        this.listenerOptions
                    ),
                        this.el.addEventListener(
                            'touchmove',
                            this._onTouchMove,
                            this.listenerOptions
                        )),
                    F.hasPointer &&
                    F.hasTouchWin &&
                    ((this.bodyTouchAction = document.body.style.msTouchAction),
                        (document.body.style.msTouchAction = 'none'),
                        this.el.addEventListener('MSPointerDown', this._onTouchStart, !0),
                        this.el.addEventListener('MSPointerMove', this._onTouchMove, !0)),
                    F.hasKeyDown &&
                    this.options.useKeyboard &&
                    document.addEventListener('keydown', this._onKeyDown);
                }),
                (a.prototype._unbind = function () {
                    F.hasWheelEvent &&
                    this.el.removeEventListener('wheel', this._onWheel),
                    F.hasMouseWheelEvent &&
                    this.el.removeEventListener('mousewheel', this._onMouseWheel),
                    F.hasTouch &&
                    (this.el.removeEventListener('touchstart', this._onTouchStart),
                        this.el.removeEventListener('touchmove', this._onTouchMove)),
                    F.hasPointer &&
                    F.hasTouchWin &&
                    ((document.body.style.msTouchAction = this.bodyTouchAction),
                        this.el.removeEventListener(
                            'MSPointerDown',
                            this._onTouchStart,
                            !0
                        ),
                        this.el.removeEventListener(
                            'MSPointerMove',
                            this._onTouchMove,
                            !0
                        )),
                    F.hasKeyDown &&
                    this.options.useKeyboard &&
                    document.removeEventListener('keydown', this._onKeyDown);
                }),
                (a.prototype.on = function (b, c) {
                    this._emitter.on(J, b, c);
                    var a = this._emitter.e;
                    a && a[J] && 1 === a[J].length && this._bind();
                }),
                (a.prototype.off = function (b, c) {
                    this._emitter.off(J, b, c);
                    var a = this._emitter.e;
                    (!a[J] || a[J].length <= 0) && this._unbind();
                }),
                (a.prototype.reset = function () {
                    var a = this._event;
                    (a.x = 0), (a.y = 0);
                }),
                (a.prototype.destroy = function () {
                    this._emitter.off(), this._unbind();
                });
            var O = 'function' == typeof Float32Array;

            function P(a, b) {
                return 1 - 3 * b + 3 * a;
            }

            function Q(a, b) {
                return 3 * b - 6 * a;
            }

            function R(a, b, c) {
                return ((P(b, c) * a + Q(b, c)) * a + 3 * b) * a;
            }

            function S(a, b, c) {
                return 3 * P(b, c) * a * a + 2 * Q(b, c) * a + 3 * b;
            }

            function T(a) {
                return a;
            }

            var U = function (a, d, b, e) {
                    if (!(0 <= a && a <= 1 && 0 <= b && b <= 1))
                        throw new Error('bezier x values must be in [0, 1] range');
                    if (a === d && b === e) return T;
                    for (
                        var f = O ? new Float32Array(11) : new Array(11), c = 0;
                        c < 11;
                        ++c
                    )
                        f[c] = R(0.1 * c, a, b);
                    return function (c) {
                        return 0 === c
                            ? 0
                            : 1 === c
                                ? 1
                                : R(
                                    (function (d) {
                                        for (var e = 0, c = 1; 10 !== c && f[c] <= d; ++c) e += 0.1;
                                        --c;
                                        var g = e + 0.1 * ((d - f[c]) / (f[c + 1] - f[c])),
                                            h = S(g, a, b);
                                        return h >= 0.001
                                            ? (function (f, a, b, c) {
                                                for (var d = 0; d < 4; ++d) {
                                                    var e = S(a, b, c);
                                                    if (0 === e) break;
                                                    a -= (R(a, b, c) - f) / e;
                                                }
                                                return a;
                                            })(d, g, a, b)
                                            : 0 === h
                                                ? g
                                                : (function (e, b, c, f, g) {
                                                    var d,
                                                        a,
                                                        h = 0;
                                                    do
                                                        (d = R((a = b + (c - b) / 2), f, g) - e) > 0
                                                            ? (c = a)
                                                            : (b = a);
                                                    while (Math.abs(d) > 1e-7 && ++h < 10);
                                                    return a;
                                                })(d, e, e + 0.1, a, b);
                                    })(c),
                                    d,
                                    e
                                );
                    };
                },
                V = (function (b) {
                    p(a, b);
                    var c = t(a);

                    function a() {
                        var b,
                            d =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {};
                        return (
                            j(this, a),
                            history.scrollRestoration &&
                            (history.scrollRestoration = 'manual'),
                                window.scrollTo(0, 0),
                            (b = c.call(this, d)).inertia && (b.lerp = 0.1 * b.inertia),
                                (b.isScrolling = !1),
                                (b.isDraggingScrollbar = !1),
                                (b.isTicking = !1),
                                (b.hasScrollTicking = !1),
                                (b.parallaxElements = {}),
                                (b.stop = !1),
                                (b.scrollbarContainer = d.scrollbarContainer),
                                (b.checkKey = b.checkKey.bind(s(b))),
                                window.addEventListener('keydown', b.checkKey, !1),
                                b
                        );
                    }

                    return (
                        l(a, [
                            {
                                key: 'init',
                                value: function () {
                                    var b = this;
                                    this.html.classList.add(this.smoothClass),
                                        this.html.setAttribute(
                                            'data-'.concat(this.name, '-direction'),
                                            this.direction
                                        ),
                                        (this.instance = o(
                                            {
                                                delta: {
                                                    x: this.initPosition.x,
                                                    y: this.initPosition.y,
                                                },
                                                scroll: {
                                                    x: this.initPosition.x,
                                                    y: this.initPosition.y,
                                                },
                                            },
                                            this.instance
                                        )),
                                        (this.vs = new K({
                                            el: this.scrollFromAnywhere ? document : this.el,
                                            mouseMultiplier:
                                                navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
                                            firefoxMultiplier: this.firefoxMultiplier,
                                            touchMultiplier: this.touchMultiplier,
                                            useKeyboard: !1,
                                            passive: !0,
                                        })),
                                        this.vs.on(function (a) {
                                            b.stop ||
                                            b.isDraggingScrollbar ||
                                            requestAnimationFrame(function () {
                                                b.updateDelta(a), b.isScrolling || b.startScrolling();
                                            });
                                        }),
                                        this.setScrollLimit(),
                                        this.initScrollBar(),
                                        this.addSections(),
                                        this.addElements(),
                                        this.checkScroll(!0),
                                        this.transformElements(!0, !0),
                                        u(q(a.prototype), 'init', this).call(this);
                                },
                            },
                            {
                                key: 'setScrollLimit',
                                value: function () {
                                    if (
                                        ((this.instance.limit.y =
                                            this.el.offsetHeight - this.windowHeight),
                                        'horizontal' === this.direction)
                                    ) {
                                        for (
                                            var b = 0, c = this.el.children, a = 0;
                                            a < c.length;
                                            a++
                                        )
                                            b += c[a].offsetWidth;
                                        this.instance.limit.x = b - this.windowWidth;
                                    }
                                },
                            },
                            {
                                key: 'startScrolling',
                                value: function () {
                                    (this.startScrollTs = Date.now()),
                                        (this.isScrolling = !0),
                                        this.checkScroll(),
                                        this.html.classList.add(this.scrollingClass);
                                },
                            },
                            {
                                key: 'stopScrolling',
                                value: function () {
                                    cancelAnimationFrame(this.checkScrollRaf),
                                        (this.startScrollTs = void 0),
                                    this.scrollToRaf &&
                                    (cancelAnimationFrame(this.scrollToRaf),
                                        (this.scrollToRaf = null)),
                                        (this.isScrolling = !1),
                                        (this.instance.scroll.y = Math.round(
                                            this.instance.scroll.y
                                        )),
                                        this.html.classList.remove(this.scrollingClass);
                                },
                            },
                            {
                                key: 'checkKey',
                                value: function (a) {
                                    var b = this;
                                    if (this.stop)
                                        9 == a.keyCode &&
                                        requestAnimationFrame(function () {
                                            (b.html.scrollTop = 0),
                                                (document.body.scrollTop = 0),
                                                (b.html.scrollLeft = 0),
                                                (document.body.scrollLeft = 0);
                                        });
                                    else {
                                        switch (a.keyCode) {
                                            case 9:
                                                requestAnimationFrame(function () {
                                                    (b.html.scrollTop = 0),
                                                        (document.body.scrollTop = 0),
                                                        (b.html.scrollLeft = 0),
                                                        (document.body.scrollLeft = 0),
                                                        b.scrollTo(document.activeElement, {
                                                            offset: -window.innerHeight / 2,
                                                        });
                                                });
                                                break;
                                            case 38:
                                                this.isActiveElementScrollSensitive() &&
                                                (this.instance.delta[this.directionAxis] -= 240);
                                                break;
                                            case 40:
                                                this.isActiveElementScrollSensitive() &&
                                                (this.instance.delta[this.directionAxis] += 240);
                                                break;
                                            case 33:
                                                this.instance.delta[this.directionAxis] -=
                                                    window.innerHeight;
                                                break;
                                            case 34:
                                                this.instance.delta[this.directionAxis] +=
                                                    window.innerHeight;
                                                break;
                                            case 36:
                                                this.instance.delta[this.directionAxis] -=
                                                    this.instance.limit[this.directionAxis];
                                                break;
                                            case 35:
                                                this.instance.delta[this.directionAxis] +=
                                                    this.instance.limit[this.directionAxis];
                                                break;
                                            case 32:
                                                this.isActiveElementScrollSensitive() &&
                                                (a.shiftKey
                                                    ? (this.instance.delta[this.directionAxis] -=
                                                        window.innerHeight)
                                                    : (this.instance.delta[this.directionAxis] +=
                                                        window.innerHeight));
                                                break;
                                            default:
                                                return;
                                        }
                                        this.instance.delta[this.directionAxis] < 0 &&
                                        (this.instance.delta[this.directionAxis] = 0),
                                        this.instance.delta[this.directionAxis] >
                                        this.instance.limit[this.directionAxis] &&
                                        (this.instance.delta[this.directionAxis] =
                                            this.instance.limit[this.directionAxis]),
                                            this.stopScrolling(),
                                            (this.isScrolling = !0),
                                            this.checkScroll(),
                                            this.html.classList.add(this.scrollingClass);
                                    }
                                },
                            },
                            {
                                key: 'isActiveElementScrollSensitive',
                                value: function () {
                                    return !(
                                        document.activeElement instanceof HTMLInputElement ||
                                        document.activeElement instanceof HTMLTextAreaElement ||
                                        document.activeElement instanceof HTMLButtonElement ||
                                        document.activeElement instanceof HTMLSelectElement
                                    );
                                },
                            },
                            {
                                key: 'checkScroll',
                                value: function () {
                                    var f = this,
                                        d =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0] &&
                                            arguments[0];
                                    if (d || this.isScrolling || this.isDraggingScrollbar) {
                                        this.hasScrollTicking ||
                                        ((this.checkScrollRaf = requestAnimationFrame(
                                            function () {
                                                return f.checkScroll();
                                            }
                                        )),
                                            (this.hasScrollTicking = !0)),
                                            this.updateScroll();
                                        var b = Math.abs(
                                                this.instance.delta[this.directionAxis] -
                                                this.instance.scroll[this.directionAxis]
                                            ),
                                            e = Date.now() - this.startScrollTs;
                                        if (
                                            (!this.animatingScroll &&
                                            e > 100 &&
                                            ((b < 0.5 &&
                                                    0 != this.instance.delta[this.directionAxis]) ||
                                                (b < 0.5 &&
                                                    0 == this.instance.delta[this.directionAxis])) &&
                                            this.stopScrolling(),
                                                Object.entries(this.sections).forEach(function (c) {
                                                    var b = v(c, 2),
                                                        a = (b[0], b[1]);
                                                    a.persistent ||
                                                    (f.instance.scroll[f.directionAxis] >
                                                        a.offset[f.directionAxis] &&
                                                        f.instance.scroll[f.directionAxis] <
                                                        a.limit[f.directionAxis])
                                                        ? ('horizontal' === f.direction
                                                            ? f.transform(
                                                                a.el,
                                                                -f.instance.scroll[f.directionAxis],
                                                                0
                                                            )
                                                            : f.transform(
                                                                a.el,
                                                                0,
                                                                -f.instance.scroll[f.directionAxis]
                                                            ),
                                                        a.inView ||
                                                        ((a.inView = !0),
                                                            (a.el.style.opacity = 1),
                                                            (a.el.style.pointerEvents = 'all'),
                                                            a.el.setAttribute(
                                                                'data-'.concat(f.name, '-section-inview'),
                                                                ''
                                                            )))
                                                        : ((a.inView || d) &&
                                                        ((a.inView = !1),
                                                            (a.el.style.opacity = 0),
                                                            (a.el.style.pointerEvents = 'none'),
                                                            a.el.removeAttribute(
                                                                'data-'.concat(f.name, '-section-inview')
                                                            )),
                                                            f.transform(a.el, 0, 0));
                                                }),
                                            this.getDirection && this.addDirection(),
                                            this.getSpeed &&
                                            (this.addSpeed(), (this.speedTs = Date.now())),
                                                this.detectElements(),
                                                this.transformElements(),
                                                this.hasScrollbar)
                                        ) {
                                            var c =
                                                (this.instance.scroll[this.directionAxis] /
                                                    this.instance.limit[this.directionAxis]) *
                                                this.scrollBarLimit[this.directionAxis];
                                            'horizontal' === this.direction
                                                ? this.transform(this.scrollbarThumb, c, 0)
                                                : this.transform(this.scrollbarThumb, 0, c);
                                        }
                                        u(q(a.prototype), 'checkScroll', this).call(this),
                                            (this.hasScrollTicking = !1);
                                    }
                                },
                            },
                            {
                                key: 'resize',
                                value: function () {
                                    (this.windowHeight = window.innerHeight),
                                        (this.windowWidth = window.innerWidth),
                                        this.checkContext(),
                                        (this.windowMiddle = {
                                            x: this.windowWidth / 2,
                                            y: this.windowHeight / 2,
                                        }),
                                        this.update();
                                },
                            },
                            {
                                key: 'updateDelta',
                                value: function (a) {
                                    var c,
                                        b =
                                            this[this.context] && this[this.context].gestureDirection
                                                ? this[this.context].gestureDirection
                                                : this.gestureDirection;
                                    (c =
                                        'both' === b
                                            ? a.deltaX + a.deltaY
                                            : 'vertical' === b
                                                ? a.deltaY
                                                : 'horizontal' === b
                                                    ? a.deltaX
                                                    : a.deltaY),
                                        (this.instance.delta[this.directionAxis] -=
                                            c * this.multiplier),
                                    this.instance.delta[this.directionAxis] < 0 &&
                                    (this.instance.delta[this.directionAxis] = 0),
                                    this.instance.delta[this.directionAxis] >
                                    this.instance.limit[this.directionAxis] &&
                                    (this.instance.delta[this.directionAxis] =
                                        this.instance.limit[this.directionAxis]);
                                },
                            },
                            {
                                key: 'updateScroll',
                                value: function (a) {
                                    this.isScrolling || this.isDraggingScrollbar
                                        ? (this.instance.scroll[this.directionAxis] = L(
                                            this.instance.scroll[this.directionAxis],
                                            this.instance.delta[this.directionAxis],
                                            this.lerp
                                        ))
                                        : this.instance.scroll[this.directionAxis] >
                                        this.instance.limit[this.directionAxis]
                                            ? this.setScroll(
                                                this.instance.scroll[this.directionAxis],
                                                this.instance.limit[this.directionAxis]
                                            )
                                            : this.instance.scroll.y < 0
                                                ? this.setScroll(
                                                    this.instance.scroll[this.directionAxis],
                                                    0
                                                )
                                                : this.setScroll(
                                                    this.instance.scroll[this.directionAxis],
                                                    this.instance.delta[this.directionAxis]
                                                );
                                },
                            },
                            {
                                key: 'addDirection',
                                value: function () {
                                    this.instance.delta.y > this.instance.scroll.y
                                        ? 'down' !== this.instance.direction &&
                                        (this.instance.direction = 'down')
                                        : this.instance.delta.y < this.instance.scroll.y &&
                                        'up' !== this.instance.direction &&
                                        (this.instance.direction = 'up'),
                                        this.instance.delta.x > this.instance.scroll.x
                                            ? 'right' !== this.instance.direction &&
                                            (this.instance.direction = 'right')
                                            : this.instance.delta.x < this.instance.scroll.x &&
                                            'left' !== this.instance.direction &&
                                            (this.instance.direction = 'left');
                                },
                            },
                            {
                                key: 'addSpeed',
                                value: function () {
                                    this.instance.delta[this.directionAxis] !=
                                    this.instance.scroll[this.directionAxis]
                                        ? (this.instance.speed =
                                            (this.instance.delta[this.directionAxis] -
                                                this.instance.scroll[this.directionAxis]) /
                                            Math.max(1, Date.now() - this.speedTs))
                                        : (this.instance.speed = 0);
                                },
                            },
                            {
                                key: 'initScrollBar',
                                value: function () {
                                    if (
                                        ((this.scrollbar = document.createElement('span')),
                                            (this.scrollbarThumb = document.createElement('span')),
                                            this.scrollbar.classList.add(
                                                ''.concat(this.scrollbarClass)
                                            ),
                                            this.scrollbarThumb.classList.add(
                                                ''.concat(this.scrollbarClass, '_thumb')
                                            ),
                                            this.scrollbar.append(this.scrollbarThumb),
                                            this.scrollbarContainer
                                                ? this.scrollbarContainer.append(this.scrollbar)
                                                : document.body.append(this.scrollbar),
                                            (this.getScrollBar = this.getScrollBar.bind(this)),
                                            (this.releaseScrollBar = this.releaseScrollBar.bind(this)),
                                            (this.moveScrollBar = this.moveScrollBar.bind(this)),
                                            this.scrollbarThumb.addEventListener(
                                                'mousedown',
                                                this.getScrollBar
                                            ),
                                            window.addEventListener('mouseup', this.releaseScrollBar),
                                            window.addEventListener('mousemove', this.moveScrollBar),
                                            (this.hasScrollbar = !1),
                                        'horizontal' == this.direction)
                                    ) {
                                        if (
                                            this.instance.limit.x + this.windowWidth <=
                                            this.windowWidth
                                        )
                                            return;
                                    } else if (
                                        this.instance.limit.y + this.windowHeight <=
                                        this.windowHeight
                                    )
                                        return;
                                    (this.hasScrollbar = !0),
                                        (this.scrollbarBCR =
                                            this.scrollbar.getBoundingClientRect()),
                                        (this.scrollbarHeight = this.scrollbarBCR.height),
                                        (this.scrollbarWidth = this.scrollbarBCR.width),
                                        'horizontal' === this.direction
                                            ? (this.scrollbarThumb.style.width = ''.concat(
                                                (this.scrollbarWidth * this.scrollbarWidth) /
                                                (this.instance.limit.x + this.scrollbarWidth),
                                                'px'
                                            ))
                                            : (this.scrollbarThumb.style.height = ''.concat(
                                                (this.scrollbarHeight * this.scrollbarHeight) /
                                                (this.instance.limit.y + this.scrollbarHeight),
                                                'px'
                                            )),
                                        (this.scrollbarThumbBCR =
                                            this.scrollbarThumb.getBoundingClientRect()),
                                        (this.scrollBarLimit = {
                                            x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                                            y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
                                        });
                                },
                            },
                            {
                                key: 'reinitScrollBar',
                                value: function () {
                                    if (
                                        ((this.hasScrollbar = !1), 'horizontal' == this.direction)
                                    ) {
                                        if (
                                            this.instance.limit.x + this.windowWidth <=
                                            this.windowWidth
                                        )
                                            return;
                                    } else if (
                                        this.instance.limit.y + this.windowHeight <=
                                        this.windowHeight
                                    )
                                        return;
                                    (this.hasScrollbar = !0),
                                        (this.scrollbarBCR =
                                            this.scrollbar.getBoundingClientRect()),
                                        (this.scrollbarHeight = this.scrollbarBCR.height),
                                        (this.scrollbarWidth = this.scrollbarBCR.width),
                                        'horizontal' === this.direction
                                            ? (this.scrollbarThumb.style.width = ''.concat(
                                                (this.scrollbarWidth * this.scrollbarWidth) /
                                                (this.instance.limit.x + this.scrollbarWidth),
                                                'px'
                                            ))
                                            : (this.scrollbarThumb.style.height = ''.concat(
                                                (this.scrollbarHeight * this.scrollbarHeight) /
                                                (this.instance.limit.y + this.scrollbarHeight),
                                                'px'
                                            )),
                                        (this.scrollbarThumbBCR =
                                            this.scrollbarThumb.getBoundingClientRect()),
                                        (this.scrollBarLimit = {
                                            x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                                            y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
                                        });
                                },
                            },
                            {
                                key: 'destroyScrollBar',
                                value: function () {
                                    this.scrollbarThumb.removeEventListener(
                                        'mousedown',
                                        this.getScrollBar
                                    ),
                                        window.removeEventListener(
                                            'mouseup',
                                            this.releaseScrollBar
                                        ),
                                        window.removeEventListener('mousemove', this.moveScrollBar),
                                        this.scrollbar.remove();
                                },
                            },
                            {
                                key: 'getScrollBar',
                                value: function (a) {
                                    (this.isDraggingScrollbar = !0),
                                        this.checkScroll(),
                                        this.html.classList.remove(this.scrollingClass),
                                        this.html.classList.add(this.draggingClass);
                                },
                            },
                            {
                                key: 'releaseScrollBar',
                                value: function (a) {
                                    (this.isDraggingScrollbar = !1),
                                    this.isScrolling &&
                                    this.html.classList.add(this.scrollingClass),
                                        this.html.classList.remove(this.draggingClass);
                                },
                            },
                            {
                                key: 'moveScrollBar',
                                value: function (a) {
                                    var b = this;
                                    this.isDraggingScrollbar &&
                                    requestAnimationFrame(function () {
                                        var c =
                                                (((100 * (a.clientX - b.scrollbarBCR.left)) /
                                                        b.scrollbarWidth) *
                                                    b.instance.limit.x) /
                                                100,
                                            d =
                                                (((100 * (a.clientY - b.scrollbarBCR.top)) /
                                                        b.scrollbarHeight) *
                                                    b.instance.limit.y) /
                                                100;
                                        d > 0 &&
                                        d < b.instance.limit.y &&
                                        (b.instance.delta.y = d),
                                        c > 0 &&
                                        c < b.instance.limit.x &&
                                        (b.instance.delta.x = c);
                                    });
                                },
                            },
                            {
                                key: 'addElements',
                                value: function () {
                                    var a = this;
                                    (this.els = {}),
                                        (this.parallaxElements = {}),
                                        this.el
                                            .querySelectorAll('[data-'.concat(this.name, ']'))
                                            .forEach(function (b, y) {
                                                var e,
                                                    f,
                                                    g,
                                                    D = N(b),
                                                    i = Object.entries(a.sections)
                                                        .map(function (b) {
                                                            var a = v(b, 2);
                                                            return a[0], a[1];
                                                        })
                                                        .find(function (a) {
                                                            return D.includes(a.el);
                                                        }),
                                                    p = b.dataset[a.name + 'Class'] || a.class,
                                                    j =
                                                        'string' == typeof b.dataset[a.name + 'Id']
                                                            ? b.dataset[a.name + 'Id']
                                                            : 'el' + y,
                                                    l = b.dataset[a.name + 'Repeat'],
                                                    z = b.dataset[a.name + 'Call'],
                                                    A = b.dataset[a.name + 'Position'],
                                                    B = b.dataset[a.name + 'Delay'],
                                                    C = b.dataset[a.name + 'Direction'],
                                                    o = 'string' == typeof b.dataset[a.name + 'Sticky'],
                                                    q =
                                                        !!b.dataset[a.name + 'Speed'] &&
                                                        parseFloat(b.dataset[a.name + 'Speed']) / 10,
                                                    d =
                                                        'string' == typeof b.dataset[a.name + 'Offset']
                                                            ? b.dataset[a.name + 'Offset'].split(',')
                                                            : a.offset,
                                                    _ = b.dataset[a.name + 'Target'],
                                                    m = (g =
                                                        void 0 !== _
                                                            ? document.querySelector(''.concat(_))
                                                            : b).getBoundingClientRect();
                                                null === i || i.inView
                                                    ? ((e = m.top + a.instance.scroll.y - M(g).y),
                                                        (f = m.left + a.instance.scroll.x - M(g).x))
                                                    : ((e = m.top - M(i.el).y - M(g).y),
                                                        (f = m.left - M(i.el).x - M(g).x));
                                                var k = e + g.offsetHeight,
                                                    n = f + g.offsetWidth,
                                                    r = {x: (n - f) / 2 + f, y: (k - e) / 2 + e};
                                                if (o) {
                                                    var s = b.getBoundingClientRect(),
                                                        t = s.top,
                                                        u = s.left,
                                                        w = {x: u - f, y: t - e};
                                                    (e += window.innerHeight),
                                                        (f += window.innerWidth),
                                                        (k =
                                                            t +
                                                            g.offsetHeight -
                                                            b.offsetHeight -
                                                            w[a.directionAxis]),
                                                        (r = {
                                                            x:
                                                                ((n =
                                                                        u +
                                                                        g.offsetWidth -
                                                                        b.offsetWidth -
                                                                        w[a.directionAxis]) -
                                                                    f) /
                                                                2 +
                                                                f,
                                                            y: (k - e) / 2 + e,
                                                        });
                                                }
                                                l = 'false' != l && (null != l || a.repeat);
                                                var h = [0, 0];
                                                if (d) {
                                                    if ('horizontal' === a.direction) {
                                                        for (var c = 0; c < d.length; c++)
                                                            'string' == typeof d[c]
                                                                ? d[c].includes('%')
                                                                    ? (h[c] = parseInt(
                                                                        (d[c].replace('%', '') * a.windowWidth) /
                                                                        100
                                                                    ))
                                                                    : (h[c] = parseInt(d[c]))
                                                                : (h[c] = d[c]);
                                                        (f += h[0]), (n -= h[1]);
                                                    } else {
                                                        for (c = 0; c < d.length; c++)
                                                            'string' == typeof d[c]
                                                                ? d[c].includes('%')
                                                                    ? (h[c] = parseInt(
                                                                        (d[c].replace('%', '') * a.windowHeight) /
                                                                        100
                                                                    ))
                                                                    : (h[c] = parseInt(d[c]))
                                                                : (h[c] = d[c]);
                                                        (e += h[0]), (k -= h[1]);
                                                    }
                                                }
                                                var x = {
                                                    el: b,
                                                    id: j,
                                                    class: p,
                                                    section: i,
                                                    top: e,
                                                    middle: r,
                                                    bottom: k,
                                                    left: f,
                                                    right: n,
                                                    offset: d,
                                                    progress: 0,
                                                    repeat: l,
                                                    inView: !1,
                                                    call: z,
                                                    speed: q,
                                                    delay: B,
                                                    position: A,
                                                    target: g,
                                                    direction: C,
                                                    sticky: o,
                                                };
                                                (a.els[j] = x),
                                                b.classList.contains(p) && a.setInView(a.els[j], j),
                                                (!1 !== q || o) && (a.parallaxElements[j] = x);
                                            });
                                },
                            },
                            {
                                key: 'addSections',
                                value: function () {
                                    var b = this;
                                    this.sections = {};
                                    var a = this.el.querySelectorAll(
                                        '[data-'.concat(this.name, '-section]')
                                    );
                                    0 === a.length && (a = [this.el]),
                                        a.forEach(function (a, f) {
                                            var d =
                                                    'string' == typeof a.dataset[b.name + 'Id']
                                                        ? a.dataset[b.name + 'Id']
                                                        : 'section' + f,
                                                c = a.getBoundingClientRect(),
                                                e = {
                                                    x: c.left - 1.5 * window.innerWidth - M(a).x,
                                                    y: c.top - 1.5 * window.innerHeight - M(a).y,
                                                },
                                                g = {
                                                    x: e.x + c.width + 2 * window.innerWidth,
                                                    y: e.y + c.height + 2 * window.innerHeight,
                                                },
                                                h = 'string' == typeof a.dataset[b.name + 'Persistent'];
                                            a.setAttribute('data-scroll-section-id', d),
                                                (b.sections[d] = {
                                                    el: a,
                                                    offset: e,
                                                    limit: g,
                                                    inView: !1,
                                                    persistent: h,
                                                    id: d,
                                                    //update when scroll
                                                    update: function () {
                                                        var a = b.instance.scroll.y,
                                                            c = b.instance.scroll.x;
                                                        this.inView =
                                                            a > this.offset.y &&
                                                            a < this.limit.y &&
                                                            c > this.offset.x &&
                                                            c < this.limit.x;
                                                    },
                                                });
                                        });
                                },
                            },
                            {
                                key: 'transform',
                                value: function (b, d, e, c) {
                                    var a;
                                    if (c) {
                                        var f = M(b),
                                            g = L(f.x, d, c),
                                            h = L(f.y, e, c);
                                        a = 'matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,'
                                            .concat(g, ',')
                                            .concat(h, ',0,1)');
                                    } else
                                        a = 'matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,'
                                            .concat(d, ',')
                                            .concat(e, ',0,1)');
                                    (b.style.webkitTransform = a),
                                        (b.style.msTransform = a),
                                        (b.style.transform = a);
                                },
                            },
                            {
                                key: 'transformElements',
                                value: function (a) {
                                    var b = this,
                                        c =
                                            arguments.length > 1 &&
                                            void 0 !== arguments[1] &&
                                            arguments[1],
                                        d = this.instance.scroll.x + this.windowWidth,
                                        e = this.instance.scroll.y + this.windowHeight,
                                        f = {
                                            x: this.instance.scroll.x + this.windowMiddle.x,
                                            y: this.instance.scroll.y + this.windowMiddle.y,
                                        };
                                    Object.entries(this.parallaxElements).forEach(function (j) {
                                        var i = v(j, 2),
                                            g = (i[0], i[1]),
                                            h = !1;
                                        if ((a && (h = 0), g.inView || c))
                                            switch (g.position) {
                                                case 'top':
                                                case 'left':
                                                    h = -(b.instance.scroll[b.directionAxis] * g.speed);
                                                    break;
                                                case 'elementTop':
                                                    h = -((e - g.top) * g.speed);
                                                    break;
                                                case 'bottom':
                                                    h =
                                                        (b.instance.limit[b.directionAxis] -
                                                            e +
                                                            b.windowHeight) *
                                                        g.speed;
                                                    break;
                                                case 'elementLeft':
                                                    h = -((d - g.left) * g.speed);
                                                    break;
                                                case 'right':
                                                    h =
                                                        (b.instance.limit[b.directionAxis] -
                                                            d +
                                                            b.windowHeight) *
                                                        g.speed;
                                                    break;
                                                default:
                                                    h = -(
                                                        (f[b.directionAxis] - g.middle[b.directionAxis]) *
                                                        g.speed
                                                    );
                                            }
                                        g.sticky &&
                                        (h = g.inView
                                            ? 'horizontal' === b.direction
                                                ? b.instance.scroll.x - g.left + window.innerWidth
                                                : b.instance.scroll.y - g.top + window.innerHeight
                                            : 'horizontal' === b.direction
                                                ? b.instance.scroll.x < g.left - window.innerWidth &&
                                                b.instance.scroll.x < g.left - window.innerWidth / 2
                                                    ? 0
                                                    : b.instance.scroll.x > g.right &&
                                                    b.instance.scroll.x > g.right + 100 &&
                                                    g.right - g.left + window.innerWidth
                                                : b.instance.scroll.y < g.top - window.innerHeight &&
                                                b.instance.scroll.y < g.top - window.innerHeight / 2
                                                    ? 0
                                                    : b.instance.scroll.y > g.bottom &&
                                                    b.instance.scroll.y > g.bottom + 100 &&
                                                    g.bottom - g.top + window.innerHeight),
                                        !1 !== h &&
                                        ('horizontal' === g.direction ||
                                        ('horizontal' === b.direction &&
                                            'vertical' !== g.direction)
                                            ? b.transform(g.el, h, 0, !a && g.delay)
                                            : b.transform(g.el, 0, h, !a && g.delay));
                                    });
                                },
                            },
                            {
                                key: 'scrollTo',
                                value: function (a) {
                                    var d,
                                        m = this,
                                        b =
                                            arguments.length > 1 && void 0 !== arguments[1]
                                                ? arguments[1]
                                                : {},
                                        c = parseInt(b.offset) || 0,
                                        n = isNaN(parseInt(b.duration))
                                            ? 1e3
                                            : parseInt(b.duration),
                                        f = b.easing || [0.25, 0, 0.35, 1],
                                        o = !!b.disableLerp,
                                        p = !!b.callback && b.callback;
                                    if (
                                        ((f = U.apply(
                                            void 0,
                                            (function (a) {
                                                if (Array.isArray(a)) return x(a);
                                            })((d = f)) ||
                                            (function (a) {
                                                if (
                                                    'undefined' != typeof Symbol &&
                                                    Symbol.iterator in Object(a)
                                                )
                                                    return Array.from(a);
                                            })(d) ||
                                            w(d) ||
                                            (function () {
                                                throw new TypeError(
                                                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                                );
                                            })()
                                        )),
                                        'string' == typeof a)
                                    ) {
                                        if ('top' === a) a = 0;
                                        else if ('bottom' === a) a = this.instance.limit.y;
                                        else if ('left' === a) a = 0;
                                        else if ('right' === a) a = this.instance.limit.x;
                                        else if (!(a = document.querySelector(a))) return;
                                    } else if ('number' == typeof a) a = parseInt(a);
                                    else if (!a || !a.tagName)
                                        return void console.warn('`target` parameter is not valid');
                                    if ('number' != typeof a) {
                                        if (!N(a).includes(this.el)) return;
                                        var g = a.getBoundingClientRect(),
                                            i = g.top,
                                            j = g.left,
                                            k = N(a),
                                            h = k.find(function (a) {
                                                return Object.entries(m.sections)
                                                    .map(function (b) {
                                                        var a = v(b, 2);
                                                        return a[0], a[1];
                                                    })
                                                    .find(function (b) {
                                                        return b.el == a;
                                                    });
                                            }),
                                            e = 0;
                                        (e = h
                                            ? M(h)[this.directionAxis]
                                            : -this.instance.scroll[this.directionAxis]),
                                            (c =
                                                'horizontal' === this.direction
                                                    ? j + c - e
                                                    : i + c - e);
                                    } else c = a + c;
                                    var l = parseFloat(this.instance.delta[this.directionAxis]),
                                        _ =
                                            Math.max(
                                                0,
                                                Math.min(c, this.instance.limit[this.directionAxis])
                                            ) - l,
                                        q = function (a) {
                                            o
                                                ? 'horizontal' === m.direction
                                                    ? m.setScroll(l + _ * a, m.instance.delta.y)
                                                    : m.setScroll(m.instance.delta.x, l + _ * a)
                                                : (m.instance.delta[m.directionAxis] = l + _ * a);
                                        };
                                    (this.animatingScroll = !0),
                                        this.stopScrolling(),
                                        this.startScrolling();
                                    var r = Date.now();
                                    (function b() {
                                        var a = (Date.now() - r) / n;
                                        a > 1
                                            ? (q(1),
                                                (m.animatingScroll = !1),
                                            0 == n && m.update(),
                                            p && p())
                                            : ((m.scrollToRaf = requestAnimationFrame(b)), q(f(a)));
                                    })();
                                },
                            },
                            {
                                key: 'update',
                                value: function () {
                                    this.setScrollLimit(),
                                        this.addSections(),
                                        this.addElements(),
                                        this.detectElements(),
                                        this.updateScroll(),
                                        this.transformElements(!0),
                                        this.reinitScrollBar(),
                                        this.checkScroll(!0);
                                },
                            },
                            {
                                key: 'startScroll',
                                value: function () {
                                    this.stop = !1;
                                },
                            },
                            {
                                key: 'stopScroll',
                                value: function () {
                                    this.stop = !0;
                                },
                            },
                            {
                                key: 'setScroll',
                                value: function (a, b) {
                                    this.instance = o(
                                        o({}, this.instance),
                                        {},
                                        {scroll: {x: a, y: b}, delta: {x: a, y: b}, speed: 0}
                                    );
                                },
                            },
                            {
                                key: 'destroy',
                                value: function () {
                                    u(q(a.prototype), 'destroy', this).call(this),
                                        this.stopScrolling(),
                                        this.html.classList.remove(this.smoothClass),
                                        this.vs.destroy(),
                                        this.destroyScrollBar(),
                                        window.removeEventListener('keydown', this.checkKey, !1);
                                },
                            },
                        ]),
                            a
                    );
                })(d),
                i = (function () {
                    function a() {
                        var b =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {};
                        j(this, a),
                            (this.options = b),
                            Object.assign(this, _, b),
                            (this.smartphone = _.smartphone),
                        b.smartphone && Object.assign(this.smartphone, b.smartphone),
                            (this.tablet = _.tablet),
                        b.tablet && Object.assign(this.tablet, b.tablet),
                        this.smooth ||
                        'horizontal' != this.direction ||
                        console.warn(
                            '\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible'
                        ),
                        this.tablet.smooth ||
                        'horizontal' != this.tablet.direction ||
                        console.warn(
                            '\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible (tablet)'
                        ),
                        this.smartphone.smooth ||
                        'horizontal' != this.smartphone.direction ||
                        console.warn(
                            '\u{1F6A8} `smooth:false` & `horizontal` direction are not yet compatible (smartphone)'
                        ),
                            this.init();
                    }

                    return (
                        l(a, [
                            {
                                key: 'init',
                                value: function () {
                                    if (
                                        ((this.options.isMobile =
                                            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                                navigator.userAgent
                                            ) ||
                                            ('MacIntel' === navigator.platform &&
                                                navigator.maxTouchPoints > 1) ||
                                            window.innerWidth < this.tablet.breakpoint),
                                            (this.options.isTablet =
                                                this.options.isMobile &&
                                                window.innerWidth >= this.tablet.breakpoint),
                                            (this.smooth && !this.options.isMobile) ||
                                            (this.tablet.smooth && this.options.isTablet) ||
                                            (this.smartphone.smooth &&
                                                this.options.isMobile &&
                                                !this.options.isTablet)
                                                ? (this.scroll = new V(this.options))
                                                : (this.scroll = new z(this.options)),
                                            this.scroll.init(),
                                            window.location.hash)
                                    ) {
                                        var b = window.location.hash.slice(
                                                1,
                                                window.location.hash.length
                                            ),
                                            a = document.getElementById(b);
                                        a && this.scroll.scrollTo(a);
                                    }
                                },
                            },
                            {
                                key: 'update',
                                value: function () {
                                    this.scroll.update();
                                },
                            },
                            {
                                key: 'start',
                                value: function () {
                                    this.scroll.startScroll();
                                },
                            },
                            {
                                key: 'stop',
                                value: function () {
                                    this.scroll.stopScroll();
                                },
                            },
                            {
                                key: 'scrollTo',
                                value: function (a, b) {
                                    this.scroll.scrollTo(a, b);
                                },
                            },
                            {
                                key: 'setScroll',
                                value: function (a, b) {
                                    this.scroll.setScroll(a, b);
                                },
                            },
                            {
                                key: 'on',
                                value: function (a, b) {
                                    this.scroll.setEvents(a, b);
                                },
                            },
                            {
                                key: 'off',
                                value: function (a, b) {
                                    this.scroll.unsetEvents(a, b);
                                },
                            },
                            {
                                key: 'destroy',
                                value: function () {
                                    this.scroll.destroy();
                                },
                            },
                        ]),
                            a
                    );
                })();
            c.a = i;
        }.call(this, a(3)));
    },
    function (a, b, c) {
    },
    function (a, b) {
    },
    function (b, c) {
        var a;
        a = (function () {
            return this;
        })();
        try {
            a = a || new Function('return this')();
        } catch (d) {
            'object' == typeof window && (a = window);
        }
        b.exports = a;
    },
    function (aB, E, h) {
        'use strict';
        h.r(E), h(1), h(2);
        var F = h(0);

        function aC(a) {
            if (void 0 === a)
                throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                );
            return a;
        }

        function aD(a, b) {
            (a.prototype = Object.create(b.prototype)),
                (a.prototype.constructor = a),
                (a.__proto__ = b);
        }

        var aE,
            q,
            aF,
            aG,
            aH,
            G,
            aI,
            H,
            aJ,
            aK,
            aL,
            aM,
            I,
            _,
            aN,
            r,
            J,
            K,
            L,
            M,
            N,
            O,
            P,
            Q,
            R,
            S,
            T,
            U,
            V = {
                autoSleep: 120,
                force3D: 'auto',
                nullTargetWarn: 1,
                units: {lineHeight: ''},
            },
            s = {duration: 0.5, overwrite: !1, delay: 0},
            aO = 1e8,
            $ = 2 * Math.PI,
            aP = $ / 4,
            aQ = 0,
            aR = Math.sqrt,
            aS = Math.cos,
            aT = Math.sin,
            aU = function (a) {
                return 'string' == typeof a;
            },
            aV = function (a) {
                return 'function' == typeof a;
            },
            aW = function (a) {
                return 'number' == typeof a;
            },
            aX = function (a) {
                return void 0 === a;
            },
            aY = function (a) {
                return 'object' == typeof a;
            },
            aZ = function (a) {
                return !1 !== a;
            },
            W = function () {
                return 'undefined' != typeof window;
            },
            a$ = function (a) {
                return aV(a) || aU(a);
            },
            a_ =
                ('function' == typeof ArrayBuffer && ArrayBuffer.isView) ||
                function () {
                },
            a0 = Array.isArray,
            a1 = /(?:-?\.?\d|\.)+/gi,
            a2 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
            a3 = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
            a4 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
            a5 = /[+-]=-?[.\d]+/,
            a6 = /[^,'"\[\]\s]+/gi,
            a7 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
            f = {},
            a8 = {},
            X = function (a) {
                return (a8 = bq(a, f)) && g;
            },
            a9 = function (a, b) {
                return console.warn(
                    'Invalid property',
                    a,
                    'set to',
                    b,
                    'Missing plugin? gsap.registerPlugin()'
                );
            },
            ba = function (a, b) {
                return !b && console.warn(a);
            },
            Y = function (a, b) {
                return (a && (f[a] = b) && a8 && (a8[a] = b)) || f;
            },
            t = function () {
                return 0;
            },
            bb = {},
            bc = [],
            bd = {},
            Z = {},
            aa = {},
            be = 30,
            bf = [],
            u = '',
            bg = function (b) {
                var d,
                    a,
                    c = b[0];
                if ((aY(c) || aV(c) || (b = [b]), !(d = (c._gsap || {}).harness))) {
                    for (a = bf.length; a-- && !bf[a].targetTest(c);) ;
                    d = bf[a];
                }
                for (a = b.length; a--;)
                    (b[a] && (b[a]._gsap || (b[a]._gsap = new b9(b[a], d)))) ||
                    b.splice(a, 1);
                return b;
            },
            ab = function (a) {
                return a._gsap || bg(ae(a))[0]._gsap;
            },
            bh = function (a, c, b) {
                return (b = a[c]) && aV(b)
                    ? a[c]()
                    : (aX(b) && a.getAttribute && a.getAttribute(c)) || b;
            },
            c = function (a, b) {
                return (a = a.split(',')).forEach(b) || a;
            },
            bi = function (a) {
                return Math.round(1e5 * a) / 1e5 || 0;
            },
            bj = function (a) {
                return Math.round(1e7 * a) / 1e7 || 0;
            },
            bk = function (a, d) {
                var c = d.charAt(0),
                    b = parseFloat(d.substr(2));
                return (
                    (a = parseFloat(a)),
                        '+' === c ? a + b : '-' === c ? a - b : '*' === c ? a * b : a / b
                );
            },
            bl = function (d, b) {
                for (var c = b.length, a = 0; 0 > d.indexOf(b[a]) && ++a < c;) ;
                return a < c;
            },
            bm = function () {
                var b,
                    a,
                    c = bc.length,
                    d = bc.slice(0);
                for (bd = {}, bc.length = 0, b = 0; b < c; b++)
                    (a = d[b]) &&
                    a._lazy &&
                    (a.render(a._lazy[0], a._lazy[1], !0)._lazy = 0);
            },
            bn = function (a, b, c, d) {
                bc.length && bm(), a.render(b, c, d), bc.length && bm();
            },
            bo = function (a) {
                var b = parseFloat(a);
                return (b || 0 === b) && (a + '').match(a6).length < 2
                    ? b
                    : aU(a)
                        ? a.trim()
                        : a;
            },
            bp = function (a) {
                return a;
            },
            k = function (a, c) {
                for (var b in c) b in a || (a[b] = c[b]);
                return a;
            },
            bq = function (a, b) {
                for (var c in b) a[c] = b[c];
                return a;
            },
            br = function d(b, c) {
                for (var a in c)
                    '__proto__' !== a &&
                    'constructor' !== a &&
                    'prototype' !== a &&
                    (b[a] = aY(c[a]) ? d(b[a] || (b[a] = {}), c[a]) : c[a]);
                return b;
            },
            bs = function (b, d) {
                var a,
                    c = {};
                for (a in b) a in d || (c[a] = b[a]);
                return c;
            },
            bt = function (a) {
                var c,
                    b = a.parent || q,
                    d = a.keyframes
                        ? ((c = a0(a.keyframes)),
                            function (b, d) {
                                for (var a in d)
                                    a in b ||
                                    ('duration' === a && c) ||
                                    'ease' === a ||
                                    (b[a] = d[a]);
                            })
                        : k;
                if (aZ(a.inherit))
                    for (; b;) d(a, b.vars.defaults), (b = b.parent || b._dp);
                return a;
            },
            bu = function (c, a, d, e, f) {
                void 0 === d && (d = '_first'), void 0 === e && (e = '_last');
                var g,
                    b = c[e];
                if (f) for (g = a[f]; b && b[f] > g;) b = b._prev;
                return (
                    b
                        ? ((a._next = b._next), (b._next = a))
                        : ((a._next = c[d]), (c[d] = a)),
                        a._next ? (a._next._prev = a) : (c[e] = a),
                        (a._prev = b),
                        (a.parent = a._dp = c),
                        a
                );
            },
            ac = function (b, a, c, d) {
                void 0 === c && (c = '_first'), void 0 === d && (d = '_last');
                var e = a._prev,
                    f = a._next;
                e ? (e._next = f) : b[c] === a && (b[c] = f),
                    f ? (f._prev = e) : b[d] === a && (b[d] = e),
                    (a._next = a._prev = a.parent = null);
            },
            bv = function (a, b) {
                a.parent && (!b || a.parent.autoRemoveChildren) && a.parent.remove(a),
                    (a._act = 0);
            },
            bw = function (a, c) {
                if (a && (!c || c._end > a._dur || c._start < 0))
                    for (var b = a; b;) (b._dirty = 1), (b = b.parent);
                return a;
            },
            bx = function (b) {
                for (var a = b.parent; a && a.parent;)
                    (a._dirty = 1), a.totalDuration(), (a = a.parent);
                return b;
            },
            by = function (a) {
                return a._repeat ? bz(a._tTime, (a = a.duration() + a._rDelay)) * a : 0;
            },
            bz = function (a, c) {
                var b = Math.floor((a /= c));
                return a && b === a ? b - 1 : b;
            },
            bA = function (b, a) {
                return (
                    (b - a._start) * a._ts +
                    (a._ts >= 0 ? 0 : a._dirty ? a.totalDuration() : a._tDur)
                );
            },
            bB = function (a) {
                return (a._end = bj(
                    a._start + (a._tDur / Math.abs(a._ts || a._rts || 1e-8) || 0)
                ));
            },
            bC = function (a, c) {
                var b = a._dp;
                return (
                    b &&
                    b.smoothChildTiming &&
                    a._ts &&
                    ((a._start = bj(
                        b._time -
                        (a._ts > 0
                            ? c / a._ts
                            : -(((a._dirty ? a.totalDuration() : a._tDur) - c) / a._ts))
                    )),
                        bB(a),
                    b._dirty || bw(b, a)),
                        a
                );
            },
            bD = function (a, c) {
                var b;
                if (
                    ((c._time || (c._initted && !c._dur)) &&
                    ((b = bA(a.rawTime(), c)),
                    (!c._dur || bO(0, c.totalDuration(), b) - c._tTime > 1e-8) &&
                    c.render(b, !0)),
                    bw(a, c)._dp && a._initted && a._time >= a._dur && a._ts)
                ) {
                    if (a._dur < a.duration())
                        for (b = a; b._dp;)
                            b.rawTime() >= 0 && b.totalTime(b._tTime), (b = b._dp);
                    a._zTime = -0.00000001;
                }
            },
            bE = function (b, a, c, d) {
                return (
                    a.parent && bv(a),
                        (a._start = bj(
                            (aW(c) ? c : c || b !== q ? bL(b, c, a) : b._time) + a._delay
                        )),
                        (a._end = bj(
                            a._start + (a.totalDuration() / Math.abs(a.timeScale()) || 0)
                        )),
                        bu(b, a, '_first', '_last', b._sort ? '_start' : 0),
                    bH(a) || (b._recent = a),
                    d || bD(b, a),
                        b
                );
            },
            bF = function (b, a) {
                return (
                    (f.ScrollTrigger || a9('scrollTrigger', a)) &&
                    f.ScrollTrigger.create(a, b)
                );
            },
            bG = function (a, b, c, d) {
                return (
                    cf(a, b),
                        a._initted
                            ? !c &&
                            a._pt &&
                            ((a._dur && !1 !== a.vars.lazy) || (!a._dur && a.vars.lazy)) &&
                            aI !== w.frame
                                ? (bc.push(a), (a._lazy = [b, d]), 1)
                                : void 0
                            : 1
                );
            },
            bH = function (b) {
                var a = b.data;
                return 'isFromStart' === a || 'isStart' === a;
            },
            bI = function (a, f, g, e) {
                var b = a._repeat,
                    c = bj(f) || 0,
                    d = a._tTime / a._tDur;
                return (
                    d && !e && (a._time *= c / a._dur),
                        (a._dur = c),
                        (a._tDur = b ? (b < 0 ? 1e10 : bj(c * (b + 1) + a._rDelay * b)) : c),
                        d > 0 && !e ? bC(a, (a._tTime = a._tDur * d)) : a.parent && bB(a),
                    g || bw(a.parent, a),
                        a
                );
            },
            bJ = function (a) {
                return a instanceof d ? bw(a) : bI(a, a._dur);
            },
            bK = {_start: 0, endTime: t, totalDuration: t},
            bL = function j(e, a, d) {
                var c,
                    b,
                    h,
                    g = e.labels,
                    f = e._recent || bK,
                    i = e.duration() >= aO ? f.endTime(!1) : e._dur;
                return aU(a) && (isNaN(a) || a in g)
                    ? ((b = a.charAt(0)),
                        (h = '%' === a.substr(-1)),
                        (c = a.indexOf('=')),
                        '<' === b || '>' === b
                            ? (c >= 0 && (a = a.replace(/=/, '')),
                            ('<' === b ? f._start : f.endTime(f._repeat >= 0)) +
                            (parseFloat(a.substr(1)) || 0) *
                            (h ? (c < 0 ? f : d).totalDuration() / 100 : 1))
                            : c < 0
                                ? (a in g || (g[a] = i), g[a])
                                : ((b = parseFloat(a.charAt(c - 1) + a.substr(c + 1))),
                                h && d && (b = (b / 100) * (a0(d) ? d[0] : d).totalDuration()),
                                    c > 1 ? j(e, a.substr(0, c - 1), d) + b : i + b))
                    : null == a
                        ? i
                        : +a;
            },
            bM = function (e, b, g) {
                var d,
                    c,
                    h = aW(b[1]),
                    f = (h ? 2 : 1) + (e < 2 ? 0 : 1),
                    a = b[f];
                if ((h && (a.duration = b[1]), (a.parent = g), e)) {
                    for (d = a, c = g; c && !('immediateRender' in d);)
                        (d = c.vars.defaults || {}), (c = aZ(c.vars.inherit) && c.parent);
                    (a.immediateRender = aZ(d.immediateRender)),
                        e < 2 ? (a.runBackwards = 1) : (a.startAt = b[f - 1]);
                }
                return new j(b[0], a, b[f + 1]);
            },
            bN = function (a, b) {
                return a || 0 === a ? b(a) : b;
            },
            bO = function (b, c, a) {
                return a < b ? b : a > c ? c : a;
            },
            ad = function (a, b) {
                return aU(a) && (b = a7.exec(a)) ? b[1] : '';
            },
            bP = [].slice,
            bQ = function (a, b) {
                return (
                    a &&
                    aY(a) &&
                    'length' in a &&
                    ((!b && !a.length) || (a.length - 1 in a && aY(a[0]))) &&
                    !a.nodeType &&
                    a !== aF
                );
            },
            bR = function (b, c, a) {
                return (
                    void 0 === a && (a = []),
                    b.forEach(function (b) {
                        var d;
                        return (aU(b) && !c) || bQ(b, 1)
                            ? (d = a).push.apply(d, ae(b))
                            : a.push(b);
                    }) || a
                );
            },
            ae = function (a, c, b) {
                return !aU(a) || b || (!aG && am())
                    ? a0(a)
                        ? bR(a, b)
                        : bQ(a)
                            ? bP.call(a, 0)
                            : a
                                ? [a]
                                : []
                    : bP.call((c || aH).querySelectorAll(a), 0);
            },
            af = function (a) {
                return a.sort(function () {
                    return 0.5 - Math.random();
                });
            },
            ag = function (b) {
                if (aV(b)) return b;
                var c = aY(b) ? b : {each: b},
                    h = b7(c.ease),
                    a = c.from || 0,
                    i = parseFloat(c.base) || 0,
                    j = {},
                    d = a > 0 && a < 1,
                    g = isNaN(a) || d,
                    k = c.axis,
                    e = a,
                    f = a;
                return (
                    aU(a)
                        ? (e = f = {center: 0.5, edges: 0.5, end: 1}[a] || 0)
                        : !d && g && ((e = a[0]), (f = a[1])),
                        function (u, v, r) {
                            var s,
                                t,
                                p,
                                q,
                                o,
                                n,
                                m,
                                _,
                                d,
                                b = (r || c).length,
                                l = j[b];
                            if (!l) {
                                if (!(d = 'auto' === c.grid ? 0 : (c.grid || [1, aO])[1])) {
                                    for (
                                        m = -aO;
                                        m < (m = r[d++].getBoundingClientRect().left) && d < b;
                                    ) ;
                                    d--;
                                }
                                for (
                                    l = j[b] = [],
                                        s = g ? Math.min(d, b) * e - 0.5 : a % d,
                                        t = d === aO ? 0 : g ? (b * f) / d - 0.5 : (a / d) | 0,
                                        m = 0,
                                        _ = aO,
                                        n = 0;
                                    n < b;
                                    n++
                                )
                                    (p = (n % d) - s),
                                        (q = t - ((n / d) | 0)),
                                        (l[n] = o =
                                            k ? Math.abs('y' === k ? q : p) : aR(p * p + q * q)),
                                    o > m && (m = o),
                                    o < _ && (_ = o);
                                'random' === a && af(l),
                                    (l.max = m - _),
                                    (l.min = _),
                                    (l.v = b =
                                        (parseFloat(c.amount) ||
                                            parseFloat(c.each) *
                                            (d > b
                                                ? b - 1
                                                : k
                                                    ? 'y' === k
                                                        ? b / d
                                                        : d
                                                    : Math.max(d, b / d)) ||
                                            0) * ('edges' === a ? -1 : 1)),
                                    (l.b = b < 0 ? i - b : i),
                                    (l.u = ad(c.amount || c.each) || 0),
                                    (h = h && b < 0 ? b5(h) : h);
                            }
                            return (
                                (b = (l[u] - l.min) / l.max || 0),
                                bj(l.b + (h ? h(b) : b) * l.v) + l.u
                            );
                        }
                );
            },
            ah = function (a) {
                var b = Math.pow(10, ((a + '').split('.')[1] || '').length);
                return function (c) {
                    var d = Math.round(parseFloat(c) / a) * a * b;
                    return (d - (d % 1)) / b + (aW(c) ? 0 : ad(c));
                };
            },
            v = function (a, d) {
                var b,
                    e,
                    c = a0(a);
                return (
                    !c &&
                    aY(a) &&
                    ((b = c = a.radius || aO),
                        a.values
                            ? ((a = ae(a.values)), (e = !aW(a[0])) && (b *= b))
                            : (a = ah(a.increment))),
                        bN(
                            d,
                            c
                                ? aV(a)
                                    ? function (c) {
                                        return Math.abs((e = a(c)) - c) <= b ? e : c;
                                    }
                                    : function (c) {
                                        for (
                                            var g,
                                                i,
                                                j = parseFloat(e ? c.x : c),
                                                k = parseFloat(e ? c.y : 0),
                                                h = aO,
                                                d = 0,
                                                f = a.length;
                                            f--;
                                        )
                                            (g = e
                                                ? (g = a[f].x - j) * g + (i = a[f].y - k) * i
                                                : Math.abs(a[f] - j)) < h && ((h = g), (d = f));
                                        return (
                                            (d = !b || h <= b ? a[d] : c),
                                                e || d === c || aW(c) ? d : d + ad(c)
                                        );
                                    }
                                : ah(a)
                        )
                );
            },
            ai = function (b, c, a, d) {
                return bN(a0(b) ? !c : !0 === a ? ((a = 0), !1) : !d, function () {
                    return a0(b)
                        ? b[~~(Math.random() * b.length)]
                        : (d =
                            (a = a || 1e-5) < 1 ? Math.pow(10, (a + '').length - 2) : 1) &&
                        Math.floor(
                            Math.round(
                                (b - a / 2 + Math.random() * (c - b + 0.99 * a)) / a
                            ) *
                            a *
                            d
                        ) / d;
                });
            },
            bS = function (b, c, a) {
                return bN(a, function (a) {
                    return b[~~c(a)];
                });
            },
            bT = function (a) {
                for (var b, d, f, e, c = 0, g = ''; ~(b = a.indexOf('random(', c));)
                    (f = a.indexOf(')', b)),
                        (e = '[' === a.charAt(b + 7)),
                        (d = a.substr(b + 7, f - b - 7).match(e ? a6 : a1)),
                        (g +=
                            a.substr(c, b - c) +
                            ai(e ? d : +d[0], e ? 0 : +d[1], +d[2] || 1e-5)),
                        (c = f + 1);
                return g + a.substr(c, a.length - c);
            },
            aj = function (a, b, c, d, e) {
                var f = b - a,
                    g = d - c;
                return bN(e, function (b) {
                    return c + (((b - a) / f) * g || 0);
                });
            },
            bU = function (f, g, h) {
                var b,
                    a,
                    c,
                    d = f.labels,
                    e = aO;
                for (b in d)
                    (a = d[b] - g) < 0 == !!h &&
                    a &&
                    e > (a = Math.abs(a)) &&
                    ((c = b), (e = a));
                return c;
            },
            bV = function (e, f, g) {
                var a,
                    b,
                    c = e.vars,
                    d = c[f];
                if (d)
                    return (
                        (a = c[f + 'Params']),
                            (b = c.callbackScope || e),
                        g && bc.length && bm(),
                            a ? d.apply(b, a) : d.call(b)
                    );
            },
            bW = function (a) {
                return (
                    bv(a),
                    a.scrollTrigger && a.scrollTrigger.kill(!1),
                    1 > a.progress() && bV(a, 'onInterrupt'),
                        a
                );
            },
            bX = function (a) {
                var b = (a = (!a.name && a.default) || a).name,
                    f = aV(a),
                    c =
                        b && !f && a.init
                            ? function () {
                                this._props = [];
                            }
                            : a,
                    d = {
                        init: t,
                        render: cr,
                        add: cd,
                        kill: ct,
                        modifier: cs,
                        rawVars: 0,
                    },
                    e = {
                        targetTest: 0,
                        get: 0,
                        getSetter: cn,
                        aliases: {},
                        register: 0,
                    };
                if ((am(), a !== c)) {
                    if (Z[b]) return;
                    k(c, k(bs(a, d), e)),
                        bq(c.prototype, bq(d, bs(a, e))),
                        (Z[(c.prop = b)] = c),
                    a.targetTest && (bf.push(c), (bb[b] = 1)),
                        (b =
                            ('css' === b ? 'CSS' : b.charAt(0).toUpperCase() + b.substr(1)) +
                            'Plugin');
                }
                Y(b, c), a.register && a.register(g, c, ao);
            },
            bY = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0],
            },
            bZ = function (a, b, c) {
                return (
                    (255 *
                        (6 * (a += a < 0 ? 1 : a > 1 ? -1 : 0) < 1
                            ? b + (c - b) * a * 6
                            : a < 0.5
                                ? c
                                : 3 * a < 2
                                    ? b + (c - b) * (2 / 3 - a) * 6
                                    : b) +
                        0.5) |
                    0
                );
            },
            ak = function (a, l, m) {
                var d,
                    c,
                    e,
                    f,
                    h,
                    g,
                    i,
                    k,
                    j,
                    n,
                    b = a ? (aW(a) ? [a >> 16, (a >> 8) & 255, 255 & a] : 0) : bY.black;
                if (!b) {
                    if ((',' === a.substr(-1) && (a = a.substr(0, a.length - 1)), bY[a]))
                        b = bY[a];
                    else if ('#' === a.charAt(0)) {
                        if (
                            (a.length < 6 &&
                            ((d = a.charAt(1)),
                                (c = a.charAt(2)),
                                (e = a.charAt(3)),
                                (a =
                                    '#' +
                                    d +
                                    d +
                                    c +
                                    c +
                                    e +
                                    e +
                                    (5 === a.length ? a.charAt(4) + a.charAt(4) : ''))),
                            9 === a.length)
                        )
                            return [
                                (b = parseInt(a.substr(1, 6), 16)) >> 16,
                                (b >> 8) & 255,
                                255 & b,
                                parseInt(a.substr(7), 16) / 255,
                            ];
                        b = [
                            (a = parseInt(a.substr(1), 16)) >> 16,
                            (a >> 8) & 255,
                            255 & a,
                        ];
                    } else if ('hsl' === a.substr(0, 3)) {
                        if (((b = n = a.match(a1)), l)) {
                            if (~a.indexOf('='))
                                return (b = a.match(a2)), m && b.length < 4 && (b[3] = 1), b;
                        } else
                            (f = (+b[0] % 360) / 360),
                                (h = +b[1] / 100),
                                (d =
                                    2 * (g = +b[2] / 100) -
                                    (c = g <= 0.5 ? g * (h + 1) : g + h - g * h)),
                            b.length > 3 && (b[3] *= 1),
                                (b[0] = bZ(f + 1 / 3, d, c)),
                                (b[1] = bZ(f, d, c)),
                                (b[2] = bZ(f - 1 / 3, d, c));
                    } else b = a.match(a1) || bY.transparent;
                    b = b.map(Number);
                }
                return (
                    l &&
                    !n &&
                    ((d = b[0] / 255),
                        (c = b[1] / 255),
                        (e = b[2] / 255),
                        (g = ((i = Math.max(d, c, e)) + (k = Math.min(d, c, e))) / 2),
                        i === k
                            ? (f = h = 0)
                            : ((j = i - k),
                                (h = g > 0.5 ? j / (2 - i - k) : j / (i + k)),
                                (f =
                                    i === d
                                        ? (c - e) / j + (c < e ? 6 : 0)
                                        : i === c
                                            ? (e - d) / j + 2
                                            : (d - c) / j + 4),
                                (f *= 60)),
                        (b[0] = ~~(f + 0.5)),
                        (b[1] = ~~(100 * h + 0.5)),
                        (b[2] = ~~(100 * g + 0.5))),
                    m && b.length < 4 && (b[3] = 1),
                        b
                );
            },
            b$ = function (b) {
                var a = [],
                    c = [],
                    d = -1;
                return (
                    b.split(b0).forEach(function (e) {
                        var b = e.match(a3) || [];
                        a.push.apply(a, b), c.push((d += b.length + 1));
                    }),
                        (a.c = c),
                        a
                );
            },
            b_ = function (e, j, h) {
                var i,
                    c,
                    g,
                    f,
                    d = '',
                    b = (e + d).match(b0),
                    k = j ? 'hsla(' : 'rgba(',
                    a = 0;
                if (!b) return e;
                if (
                    ((b = b.map(function (a) {
                        return (
                            (a = ak(a, j, 1)) &&
                            k +
                            (j
                                ? a[0] + ',' + a[1] + '%,' + a[2] + '%,' + a[3]
                                : a.join(',')) +
                            ')'
                        );
                    })),
                    h && ((g = b$(e)), (i = h.c).join(d) !== g.c.join(d)))
                )
                    for (f = (c = e.replace(b0, '1').split(a3)).length - 1; a < f; a++)
                        d +=
                            c[a] +
                            (~i.indexOf(a)
                                ? b.shift() || k + '0,0,0,0)'
                                : (g.length ? g : b.length ? b : h).shift());
                if (!c)
                    for (f = (c = e.split(b0)).length - 1; a < f; a++) d += c[a] + b[a];
                return d + c[f];
            },
            b0 = (function () {
                var a,
                    b =
                        '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b';
                for (a in bY) b += '|' + a + '\\b';
                return new RegExp(b + ')', 'gi');
            })(),
            b1 = /hsl[a]?\(/,
            al = function (a) {
                var b,
                    c = a.join(' ');
                if (((b0.lastIndex = 0), b0.test(c)))
                    return (
                        (b = b1.test(c)),
                            (a[1] = b_(a[1], b)),
                            (a[0] = b_(a[0], b, b$(a[1]))),
                            !0
                    );
            },
            w =
                ((r = Date.now),
                    (J = 500),
                    (K = 33),
                    (M = L = r()),
                    (O = N = 1e3 / 240),
                    (Q = function h(d) {
                        var a,
                            e,
                            b,
                            f,
                            c = r() - M,
                            g = !0 === d;
                        if (
                            (c > J && (L += c - K),
                            ((a = (b = (M += c) - L) - O) > 0 || g) &&
                            ((f = ++I.frame),
                                (_ = b - 1e3 * I.time),
                                (I.time = b /= 1e3),
                                (O += a + (a >= N ? 4 : N - a)),
                                (e = 1)),
                            g || (aK = aL(h)),
                                e)
                        )
                            for (aN = 0; aN < P.length; aN++) P[aN](b, _, f, d);
                    }),
                    (I = {
                        time: 0,
                        frame: 0,
                        tick: function () {
                            Q(!0);
                        },
                        deltaRatio: function (a) {
                            return _ / (1e3 / (a || 60));
                        },
                        wake: function () {
                            G &&
                            (!aG &&
                            W() &&
                            ((aH = (aF = aG = window).document || {}),
                                (f.gsap = g),
                                (aF.gsapVersions || (aF.gsapVersions = [])).push(g.version),
                                X(a8 || aF.GreenSockGlobals || (!aF.gsap && aF) || {}),
                                (aM = aF.requestAnimationFrame)),
                            aK && I.sleep(),
                                (aL =
                                    aM ||
                                    function (a) {
                                        return setTimeout(a, (O - 1e3 * I.time + 1) | 0);
                                    }),
                                (aJ = 1),
                                Q(2));
                        },
                        sleep: function () {
                            (aM ? aF.cancelAnimationFrame : clearTimeout)(aK),
                                (aJ = 0),
                                (aL = t);
                        },
                        lagSmoothing: function (a, b) {
                            K = Math.min(b, (J = a || 1 / 1e-8), 0);
                        },
                        fps: function (a) {
                            (N = 1e3 / (a || 240)), (O = 1e3 * I.time + N);
                        },
                        add: function (a, c, d) {
                            var b = c
                                ? function (c, d, e, f) {
                                    a(c, d, e, f), I.remove(b);
                                }
                                : a;
                            return I.remove(a), P[d ? 'unshift' : 'push'](b), am(), b;
                        },
                        remove: function (b, a) {
                            ~(a = P.indexOf(b)) && P.splice(a, 1) && aN >= a && aN--;
                        },
                        _listeners: (P = []),
                    })),
            am = function () {
                return !aJ && w.wake();
            },
            a = {},
            b2 = /^[\d.\-M][\d.\-,\s]/,
            b3 = /["']/g,
            b4 = function (f) {
                for (
                    var d,
                        a,
                        b,
                        g = {},
                        e = f.substr(1, f.length - 3).split(':'),
                        h = e[0],
                        c = 1,
                        i = e.length;
                    c < i;
                    c++
                )
                    (a = e[c]),
                        (d = c !== i - 1 ? a.lastIndexOf(',') : a.length),
                        (b = a.substr(0, d)),
                        (g[h] = isNaN(b) ? b.replace(b3, '').trim() : +b),
                        (h = a.substr(d + 1).trim());
                return g;
            },
            b5 = function (a) {
                return function (b) {
                    return 1 - a(1 - b);
                };
            },
            b6 = function c(f, b) {
                for (var e, a = f._first; a;)
                    a instanceof d
                        ? c(a, b)
                        : !a.vars.yoyoEase ||
                        (a._yoyo && a._repeat) ||
                        a._yoyo === b ||
                        (a.timeline
                            ? c(a.timeline, b)
                            : ((e = a._ease),
                                (a._ease = a._yEase),
                                (a._yEase = e),
                                (a._yoyo = b))),
                        (a = a._next);
            },
            b7 = function (b, j) {
                var c, d, g, e, h, i, f;
                return (
                    (b &&
                        (aV(b)
                            ? b
                            : a[b] ||
                            ((f = a[(i = ((c = b) + '').split('('))[0]]) &&
                            i.length > 1 &&
                            f.config
                                ? f.config.apply(
                                    null,
                                    ~c.indexOf('{')
                                        ? [b4(i[1])]
                                        : ((g = (d = c).indexOf('(') + 1),
                                            (e = d.indexOf(')')),
                                            (h = d.indexOf('(', g)),
                                            d.substring(
                                                g,
                                                ~h && h < e ? d.indexOf(')', e + 1) : e
                                            ))
                                            .split(',')
                                            .map(bo)
                                )
                                : a._CE && b2.test(c)
                                    ? a._CE('', c)
                                    : f))) ||
                    j
                );
            },
            e = function (e, g, b, d) {
                void 0 === b &&
                (b = function (a) {
                    return 1 - g(1 - a);
                }),
                void 0 === d &&
                (d = function (a) {
                    return a < 0.5 ? g(2 * a) / 2 : 1 - g(2 * (1 - a)) / 2;
                });
                var i,
                    h = {easeIn: g, easeOut: b, easeInOut: d};
                return (
                    c(e, function (c) {
                        for (var d in ((a[c] = f[c] = h),
                            (a[(i = c.toLowerCase())] = b),
                            h))
                            a[
                            i +
                            ('easeIn' === d ? '.in' : 'easeOut' === d ? '.out' : '.inOut')
                                ] = a[c + '.' + d] = h[d];
                    }),
                        h
                );
            },
            b8 = function (a) {
                return function (b) {
                    return b < 0.5 ? (1 - a(1 - 2 * b)) / 2 : 0.5 + a(2 * (b - 0.5)) / 2;
                };
            },
            l = function h(b, a, f) {
                var g = a >= 1 ? a : 1,
                    c = (f || (b ? 0.3 : 0.45)) / (a < 1 ? a : 1),
                    i = (c / $) * (Math.asin(1 / g) || 0),
                    d = function (a) {
                        return 1 === a ? 1 : g * Math.pow(2, -10 * a) * aT((a - i) * c) + 1;
                    },
                    e =
                        'out' === b
                            ? d
                            : 'in' === b
                                ? function (a) {
                                    return 1 - d(1 - a);
                                }
                                : b8(d);
                return (
                    (c = $ / c),
                        (e.config = function (a, c) {
                            return h(b, a, c);
                        }),
                        e
                );
            },
            m = function e(a, b) {
                void 0 === b && (b = 1.70158);
                var c = function (a) {
                        return a ? --a * a * ((b + 1) * a + b) + 1 : 0;
                    },
                    d =
                        'out' === a
                            ? c
                            : 'in' === a
                                ? function (a) {
                                    return 1 - c(1 - a);
                                }
                                : b8(c);
                return (
                    (d.config = function (b) {
                        return e(a, b);
                    }),
                        d
                );
            };
        c('Linear,Quad,Cubic,Quart,Quint,Strong', function (b, a) {
            var c = a < 5 ? a + 1 : a;
            e(
                b + ',Power' + (c - 1),
                a
                    ? function (a) {
                        return Math.pow(a, c);
                    }
                    : function (a) {
                        return a;
                    },
                function (a) {
                    return 1 - Math.pow(1 - a, c);
                },
                function (a) {
                    return a < 0.5
                        ? Math.pow(2 * a, c) / 2
                        : 1 - Math.pow(2 * (1 - a), c) / 2;
                }
            );
        }),
            (a.Linear.easeNone = a.none = a.Linear.easeIn),
            e('Elastic', l('in'), l('out'), l()),
            (R = 7.5625),
            (T = 1 / (S = 2.75)),
            e(
                'Bounce',
                function (a) {
                    return 1 - U(1 - a);
                },
                (U = function (a) {
                    return a < T
                        ? R * a * a
                        : a < 0.7272727272727273
                            ? R * Math.pow(a - 1.5 / S, 2) + 0.75
                            : a < 0.9090909090909092
                                ? R * (a -= 2.25 / S) * a + 0.9375
                                : R * Math.pow(a - 2.625 / S, 2) + 0.984375;
                })
            ),
            e('Expo', function (a) {
                return a ? Math.pow(2, 10 * (a - 1)) : 0;
            }),
            e('Circ', function (a) {
                return -(aR(1 - a * a) - 1);
            }),
            e('Sine', function (a) {
                return 1 === a ? 1 : 1 - aS(a * aP);
            }),
            e('Back', m('in'), m('out'), m()),
            (a.SteppedEase =
                a.steps =
                    f.SteppedEase =
                        {
                            config: function (a, b) {
                                void 0 === a && (a = 1);
                                var c = 1 / a,
                                    d = a + (b ? 0 : 1),
                                    e = b ? 1 : 0;
                                return function (a) {
                                    return (((d * bO(0, 1 - 1e-8, a)) | 0) + e) * c;
                                };
                            },
                        }),
            (s.ease = a['quad.out']),
            c(
                'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
                function (a) {
                    return (u += a + ',' + a + 'Params,');
                }
            );
        var b9 = function (b, a) {
                (this.id = aQ++),
                    (b._gsap = this),
                    (this.target = b),
                    (this.harness = a),
                    (this.get = a ? a.get : bh),
                    (this.set = a ? a.getSetter : cn);
            },
            i = (function () {
                function b(a) {
                    (this.vars = a),
                        (this._delay = +a.delay || 0),
                    (this._repeat = a.repeat === 1 / 0 ? -2 : a.repeat || 0) &&
                    ((this._rDelay = a.repeatDelay || 0),
                        (this._yoyo = !!a.yoyo || !!a.yoyoEase)),
                        (this._ts = 1),
                        bI(this, +a.duration, 1, 1),
                        (this.data = a.data),
                    aJ || w.wake();
                }

                var a = b.prototype;
                return (
                    (a.delay = function (a) {
                        return a || 0 === a
                            ? (this.parent &&
                            this.parent.smoothChildTiming &&
                            this.startTime(this._start + a - this._delay),
                                (this._delay = a),
                                this)
                            : this._delay;
                    }),
                        (a.duration = function (a) {
                            return arguments.length
                                ? this.totalDuration(
                                    this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a
                                )
                                : this.totalDuration() && this._dur;
                        }),
                        (a.totalDuration = function (a) {
                            return arguments.length
                                ? ((this._dirty = 0),
                                    bI(
                                        this,
                                        this._repeat < 0
                                            ? a
                                            : (a - this._repeat * this._rDelay) / (this._repeat + 1)
                                    ))
                                : this._tDur;
                        }),
                        (a.totalTime = function (b, c) {
                            if ((am(), !arguments.length)) return this._tTime;
                            var a = this._dp;
                            if (a && a.smoothChildTiming && this._ts) {
                                for (
                                    bC(this, b), !a._dp || a.parent || bD(a, this);
                                    a && a.parent;
                                )
                                    a.parent._time !==
                                    a._start +
                                    (a._ts >= 0
                                        ? a._tTime / a._ts
                                        : -((a.totalDuration() - a._tTime) / a._ts)) &&
                                    a.totalTime(a._tTime, !0),
                                        (a = a.parent);
                                !this.parent &&
                                this._dp.autoRemoveChildren &&
                                ((this._ts > 0 && b < this._tDur) ||
                                    (this._ts < 0 && b > 0) ||
                                    (!this._tDur && !b)) &&
                                bE(this._dp, this, this._start - this._delay);
                            }
                            return (
                                (this._tTime === b &&
                                    (this._dur || c) &&
                                    (!this._initted || 1e-8 !== Math.abs(this._zTime)) &&
                                    (b || this._initted || (!this.add && !this._ptLookup))) ||
                                (this._ts || (this._pTime = b), bn(this, b, c)),
                                    this
                            );
                        }),
                        (a.time = function (a, b) {
                            return arguments.length
                                ? this.totalTime(
                                    Math.min(this.totalDuration(), a + by(this)) %
                                    (this._dur + this._rDelay) || (a ? this._dur : 0),
                                    b
                                )
                                : this._time;
                        }),
                        (a.totalProgress = function (a, b) {
                            return arguments.length
                                ? this.totalTime(this.totalDuration() * a, b)
                                : this.totalDuration()
                                    ? Math.min(1, this._tTime / this._tDur)
                                    : this.ratio;
                        }),
                        (a.progress = function (a, b) {
                            return arguments.length
                                ? this.totalTime(
                                    this.duration() *
                                    (!this._yoyo || 1 & this.iteration() ? a : 1 - a) +
                                    by(this),
                                    b
                                )
                                : this.duration()
                                    ? Math.min(1, this._time / this._dur)
                                    : this.ratio;
                        }),
                        (a.iteration = function (b, c) {
                            var a = this.duration() + this._rDelay;
                            return arguments.length
                                ? this.totalTime(this._time + (b - 1) * a, c)
                                : this._repeat
                                    ? bz(this._tTime, a) + 1
                                    : 1;
                        }),
                        (a.timeScale = function (a) {
                            if (!arguments.length)
                                return -0.00000001 === this._rts ? 0 : this._rts;
                            if (this._rts === a) return this;
                            var b =
                                this.parent && this._ts
                                    ? bA(this.parent._time, this)
                                    : this._tTime;
                            return (
                                (this._rts = +a || 0),
                                    (this._ts = this._ps || -0.00000001 === a ? 0 : this._rts),
                                    this.totalTime(bO(-this._delay, this._tDur, b), !0),
                                    bB(this),
                                    bx(this)
                            );
                        }),
                        (a.paused = function (a) {
                            return arguments.length
                                ? (this._ps !== a &&
                                ((this._ps = a),
                                    a
                                        ? ((this._pTime =
                                            this._tTime || Math.max(-this._delay, this.rawTime())),
                                            (this._ts = this._act = 0))
                                        : (am(),
                                            (this._ts = this._rts),
                                            this.totalTime(
                                                this.parent && !this.parent.smoothChildTiming
                                                    ? this.rawTime()
                                                    : this._tTime || this._pTime,
                                                1 === this.progress() &&
                                                1e-8 !== Math.abs(this._zTime) &&
                                                (this._tTime -= 1e-8)
                                            ))),
                                    this)
                                : this._ps;
                        }),
                        (a.startTime = function (b) {
                            if (arguments.length) {
                                this._start = b;
                                var a = this.parent || this._dp;
                                return (
                                    a && (a._sort || !this.parent) && bE(a, this, b - this._delay),
                                        this
                                );
                            }
                            return this._start;
                        }),
                        (a.endTime = function (a) {
                            return (
                                this._start +
                                (aZ(a) ? this.totalDuration() : this.duration()) /
                                Math.abs(this._ts || 1)
                            );
                        }),
                        (a.rawTime = function (a) {
                            var b = this.parent || this._dp;
                            return b
                                ? a &&
                                (!this._ts ||
                                    (this._repeat && this._time && 1 > this.totalProgress()))
                                    ? this._tTime % (this._dur + this._rDelay)
                                    : this._ts
                                        ? bA(b.rawTime(a), this)
                                        : this._tTime
                                : this._tTime;
                        }),
                        (a.globalTime = function (c) {
                            for (var a = this, b = arguments.length ? c : a.rawTime(); a;)
                                (b = a._start + b / (a._ts || 1)), (a = a._dp);
                            return b;
                        }),
                        (a.repeat = function (a) {
                            return arguments.length
                                ? ((this._repeat = a === 1 / 0 ? -2 : a), bJ(this))
                                : -2 === this._repeat
                                    ? 1 / 0
                                    : this._repeat;
                        }),
                        (a.repeatDelay = function (b) {
                            if (arguments.length) {
                                var a = this._time;
                                return (this._rDelay = b), bJ(this), a ? this.time(a) : this;
                            }
                            return this._rDelay;
                        }),
                        (a.yoyo = function (a) {
                            return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
                        }),
                        (a.seek = function (a, b) {
                            return this.totalTime(bL(this, a), aZ(b));
                        }),
                        (a.restart = function (a, b) {
                            return this.play().totalTime(a ? -this._delay : 0, aZ(b));
                        }),
                        (a.play = function (a, b) {
                            return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
                        }),
                        (a.reverse = function (a, b) {
                            return (
                                null != a && this.seek(a || this.totalDuration(), b),
                                    this.reversed(!0).paused(!1)
                            );
                        }),
                        (a.pause = function (a, b) {
                            return null != a && this.seek(a, b), this.paused(!0);
                        }),
                        (a.resume = function () {
                            return this.paused(!1);
                        }),
                        (a.reversed = function (a) {
                            return arguments.length
                                ? (!!a !== this.reversed() &&
                                this.timeScale(-this._rts || (a ? -0.00000001 : 0)),
                                    this)
                                : this._rts < 0;
                        }),
                        (a.invalidate = function () {
                            return (
                                (this._initted = this._act = 0), (this._zTime = -0.00000001), this
                            );
                        }),
                        (a.isActive = function () {
                            var b,
                                a = this.parent || this._dp,
                                c = this._start;
                            return !(
                                a &&
                                !(
                                    this._ts &&
                                    this._initted &&
                                    a.isActive() &&
                                    (b = a.rawTime(!0)) >= c &&
                                    b < this.endTime(!0) - 1e-8
                                )
                            );
                        }),
                        (a.eventCallback = function (a, c, d) {
                            var b = this.vars;
                            return arguments.length > 1
                                ? (c
                                    ? ((b[a] = c),
                                    d && (b[a + 'Params'] = d),
                                    'onUpdate' === a && (this._onUpdate = c))
                                    : delete b[a],
                                    this)
                                : b[a];
                        }),
                        (a.then = function (a) {
                            var b = this;
                            return new Promise(function (d) {
                                var e = aV(a) ? a : bp,
                                    c = function () {
                                        var a = b.then;
                                        (b.then = null),
                                        aV(e) && (e = e(b)) && (e.then || e === b) && (b.then = a),
                                            d(e),
                                            (b.then = a);
                                    };
                                (b._initted && 1 === b.totalProgress() && b._ts >= 0) ||
                                (!b._tTime && b._ts < 0)
                                    ? c()
                                    : (b._prom = c);
                            });
                        }),
                        (a.kill = function () {
                            bW(this);
                        }),
                        b
                );
            })();
        k(i.prototype, {
            _time: 0,
            _start: 0,
            _end: 0,
            _tTime: 0,
            _tDur: 0,
            _dirty: 0,
            _repeat: 0,
            _yoyo: !1,
            parent: null,
            _initted: !1,
            _rDelay: 0,
            _ts: 1,
            _dp: 0,
            ratio: 0,
            _zTime: -0.00000001,
            _prom: 0,
            _ps: !1,
            _rts: 1,
        });
        var d = (function (c) {
            function b(a, d) {
                var b;
                return (
                    void 0 === a && (a = {}),
                        ((b = c.call(this, a) || this).labels = {}),
                        (b.smoothChildTiming = !!a.smoothChildTiming),
                        (b.autoRemoveChildren = !!a.autoRemoveChildren),
                        (b._sort = aZ(a.sortChildren)),
                    q && bE(a.parent || q, aC(b), d),
                    a.reversed && b.reverse(),
                    a.paused && b.paused(!0),
                    a.scrollTrigger && bF(aC(b), a.scrollTrigger),
                        b
                );
            }

            aD(b, c);
            var a = b.prototype;
            return (
                (a.to = function (a, b, c) {
                    return bM(0, arguments, this), this;
                }),
                    (a.from = function (a, b, c) {
                        return bM(1, arguments, this), this;
                    }),
                    (a.fromTo = function (a, b, c, d) {
                        return bM(2, arguments, this), this;
                    }),
                    (a.set = function (b, a, c) {
                        return (
                            (a.duration = 0),
                                (a.parent = this),
                            bt(a).repeatDelay || (a.repeat = 0),
                                (a.immediateRender = !!a.immediateRender),
                                new j(b, a, bL(this, c), 1),
                                this
                        );
                    }),
                    (a.call = function (a, b, c) {
                        return bE(this, j.delayedCall(0, a, b), c);
                    }),
                    (a.staggerTo = function (b, c, a, d, e, f, g) {
                        return (
                            (a.duration = c),
                                (a.stagger = a.stagger || d),
                                (a.onComplete = f),
                                (a.onCompleteParams = g),
                                (a.parent = this),
                                new j(b, a, bL(this, e)),
                                this
                        );
                    }),
                    (a.staggerFrom = function (b, c, a, d, e, f, g) {
                        return (
                            (a.runBackwards = 1),
                                (bt(a).immediateRender = aZ(a.immediateRender)),
                                this.staggerTo(b, c, a, d, e, f, g)
                        );
                    }),
                    (a.staggerFromTo = function (b, c, d, a, e, f, g, h) {
                        return (
                            (a.startAt = d),
                                (bt(a).immediateRender = aZ(a.immediateRender)),
                                this.staggerTo(b, c, a, e, f, g, h)
                        );
                    }),
                    (a.render = function (d, f, j) {
                        var b,
                            a,
                            l,
                            g,
                            k,
                            n,
                            i,
                            t,
                            u,
                            m,
                            r,
                            o,
                            c = this._time,
                            h = this._dirty ? this.totalDuration() : this._tDur,
                            e = this._dur,
                            _ = d <= 0 ? 0 : bj(d),
                            v = this._zTime < 0 != d < 0 && (this._initted || !e);
                        if (
                            (this !== q && _ > h && d >= 0 && (_ = h),
                            _ !== this._tTime || j || v)
                        ) {
                            if (
                                (c !== this._time &&
                                e &&
                                ((_ += this._time - c), (d += this._time - c)),
                                    (b = _),
                                    (u = this._start),
                                    (n = !(t = this._ts)),
                                v && (e || (c = this._zTime), (d || !f) && (this._zTime = d)),
                                    this._repeat)
                            ) {
                                if (
                                    ((r = this._yoyo),
                                        (k = e + this._rDelay),
                                    this._repeat < -1 && d < 0)
                                )
                                    return this.totalTime(100 * k + d, f, j);
                                if (
                                    ((b = bj(_ % k)),
                                        _ === h
                                            ? ((g = this._repeat), (b = e))
                                            : ((g = ~~(_ / k)) && g === _ / k && ((b = e), g--),
                                            b > e && (b = e)),
                                        (m = bz(this._tTime, k)),
                                    !c && this._tTime && m !== g && (m = g),
                                    r && 1 & g && ((b = e - b), (o = 1)),
                                    g !== m && !this._lock)
                                ) {
                                    var p = r && 1 & m,
                                        w = p === (r && 1 & g);
                                    if (
                                        (g < m && (p = !p),
                                            (c = p ? 0 : e),
                                            (this._lock = 1),
                                            (this.render(c || (o ? 0 : bj(g * k)), f, !e)._lock = 0),
                                            (this._tTime = _),
                                        !f && this.parent && bV(this, 'onRepeat'),
                                        this.vars.repeatRefresh &&
                                        !o &&
                                        (this.invalidate()._lock = 1),
                                        (c && c !== this._time) ||
                                        !this._ts !== n ||
                                        (this.vars.onRepeat && !this.parent && !this._act) ||
                                        ((e = this._dur),
                                            (h = this._tDur),
                                        w &&
                                        ((this._lock = 2),
                                            (c = p ? e : -0.0001),
                                            this.render(c, !0),
                                        this.vars.repeatRefresh && !o && this.invalidate()),
                                            (this._lock = 0),
                                        !this._ts && !n))
                                    )
                                        return this;
                                    b6(this, o);
                                }
                            }
                            if (
                                (this._hasPause &&
                                !this._forcing &&
                                this._lock < 2 &&
                                (i = (function (d, b, c) {
                                    var a;
                                    if (c > b)
                                        for (a = d._first; a && a._start <= c;) {
                                            if ('isPause' === a.data && a._start > b) return a;
                                            a = a._next;
                                        }
                                    else
                                        for (a = d._last; a && a._start >= c;) {
                                            if ('isPause' === a.data && a._start < b) return a;
                                            a = a._prev;
                                        }
                                })(this, bj(c), bj(b))) &&
                                (_ -= b - (b = i._start)),
                                    (this._tTime = _),
                                    (this._time = b),
                                    (this._act = !t),
                                this._initted ||
                                ((this._onUpdate = this.vars.onUpdate),
                                    (this._initted = 1),
                                    (this._zTime = d),
                                    (c = 0)),
                                !c && b && !f && (bV(this, 'onStart'), this._tTime !== _))
                            )
                                return this;
                            if (b >= c && d >= 0)
                                for (a = this._first; a;) {
                                    if (
                                        ((l = a._next), (a._act || b >= a._start) && a._ts && i !== a)
                                    ) {
                                        if (a.parent !== this) return this.render(d, f, j);
                                        if (
                                            (a.render(
                                                a._ts > 0
                                                    ? (b - a._start) * a._ts
                                                    : (a._dirty ? a.totalDuration() : a._tDur) +
                                                    (b - a._start) * a._ts,
                                                f,
                                                j
                                            ),
                                            b !== this._time || (!this._ts && !n))
                                        ) {
                                            (i = 0), l && (_ += this._zTime = -0.00000001);
                                            break;
                                        }
                                    }
                                    a = l;
                                }
                            else {
                                a = this._last;
                                for (var s = d < 0 ? d : b; a;) {
                                    if (
                                        ((l = a._prev), (a._act || s <= a._end) && a._ts && i !== a)
                                    ) {
                                        if (a.parent !== this) return this.render(d, f, j);
                                        if (
                                            (a.render(
                                                a._ts > 0
                                                    ? (s - a._start) * a._ts
                                                    : (a._dirty ? a.totalDuration() : a._tDur) +
                                                    (s - a._start) * a._ts,
                                                f,
                                                j
                                            ),
                                            b !== this._time || (!this._ts && !n))
                                        ) {
                                            (i = 0), l && (_ += this._zTime = s ? -0.00000001 : 1e-8);
                                            break;
                                        }
                                    }
                                    a = l;
                                }
                            }
                            if (
                                i &&
                                !f &&
                                (this.pause(),
                                    (i.render(b >= c ? 0 : -0.00000001)._zTime = b >= c ? 1 : -1),
                                    this._ts)
                            )
                                return (this._start = u), bB(this), this.render(d, f, j);
                            this._onUpdate && !f && bV(this, 'onUpdate', !0),
                            ((_ === h && this._tTime >= this.totalDuration()) || (!_ && c)) &&
                            ((u !== this._start && Math.abs(t) === Math.abs(this._ts)) ||
                                this._lock ||
                                ((d || !e) &&
                                ((_ === h && this._ts > 0) || (!_ && this._ts < 0)) &&
                                bv(this, 1),
                                f ||
                                (d < 0 && !c) ||
                                (!_ && !c && h) ||
                                (bV(
                                    this,
                                    _ === h && d >= 0 ? 'onComplete' : 'onReverseComplete',
                                    !0
                                ),
                                this._prom &&
                                !(_ < h && this.timeScale() > 0) &&
                                this._prom())));
                        }
                        return this;
                    }),
                    (a.add = function (a, b) {
                        var c = this;
                        if ((aW(b) || (b = bL(this, b, a)), !(a instanceof i))) {
                            if (a0(a))
                                return (
                                    a.forEach(function (a) {
                                        return c.add(a, b);
                                    }),
                                        this
                                );
                            if (aU(a)) return this.addLabel(a, b);
                            if (!aV(a)) return this;
                            a = j.delayedCall(0, a);
                        }
                        return this !== a ? bE(this, a, b) : this;
                    }),
                    (a.getChildren = function (e, c, d, f) {
                        void 0 === e && (e = !0),
                        void 0 === c && (c = !0),
                        void 0 === d && (d = !0),
                        void 0 === f && (f = -aO);
                        for (var b = [], a = this._first; a;)
                            a._start >= f &&
                            (a instanceof j
                                ? c && b.push(a)
                                : (d && b.push(a),
                                e && b.push.apply(b, a.getChildren(!0, c, d)))),
                                (a = a._next);
                        return b;
                    }),
                    (a.getById = function (c) {
                        for (var a = this.getChildren(1, 1, 1), b = a.length; b--;)
                            if (a[b].vars.id === c) return a[b];
                    }),
                    (a.remove = function (a) {
                        return aU(a)
                            ? this.removeLabel(a)
                            : aV(a)
                                ? this.killTweensOf(a)
                                : (ac(this, a),
                                a === this._recent && (this._recent = this._last),
                                    bw(this));
                    }),
                    (a.totalTime = function (a, b) {
                        return arguments.length
                            ? ((this._forcing = 1),
                            !this._dp &&
                            this._ts &&
                            (this._start = bj(
                                w.time -
                                (this._ts > 0
                                    ? a / this._ts
                                    : -((this.totalDuration() - a) / this._ts))
                            )),
                                c.prototype.totalTime.call(this, a, b),
                                (this._forcing = 0),
                                this)
                            : this._tTime;
                    }),
                    (a.addLabel = function (a, b) {
                        return (this.labels[a] = bL(this, b)), this;
                    }),
                    (a.removeLabel = function (a) {
                        return delete this.labels[a], this;
                    }),
                    (a.addPause = function (b, c, d) {
                        var a = j.delayedCall(0, c || t, d);
                        return (
                            (a.data = 'isPause'), (this._hasPause = 1), bE(this, a, bL(this, b))
                        );
                    }),
                    (a.removePause = function (b) {
                        var a = this._first;
                        for (b = bL(this, b); a;)
                            a._start === b && 'isPause' === a.data && bv(a), (a = a._next);
                    }),
                    (a.killTweensOf = function (c, d, e) {
                        for (var a = this.getTweensOf(c, e), b = a.length; b--;)
                            ca !== a[b] && a[b].kill(c, d);
                        return this;
                    }),
                    (a.getTweensOf = function (f, b) {
                        for (var d, c = [], e = ae(f), a = this._first, g = aW(b); a;)
                            a instanceof j
                                ? bl(a._targets, e) &&
                                (g
                                    ? (!ca || (a._initted && a._ts)) &&
                                    a.globalTime(0) <= b &&
                                    a.globalTime(a.totalDuration()) > b
                                    : !b || a.isActive()) &&
                                c.push(a)
                                : (d = a.getTweensOf(e, b)).length && c.push.apply(c, d),
                                (a = a._next);
                        return c;
                    }),
                    (a.tweenTo = function (g, a) {
                        a = a || {};
                        var i,
                            b = this,
                            e = bL(b, g),
                            c = a,
                            d = c.startAt,
                            l = c.onStart,
                            m = c.onStartParams,
                            h = c.immediateRender,
                            f = j.to(
                                b,
                                k(
                                    {
                                        ease: a.ease || 'none',
                                        lazy: !1,
                                        immediateRender: !1,
                                        time: e,
                                        overwrite: 'auto',
                                        duration:
                                            a.duration ||
                                            Math.abs(
                                                (e - (d && 'time' in d ? d.time : b._time)) /
                                                b.timeScale()
                                            ) ||
                                            1e-8,
                                        onStart: function () {
                                            if ((b.pause(), !i)) {
                                                var c =
                                                    a.duration ||
                                                    Math.abs(
                                                        (e - (d && 'time' in d ? d.time : b._time)) /
                                                        b.timeScale()
                                                    );
                                                f._dur !== c && bI(f, c, 0, 1).render(f._time, !0, !0),
                                                    (i = 1);
                                            }
                                            l && l.apply(f, m || []);
                                        },
                                    },
                                    a
                                )
                            );
                        return h ? f.render(0) : f;
                    }),
                    (a.tweenFromTo = function (a, b, c) {
                        return this.tweenTo(b, k({startAt: {time: bL(this, a)}}, c));
                    }),
                    (a.recent = function () {
                        return this._recent;
                    }),
                    (a.nextLabel = function (a) {
                        return void 0 === a && (a = this._time), bU(this, bL(this, a));
                    }),
                    (a.previousLabel = function (a) {
                        return void 0 === a && (a = this._time), bU(this, bL(this, a), 1);
                    }),
                    (a.currentLabel = function (a) {
                        return arguments.length
                            ? this.seek(a, !0)
                            : this.previousLabel(this._time + 1e-8);
                    }),
                    (a.shiftChildren = function (c, f, b) {
                        void 0 === b && (b = 0);
                        for (var d, a = this._first, e = this.labels; a;)
                            a._start >= b && ((a._start += c), (a._end += c)), (a = a._next);
                        if (f) for (d in e) e[d] >= b && (e[d] += c);
                        return bw(this);
                    }),
                    (a.invalidate = function () {
                        var a = this._first;
                        for (this._lock = 0; a;) a.invalidate(), (a = a._next);
                        return c.prototype.invalidate.call(this);
                    }),
                    (a.clear = function (b) {
                        void 0 === b && (b = !0);
                        for (var c, a = this._first; a;)
                            (c = a._next), this.remove(a), (a = c);
                        return (
                            this._dp && (this._time = this._tTime = this._pTime = 0),
                            b && (this.labels = {}),
                                bw(this)
                        );
                    }),
                    (a.totalDuration = function (g) {
                        var h,
                            c,
                            e,
                            d = 0,
                            a = this,
                            b = a._last,
                            f = aO;
                        if (arguments.length)
                            return a.timeScale(
                                (a._repeat < 0 ? a.duration() : a.totalDuration()) /
                                (a.reversed() ? -g : g)
                            );
                        if (a._dirty) {
                            for (e = a.parent; b;)
                                (h = b._prev),
                                b._dirty && b.totalDuration(),
                                    (c = b._start) > f && a._sort && b._ts && !a._lock
                                        ? ((a._lock = 1), (bE(a, b, c - b._delay, 1)._lock = 0))
                                        : (f = c),
                                c < 0 &&
                                b._ts &&
                                ((d -= c),
                                ((!e && !a._dp) || (e && e.smoothChildTiming)) &&
                                ((a._start += c / a._ts), (a._time -= c), (a._tTime -= c)),
                                    a.shiftChildren(-c, !1, -1 / 0),
                                    (f = 0)),
                                b._end > d && b._ts && (d = b._end),
                                    (b = h);
                            bI(a, a === q && a._time > d ? a._time : d, 1, 1), (a._dirty = 0);
                        }
                        return a._tDur;
                    }),
                    (b.updateRoot = function (b) {
                        if ((q._ts && (bn(q, bA(b, q)), (aI = w.frame)), w.frame >= be)) {
                            be += V.autoSleep || 120;
                            var a = q._first;
                            if ((!a || !a._ts) && V.autoSleep && w._listeners.length < 2) {
                                for (; a && !a._ts;) a = a._next;
                                a || w.sleep();
                            }
                        }
                    }),
                    b
            );
        })(i);
        k(d.prototype, {_lock: 0, _hasPause: 0, _forcing: 0});
        var ca,
            cb,
            cc = function (m, n, d, a, q, o, r) {
                var i,
                    j,
                    c,
                    e,
                    g,
                    f,
                    p,
                    k,
                    b = new ao(this._pt, m, n, 0, 1, cq, null, q),
                    h = 0,
                    l = 0;
                for (
                    b.b = d,
                        b.e = a,
                        d += '',
                    (p = ~(a += '').indexOf('random(')) && (a = bT(a)),
                    o && (o((k = [d, a]), m, n), (d = k[0]), (a = k[1])),
                        j = d.match(a4) || [];
                    (i = a4.exec(a));
                )
                    (e = i[0]),
                        (g = a.substring(h, i.index)),
                        c ? (c = (c + 1) % 5) : 'rgba(' === g.substr(-5) && (c = 1),
                    e !== j[l++] &&
                    ((f = parseFloat(j[l - 1]) || 0),
                        (b._pt = {
                            _next: b._pt,
                            p: g || 1 === l ? g : ',',
                            s: f,
                            c: '=' === e.charAt(1) ? bk(f, e) - f : parseFloat(e) - f,
                            m: c && c < 4 ? Math.round : 0,
                        }),
                        (h = a4.lastIndex));
                return (
                    (b.c = h < a.length ? a.substring(h, a.length) : ''),
                        (b.fp = r),
                    (a5.test(a) || p) && (b.e = 0),
                        (this._pt = b),
                        b
                );
            },
            cd = function (c, b, h, a, k, l, i, m, f) {
                aV(a) && (a = a(k || 0, c, l));
                var d,
                    g = c[b],
                    e =
                        'get' !== h
                            ? h
                            : aV(g)
                                ? f
                                    ? c[
                                        b.indexOf('set') || !aV(c['get' + b.substr(3)])
                                            ? b
                                            : 'get' + b.substr(3)
                                        ](f)
                                    : c[b]()
                                : g,
                    j = aV(g) ? (f ? cl : ck) : cj;
                if (
                    (aU(a) &&
                    (~a.indexOf('random(') && (a = bT(a)),
                    '=' === a.charAt(1) &&
                    ((d = bk(e, a) + (ad(e) || 0)) || 0 === d) &&
                    (a = d)),
                    e !== a || cb)
                )
                    return isNaN(e * a) || '' === a
                        ? (g || b in c || a9(b, a),
                            cc.call(this, c, b, e, a, j, m || V.stringFilter, f))
                        : ((d = new ao(
                            this._pt,
                            c,
                            b,
                            +e || 0,
                            a - (e || 0),
                            'boolean' == typeof g ? cp : co,
                            0,
                            j
                        )),
                        f && (d.fp = f),
                        i && d.modifier(i, this, c),
                            (this._pt = d));
            },
            ce = function (c, f, b, g, d, h) {
                var a, i, j, e;
                if (
                    Z[c] &&
                    !1 !==
                    (a = new Z[c]()).init(
                        d,
                        a.rawVars
                            ? f[c]
                            : (function (a, b, c, d, e) {
                                if (
                                    (aV(a) && (a = ch(a, e, b, c, d)),
                                    !aY(a) || (a.style && a.nodeType) || a0(a) || a_(a))
                                )
                                    return aU(a) ? ch(a, e, b, c, d) : a;
                                var f,
                                    g = {};
                                for (f in a) g[f] = ch(a[f], e, b, c, d);
                                return g;
                            })(f[c], g, d, h, b),
                        b,
                        g,
                        h
                    ) &&
                    ((b._pt = i = new ao(b._pt, d, c, 0, 1, a.render, a, 0, a.priority)),
                    b !== H)
                )
                    for (
                        j = b._ptLookup[b._targets.indexOf(d)], e = a._props.length;
                        e--;
                    )
                        j[a._props[e]] = i;
                return a;
            },
            cf = function H(a, c) {
                var i,
                    d,
                    e,
                    D,
                    h,
                    z,
                    A,
                    l,
                    f,
                    B,
                    u,
                    p,
                    E,
                    b = a.vars,
                    _ = b.ease,
                    F = b.startAt,
                    m = b.immediateRender,
                    n = b.lazy,
                    G = b.onUpdate,
                    I = b.onUpdateParams,
                    J = b.callbackScope,
                    K = b.runBackwards,
                    o = b.yoyoEase,
                    C = b.keyframes,
                    v = b.autoRevert,
                    w = a._dur,
                    x = a._startAt,
                    g = a._targets,
                    r = a.parent,
                    t = r && 'nested' === r.data ? r.parent._targets : g,
                    $ = 'auto' === a._overwrite && !aE,
                    y = a.timeline;
                if (
                    (!y || (C && _) || (_ = 'none'),
                        (a._ease = b7(_, s.ease)),
                        (a._yEase = o ? b5(b7(!0 === o ? _ : o, s.ease)) : 0),
                    o &&
                    a._yoyo &&
                    !a._repeat &&
                    ((o = a._yEase), (a._yEase = a._ease), (a._ease = o)),
                        (a._from = !y && !!b.runBackwards),
                    !y || (C && !b.stagger))
                ) {
                    if (
                        ((p = (l = g[0] ? ab(g[0]).harness : 0) && b[l.prop]),
                            (i = bs(b, bb)),
                        x && (bv(x.render(-1, !0)), (x._lazy = 0)),
                            F)
                    ) {
                        if (
                            (bv(
                                (a._startAt = j.set(
                                    g,
                                    k(
                                        {
                                            data: 'isStart',
                                            overwrite: !1,
                                            parent: r,
                                            immediateRender: !0,
                                            lazy: aZ(n),
                                            startAt: null,
                                            delay: 0,
                                            onUpdate: G,
                                            onUpdateParams: I,
                                            callbackScope: J,
                                            stagger: 0,
                                        },
                                        F
                                    )
                                ))
                            ),
                            !(c < 0) || m || v || a._startAt.render(-1, !0),
                                m)
                        ) {
                            if ((c > 0 && !v && (a._startAt = 0), w && c <= 0))
                                return void (c && (a._zTime = c));
                        } else !1 === v && (a._startAt = 0);
                    } else if (K && w) {
                        if (x) v || (a._startAt = 0);
                        else if (
                            (c && (m = !1),
                                (e = k(
                                    {
                                        overwrite: !1,
                                        data: 'isFromStart',
                                        lazy: m && aZ(n),
                                        immediateRender: m,
                                        stagger: 0,
                                        parent: r,
                                    },
                                    i
                                )),
                            p && (e[l.prop] = p),
                                bv((a._startAt = j.set(g, e))),
                            c < 0 && a._startAt.render(-1, !0),
                                (a._zTime = c),
                                m)
                        ) {
                            if (!c) return;
                        } else H(a._startAt, 1e-8);
                    }
                    for (
                        a._pt = a._ptCache = 0, n = (w && aZ(n)) || (n && !w), d = 0;
                        d < g.length;
                        d++
                    ) {
                        if (
                            ((A = (h = g[d])._gsap || bg(g)[d]._gsap),
                                (a._ptLookup[d] = B = {}),
                            bd[A.id] && bc.length && bm(),
                                (u = t === g ? d : t.indexOf(h)),
                            l &&
                            !1 !== (f = new l()).init(h, p || i, a, u, t) &&
                            ((a._pt = D =
                                new ao(a._pt, h, f.name, 0, 1, f.render, f, 0, f.priority)),
                                f._props.forEach(function (a) {
                                    B[a] = D;
                                }),
                            f.priority && (z = 1)),
                            !l || p)
                        )
                            for (e in i)
                                Z[e] && (f = ce(e, i, a, u, h, t))
                                    ? f.priority && (z = 1)
                                    : (B[e] = D =
                                        cd.call(a, h, e, 'get', i[e], u, t, 0, b.stringFilter));
                        a._op && a._op[d] && a.kill(h, a._op[d]),
                        $ &&
                        a._pt &&
                        ((ca = a),
                            q.killTweensOf(h, B, a.globalTime(c)),
                            (E = !a.parent),
                            (ca = 0)),
                        a._pt && n && (bd[A.id] = 1);
                    }
                    z && cv(a), a._onInit && a._onInit(a);
                }
                (a._onUpdate = G),
                    (a._initted = (!a._op || a._pt) && !E),
                C && c <= 0 && y.render(aO, !0, !0);
            },
            cg = function (d, a, c, f) {
                var b,
                    e,
                    g = a.ease || f || 'power1.inOut';
                if (a0(a))
                    (e = c[d] || (c[d] = [])),
                        a.forEach(function (b, c) {
                            return e.push({t: (c / (a.length - 1)) * 100, v: b, e: g});
                        });
                else
                    for (b in a)
                        (e = c[b] || (c[b] = [])),
                        'ease' === b || e.push({t: parseFloat(d), v: a[b], e: g});
            },
            ch = function (a, b, c, d, e) {
                return aV(a)
                    ? a.call(b, c, d, e)
                    : aU(a) && ~a.indexOf('random(')
                        ? bT(a)
                        : a;
            },
            an = u + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
            ci = {};
        c(an + ',id,stagger,delay,duration,paused,scrollTrigger', function (a) {
            return (ci[a] = 1);
        });
        var j = (function (f) {
            function b(p, h, t, F) {
                'number' == typeof h && ((t.duration = h), (h = t), (t = null));
                var b,
                    c,
                    e,
                    g,
                    v,
                    i,
                    r,
                    w,
                    s,
                    l = (b = f.call(this, F ? h : bt(h)) || this).vars,
                    j = l.duration,
                    _ = l.delay,
                    B = l.immediateRender,
                    o = l.stagger,
                    C = l.overwrite,
                    m = l.keyframes,
                    G = l.defaults,
                    D = l.scrollTrigger,
                    E = l.yoyoEase,
                    x = h.parent || q,
                    n = (a0(p) || a_(p) ? aW(p[0]) : 'length' in h) ? [p] : ae(p);
                if (
                    ((b._targets = n.length
                        ? bg(n)
                        : ba(
                        'GSAP target ' + p + ' not found. https://greensock.com',
                        !V.nullTargetWarn
                    ) || []),
                        (b._ptLookup = []),
                        (b._overwrite = C),
                    m || o || a$(j) || a$(_))
                ) {
                    if (
                        ((h = b.vars),
                            (c = b.timeline =
                                new d({data: 'nested', defaults: G || {}})).kill(),
                            (c.parent = c._dp = aC(b)),
                            (c._start = 0),
                        o || a$(j) || a$(_))
                    ) {
                        if (((v = n.length), (w = o && ag(o)), aY(o)))
                            for (i in o) ~an.indexOf(i) && (s || (s = {}), (s[i] = o[i]));
                        for (e = 0; e < v; e++)
                            ((g = bs(h, ci)).stagger = 0),
                            E && (g.yoyoEase = E),
                            s && bq(g, s),
                                (r = n[e]),
                                (g.duration = +ch(j, aC(b), e, r, n)),
                                (g.delay = (+ch(_, aC(b), e, r, n) || 0) - b._delay),
                            !o &&
                            1 === v &&
                            g.delay &&
                            ((b._delay = _ = g.delay), (b._start += _), (g.delay = 0)),
                                c.to(r, g, w ? w(e, r, n) : 0),
                                (c._ease = a.none);
                        c.duration() ? (j = _ = 0) : (b.timeline = 0);
                    } else if (m) {
                        bt(k(c.vars.defaults, {ease: 'none'})),
                            (c._ease = b7(m.ease || h.ease || 'none'));
                        var u,
                            y,
                            z,
                            A = 0;
                        if (a0(m))
                            m.forEach(function (a) {
                                return c.to(n, a, '>');
                            });
                        else {
                            for (i in ((g = {}), m))
                                'ease' === i || 'easeEach' === i || cg(i, m[i], g, m.easeEach);
                            for (i in g)
                                for (
                                    u = g[i].sort(function (a, b) {
                                        return a.t - b.t;
                                    }),
                                        A = 0,
                                        e = 0;
                                    e < u.length;
                                    e++
                                )
                                    ((z = {
                                        ease: (y = u[e]).e,
                                        duration: ((y.t - (e ? u[e - 1].t : 0)) / 100) * j,
                                    })[i] = y.v),
                                        c.to(n, z, A),
                                        (A += z.duration);
                            c.duration() < j && c.to({}, {duration: j - c.duration()});
                        }
                    }
                    j || b.duration((j = c.duration()));
                } else b.timeline = 0;
                return (
                    !0 !== C || aE || ((ca = aC(b)), q.killTweensOf(n), (ca = 0)),
                        bE(x, aC(b), t),
                    h.reversed && b.reverse(),
                    h.paused && b.paused(!0),
                    (B ||
                        (!j &&
                            !m &&
                            b._start === bj(x._time) &&
                            aZ(B) &&
                            (function b(a) {
                                return !a || (a._ts && b(a.parent));
                            })(aC(b)) &&
                            'nested' !== x.data)) &&
                    ((b._tTime = -0.00000001), b.render(Math.max(0, -_))),
                    D && bF(aC(b), D),
                        b
                );
            }

            aD(b, f);
            var e = b.prototype;
            return (
                (e.render = function (a, e, f) {
                    var c,
                        j,
                        g,
                        h,
                        o,
                        m,
                        n,
                        i,
                        p,
                        k = this._time,
                        l = this._tDur,
                        d = this._dur,
                        b = a > l - 1e-8 && a >= 0 ? l : a < 1e-8 ? 0 : a;
                    if (d) {
                        if (
                            b !== this._tTime ||
                            !a ||
                            f ||
                            (!this._initted && this._tTime) ||
                            (this._startAt && this._zTime < 0 != a < 0)
                        ) {
                            if (((c = b), (i = this.timeline), this._repeat)) {
                                if (((h = d + this._rDelay), this._repeat < -1 && a < 0))
                                    return this.totalTime(100 * h + a, e, f);
                                if (
                                    ((c = bj(b % h)),
                                        b === l
                                            ? ((g = this._repeat), (c = d))
                                            : ((g = ~~(b / h)) && g === b / h && ((c = d), g--),
                                            c > d && (c = d)),
                                    (m = this._yoyo && 1 & g) && ((p = this._yEase), (c = d - c)),
                                        (o = bz(this._tTime, h)),
                                    c === k && !f && this._initted)
                                )
                                    return (this._tTime = b), this;
                                g !== o &&
                                (i && this._yEase && b6(i, m),
                                !this.vars.repeatRefresh ||
                                m ||
                                this._lock ||
                                ((this._lock = f = 1),
                                    (this.render(bj(h * g), !0).invalidate()._lock = 0)));
                            }
                            if (!this._initted) {
                                if (bG(this, a < 0 ? a : c, f, e))
                                    return (this._tTime = 0), this;
                                if (k !== this._time) return this;
                                if (d !== this._dur) return this.render(a, e, f);
                            }
                            if (
                                ((this._tTime = b),
                                    (this._time = c),
                                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                                    (this.ratio = n = (p || this._ease)(c / d)),
                                this._from && (this.ratio = n = 1 - n),
                                c && !k && !e && (bV(this, 'onStart'), this._tTime !== b))
                            )
                                return this;
                            for (j = this._pt; j;) j.r(n, j.d), (j = j._next);
                            (i &&
                                i.render(
                                    a < 0
                                        ? a
                                        : !c && m
                                            ? -0.00000001
                                            : i._dur * i._ease(c / this._dur),
                                    e,
                                    f
                                )) ||
                            (this._startAt && (this._zTime = a)),
                            this._onUpdate &&
                            !e &&
                            (a < 0 && this._startAt && this._startAt.render(a, !0, f),
                                bV(this, 'onUpdate')),
                            this._repeat &&
                            g !== o &&
                            this.vars.onRepeat &&
                            !e &&
                            this.parent &&
                            bV(this, 'onRepeat'),
                            (b !== this._tDur && b) ||
                            this._tTime !== b ||
                            (a < 0 &&
                            this._startAt &&
                            !this._onUpdate &&
                            this._startAt.render(a, !0, !0),
                            (a || !d) &&
                            ((b === this._tDur && this._ts > 0) ||
                                (!b && this._ts < 0)) &&
                            bv(this, 1),
                            !e &&
                            (!(a < 0) || k) &&
                            (b || k) &&
                            (bV(this, b === l ? 'onComplete' : 'onReverseComplete', !0),
                            this._prom &&
                            !(b < l && this.timeScale() > 0) &&
                            this._prom()));
                        }
                    } else
                        !(function (a, b, d, i) {
                            var e,
                                g,
                                j,
                                k = a.ratio,
                                c =
                                    b < 0 ||
                                    (!b &&
                                        ((!a._start &&
                                                (function b(c) {
                                                    var a = c.parent;
                                                    return (
                                                        a &&
                                                        a._ts &&
                                                        a._initted &&
                                                        !a._lock &&
                                                        (0 > a.rawTime() || b(a))
                                                    );
                                                })(a) &&
                                                (a._initted || !bH(a))) ||
                                            ((a._ts < 0 || a._dp._ts < 0) && !bH(a))))
                                        ? 0
                                        : 1,
                                h = a._rDelay,
                                f = 0;
                            if (
                                (h &&
                                a._repeat &&
                                ((f = bO(0, a._tDur, b)),
                                    (g = bz(f, h)),
                                a._yoyo && 1 & g && (c = 1 - c),
                                g !== bz(a._tTime, h) &&
                                ((k = 1 - c),
                                a.vars.repeatRefresh && a._initted && a.invalidate())),
                                c !== k || i || 1e-8 === a._zTime || (!b && a._zTime))
                            ) {
                                if (!a._initted && bG(a, b, i, d)) return;
                                for (
                                    j = a._zTime,
                                        a._zTime = b || (d ? 1e-8 : 0),
                                    d || (d = b && !j),
                                        a.ratio = c,
                                    a._from && (c = 1 - c),
                                        a._time = 0,
                                        a._tTime = f,
                                        e = a._pt;
                                    e;
                                )
                                    e.r(c, e.d), (e = e._next);
                                a._startAt && b < 0 && a._startAt.render(b, !0, !0),
                                a._onUpdate && !d && bV(a, 'onUpdate'),
                                f && a._repeat && !d && a.parent && bV(a, 'onRepeat'),
                                (b >= a._tDur || b < 0) &&
                                a.ratio === c &&
                                (c && bv(a, 1),
                                d ||
                                (bV(a, c ? 'onComplete' : 'onReverseComplete', !0),
                                a._prom && a._prom()));
                            } else a._zTime || (a._zTime = b);
                        })(this, a, e, f);
                    return this;
                }),
                    (e.targets = function () {
                        return this._targets;
                    }),
                    (e.invalidate = function () {
                        return (
                            (this._pt =
                                this._op =
                                    this._startAt =
                                        this._onUpdate =
                                            this._lazy =
                                                this.ratio =
                                                    0),
                                (this._ptLookup = []),
                            this.timeline && this.timeline.invalidate(),
                                f.prototype.invalidate.call(this)
                        );
                    }),
                    (e.resetTo = function (b, c, d, e) {
                        aJ || w.wake(), this._ts || this.play();
                        var a = Math.min(
                            this._dur,
                            (this._dp._time - this._start) * this._ts
                        );
                        return (
                            this._initted || cf(this, a),
                                !(function (b, d, g, f, i, j, k) {
                                    var a,
                                        h,
                                        c,
                                        e = ((b._pt && b._ptCache) || (b._ptCache = {}))[d];
                                    if (!e)
                                        for (
                                            e = b._ptCache[d] = [],
                                                h = b._ptLookup,
                                                c = b._targets.length;
                                            c--;
                                        ) {
                                            if ((a = h[c][d]) && a.d && a.d._pt)
                                                for (a = a.d._pt; a && a.p !== d;) a = a._next;
                                            if (!a)
                                                return (cb = 1), (b.vars[d] = '+=0'), cf(b, k), (cb = 0), 1;
                                            e.push(a);
                                        }
                                    for (c = e.length; c--;)
                                        ((a = e[c]).s =
                                            (!f && 0 !== f) || i ? a.s + (f || 0) + j * a.c : f),
                                            (a.c = g - a.s),
                                        a.e && (a.e = bi(g) + ad(a.e)),
                                        a.b && (a.b = a.s + ad(a.b));
                                })(this, b, c, d, e, this._ease(a / this._dur), a)
                                    ? (bC(this, 0),
                                    this.parent ||
                                    bu(
                                        this._dp,
                                        this,
                                        '_first',
                                        '_last',
                                        this._dp._sort ? '_start' : 0
                                    ),
                                        this.render(0))
                                    : this.resetTo(b, c, d, e)
                        );
                    }),
                    (e.kill = function (g, a) {
                        if ((void 0 === a && (a = 'all'), !(g || (a && 'all' !== a))))
                            return (this._lazy = this._pt = 0), this.parent ? bW(this) : this;
                        if (this.timeline) {
                            var l = this.timeline.totalDuration();
                            return (
                                this.timeline.killTweensOf(g, a, ca && !0 !== ca.vars.overwrite)
                                    ._first || bW(this),
                                this.parent &&
                                l !== this.timeline.totalDuration() &&
                                bI(this, (this._dur * this.timeline._tDur) / l, 0, 1),
                                    this
                            );
                        }
                        var h,
                            e,
                            i,
                            k,
                            b,
                            j,
                            d,
                            f = this._targets,
                            m = g ? ae(g) : f,
                            n = this._ptLookup,
                            o = this._pt;
                        if (
                            (!a || 'all' === a) &&
                            (function (b, c) {
                                for (
                                    var a = b.length, d = a === c.length;
                                    d && a-- && b[a] === c[a];
                                ) ;
                                return a < 0;
                            })(f, m)
                        )
                            return 'all' === a && (this._pt = 0), bW(this);
                        for (
                            h = this._op = this._op || [],
                            'all' !== a &&
                            (aU(a) &&
                            ((b = {}),
                                c(a, function (a) {
                                    return (b[a] = 1);
                                }),
                                (a = b)),
                                (a = (function (e, f) {
                                    var a,
                                        b,
                                        c,
                                        g,
                                        h = e[0] ? ab(e[0]).harness : 0,
                                        d = h && h.aliases;
                                    if (!d) return f;
                                    for (b in ((a = bq({}, f)), d))
                                        if ((b in a))
                                            for (c = (g = d[b].split(',')).length; c--;)
                                                a[g[c]] = a[b];
                                    return a;
                                })(f, a))),
                                d = f.length;
                            d--;
                        )
                            if (~m.indexOf(f[d]))
                                for (b in ((e = n[d]),
                                    'all' === a
                                        ? ((h[d] = a), (k = e), (i = {}))
                                        : ((i = h[d] = h[d] || {}), (k = a)),
                                    k))
                                    (j = e && e[b]) &&
                                    (('kill' in j.d && !0 !== j.d.kill(b)) || ac(this, j, '_pt'),
                                        delete e[b]),
                                    'all' !== i && (i[b] = 1);
                        return this._initted && !this._pt && o && bW(this), this;
                    }),
                    (b.to = function (a, c) {
                        return new b(a, c, arguments[2]);
                    }),
                    (b.from = function (a, b) {
                        return bM(1, arguments);
                    }),
                    (b.delayedCall = function (d, a, c, e) {
                        return new b(a, 0, {
                            immediateRender: !1,
                            lazy: !1,
                            overwrite: !1,
                            delay: d,
                            onComplete: a,
                            onReverseComplete: a,
                            onCompleteParams: c,
                            onReverseCompleteParams: c,
                            callbackScope: e,
                        });
                    }),
                    (b.fromTo = function (a, b, c) {
                        return bM(2, arguments);
                    }),
                    (b.set = function (c, a) {
                        return (a.duration = 0), a.repeatDelay || (a.repeat = 0), new b(c, a);
                    }),
                    (b.killTweensOf = function (a, b, c) {
                        return q.killTweensOf(a, b, c);
                    }),
                    b
            );
        })(i);
        k(j.prototype, {_targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0}),
            c('staggerTo,staggerFrom,staggerFromTo', function (a) {
                j[a] = function () {
                    var b = new d(),
                        c = bP.call(arguments, 0);
                    return (
                        c.splice('staggerFromTo' === a ? 5 : 4, 0, 0), b[a].apply(b, c)
                    );
                };
            });
        var cj = function (a, b, c) {
                return (a[b] = c);
            },
            ck = function (a, b, c) {
                return a[b](c);
            },
            cl = function (a, b, c, d) {
                return a[b](d.fp, c);
            },
            cm = function (a, b, c) {
                return a.setAttribute(b, c);
            },
            cn = function (a, b) {
                return aV(a[b]) ? ck : aX(a[b]) && a.setAttribute ? cm : cj;
            },
            co = function (b, a) {
                return a.set(a.t, a.p, Math.round(1e6 * (a.s + a.c * b)) / 1e6, a);
            },
            cp = function (b, a) {
                return a.set(a.t, a.p, !!(a.s + a.c * b), a);
            },
            cq = function (d, a) {
                var b = a._pt,
                    c = '';
                if (!d && a.b) c = a.b;
                else if (1 === d && a.e) c = a.e;
                else {
                    for (; b;)
                        (c =
                            b.p +
                            (b.m
                                ? b.m(b.s + b.c * d)
                                : Math.round(1e4 * (b.s + b.c * d)) / 1e4) +
                            c),
                            (b = b._next);
                    c += a.c;
                }
                a.set(a.t, a.p, c, a);
            },
            cr = function (b, c) {
                for (var a = c._pt; a;) a.r(b, a.d), (a = a._next);
            },
            cs = function (c, d, e, f) {
                for (var b, a = this._pt; a;)
                    (b = a._next), a.p === f && a.modifier(c, d, e), (a = b);
            },
            ct = function (b) {
                for (var c, d, a = this._pt; a;)
                    (d = a._next),
                        (a.p !== b || a.op) && a.op !== b
                            ? a.dep || (c = 1)
                            : ac(this, a, '_pt'),
                        (a = d);
                return !c;
            },
            cu = function (b, c, d, a) {
                a.mSet(b, c, a.m.call(a.tween, d, a.mt), a);
            },
            cv = function (d) {
                for (var e, b, c, f, a = d._pt; a;) {
                    for (e = a._next, b = c; b && b.pr > a.pr;) b = b._next;
                    (a._prev = b ? b._prev : f) ? (a._prev._next = a) : (c = a),
                        (a._next = b) ? (b._prev = a) : (f = a),
                        (a = e);
                }
                d._pt = c;
            },
            ao = (function () {
                function a(a, b, c, d, e, f, g, h, i) {
                    (this.t = b),
                        (this.s = d),
                        (this.c = e),
                        (this.p = c),
                        (this.r = f || co),
                        (this.d = g || this),
                        (this.set = h || cj),
                        (this.pr = i || 0),
                        (this._next = a),
                    a && (a._prev = this);
                }

                return (
                    (a.prototype.modifier = function (a, b, c) {
                        (this.mSet = this.mSet || this.set),
                            (this.set = cu),
                            (this.m = a),
                            (this.mt = c),
                            (this.tween = b);
                    }),
                        a
                );
            })();
        c(
            u +
            'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
            function (a) {
                return (bb[a] = 1);
            }
        ),
            (f.TweenMax = f.TweenLite = j),
            (f.TimelineLite = f.TimelineMax = d),
            (q = new d({
                sortChildren: !1,
                defaults: s,
                autoRemoveChildren: !0,
                id: 'root',
                smoothChildTiming: !0,
            })),
            (V.stringFilter = al);
        var n = {
            registerPlugin: function () {
                for (var b = arguments.length, c = new Array(b), a = 0; a < b; a++)
                    c[a] = arguments[a];
                c.forEach(function (a) {
                    return bX(a);
                });
            },
            timeline: function (a) {
                return new d(a);
            },
            getTweensOf: function (a, b) {
                return q.getTweensOf(a, b);
            },
            getProperty: function (a, b, c, d) {
                aU(a) && (a = ae(a)[0]);
                var e = ab(a || {}).get,
                    f = c ? bp : bo;
                return (
                    'native' === c && (c = ''),
                        a
                            ? b
                                ? f(((Z[b] && Z[b].get) || e)(a, b, c, d))
                                : function (b, c, d) {
                                    return f(((Z[b] && Z[b].get) || e)(a, b, c, d));
                                }
                            : a
                );
            },
            quickSetter: function (a, b, i) {
                if ((a = ae(a)).length > 1) {
                    var e = a.map(function (a) {
                            return g.quickSetter(a, b, i);
                        }),
                        j = e.length;
                    return function (b) {
                        for (var a = j; a--;) e[a](b);
                    };
                }
                a = a[0] || {};
                var d = Z[b],
                    c = ab(a),
                    f = (c.harness && (c.harness.aliases || {})[b]) || b,
                    h = d
                        ? function (c) {
                            var b = new d();
                            (H._pt = 0),
                                b.init(a, i ? c + i : c, H, 0, [a]),
                                b.render(1, b),
                            H._pt && cr(1, H);
                        }
                        : c.set(a, f);
                return d
                    ? h
                    : function (b) {
                        return h(a, f, i ? b + i : b, c, 1);
                    };
            },
            quickTo: function (c, d, e) {
                var a,
                    f = g.to(
                        c,
                        bq((((a = {})[d] = '+=0.1'), (a.paused = !0), a), e || {})
                    ),
                    b = function (a, b, c) {
                        return f.resetTo(d, a, b, c);
                    };
                return (b.tween = f), b;
            },
            isTweening: function (a) {
                return q.getTweensOf(a, !0).length > 0;
            },
            defaults: function (a) {
                return a && a.ease && (a.ease = b7(a.ease, s.ease)), br(s, a || {});
            },
            config: function (a) {
                return br(V, a || {});
            },
            registerEffect: function (a) {
                var b = a.name,
                    g = a.effect,
                    c = a.plugins,
                    h = a.defaults,
                    e = a.extendTimeline;
                (c || '').split(',').forEach(function (a) {
                    return (
                        a && !Z[a] && !f[a] && ba(b + ' effect requires ' + a + ' plugin.')
                    );
                }),
                    (aa[b] = function (a, b, c) {
                        return g(ae(a), k(b || {}, h), c);
                    }),
                e &&
                (d.prototype[b] = function (d, a, c) {
                    return this.add(aa[b](d, aY(a) ? a : (c = a) && {}, this), c);
                });
            },
            registerEase: function (b, c) {
                a[b] = b7(c);
            },
            parseEase: function (b, c) {
                return arguments.length ? b7(b, c) : a;
            },
            getById: function (a) {
                return q.getById(a);
            },
            exportRoot: function (c, f) {
                void 0 === c && (c = {});
                var a,
                    e,
                    b = new d(c);
                for (
                    b.smoothChildTiming = aZ(c.smoothChildTiming),
                        q.remove(b),
                        b._dp = 0,
                        b._time = b._tTime = q._time,
                        a = q._first;
                    a;
                )
                    (e = a._next),
                    (!f &&
                        !a._dur &&
                        a instanceof j &&
                        a.vars.onComplete === a._targets[0]) ||
                    bE(b, a, a._start - a._delay),
                        (a = e);
                return bE(q, b, 0), b;
            },
            utils: {
                wrap: function c(a, b, d) {
                    var e = b - a;
                    return a0(a)
                        ? bS(a, c(0, a.length), b)
                        : bN(d, function (b) {
                            return ((e + ((b - a) % e)) % e) + a;
                        });
                },
                wrapYoyo: function c(a, b, d) {
                    var e = b - a,
                        f = 2 * e;
                    return a0(a)
                        ? bS(a, c(0, a.length - 1), b)
                        : bN(d, function (b) {
                            return a + ((b = (f + ((b - a) % f)) % f || 0) > e ? f - b : b);
                        });
                },
                distribute: ag,
                random: ai,
                snap: v,
                normalize: function (a, b, c) {
                    return aj(a, b, 0, 1, c);
                },
                getUnit: ad,
                clamp: function (b, c, a) {
                    return bN(a, function (a) {
                        return bO(b, c, a);
                    });
                },
                splitColor: ak,
                toArray: ae,
                selector: function (a) {
                    return (
                        (a = ae(a)[0] || ba('Invalid scope') || {}),
                            function (c) {
                                var b = a.current || a.nativeElement || a;
                                return ae(
                                    c,
                                    b.querySelectorAll
                                        ? b
                                        : b === a
                                            ? ba('Invalid scope') || aH.createElement('div')
                                            : a
                                );
                            }
                    );
                },
                mapRange: aj,
                pipe: function () {
                    for (var b = arguments.length, c = new Array(b), a = 0; a < b; a++)
                        c[a] = arguments[a];
                    return function (a) {
                        return c.reduce(function (a, b) {
                            return b(a);
                        }, a);
                    };
                },
                unitize: function (a, b) {
                    return function (c) {
                        return a(parseFloat(c)) + (b || ad(c));
                    };
                },
                interpolate: function j(a, b, d, i) {
                    var e = isNaN(a + b)
                        ? 0
                        : function (c) {
                            return (1 - c) * a + c * b;
                        };
                    if (!e) {
                        var f,
                            c,
                            g,
                            h,
                            k,
                            l = aU(a),
                            m = {};
                        if ((!0 === d && (i = 1) && (d = null), l))
                            (a = {p: a}), (b = {p: b});
                        else if (a0(a) && !a0(b)) {
                            for (g = [], k = (h = a.length) - 2, c = 1; c < h; c++)
                                g.push(j(a[c - 1], a[c]));
                            h--,
                                (e = function (a) {
                                    var b = Math.min(k, ~~(a *= h));
                                    return g[b](a - b);
                                }),
                                (d = b);
                        } else i || (a = bq(a0(a) ? [] : {}, a));
                        if (!g) {
                            for (f in b) cd.call(m, a, f, 'get', b[f]);
                            e = function (b) {
                                return cr(b, m) || (l ? a.p : a);
                            };
                        }
                    }
                    return bN(d, e);
                },
                shuffle: af,
            },
            install: X,
            effects: aa,
            ticker: w,
            updateRoot: d.updateRoot,
            plugins: Z,
            globalTimeline: q,
            core: {
                PropTween: ao,
                globals: Y,
                Tween: j,
                Timeline: d,
                Animation: i,
                getCache: ab,
                _removeLinkedListItem: ac,
                suppressOverwrites: function (a) {
                    return (aE = a);
                },
            },
        };
        c('to,from,fromTo,delayedCall,set,killTweensOf', function (a) {
            return (n[a] = j[a]);
        }),
            w.add(d.updateRoot),
            (H = n.to({}, {duration: 0}));
        var cw = function (c, b) {
                for (var a = c._pt; a && a.p !== b && a.op !== b && a.fp !== b;)
                    a = a._next;
                return a;
            },
            o = function (a, b) {
                return {
                    name: a,
                    rawVars: 1,
                    init: function (d, e, a) {
                        a._onInit = function (f) {
                            var a, d;
                            if (
                                (aU(e) &&
                                ((a = {}),
                                    c(e, function (b) {
                                        return (a[b] = 1);
                                    }),
                                    (e = a)),
                                    b)
                            ) {
                                for (d in ((a = {}), e)) a[d] = b(e[d]);
                                e = a;
                            }
                            !(function (d, e) {
                                var b,
                                    c,
                                    a,
                                    f = d._targets;
                                for (b in e)
                                    for (c = f.length; c--;)
                                        (a = d._ptLookup[c][b]) &&
                                        (a = a.d) &&
                                        (a._pt && (a = cw(a, b)),
                                        a && a.modifier && a.modifier(e[b], d, f[c], b));
                            })(f, e);
                        };
                    },
                };
            },
            g =
                n.registerPlugin(
                    {
                        name: 'attr',
                        init: function (b, c, g, e, f) {
                            var a, d;
                            for (a in c)
                                (d = this.add(
                                    b,
                                    'setAttribute',
                                    (b.getAttribute(a) || 0) + '',
                                    c[a],
                                    e,
                                    f,
                                    0,
                                    0,
                                    a
                                )) && (d.op = a),
                                    this._props.push(a);
                        },
                    },
                    {
                        name: 'endArray',
                        init: function (b, c) {
                            for (var a = c.length; a--;) this.add(b, a, b[a] || 0, c[a]);
                        },
                    },
                    o('roundProps', ah),
                    o('modifiers'),
                    o('snap', v)
                ) || n;
        (j.version = d.version = g.version = '3.10.4'),
            (G = 1),
        W() && am(),
            a.Power0,
            a.Power1,
            a.Power2,
            a.Power3,
            a.Power4,
            a.Linear,
            a.Quad,
            a.Cubic,
            a.Quart,
            a.Quint,
            a.Strong,
            a.Elastic,
            a.Back,
            a.SteppedEase,
            a.Bounce,
            a.Sine,
            a.Expo,
            a.Circ;
        var cx,
            cy,
            cz,
            cA,
            cB,
            cC,
            cD,
            cE = {},
            cF = 180 / Math.PI,
            cG = Math.PI / 180,
            cH = Math.atan2,
            cI = /([A-Z])/g,
            cJ = /(left|right|width|margin|padding|x)/i,
            cK = /[\s,\(]\S/,
            x = {
                autoAlpha: 'opacity,visibility',
                scale: 'scaleX,scaleY',
                alpha: 'opacity',
            },
            cL = function (b, a) {
                return a.set(
                    a.t,
                    a.p,
                    Math.round(1e4 * (a.s + a.c * b)) / 1e4 + a.u,
                    a
                );
            },
            cM = function (c, a) {
                var b = a.s + a.c * c;
                a.set(a.t, a.p, ~~(b + (b < 0 ? -0.5 : 0.5)) + a.u, a);
            },
            cN = function (b, a) {
                return a.set(a.t, a.p, b ? a.e : a.b, a);
            },
            cO = function (b, a) {
                return a.set(a.t, a.p, 1 !== b ? a.b : a.e, a);
            },
            cP = function (b, e, c, f, d) {
                var a = b._gsap;
                (a.scaleX = a.scaleY = c), a.renderTransform(d, a);
            },
            cQ = function (b, c, d, f, e) {
                var a = b._gsap;
                (a[c] = d), a.renderTransform(e, a);
            },
            ap = 'transform',
            cR = ap + 'Origin',
            cS = function (a, c) {
                var b = cy.createElementNS
                    ? cy.createElementNS(
                        (c || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
                        a
                    )
                    : cy.createElement(a);
                return b.style ? b : cy.createElement(a);
            },
            cT = function d(c, a, e) {
                var b = getComputedStyle(c);
                return (
                    b[a] ||
                    b.getPropertyValue(a.replace(cI, '-$1').toLowerCase()) ||
                    b.getPropertyValue(a) ||
                    (!e && d(c, aq(a) || a, 1)) ||
                    ''
                );
            },
            cU = 'O,Moz,ms,Ms,Webkit'.split(','),
            aq = function (a, d, e) {
                var c = (d || cB).style,
                    b = 5;
                if (a in c && !e) return a;
                for (
                    a = a.charAt(0).toUpperCase() + a.substr(1);
                    b-- && !(cU[b] + a in c);
                ) ;
                return b < 0 ? null : (3 === b ? 'ms' : b >= 0 ? cU[b] : '') + a;
            },
            ar = function () {
                'undefined' != typeof window &&
                window.document &&
                ((cz = (cy = (cx = window).document).documentElement),
                    (cB = cS('div') || {style: {}}),
                    cS('div'),
                    (ap = aq(ap)),
                    (cR = ap + 'Origin'),
                    (cB.style.cssText =
                        'border-width:0;line-height:0;position:absolute;padding:0'),
                    (cD = !!aq('perspective')),
                    (cA = 1));
            },
            cV = function e(f) {
                var a,
                    b = cS(
                        'svg',
                        (this.ownerSVGElement &&
                            this.ownerSVGElement.getAttribute('xmlns')) ||
                        'http://www.w3.org/2000/svg'
                    ),
                    c = this.parentNode,
                    d = this.nextSibling,
                    g = this.style.cssText;
                if (
                    (cz.appendChild(b),
                        b.appendChild(this),
                        (this.style.display = 'block'),
                        f)
                )
                    try {
                        (a = this.getBBox()),
                            (this._gsapBBox = this.getBBox),
                            (this.getBBox = e);
                    } catch (h) {
                    }
                else this._gsapBBox && (a = this._gsapBBox());
                return (
                    c && (d ? c.insertBefore(this, d) : c.appendChild(this)),
                        cz.removeChild(b),
                        (this.style.cssText = g),
                        a
                );
            },
            cW = function (c, a) {
                for (var b = a.length; b--;)
                    if (c.hasAttribute(a[b])) return c.getAttribute(a[b]);
            },
            cX = function (b) {
                var a;
                try {
                    a = b.getBBox();
                } catch (c) {
                    a = cV.call(b, !0);
                }
                return (
                    (a && (a.width || a.height)) ||
                    b.getBBox === cV ||
                    (a = cV.call(b, !0)),
                        !a || a.width || a.x || a.y
                            ? a
                            : {
                                x: +cW(b, ['x', 'cx', 'x1']) || 0,
                                y: +cW(b, ['y', 'cy', 'y1']) || 0,
                                width: 0,
                                height: 0,
                            }
                );
            },
            cY = function (a) {
                return !(!a.getCTM || (a.parentNode && !a.ownerSVGElement) || !cX(a));
            },
            as = function (c, a) {
                if (a) {
                    var b = c.style;
                    a in cE && a !== cR && (a = ap),
                        b.removeProperty
                            ? (('ms' !== a.substr(0, 2) && 'webkit' !== a.substr(0, 6)) ||
                            (a = '-' + a),
                                b.removeProperty(a.replace(cI, '-$1').toLowerCase()))
                            : b.removeAttribute(a);
                }
            },
            cZ = function (b, d, c, e, f, g) {
                var a = new ao(b._pt, d, c, 0, 1, g ? cO : cN);
                return (b._pt = a), (a.b = e), (a.e = f), b._props.push(c), a;
            },
            c$ = {deg: 1, rad: 1, turn: 1},
            c_ = function q(a, h, l, e) {
                var d,
                    b,
                    f,
                    m,
                    c = parseFloat(l) || 0,
                    g = (l + '').trim().substr((c + '').length) || 'px',
                    k = cB.style,
                    i = cJ.test(h),
                    p = 'svg' === a.tagName.toLowerCase(),
                    n = (p ? 'client' : 'offset') + (i ? 'Width' : 'Height'),
                    o = 'px' === e,
                    j = '%' === e;
                return e === g || !c || c$[e] || c$[g]
                    ? c
                    : ('px' === g || o || (c = q(a, h, l, 'px')),
                        (m = a.getCTM && cY(a)),
                        (j || '%' === g) && (cE[h] || ~h.indexOf('adius'))
                            ? ((d = m ? a.getBBox()[i ? 'width' : 'height'] : a[n]),
                                bi(j ? (c / d) * 100 : (c / 100) * d))
                            : ((k[i ? 'width' : 'height'] = 100 + (o ? g : e)),
                                (b =
                                    ~h.indexOf('adius') || ('em' === e && a.appendChild && !p)
                                        ? a
                                        : a.parentNode),
                            m && (b = (a.ownerSVGElement || {}).parentNode),
                            (b && b !== cy && b.appendChild) || (b = cy.body),
                                (f = b._gsap) && j && f.width && i && f.time === w.time
                                    ? bi((c / f.width) * 100)
                                    : ((j || '%' === g) && (k.position = cT(a, 'position')),
                                    b === a && (k.position = 'static'),
                                        b.appendChild(cB),
                                        (d = cB[n]),
                                        b.removeChild(cB),
                                        (k.position = 'absolute'),
                                    i && j && (((f = ab(b)).time = w.time), (f.width = b[n])),
                                        bi(o ? (d * c) / 100 : d && c ? (100 / d) * c : 0))));
            },
            at = function (c, a, d, e) {
                var b;
                return (
                    cA || ar(),
                    a in x &&
                    'transform' !== a &&
                    ~(a = x[a]).indexOf(',') &&
                    (a = a.split(',')[0]),
                        cE[a] && 'transform' !== a
                            ? ((b = c9(c, e)),
                                (b =
                                    'transformOrigin' !== a
                                        ? b[a]
                                        : b.svg
                                            ? b.origin
                                            : da(cT(c, cR)) + ' ' + b.zOrigin + 'px'))
                            : (!(b = c.style[a]) ||
                                'auto' === b ||
                                e ||
                                ~(b + '').indexOf('calc(')) &&
                            (b =
                                (c3[a] && c3[a](c, a, d)) ||
                                cT(c, a) ||
                                bh(c, a) ||
                                ('opacity' === a ? 1 : 0)),
                        d && !~(b + '').trim().indexOf(' ') ? c_(c, a, b, d) + d : b
                );
            },
            c0 = function (f, b, c, a) {
                if (!c || 'none' === c) {
                    var n = aq(b, f, 1),
                        o = n && cT(f, n, 1);
                    o && o !== c
                        ? ((b = n), (c = o))
                        : 'borderColor' === b && (c = cT(f, 'borderTopColor'));
                }
                var p,
                    q,
                    s,
                    h,
                    i,
                    l,
                    g,
                    r,
                    j,
                    e,
                    m,
                    d = new ao(this._pt, f.style, b, 0, 1, cq),
                    k = 0,
                    _ = 0;
                if (
                    ((d.b = c),
                        (d.e = a),
                        (c += ''),
                    'auto' == (a += '') &&
                    ((f.style[b] = a), (a = cT(f, b) || a), (f.style[b] = c)),
                        al((p = [c, a])),
                        (a = p[1]),
                        (s = (c = p[0]).match(a3) || []),
                        (a.match(a3) || []).length)
                ) {
                    for (; (q = a3.exec(a));)
                        (g = q[0]),
                            (j = a.substring(k, q.index)),
                            i
                                ? (i = (i + 1) % 5)
                                : ('rgba(' !== j.substr(-5) && 'hsla(' !== j.substr(-5)) ||
                                (i = 1),
                        g !== (l = s[_++] || '') &&
                        ((h = parseFloat(l) || 0),
                            (m = l.substr((h + '').length)),
                        '=' === g.charAt(1) && (g = bk(h, g) + m),
                            (r = parseFloat(g)),
                            (e = g.substr((r + '').length)),
                            (k = a3.lastIndex - e.length),
                        e ||
                        ((e = e || V.units[b] || m),
                        k === a.length && ((a += e), (d.e += e))),
                        m !== e && (h = c_(f, b, l, e) || 0),
                            (d._pt = {
                                _next: d._pt,
                                p: j || 1 === _ ? j : ',',
                                s: h,
                                c: r - h,
                                m: (i && i < 4) || 'zIndex' === b ? Math.round : 0,
                            }));
                    d.c = k < a.length ? a.substring(k, a.length) : '';
                } else d.r = 'display' === b && 'none' === a ? cO : cN;
                return a5.test(a) && (d.e = 0), (this._pt = d), d;
            },
            c1 = {
                top: '0%',
                bottom: '100%',
                left: '0%',
                right: '100%',
                center: '50%',
            },
            c2 = function (i, b) {
                if (b.tween && b.tween._time === b.tween._dur) {
                    var d,
                        e,
                        f,
                        a = b.t,
                        h = a.style,
                        c = b.u,
                        g = a._gsap;
                    if ('all' === c || !0 === c) (h.cssText = ''), (e = 1);
                    else
                        for (f = (c = c.split(',')).length; --f > -1;)
                            cE[(d = c[f])] &&
                            ((e = 1), (d = 'transformOrigin' === d ? cR : ap)),
                                as(a, d);
                    e &&
                    (as(a, ap),
                    g &&
                    (g.svg && a.removeAttribute('transform'),
                        c9(a, 1),
                        (g.uncache = 1)));
                }
            },
            c3 = {
                clearProps: function (a, e, c, f, d) {
                    if ('isFromStart' !== d.data) {
                        var b = (a._pt = new ao(a._pt, e, c, 0, 0, c2));
                        return (b.u = f), (b.pr = -10), (b.tween = d), a._props.push(c), 1;
                    }
                },
            },
            c4 = [1, 0, 0, 1, 0, 0],
            c5 = {},
            c6 = function (a) {
                return 'matrix(1, 0, 0, 1, 0, 0)' === a || 'none' === a || !a;
            },
            c7 = function (b) {
                var a = cT(b, ap);
                return c6(a) ? c4 : a.substr(7).match(a2).map(bi);
            },
            au = function (a, i) {
                var d,
                    e,
                    c,
                    g,
                    h = a._gsap || ab(a),
                    f = a.style,
                    b = c7(a);
                return h.svg && a.getAttribute('transform')
                    ? '1,0,0,1,0,0' ===
                    (b = [
                        (c = a.transform.baseVal.consolidate().matrix).a,
                        c.b,
                        c.c,
                        c.d,
                        c.e,
                        c.f,
                    ]).join(',')
                        ? c4
                        : b
                    : (b !== c4 ||
                    a.offsetParent ||
                    a === cz ||
                    h.svg ||
                    ((c = f.display),
                        (f.display = 'block'),
                    ((d = a.parentNode) && a.offsetParent) ||
                    ((g = 1), (e = a.nextSibling), cz.appendChild(a)),
                        (b = c7(a)),
                        c ? (f.display = c) : as(a, 'display'),
                    g &&
                    (e
                        ? d.insertBefore(a, e)
                        : d
                            ? d.appendChild(a)
                            : cz.removeChild(a))),
                        i && b.length > 6 ? [b[0], b[1], b[4], b[5], b[12], b[13]] : b);
            },
            c8 = function (g, p, q, o, w, h) {
                var j,
                    d,
                    r,
                    a = g._gsap,
                    e = w || au(g, !0),
                    s = a.xOrigin || 0,
                    t = a.yOrigin || 0,
                    u = a.xOffset || 0,
                    v = a.yOffset || 0,
                    k = e[0],
                    l = e[1],
                    m = e[2],
                    n = e[3],
                    _ = e[4],
                    f = e[5],
                    i = p.split(' '),
                    b = parseFloat(i[0]) || 0,
                    c = parseFloat(i[1]) || 0;
                q
                    ? e !== c4 &&
                    (d = k * n - l * m) &&
                    ((r = b * (-l / d) + c * (k / d) - (k * f - l * _) / d),
                        (b = b * (n / d) + c * (-m / d) + (m * f - n * _) / d),
                        (c = r))
                    : ((b =
                        (j = cX(g)).x + (~i[0].indexOf('%') ? (b / 100) * j.width : b)),
                        (c =
                            j.y + (~(i[1] || i[0]).indexOf('%') ? (c / 100) * j.height : c))),
                    o || (!1 !== o && a.smooth)
                        ? ((_ = b - s),
                            (f = c - t),
                            (a.xOffset = u + (_ * k + f * m) - _),
                            (a.yOffset = v + (_ * l + f * n) - f))
                        : (a.xOffset = a.yOffset = 0),
                    (a.xOrigin = b),
                    (a.yOrigin = c),
                    (a.smooth = !!o),
                    (a.origin = p),
                    (a.originIsAbsolute = !!q),
                    (g.style[cR] = '0px 0px'),
                h &&
                (cZ(h, a, 'xOrigin', s, b),
                    cZ(h, a, 'yOrigin', t, c),
                    cZ(h, a, 'xOffset', u, a.xOffset),
                    cZ(h, a, 'yOffset', v, a.yOffset)),
                    g.setAttribute('data-svg-origin', b + ' ' + c);
            },
            c9 = function (c, t) {
                var a = c._gsap || new b9(c);
                if ('x' in a && !t && !a.uncache) return a;
                var o,
                    p,
                    E,
                    w,
                    u,
                    j,
                    v,
                    x,
                    k,
                    H,
                    F,
                    B,
                    C,
                    b,
                    e,
                    d,
                    _,
                    f,
                    g,
                    h,
                    q,
                    n,
                    l,
                    i,
                    y,
                    G,
                    z,
                    A,
                    r,
                    I,
                    m,
                    s,
                    J = c.style,
                    $ = a.scaleX < 0,
                    D = cT(c, cR) || '0';
                return (
                    (o = p = E = j = v = x = k = H = F = 0),
                        (w = u = 1),
                        (a.svg = !(!c.getCTM || !cY(c))),
                        (b = au(c, a.svg)),
                    a.svg &&
                    ((i =
                        (!a.uncache || '0px 0px' === D) &&
                        !t &&
                        c.getAttribute('data-svg-origin')),
                        c8(c, i || D, !!i || a.originIsAbsolute, !1 !== a.smooth, b)),
                        (B = a.xOrigin || 0),
                        (C = a.yOrigin || 0),
                    b !== c4 &&
                    ((f = b[0]),
                        (g = b[1]),
                        (h = b[2]),
                        (q = b[3]),
                        (o = n = b[4]),
                        (p = l = b[5]),
                        6 === b.length
                            ? ((w = Math.sqrt(f * f + g * g)),
                                (u = Math.sqrt(q * q + h * h)),
                                (j = f || g ? cH(g, f) * cF : 0),
                            (k = h || q ? cH(h, q) * cF + j : 0) &&
                            (u *= Math.abs(Math.cos(k * cG))),
                            a.svg &&
                            ((o -= B - (B * f + C * h)), (p -= C - (B * g + C * q))))
                            : ((s = b[6]),
                                (I = b[7]),
                                (z = b[8]),
                                (A = b[9]),
                                (r = b[10]),
                                (m = b[11]),
                                (o = b[12]),
                                (p = b[13]),
                                (E = b[14]),
                                (v = (e = cH(s, r)) * cF),
                            e &&
                            ((i = n * (d = Math.cos(-e)) + z * (_ = Math.sin(-e))),
                                (y = l * d + A * _),
                                (G = s * d + r * _),
                                (z = -(n * _) + z * d),
                                (A = -(l * _) + A * d),
                                (r = -(s * _) + r * d),
                                (m = -(I * _) + m * d),
                                (n = i),
                                (l = y),
                                (s = G)),
                                (x = (e = cH(-h, r)) * cF),
                            e &&
                            ((d = Math.cos(-e)),
                                (m = q * (_ = Math.sin(-e)) + m * d),
                                (f = i = f * d - z * _),
                                (g = y = g * d - A * _),
                                (h = G = h * d - r * _)),
                                (j = (e = cH(g, f)) * cF),
                            e &&
                            ((i = f * (d = Math.cos(e)) + g * (_ = Math.sin(e))),
                                (y = n * d + l * _),
                                (g = g * d - f * _),
                                (l = l * d - n * _),
                                (f = i),
                                (n = y)),
                            v &&
                            Math.abs(v) + Math.abs(j) > 359.9 &&
                            ((v = j = 0), (x = 180 - x)),
                                (w = bi(Math.sqrt(f * f + g * g + h * h))),
                                (u = bi(Math.sqrt(l * l + s * s))),
                                (e = cH(n, l)),
                                (k = Math.abs(e) > 2e-4 ? e * cF : 0),
                                (F = m ? 1 / (m < 0 ? -m : m) : 0)),
                    a.svg &&
                    ((i = c.getAttribute('transform')),
                        (a.forceCSS = c.setAttribute('transform', '') || !c6(cT(c, ap))),
                    i && c.setAttribute('transform', i))),
                    Math.abs(k) > 90 &&
                    270 > Math.abs(k) &&
                    ($
                        ? ((w *= -1),
                            (k += j <= 0 ? 180 : -180),
                            (j += j <= 0 ? 180 : -180))
                        : ((u *= -1), (k += k <= 0 ? 180 : -180))),
                        (t = t || a.uncache),
                        (a.x =
                            o -
                            ((a.xPercent =
                                o &&
                                ((!t && a.xPercent) ||
                                    (Math.round(c.offsetWidth / 2) === Math.round(-o) ? -50 : 0)))
                                ? (c.offsetWidth * a.xPercent) / 100
                                : 0) +
                            'px'),
                        (a.y =
                            p -
                            ((a.yPercent =
                                p &&
                                ((!t && a.yPercent) ||
                                    (Math.round(c.offsetHeight / 2) === Math.round(-p) ? -50 : 0)))
                                ? (c.offsetHeight * a.yPercent) / 100
                                : 0) +
                            'px'),
                        (a.z = E + 'px'),
                        (a.scaleX = bi(w)),
                        (a.scaleY = bi(u)),
                        (a.rotation = bi(j) + 'deg'),
                        (a.rotationX = bi(v) + 'deg'),
                        (a.rotationY = bi(x) + 'deg'),
                        (a.skewX = k + 'deg'),
                        (a.skewY = H + 'deg'),
                        (a.transformPerspective = F + 'px'),
                    (a.zOrigin = parseFloat(D.split(' ')[2]) || 0) && (J[cR] = da(D)),
                        (a.xOffset = a.yOffset = 0),
                        (a.force3D = V.force3D),
                        (a.renderTransform = a.svg ? de : cD ? dd : dc),
                        (a.uncache = 0),
                        a
                );
            },
            da = function (a) {
                return (a = a.split(' '))[0] + ' ' + a[1];
            },
            db = function (c, a, d) {
                var b = ad(a);
                return bi(parseFloat(a) + parseFloat(c_(c, 'x', d + 'px', b))) + b;
            },
            dc = function (b, a) {
                (a.z = '0px'),
                    (a.rotationY = a.rotationX = '0deg'),
                    (a.force3D = 0),
                    dd(b, a);
            },
            dd = function (k, v) {
                var a = v || this,
                    l = a.xPercent,
                    m = a.yPercent,
                    b = a.x,
                    c = a.y,
                    d = a.z,
                    n = a.rotation,
                    f = a.rotationY,
                    g = a.rotationX,
                    o = a.skewX,
                    p = a.skewY,
                    q = a.scaleX,
                    r = a.scaleY,
                    s = a.transformPerspective,
                    t = a.force3D,
                    h = a.target,
                    e = a.zOrigin,
                    _ = '',
                    u = ('auto' === t && k && 1 !== k) || !0 === t;
                if (e && ('0deg' !== g || '0deg' !== f)) {
                    var j,
                        i = parseFloat(f) * cG,
                        w = Math.sin(i),
                        x = Math.cos(i);
                    (j = Math.cos((i = parseFloat(g) * cG))),
                        (b = db(h, b, -(w * j * e))),
                        (c = db(h, c, -(-Math.sin(i) * e))),
                        (d = db(h, d, -(x * j * e) + e));
                }
                '0px' !== s && (_ += 'perspective(' + s + ') '),
                (l || m) && (_ += 'translate(' + l + '%, ' + m + '%) '),
                (u || '0px' !== b || '0px' !== c || '0px' !== d) &&
                (_ +=
                    '0px' !== d || u
                        ? 'translate3d(' + b + ', ' + c + ', ' + d + ') '
                        : 'translate(' + b + ', ' + c + ') '),
                '0deg' !== n && (_ += 'rotate(' + n + ') '),
                '0deg' !== f && (_ += 'rotateY(' + f + ') '),
                '0deg' !== g && (_ += 'rotateX(' + g + ') '),
                ('0deg' === o && '0deg' === p) ||
                (_ += 'skew(' + o + ', ' + p + ') '),
                (1 === q && 1 === r) || (_ += 'scale(' + q + ', ' + r + ') '),
                    (h.style[ap] = _ || 'translate(0, 0)');
            },
            de = function (x, v) {
                var f,
                    g,
                    h,
                    i,
                    a,
                    b = v || this,
                    r = b.xPercent,
                    s = b.yPercent,
                    n = b.x,
                    o = b.y,
                    c = b.rotation,
                    d = b.skewX,
                    e = b.skewY,
                    p = b.scaleX,
                    q = b.scaleY,
                    l = b.target,
                    m = b.xOrigin,
                    _ = b.yOrigin,
                    t = b.xOffset,
                    u = b.yOffset,
                    w = b.forceCSS,
                    j = parseFloat(n),
                    k = parseFloat(o);
                (c = parseFloat(c)),
                    (d = parseFloat(d)),
                (e = parseFloat(e)) && ((d += e = parseFloat(e)), (c += e)),
                    c || d
                        ? ((c *= cG),
                            (d *= cG),
                            (f = Math.cos(c) * p),
                            (g = Math.sin(c) * p),
                            (h = -(Math.sin(c - d) * q)),
                            (i = Math.cos(c - d) * q),
                        d &&
                        ((e *= cG),
                            (a = Math.tan(d - e)),
                            (h *= a = Math.sqrt(1 + a * a)),
                            (i *= a),
                        e &&
                        ((a = Math.tan(e)),
                            (f *= a = Math.sqrt(1 + a * a)),
                            (g *= a))),
                            (f = bi(f)),
                            (g = bi(g)),
                            (h = bi(h)),
                            (i = bi(i)))
                        : ((f = p), (i = q), (g = h = 0)),
                ((j && !~(n + '').indexOf('px')) ||
                    (k && !~(o + '').indexOf('px'))) &&
                ((j = c_(l, 'x', n, 'px')), (k = c_(l, 'y', o, 'px'))),
                (m || _ || t || u) &&
                ((j = bi(j + m - (m * f + _ * h) + t)),
                    (k = bi(k + _ - (m * g + _ * i) + u))),
                (r || s) &&
                ((j = bi(j + (r / 100) * (a = l.getBBox()).width)),
                    (k = bi(k + (s / 100) * a.height))),
                    (a =
                        'matrix(' +
                        f +
                        ',' +
                        g +
                        ',' +
                        h +
                        ',' +
                        i +
                        ',' +
                        j +
                        ',' +
                        k +
                        ')'),
                    l.setAttribute('transform', a),
                w && (l.style[ap] = a);
            },
            df = function (d, i, g, e, b) {
                var f,
                    c,
                    h = aU(b),
                    a = parseFloat(b) * (h && ~b.indexOf('rad') ? cF : 1) - e,
                    j = e + a + 'deg';
                return (
                    h &&
                    ('short' === (f = b.split('_')[1]) &&
                    (a %= 360) != a % 180 &&
                    (a += a < 0 ? 360 : -360),
                        'cw' === f && a < 0
                            ? (a = ((a + 36e9) % 360) - 360 * ~~(a / 360))
                            : 'ccw' === f &&
                            a > 0 &&
                            (a = ((a - 36e9) % 360) - 360 * ~~(a / 360))),
                        (d._pt = c =
                            new ao(d._pt, i, g, e, a, function (b, a) {
                                return a.set(
                                    a.t,
                                    a.p,
                                    1 === b ? a.e : Math.round(1e4 * (a.s + a.c * b)) / 1e4 + a.u,
                                    a
                                );
                            })),
                        (c.e = j),
                        (c.u = 'deg'),
                        d._props.push(g),
                        c
                );
            },
            dg = function (a, b) {
                for (var c in b) a[c] = b[c];
                return a;
            },
            dh = function (e, k, a) {
                var d,
                    c,
                    b,
                    f,
                    g,
                    l,
                    h,
                    i = dg({}, a._gsap),
                    j = a.style;
                for (c in (i.svg
                    ? ((b = a.getAttribute('transform')),
                        a.setAttribute('transform', ''),
                        (j[ap] = k),
                        (d = c9(a, 1)),
                        as(a, ap),
                        a.setAttribute('transform', b))
                    : ((b = getComputedStyle(a)[ap]),
                        (j[ap] = k),
                        (d = c9(a, 1)),
                        (j[ap] = b)),
                    cE))
                    (b = i[c]) !== (f = d[c]) &&
                    0 > 'perspective,force3D,transformOrigin,svgOrigin'.indexOf(c) &&
                    ((g = ad(b) !== (h = ad(f)) ? c_(a, c, b, h) : parseFloat(b)),
                        (l = parseFloat(f)),
                        (e._pt = new ao(e._pt, d, c, g, l - g, cL)),
                        (e._pt.u = h || 0),
                        e._props.push(c));
                dg(d, i);
            };
        c('padding,margin,Width,Radius', function (d, e) {
            var a = 'Right',
                b = 'Bottom',
                c = 'Left',
                f = (
                    e < 3 ? ['Top', a, b, c] : ['Top' + c, 'Top' + a, b + a, b + c]
                ).map(function (a) {
                    return e < 2 ? d + a : 'border' + a + d;
                });
            c3[e > 1 ? 'border' + d : d] = function (c, d, h, e, g) {
                var a, b;
                if (arguments.length < 4)
                    return 5 ===
                    (b = (a = f.map(function (a) {
                        return at(c, a, h);
                    })).join(' ')).split(a[0]).length
                        ? a[0]
                        : b;
                (a = (e + '').split(' ')),
                    (b = {}),
                    f.forEach(function (d, c) {
                        return (b[d] = a[c] = a[c] || a[((c - 1) / 2) | 0]);
                    }),
                    c.init(d, b, g);
            };
        });
        var p,
            y,
            z = {
                name: 'css',
                register: ar,
                targetTest: function (a) {
                    return a.style && a.nodeType;
                },
                init: function (d, m, q, r, s) {
                    var c,
                        b,
                        h,
                        f,
                        o,
                        v,
                        a,
                        n,
                        g,
                        i,
                        u,
                        A,
                        e,
                        w,
                        _,
                        y,
                        p,
                        j,
                        k,
                        z = this._props,
                        l = d.style,
                        t = q.vars.startAt;
                    for (a in (cA || ar(), m))
                        if (
                            'autoRound' !== a &&
                            ((b = m[a]), !Z[a] || !ce(a, m, q, r, d, s))
                        ) {
                            if (
                                ((o = typeof b),
                                    (v = c3[a]),
                                'function' === o && (o = typeof (b = b.call(q, r, d, s))),
                                'string' === o && ~b.indexOf('random(') && (b = bT(b)),
                                    v)
                            )
                                v(this, d, a, b, q) && (_ = 1);
                            else if ('--' === a.substr(0, 2))
                                (c = (getComputedStyle(d).getPropertyValue(a) + '').trim()),
                                    (b += ''),
                                    (b0.lastIndex = 0),
                                b0.test(c) || ((n = ad(c)), (g = ad(b))),
                                    g ? n !== g && (c = c_(d, a, c, g) + g) : n && (b += n),
                                    this.add(l, 'setProperty', c, b, r, s, 0, 0, a),
                                    z.push(a);
                            else if ('undefined' !== o) {
                                if (
                                    (t && a in t
                                        ? (aU(
                                            (c =
                                                'function' == typeof t[a]
                                                    ? t[a].call(q, r, d, s)
                                                    : t[a])
                                        ) &&
                                        ~c.indexOf('random(') &&
                                        (c = bT(c)),
                                        ad(c + '') || (c += V.units[a] || ad(at(d, a)) || ''),
                                        '=' === (c + '').charAt(1) && (c = at(d, a)))
                                        : (c = at(d, a)),
                                        (f = parseFloat(c)),
                                    (i =
                                        'string' === o && '=' === b.charAt(1) && b.substr(0, 2)) &&
                                    (b = b.substr(2)),
                                        (h = parseFloat(b)),
                                    a in x &&
                                    ('autoAlpha' === a &&
                                    (1 === f &&
                                    'hidden' === at(d, 'visibility') &&
                                    h &&
                                    (f = 0),
                                        cZ(
                                            this,
                                            l,
                                            'visibility',
                                            f ? 'inherit' : 'hidden',
                                            h ? 'inherit' : 'hidden',
                                            !h
                                        )),
                                    'scale' !== a &&
                                    'transform' !== a &&
                                    ~(a = x[a]).indexOf(',') &&
                                    (a = a.split(',')[0])),
                                        (u = a in cE))
                                ) {
                                    if (
                                        (A ||
                                        (((e = d._gsap).renderTransform && !m.parseTransform) ||
                                        c9(d, m.parseTransform),
                                            (w = !1 !== m.smoothOrigin && e.smooth),
                                            ((A = this._pt =
                                                new ao(
                                                    this._pt,
                                                    l,
                                                    ap,
                                                    0,
                                                    1,
                                                    e.renderTransform,
                                                    e,
                                                    0,
                                                    -1
                                                )).dep = 1)),
                                        'scale' === a)
                                    )
                                        (this._pt = new ao(
                                            this._pt,
                                            e,
                                            'scaleY',
                                            e.scaleY,
                                            (i ? bk(e.scaleY, i + h) : h) - e.scaleY || 0
                                        )),
                                            z.push('scaleY', a),
                                            (a += 'X');
                                    else {
                                        if ('transformOrigin' === a) {
                                            (p = void 0),
                                                (j = void 0),
                                                (k = void 0),
                                                (j = (p = (y = b).split(' '))[0]),
                                                (k = p[1] || '50%'),
                                            ('top' !== j &&
                                                'bottom' !== j &&
                                                'left' !== k &&
                                                'right' !== k) ||
                                            ((y = j), (j = k), (k = y)),
                                                (p[0] = c1[j] || j),
                                                (p[1] = c1[k] || k),
                                                (b = p.join(' ')),
                                                e.svg
                                                    ? c8(d, b, 0, w, 0, this)
                                                    : ((g = parseFloat(b.split(' ')[2]) || 0) !==
                                                    e.zOrigin && cZ(this, e, 'zOrigin', e.zOrigin, g),
                                                        cZ(this, l, a, da(c), da(b)));
                                            continue;
                                        }
                                        if ('svgOrigin' === a) {
                                            c8(d, b, 1, w, 0, this);
                                            continue;
                                        }
                                        if (a in c5) {
                                            df(this, e, a, f, i ? bk(f, i + b) : b);
                                            continue;
                                        }
                                        if ('smoothOrigin' === a) {
                                            cZ(this, e, 'smooth', e.smooth, b);
                                            continue;
                                        }
                                        if ('force3D' === a) {
                                            e[a] = b;
                                            continue;
                                        }
                                        if ('transform' === a) {
                                            dh(this, b, d);
                                            continue;
                                        }
                                    }
                                } else a in l || (a = aq(a) || a);
                                if (
                                    u ||
                                    ((h || 0 === h) && (f || 0 === f) && !cK.test(b) && a in l)
                                )
                                    h || (h = 0),
                                    (n = (c + '').substr((f + '').length)) !==
                                    (g = ad(b) || (a in V.units ? V.units[a] : n)) &&
                                    (f = c_(d, a, c, g)),
                                        (this._pt = new ao(
                                            this._pt,
                                            u ? e : l,
                                            a,
                                            f,
                                            (i ? bk(f, i + h) : h) - f,
                                            u || ('px' !== g && 'zIndex' !== a) || !1 === m.autoRound
                                                ? cL
                                                : cM
                                        )),
                                        (this._pt.u = g || 0),
                                    n !== g &&
                                    '%' !== g &&
                                    ((this._pt.b = c),
                                        (this._pt.r = function (b, a) {
                                            return a.set(
                                                a.t,
                                                a.p,
                                                b
                                                    ? Math.round(1e4 * (a.s + a.c * b)) / 1e4 + a.u
                                                    : a.b,
                                                a
                                            );
                                        }));
                                else if (a in l) c0.call(this, d, a, c, i ? i + b : b);
                                else {
                                    if (!(a in d)) {
                                        a9(a, b);
                                        continue;
                                    }
                                    this.add(d, a, c || d[a], i ? i + b : b, r, s);
                                }
                                z.push(a);
                            }
                        }
                    _ && cv(this);
                },
                get: at,
                aliases: x,
                getSetter: function (b, a, c) {
                    var d = x[a];
                    return (
                        d && 0 > d.indexOf(',') && (a = d),
                            a in cE && a !== cR && (b._gsap.x || at(b, 'x'))
                                ? c && cC === c
                                    ? 'scale' === a
                                        ? function (a, c, b) {
                                            return (a._gsap.scaleX = a._gsap.scaleY = b);
                                        }
                                        : function (a, b, c) {
                                            return (a._gsap[b] = c);
                                        }
                                    : ((cC = c || {}), 'scale' === a ? cP : cQ)
                                : b.style && !aX(b.style[a])
                                    ? function (a, b, c) {
                                        return (a.style[b] = c);
                                    }
                                    : ~a.indexOf('-')
                                        ? function (a, b, c) {
                                            return a.style.setProperty(b, c);
                                        }
                                        : cn(b, a)
                    );
                },
                core: {_removeProperty: as, _getMatrix: au},
            };
        (g.utils.checkPrefix = aq),
            (y = c(
                'x,y,z,scale,scaleX,scaleY,xPercent,yPercent,' +
                (p = 'rotation,rotationX,rotationY,skewX,skewY') +
                ',transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
                function (a) {
                    cE[a] = 1;
                }
            )),
            c(p, function (a) {
                (V.units[a] = 'deg'), (c5[a] = 1);
            }),
            (x[y[13]] = 'x,y,z,scale,scaleX,scaleY,xPercent,yPercent,' + p),
            c(
                '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY',
                function (b) {
                    var a = b.split(':');
                    x[a[1]] = y[a[0]];
                }
            ),
            c(
                'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
                function (a) {
                    V.units[a] = 'px';
                }
            ),
            g.registerPlugin(z);
        var A = g.registerPlugin(z) || g;
        A.core.Tween;
        let av = A.to('#headingInner', {opacity: 0.1, scale: 0.4});
        av.pause(),
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    A.timeline().to('.hero__heading-inner .heading__words', {
                        opacity: 1,
                        y: '0',
                        stagger: '.2',
                        duration: 0.9,
                    });
                }, 1e3);
            });
        let B = new F.a({
            el: document.querySelector('[data-scroll-container]'),
            smooth: !0,
        });
        new ResizeObserver(() => B.update()).observe(document.querySelector("[data-scroll-container]"))

        function di(a, b, c) {
            return (
                b in a
                    ? Object.defineProperty(a, b, {
                        value: c,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                    })
                    : (a[b] = c),
                    a
            );
        }

        let scrollCheck;
        const scrollBrn = document.querySelector('.back_to_top');
        const scrollNavBtn = document.querySelector('.js-scroll-to-form');
        const navBar = document.querySelector(".navigation-bar");
        const footerSection = document.querySelector(".footer");
        const options = {
            offset: window.innerWidth < 768 ? -Math.round(window.innerHeight / 3) : 0,
        }

        function scrollToForm(e) {
            e.preventDefault();
            B.scrollTo('.lets-speak', options);
        }

        scrollBrn && scrollBrn.addEventListener('click', scrollToForm);
        scrollNavBtn && scrollNavBtn.addEventListener('click', scrollToForm);

        if (scrollTo) {
            B.scrollTo(scrollTo, options);
        }

        jQuery('#we-do-page #we-do-submenu a').click(function (e) {
            e.preventDefault();
            const $hamburger = jQuery(".hamburger");
            const $body = jQuery("body");
            const href = jQuery(this).attr("href");

            if (!href || href === '#') {
                return;
            }
            $hamburger.toggleClass("is-active");
            $body.toggleClass('overflow-hidden');
            jQuery(".nav-menu").removeClass("menu-open")
            jQuery("header").removeClass("fix")

            B.scrollTo(href, {
                offset: -Math.round(window.innerHeight / (window.innerWidth < 768 ? 8 : 5)),
            });
        });

        B.on('scroll', (a) => {
            if ('object' == typeof a.currentElements.homeHero) {
                let b = a.currentElements.homeHero.progress;
                av.progress(b < 0.6 ? 0 : b);
            }
            a.scroll.y, a.limit.y;

            scrollBrn.style.cssText = 'opacity:0;visibility:hidden;transform:translateX(150%);';

            clearTimeout(scrollCheck);
            scrollCheck = setTimeout(function () {
                scrollBrn.style.cssText = 'opacity:1;visibility:visible;transform:translateX(0);';
            }, 250);

            if (navBar) {
                const {top: topNav} = navBar.getBoundingClientRect();
                const {top: topFooter} = footerSection.getBoundingClientRect();
                topFooter <= topNav
                    ? navBar.classList.remove('show')
                    : navBar.classList.add('show');
            }
        }),
            B.on('call', (a, c, b) => {
                'clients' === a &&
                A.timeline()
                    .to('.clients__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.clients__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    ),
                'portfolio' === a && A.timeline().to(b.el, {opacity: 1, y: 0, scale: 1}),
                'beautiful' === a && A.timeline().to(b.el, {opacity: 1, y: 0, scale: 1}),
                'video' === a &&
                A.timeline()
                    .to('.video__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.video__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    ),
                'we-do' === a &&
                A.timeline()
                    .to('.we-do__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.we-do__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    ),
                'we-love' === a &&
                A.timeline().to('.we-love__circle-wrapper svg', {
                    rotate: '720deg',
                    duration: 1.5,
                }),
                'we-know' === a &&
                A.timeline()
                    .to('.we-know__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.we-know__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    ),
                'reviews' === a &&
                A.timeline()
                    .to('.reviews__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.reviews__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    ),
                'our-blog' === a &&
                A.timeline()
                    .to('.our-blog .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.our-blog .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    )
                    .to(
                        '.our-blog__item',
                        {stagger: 0.3, y: 0, scale: 1, opacity: 1},
                        '-.1'
                    ),
                'lets-speak' === a &&
                A.timeline()
                    .to('.lets-speak__heading .heading__icon-wr', {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                    })
                    .to(
                        '.lets-speak__heading .heading__words',
                        {opacity: 1, y: 0, stagger: '.2', duration: 0.9},
                        '-.1'
                    );
            });
        let aw = document.getElementById('toggleClients');
        aw && aw.addEventListener('click', () => {
            let a = A.timeline();
            'hide' == aw.dataset.status
                ? (a.to('.clients__items--all', {
                    opacity: 1,
                    visibility: 'visible',
                    maxHeight: '100%',
                }),
                    (aw.dataset.status = 'show'),
                    (aw.innerText = 'Hide our clients'))
                : (a.to('.clients__items--all', {
                    opacity: 0,
                    visibility: 'hidden',
                    maxHeight: '0px',
                }),
                    (aw.dataset.status = 'hide'),
                    (aw.innerText = 'See all our clients'));
        });
        const isServicePage = document.querySelector('#we-do-page');
        const weDoItemRw = document.querySelector('.we-do__items-wr');
        weDoItemRw && !isServicePage && weDoItemRw.addEventListener('click', (a) => {
            a.target.closest('.we-do-item__title-arrow') &&
            (a.target
                .closest('.we-do-item__title-arrow')
                .parentElement.nextElementSibling.nextElementSibling.classList.toggle(
                    'active'
                ),
                a.target
                    .closest('.we-do-item__title-arrow')
                    .classList.toggle('active'));
        });

        const weDoImg = document.querySelector('.we-do__items-wr');
        weDoImg && !isServicePage && weDoImg.addEventListener('click', (a) => {
            a.target.closest('.we-do-item__img-wr') &&
            (a.target
                .closest('.we-do-item__img-wr')
                .parentElement.querySelector('.we-do-item__title-arrow').click());
        });
        const weDoMoreBtn = document.querySelector('.we-do__more-btn');
        weDoMoreBtn && weDoMoreBtn.addEventListener('click', (a) => {
            a.preventDefault(),
                document.querySelector('.we-do__items-wr').classList.toggle('active')
            document.querySelector('.we-do__more-btn').classList.toggle('active')
        });

        class dj {
            constructor() {
                var a = this;
                di(this, 'setActiveLinePosition', function () {
                    let b =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : a.activeAdvTab,
                        c = A.timeline({}),
                        d = b.offsetLeft;
                    c.to(a.advActiveLine, {width: b.offsetWidth}).to(a.advActiveLine, {
                        x: d,
                    });
                }),
                    di(this, 'setActiveClassToSelectedTab', (a) => {
                        const advantageTabsItem = document.querySelector('.advantages-tabs__item--active');
                        advantageTabsItem && advantageTabsItem.classList.remove('advantages-tabs__item--active'),
                            a.classList.add('advantages-tabs__item--active');
                    }),
                    di(this, 'disableTabContent', () => {
                        let a = A.timeline({});
                        (document.querySelector('.advantages__content-wr').style.minHeight =
                            document.querySelector('.advantages__content-item--active')
                                .offsetHeight + 'px'),
                            a.to('.advantages__content-item--active', {display: 'none'}),
                            document
                                .querySelector('.advantages__content-item--active')
                                .classList.remove('advantages__content-item--active');
                    }),
                    di(this, 'showNewTabContent', (a) => {
                        A.timeline({}).to(a, {display: 'block'}),
                            a.classList.add('advantages__content-item--active'),
                            (this.inProcess = !1);
                    }),
                    di(this, 'tabActivate', (a) => {
                        if (!this.inProcess) {
                            this.inProcess = !0;
                            let b = a.hash;
                            this.setActiveClassToSelectedTab(a),
                                this.setActiveLinePosition(a),
                                this.disableTabContent();
                            let c = document.getElementById('advantage-' + b.substr(1));
                            setTimeout(() => this.showNewTabContent(c), 500);
                        }
                    }),
                    (this.inProcess = !1),
                    (this.activeAdvTab = document.querySelector(
                        '.advantages-tabs__item--active'
                    )),
                    (this.advActiveLine = document.querySelector(
                        '.advantages-tabs__line-active'
                    ));
            }
        }

        function dk(a) {
            return (
                null !== a &&
                'object' == typeof a &&
                'constructor' in a &&
                a.constructor === Object
            );
        }

        function dl(b = {}, a = {}) {
            Object.keys(a).forEach((c) => {
                void 0 === b[c]
                    ? (b[c] = a[c])
                    : dk(a[c]) &&
                    dk(b[c]) &&
                    Object.keys(a[c]).length > 0 &&
                    dl(b[c], a[c]);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (
                Math.max(
                    // document.body.scrollWidth,
                    // document.documentElement.scrollWidth,
                    document.body.offsetWidth,
                    document.documentElement.offsetWidth,
                    document.documentElement.clientWidth
                ) > 767
            ) {
                let a = new dj();
                document.querySelector('.advantages-tabs__item--active') &&
                a.setActiveLinePosition();
                const advantagesTabs = document.querySelector('.advantages-tabs');
                advantagesTabs && advantagesTabs.addEventListener('click', (b) => {
                    b.target.closest('.advantages-tabs__item') &&
                    a.tabActivate(b.target.closest('.advantages-tabs__item'));
                });
            } else {
                console.log('start')
                const advantagesMobile = document.querySelector('.advantages__mobile');
                advantagesMobile && advantagesMobile.addEventListener('click', (c) => {
                    console.log('click');
                    let b = c.target;
                    if (b.closest('.adv-mob-item__title')) {
                        let a = b.closest('.adv-mob-item__title');
                        a.parentElement.classList.contains('adv-mob-item--closed')
                            ? (a.parentElement.classList.remove('adv-mob-item--closed'),
                                a.parentElement.classList.add('adv-mob-item--active'),
                                A.timeline({}).to(a.nextElementSibling, {
                                    opacity: 1,
                                    visibility: 'visible',
                                    maxHeight: '100%',
                                    lineHeight: '180%',
                                }))
                            : (a.parentElement.classList.add('adv-mob-item--closed'),
                                a.parentElement.classList.remove('adv-mob-item--active'),
                                A.timeline({}).to(a.nextElementSibling, {
                                    opacity: 0,
                                    visibility: 'hidden',
                                    maxHeight: '0px',
                                    lineHeight: '80%',
                                }));
                    }
                });
            }

            const faqItemsWr = document.querySelector('.faq .faq__items-wrapper');
            faqItemsWr && faqItemsWr.addEventListener('click', (c) => {
                let b = c.target;
                if (b.closest('.faq-item__title-wr')) {
                    let a = b.closest('.faq-item__title-wr');
                    a.parentElement.classList.contains('faq-item--closed')
                        ? (a.parentElement.classList.remove('faq-item--closed'),
                            A.timeline({}).to(a.nextElementSibling, {
                                opacity: 1,
                                visibility: 'visible',
                                maxHeight: '100%',
                                lineHeight: '180%',
                            }))
                        : (a.parentElement.classList.add('faq-item--closed'),
                            A.timeline().to(a.nextElementSibling, {
                                opacity: 0,
                                visibility: 'hidden',
                                maxHeight: '0px',
                                lineHeight: '70%',
                            }));
                }
            });

            const servicesItemsWr = document.querySelector('.other-services .faq__items-wrapper');
            servicesItemsWr && servicesItemsWr.addEventListener('click', (c) => {
                let b = c.target;
                if (b.closest('.faq-item__title-wr')) {
                    let a = b.closest('.faq-item__title-wr');
                    a.parentElement.classList.contains('faq-item--closed')
                        ? (a.parentElement.classList.remove('faq-item--closed'),
                            A.timeline({}).to(a.nextElementSibling, {
                                opacity: 1,
                                visibility: 'visible',
                                maxHeight: '100%',
                                lineHeight: '180%',
                            }))
                        : (a.parentElement.classList.add('faq-item--closed'),
                            A.timeline().to(a.nextElementSibling, {
                                opacity: 0,
                                visibility: 'hidden',
                                maxHeight: '0px',
                                lineHeight: '70%',
                            }));
                }
            });
        });
        let icon = document.querySelector('.faq__arrow-icon');
        icon && icon.addEventListener('click', (a) => {
            document
                .querySelector('.faq__items-wrapper')
                .classList.contains('closed')
                ? (document
                    .querySelector('.faq__items-wrapper')
                    .classList.remove('faq-item--closed'),
                    A.timeline({}).to(document.querySelector('.faq__items-wrapper'), {
                        opacity: 1,
                        visibility: 'visible',
                        maxHeight: '100%',
                    }))
                : (document
                    .querySelector('.faq__items-wrapper')
                    .classList.add('faq-item--closed'),
                    A.timeline().to(document.querySelector('.faq__items-wrapper'), {
                        opacity: 0,
                        visibility: 'hidden',
                        maxHeight: '0px',
                    }));
        });
        let ax = {
            body: {},
            addEventListener() {
            },
            removeEventListener() {
            },
            activeElement: {
                blur() {
                }, nodeName: ''
            },
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createEvent: () => ({
                initEvent() {
                }
            }),
            createElement: () => ({
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {
                },
                getElementsByTagName: () => [],
            }),
            createElementNS: () => ({}),
            importNode: () => null,
            location: {
                hash: '',
                host: '',
                hostname: '',
                href: '',
                origin: '',
                pathname: '',
                protocol: '',
                search: '',
            },
        };

        function dm() {
            let a = 'undefined' != typeof document ? document : {};
            return dl(a, ax), a;
        }

        let dn = {
            document: ax,
            navigator: {userAgent: ''},
            location: {
                hash: '',
                host: '',
                hostname: '',
                href: '',
                origin: '',
                pathname: '',
                protocol: '',
                search: '',
            },
            history: {
                replaceState() {
                }, pushState() {
                }, go() {
                }, back() {
                }
            },
            CustomEvent: function () {
                return this;
            },
            addEventListener() {
            },
            removeEventListener() {
            },
            getComputedStyle: () => ({getPropertyValue: () => ''}),
            Image() {
            },
            Date() {
            },
            screen: {},
            setTimeout() {
            },
            clearTimeout() {
            },
            matchMedia: () => ({}),
            requestAnimationFrame: (a) =>
                'undefined' == typeof setTimeout ? (a(), null) : setTimeout(a, 0),
            cancelAnimationFrame(a) {
                'undefined' != typeof setTimeout && clearTimeout(a);
            },
        };

        function dp() {
            let a = 'undefined' != typeof window ? window : {};
            return dl(a, dn), a;
        }

        class ay extends Array {
            constructor(a) {
                var b;
                let c;
                'number' == typeof a
                    ? super(a)
                    : (super(...(a || [])),
                        (b = this),
                        (c = b.__proto__),
                        Object.defineProperty(b, '__proto__', {
                            get: () => c,
                            set(a) {
                                c.__proto__ = a;
                            },
                        }));
            }
        }

        function dq(a = []) {
            let b = [];
            return (
                a.forEach((a) => {
                    Array.isArray(a) ? b.push(...dq(a)) : b.push(a);
                }),
                    b
            );
        }

        function dr(a, b) {
            return Array.prototype.filter.call(a, b);
        }

        function C(a, h) {
            let i = dp(),
                e = dm(),
                c = [];
            if (!h && a instanceof ay) return a;
            if (!a) return new ay(c);
            if ('string' == typeof a) {
                let b = a.trim();
                if (b.indexOf('<') >= 0 && b.indexOf('>') >= 0) {
                    let d = 'div';
                    0 === b.indexOf('<li') && (d = 'ul'),
                    0 === b.indexOf('<tr') && (d = 'tbody'),
                    (0 !== b.indexOf('<td') && 0 !== b.indexOf('<th')) || (d = 'tr'),
                    0 === b.indexOf('<tbody') && (d = 'table'),
                    0 === b.indexOf('<option') && (d = 'select');
                    let f = e.createElement(d);
                    f.innerHTML = b;
                    for (let g = 0; g < f.childNodes.length; g += 1)
                        c.push(f.childNodes[g]);
                } else
                    c = (function (a, e) {
                        if ('string' != typeof a) return [a];
                        let c = [],
                            d = e.querySelectorAll(a);
                        for (let b = 0; b < d.length; b += 1) c.push(d[b]);
                        return c;
                    })(a.trim(), h || e);
            } else if (a.nodeType || a === i || a === e) c.push(a);
            else if (Array.isArray(a)) {
                if (a instanceof ay) return a;
                c = a;
            }
            return new ay(
                (function (b) {
                    let c = [];
                    for (let a = 0; a < b.length; a += 1)
                        -1 === c.indexOf(b[a]) && c.push(b[a]);
                    return c;
                })(c)
            );
        }

        C.fn = ay.prototype;
        let ds = 'resize scroll'.split(' ');

        function b(a) {
            return function (...c) {
                if (void 0 === c[0]) {
                    for (let b = 0; b < this.length; b += 1)
                        0 > ds.indexOf(a) &&
                        (a in this[b] ? this[b][a]() : C(this[b]).trigger(a));
                    return this;
                }
                return this.on(a, ...c);
            };
        }

        b('click'),
            b('blur'),
            b('focus'),
            b('focusin'),
            b('focusout'),
            b('keyup'),
            b('keydown'),
            b('keypress'),
            b('submit'),
            b('change'),
            b('mousedown'),
            b('mousemove'),
            b('mouseup'),
            b('mouseenter'),
            b('mouseleave'),
            b('mouseout'),
            b('mouseover'),
            b('touchstart'),
            b('touchend'),
            b('touchmove'),
            b('resize'),
            b('scroll');
        let az = {
            addClass: function (...a) {
                let b = dq(a.map((a) => a.split(' ')));
                return (
                    this.forEach((a) => {
                        a.classList.add(...b);
                    }),
                        this
                );
            },
            removeClass: function (...a) {
                let b = dq(a.map((a) => a.split(' ')));
                return (
                    this.forEach((a) => {
                        a.classList.remove(...b);
                    }),
                        this
                );
            },
            hasClass: function (...a) {
                let b = dq(a.map((a) => a.split(' ')));
                return (
                    dr(this, (a) => b.filter((b) => a.classList.contains(b)).length > 0)
                        .length > 0
                );
            },
            toggleClass: function (...a) {
                let b = dq(a.map((a) => a.split(' ')));
                this.forEach((a) => {
                    b.forEach((b) => {
                        a.classList.toggle(b);
                    });
                });
            },
            attr: function (a, d) {
                if (1 === arguments.length && 'string' == typeof a)
                    return this[0] ? this[0].getAttribute(a) : void 0;
                for (let b = 0; b < this.length; b += 1)
                    if (2 === arguments.length) this[b].setAttribute(a, d);
                    else
                        for (let c in a) (this[b][c] = a[c]), this[b].setAttribute(c, a[c]);
                return this;
            },
            removeAttr: function (b) {
                for (let a = 0; a < this.length; a += 1) this[a].removeAttribute(b);
                return this;
            },
            transform: function (b) {
                for (let a = 0; a < this.length; a += 1) this[a].style.transform = b;
                return this;
            },
            transition: function (a) {
                for (let b = 0; b < this.length; b += 1)
                    this[b].style.transitionDuration =
                        'string' != typeof a ? a + 'ms' : a;
                return this;
            },
            on: function (...g) {
                let [j, k, h, c] = g;

                function l(a) {
                    let b = a.target;
                    if (!b) return;
                    let c = a.target.dom7EventData || [];
                    if ((0 > c.indexOf(a) && c.unshift(a), C(b).is(k))) h.apply(b, c);
                    else {
                        let e = C(b).parents();
                        for (let d = 0; d < e.length; d += 1)
                            C(e[d]).is(k) && h.apply(e[d], c);
                    }
                }

                function m(a) {
                    let b = (a && a.target && a.target.dom7EventData) || [];
                    0 > b.indexOf(a) && b.unshift(a), h.apply(this, b);
                }

                'function' == typeof g[1] && (([j, h, c] = g), (k = void 0)),
                c || (c = !1);
                let d = j.split(' '),
                    b;
                for (let i = 0; i < this.length; i += 1) {
                    let a = this[i];
                    if (k)
                        for (b = 0; b < d.length; b += 1) {
                            let e = d[b];
                            a.dom7LiveListeners || (a.dom7LiveListeners = {}),
                            a.dom7LiveListeners[e] || (a.dom7LiveListeners[e] = []),
                                a.dom7LiveListeners[e].push({listener: h, proxyListener: l}),
                                a.addEventListener(e, l, c);
                        }
                    else
                        for (b = 0; b < d.length; b += 1) {
                            let f = d[b];
                            a.dom7Listeners || (a.dom7Listeners = {}),
                            a.dom7Listeners[f] || (a.dom7Listeners[f] = []),
                                a.dom7Listeners[f].push({listener: h, proxyListener: m}),
                                a.addEventListener(f, m, c);
                        }
                }
                return this;
            },
            off: function (...h) {
                let [l, i, b, e] = h;
                'function' == typeof h[1] && (([l, b, e] = h), (i = void 0)),
                e || (e = !1);
                let m = l.split(' ');
                for (let j = 0; j < m.length; j += 1) {
                    let g = m[j];
                    for (let k = 0; k < this.length; k += 1) {
                        let c = this[k],
                            a;
                        if (
                            (!i && c.dom7Listeners
                                ? (a = c.dom7Listeners[g])
                                : i && c.dom7LiveListeners && (a = c.dom7LiveListeners[g]),
                            a && a.length)
                        )
                            for (let f = a.length - 1; f >= 0; f -= 1) {
                                let d = a[f];
                                (b && d.listener === b) ||
                                (b &&
                                    d.listener &&
                                    d.listener.dom7proxy &&
                                    d.listener.dom7proxy === b)
                                    ? (c.removeEventListener(g, d.proxyListener, e),
                                        a.splice(f, 1))
                                    : b ||
                                    (c.removeEventListener(g, d.proxyListener, e),
                                        a.splice(f, 1));
                            }
                    }
                }
                return this;
            },
            trigger: function (...b) {
                let e = dp(),
                    f = b[0].split(' '),
                    g = b[1];
                for (let c = 0; c < f.length; c += 1) {
                    let h = f[c];
                    for (let d = 0; d < this.length; d += 1) {
                        let a = this[d];
                        if (e.CustomEvent) {
                            let i = new e.CustomEvent(h, {
                                detail: g,
                                bubbles: !0,
                                cancelable: !0,
                            });
                            (a.dom7EventData = b.filter((b, a) => a > 0)),
                                a.dispatchEvent(i),
                                (a.dom7EventData = []),
                                delete a.dom7EventData;
                        }
                    }
                }
                return this;
            },
            transitionEnd: function (a) {
                let b = this;
                return (
                    a &&
                    b.on('transitionend', function d(c) {
                        c.target === this && (a.call(this, c), b.off('transitionend', d));
                    }),
                        this
                );
            },
            outerWidth: function (b) {
                if (this.length > 0) {
                    if (b) {
                        let a = this.styles();
                        return (
                            this[0].offsetWidth +
                            parseFloat(a.getPropertyValue('margin-right')) +
                            parseFloat(a.getPropertyValue('margin-left'))
                        );
                    }
                    return this[0].offsetWidth;
                }
                return null;
            },
            outerHeight: function (b) {
                if (this.length > 0) {
                    if (b) {
                        let a = this.styles();
                        return (
                            this[0].offsetHeight +
                            parseFloat(a.getPropertyValue('margin-top')) +
                            parseFloat(a.getPropertyValue('margin-bottom'))
                        );
                    }
                    return this[0].offsetHeight;
                }
                return null;
            },
            styles: function () {
                let a = dp();
                return this[0] ? a.getComputedStyle(this[0], null) : {};
            },
            offset: function () {
                if (this.length > 0) {
                    let b = dp(),
                        e = dm(),
                        a = this[0],
                        c = a.getBoundingClientRect(),
                        d = e.body,
                        f = a.clientTop || d.clientTop || 0,
                        g = a.clientLeft || d.clientLeft || 0,
                        h = a === b ? b.scrollY : a.scrollTop,
                        i = a === b ? b.scrollX : a.scrollLeft;
                    return {top: c.top + h - f, left: c.left + i - g};
                }
                return null;
            },
            css: function (b, d) {
                let e = dp(),
                    a;
                if (1 === arguments.length) {
                    if ('string' != typeof b) {
                        for (a = 0; a < this.length; a += 1)
                            for (let c in b) this[a].style[c] = b[c];
                        return this;
                    }
                    if (this[0])
                        return e.getComputedStyle(this[0], null).getPropertyValue(b);
                }
                if (2 === arguments.length && 'string' == typeof b)
                    for (a = 0; a < this.length; a += 1) this[a].style[b] = d;
                return this;
            },
            each: function (a) {
                return (
                    a &&
                    this.forEach((b, c) => {
                        a.apply(b, [b, c]);
                    }),
                        this
                );
            },
            html: function (b) {
                if (void 0 === b) return this[0] ? this[0].innerHTML : null;
                for (let a = 0; a < this.length; a += 1) this[a].innerHTML = b;
                return this;
            },
            text: function (b) {
                if (void 0 === b) return this[0] ? this[0].textContent.trim() : null;
                for (let a = 0; a < this.length; a += 1) this[a].textContent = b;
                return this;
            },
            is: function (a) {
                let e = dp(),
                    f = dm(),
                    b = this[0],
                    d,
                    c;
                if (!b || void 0 === a) return !1;
                if ('string' == typeof a) {
                    if (b.matches) return b.matches(a);
                    if (b.webkitMatchesSelector) return b.webkitMatchesSelector(a);
                    if (b.msMatchesSelector) return b.msMatchesSelector(a);
                    for (d = C(a), c = 0; c < d.length; c += 1) if (d[c] === b) return !0;
                    return !1;
                }
                if (a === f) return b === f;
                if (a === e) return b === e;
                if (a.nodeType || a instanceof ay) {
                    for (d = a.nodeType ? [a] : a, c = 0; c < d.length; c += 1)
                        if (d[c] === b) return !0;
                }
                return !1;
            },
            index: function () {
                let b,
                    a = this[0];
                if (a) {
                    for (b = 0; null !== (a = a.previousSibling);)
                        1 === a.nodeType && (b += 1);
                    return b;
                }
            },
            eq: function (a) {
                if (void 0 === a) return this;
                let b = this.length;
                if (a > b - 1) return C([]);
                if (a < 0) {
                    let c = b + a;
                    return C(c < 0 ? [] : [this[c]]);
                }
                return C([this[a]]);
            },
            append: function (...f) {
                let a,
                    g = dm();
                for (let c = 0; c < f.length; c += 1) {
                    a = f[c];
                    for (let b = 0; b < this.length; b += 1)
                        if ('string' == typeof a) {
                            let d = g.createElement('div');
                            for (d.innerHTML = a; d.firstChild;)
                                this[b].appendChild(d.firstChild);
                        } else if (a instanceof ay)
                            for (let e = 0; e < a.length; e += 1) this[b].appendChild(a[e]);
                        else this[b].appendChild(a);
                }
                return this;
            },
            prepend: function (c) {
                let e = dm(),
                    a,
                    b;
                for (a = 0; a < this.length; a += 1)
                    if ('string' == typeof c) {
                        let d = e.createElement('div');
                        for (d.innerHTML = c, b = d.childNodes.length - 1; b >= 0; b -= 1)
                            this[a].insertBefore(d.childNodes[b], this[a].childNodes[0]);
                    } else if (c instanceof ay)
                        for (b = 0; b < c.length; b += 1)
                            this[a].insertBefore(c[b], this[a].childNodes[0]);
                    else this[a].insertBefore(c, this[a].childNodes[0]);
                return this;
            },
            next: function (a) {
                return this.length > 0
                    ? a
                        ? this[0].nextElementSibling && C(this[0].nextElementSibling).is(a)
                            ? C([this[0].nextElementSibling])
                            : C([])
                        : this[0].nextElementSibling
                            ? C([this[0].nextElementSibling])
                            : C([])
                    : C([]);
            },
            nextAll: function (d) {
                let c = [],
                    a = this[0];
                if (!a) return C([]);
                for (; a.nextElementSibling;) {
                    let b = a.nextElementSibling;
                    d ? C(b).is(d) && c.push(b) : c.push(b), (a = b);
                }
                return C(c);
            },
            prev: function (b) {
                if (this.length > 0) {
                    let a = this[0];
                    return b
                        ? a.previousElementSibling && C(a.previousElementSibling).is(b)
                            ? C([a.previousElementSibling])
                            : C([])
                        : a.previousElementSibling
                            ? C([a.previousElementSibling])
                            : C([]);
                }
                return C([]);
            },
            prevAll: function (d) {
                let c = [],
                    a = this[0];
                if (!a) return C([]);
                for (; a.previousElementSibling;) {
                    let b = a.previousElementSibling;
                    d ? C(b).is(d) && c.push(b) : c.push(b), (a = b);
                }
                return C(c);
            },
            parent: function (c) {
                let b = [];
                for (let a = 0; a < this.length; a += 1)
                    null !== this[a].parentNode &&
                    (c
                        ? C(this[a].parentNode).is(c) && b.push(this[a].parentNode)
                        : b.push(this[a].parentNode));
                return C(b);
            },
            parents: function (d) {
                let b = [];
                for (let c = 0; c < this.length; c += 1) {
                    let a = this[c].parentNode;
                    for (; a;)
                        d ? C(a).is(d) && b.push(a) : b.push(a), (a = a.parentNode);
                }
                return C(b);
            },
            closest: function (b) {
                let a = this;
                return void 0 === b ? C([]) : (a.is(b) || (a = a.parents(b).eq(0)), a);
            },
            find: function (e) {
                let c = [];
                for (let a = 0; a < this.length; a += 1) {
                    let d = this[a].querySelectorAll(e);
                    for (let b = 0; b < d.length; b += 1) c.push(d[b]);
                }
                return C(c);
            },
            children: function (d) {
                let e = [];
                for (let b = 0; b < this.length; b += 1) {
                    let c = this[b].children;
                    for (let a = 0; a < c.length; a += 1)
                        (d && !C(c[a]).is(d)) || e.push(c[a]);
                }
                return C(e);
            },
            filter: function (a) {
                return C(dr(this, a));
            },
            remove: function () {
                for (let a = 0; a < this.length; a += 1)
                    this[a].parentNode && this[a].parentNode.removeChild(this[a]);
                return this;
            },
        };
        Object.keys(az).forEach((a) => {
            Object.defineProperty(C.fn, a, {value: az[a], writable: !0});
        });
        var dt = C;

        function du(b, a) {
            return void 0 === a && (a = 0), setTimeout(b, a);
        }

        function dv() {
            return Date.now();
        }

        function dw(a) {
            return (
                'object' == typeof a &&
                null !== a &&
                a.constructor &&
                'Object' === Object.prototype.toString.call(a).slice(8, -1)
            );
        }

        function dx(a) {
            return 'undefined' != typeof window && void 0 !== window.HTMLElement
                ? a instanceof HTMLElement
                : a && (1 === a.nodeType || 11 === a.nodeType);
        }

        function dy() {
            let c = Object(arguments.length <= 0 ? void 0 : arguments[0]),
                i = ['__proto__', 'constructor', 'prototype'];
            for (let d = 1; d < arguments.length; d += 1) {
                let b = d < 0 || arguments.length <= d ? void 0 : arguments[d];
                if (null != b && !dx(b)) {
                    let f = Object.keys(Object(b)).filter((a) => 0 > i.indexOf(a));
                    for (let e = 0, h = f.length; e < h; e += 1) {
                        let a = f[e],
                            g = Object.getOwnPropertyDescriptor(b, a);
                        void 0 !== g &&
                        g.enumerable &&
                        (dw(c[a]) && dw(b[a])
                            ? b[a].__swiper__
                                ? (c[a] = b[a])
                                : dy(c[a], b[a])
                            : !dw(c[a]) && dw(b[a])
                                ? ((c[a] = {}),
                                    b[a].__swiper__ ? (c[a] = b[a]) : dy(c[a], b[a]))
                                : (c[a] = b[a]));
                    }
                }
            }
            return c;
        }

        function dz(a, b, c) {
            a.style.setProperty(b, c);
        }

        function dA(b) {
            let {swiper: a, targetPosition: c, side: g} = b,
                d = dp(),
                e = -a.translate,
                h,
                i = null,
                j = a.params.speed;
            (a.wrapperEl.style.scrollSnapType = 'none'),
                d.cancelAnimationFrame(a.cssModeFrameID);
            let k = c > e ? 'next' : 'prev',
                l = (a, b) => ('next' === k && a >= b) || ('prev' === k && a <= b),
                f = () => {
                    (h = new Date().getTime()), null === i && (i = h);
                    let k = Math.max(Math.min((h - i) / j, 1), 0),
                        m = 0.5 - Math.cos(k * Math.PI) / 2,
                        b = e + m * (c - e);
                    if ((l(b, c) && (b = c), a.wrapperEl.scrollTo({[g]: b}), l(b, c)))
                        return (
                            (a.wrapperEl.style.overflow = 'hidden'),
                                (a.wrapperEl.style.scrollSnapType = ''),
                                setTimeout(() => {
                                    (a.wrapperEl.style.overflow = ''),
                                        a.wrapperEl.scrollTo({[g]: b});
                                }),
                                void d.cancelAnimationFrame(a.cssModeFrameID)
                        );
                    a.cssModeFrameID = d.requestAnimationFrame(f);
                };
            f();
        }

        let dB, dC, dD;

        function dE() {
            let a, b;
            return (
                dB ||
                (dB =
                    ((a = dp()),
                        {
                            smoothScroll:
                                (b = dm()).documentElement &&
                                'scrollBehavior' in b.documentElement.style,
                            touch: !!(
                                'ontouchstart' in a ||
                                (a.DocumentTouch && b instanceof a.DocumentTouch)
                            ),
                            passiveListener: (function () {
                                let b = !1;
                                try {
                                    let c = Object.defineProperty({}, 'passive', {
                                        get() {
                                            b = !0;
                                        },
                                    });
                                    a.addEventListener('testPassiveListener', null, c);
                                } catch (d) {
                                }
                                return b;
                            })(),
                            gestures: 'ongesturestart' in a,
                        })),
                    dB
            );
        }

        function dF(f) {
            let {swiper: a, runCallbacks: g, direction: h, step: b} = f,
                {activeIndex: d, previousIndex: e} = a,
                c = h;
            if (
                (c || (c = d > e ? 'next' : d < e ? 'prev' : 'reset'),
                    a.emit('transition' + b),
                g && d !== e)
            ) {
                if ('reset' === c) return void a.emit('slideResetTransition' + b);
                a.emit('slideChangeTransition' + b),
                    'next' === c
                        ? a.emit('slideNextTransition' + b)
                        : a.emit('slidePrevTransition' + b);
            }
        }

        function dG(g) {
            let c = this,
                h = dm(),
                n = dp(),
                d = c.touchEventsData,
                {params: b, touches: f, enabled: o} = c;
            if (!o || (c.animating && b.preventInteractionOnTransition)) return;
            !c.animating && b.cssMode && b.loop && c.loopFix();
            let a = g;
            a.originalEvent && (a = a.originalEvent);
            let e = dt(a.target);
            if (
                ('wrapper' === b.touchEventsTarget && !e.closest(c.wrapperEl).length) ||
                ((d.isTouchEvent = 'touchstart' === a.type),
                !d.isTouchEvent && 'which' in a && 3 === a.which) ||
                (!d.isTouchEvent && 'button' in a && a.button > 0) ||
                (d.isTouched && d.isMoved)
            )
                return;
            b.noSwipingClass &&
            '' !== b.noSwipingClass &&
            a.target &&
            a.target.shadowRoot &&
            g.path &&
            g.path[0] &&
            (e = dt(g.path[0]));
            let j = b.noSwipingSelector
                    ? b.noSwipingSelector
                    : '.' + b.noSwipingClass,
                p = !(!a.target || !a.target.shadowRoot);
            if (
                b.noSwiping &&
                (p
                    ? (function (b, a) {
                        return (
                            void 0 === a && (a = this),
                                (function d(a) {
                                    if (!a || a === dm() || a === dp()) return null;
                                    a.assignedSlot && (a = a.assignedSlot);
                                    let c = a.closest(b);
                                    return c || a.getRootNode
                                        ? c || d(a.getRootNode().host)
                                        : null;
                                })(a)
                        );
                    })(j, e[0])
                    : e.closest(j)[0])
            )
                return void (c.allowClick = !0);
            if (b.swipeHandler && !e.closest(b.swipeHandler)[0]) return;
            (f.currentX =
                'touchstart' === a.type ? a.targetTouches[0].pageX : a.pageX),
                (f.currentY =
                    'touchstart' === a.type ? a.targetTouches[0].pageY : a.pageY);
            let i = f.currentX,
                q = f.currentY,
                k = b.edgeSwipeDetection || b.iOSEdgeSwipeDetection,
                l = b.edgeSwipeThreshold || b.iOSEdgeSwipeThreshold;
            if (k && (i <= l || i >= n.innerWidth - l)) {
                if ('prevent' !== k) return;
                g.preventDefault();
            }
            if (
                (Object.assign(d, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0,
                }),
                    (f.startX = i),
                    (f.startY = q),
                    (d.touchStartTime = dv()),
                    (c.allowClick = !0),
                    c.updateSize(),
                    (c.swipeDirection = void 0),
                b.threshold > 0 && (d.allowThresholdMove = !1),
                'touchstart' !== a.type)
            ) {
                let m = !0;
                e.is(d.focusableElements) &&
                ((m = !1), 'SELECT' === e[0].nodeName && (d.isTouched = !1)),
                h.activeElement &&
                dt(h.activeElement).is(d.focusableElements) &&
                h.activeElement !== e[0] &&
                h.activeElement.blur();
                let r = m && c.allowTouchMove && b.touchStartPreventDefault;
                (b.touchStartForcePreventDefault || r) &&
                !e[0].isContentEditable &&
                a.preventDefault();
            }
            c.params.freeMode &&
            c.params.freeMode.enabled &&
            c.freeMode &&
            c.animating &&
            !b.cssMode &&
            c.freeMode.onTouchStart(),
                c.emit('touchStart', a);
        }

        function dH(p) {
            let n = dm(),
                a = this,
                b = a.touchEventsData,
                {params: e, touches: c, rtlTranslate: q, enabled: r} = a;
            if (!r) return;
            let d = p;
            if ((d.originalEvent && (d = d.originalEvent), !b.isTouched))
                return void (
                    b.startMoving &&
                    b.isScrolling &&
                    a.emit('touchMoveOpposite', d)
                );
            if (b.isTouchEvent && 'touchmove' !== d.type) return;
            let o =
                    'touchmove' === d.type &&
                    d.targetTouches &&
                    (d.targetTouches[0] || d.changedTouches[0]),
                g = 'touchmove' === d.type ? o.pageX : d.pageX,
                h = 'touchmove' === d.type ? o.pageY : d.pageY;
            if (d.preventedByNestedSwiper) return (c.startX = g), void (c.startY = h);
            if (!a.allowTouchMove)
                return (
                    dt(d.target).is(b.focusableElements) || (a.allowClick = !1),
                        void (
                            b.isTouched &&
                            (Object.assign(c, {
                                startX: g,
                                startY: h,
                                currentX: g,
                                currentY: h,
                            }),
                                (b.touchStartTime = dv()))
                        )
                );
            if (b.isTouchEvent && e.touchReleaseOnEdges && !e.loop) {
                if (a.isVertical()) {
                    if (
                        (h < c.startY && a.translate <= a.maxTranslate()) ||
                        (h > c.startY && a.translate >= a.minTranslate())
                    )
                        return (b.isTouched = !1), void (b.isMoved = !1);
                } else if (
                    (g < c.startX && a.translate <= a.maxTranslate()) ||
                    (g > c.startX && a.translate >= a.minTranslate())
                )
                    return;
            }
            if (
                b.isTouchEvent &&
                n.activeElement &&
                d.target === n.activeElement &&
                dt(d.target).is(b.focusableElements)
            )
                return (b.isMoved = !0), void (a.allowClick = !1);
            if (
                (b.allowTouchCallbacks && a.emit('touchMove', d),
                d.targetTouches && d.targetTouches.length > 1)
            )
                return;
            (c.currentX = g), (c.currentY = h);
            let i = c.currentX - c.startX,
                j = c.currentY - c.startY;
            if (a.params.threshold && Math.sqrt(i ** 2 + j ** 2) < a.params.threshold)
                return;
            if (void 0 === b.isScrolling) {
                let k;
                (a.isHorizontal() && c.currentY === c.startY) ||
                (a.isVertical() && c.currentX === c.startX)
                    ? (b.isScrolling = !1)
                    : i * i + j * j >= 25 &&
                    ((k = (180 * Math.atan2(Math.abs(j), Math.abs(i))) / Math.PI),
                        (b.isScrolling = a.isHorizontal()
                            ? k > e.touchAngle
                            : 90 - k > e.touchAngle));
            }
            if (
                (b.isScrolling && a.emit('touchMoveOpposite', d),
                void 0 === b.startMoving &&
                ((c.currentX === c.startX && c.currentY === c.startY) ||
                    (b.startMoving = !0)),
                    b.isScrolling)
            )
                return void (b.isTouched = !1);
            if (!b.startMoving) return;
            (a.allowClick = !1),
            !e.cssMode && d.cancelable && d.preventDefault(),
            e.touchMoveStopPropagation && !e.nested && d.stopPropagation(),
            b.isMoved ||
            (e.loop && !e.cssMode && a.loopFix(),
                (b.startTranslate = a.getTranslate()),
                a.setTransition(0),
            a.animating &&
            a.$wrapperEl.trigger('webkitTransitionEnd transitionend'),
                (b.allowMomentumBounce = !1),
            e.grabCursor &&
            (!0 === a.allowSlideNext || !0 === a.allowSlidePrev) &&
            a.setGrabCursor(!0),
                a.emit('sliderFirstMove', d)),
                a.emit('sliderMove', d),
                (b.isMoved = !0);
            let f = a.isHorizontal() ? i : j;
            (c.diff = f),
                (f *= e.touchRatio),
            q && (f = -f),
                (a.swipeDirection = f > 0 ? 'prev' : 'next'),
                (b.currentTranslate = f + b.startTranslate);
            let l = !0,
                m = e.resistanceRatio;
            if (
                (e.touchReleaseOnEdges && (m = 0),
                    f > 0 && b.currentTranslate > a.minTranslate()
                        ? ((l = !1),
                        e.resistance &&
                        (b.currentTranslate =
                            a.minTranslate() -
                            1 +
                            (-a.minTranslate() + b.startTranslate + f) ** m))
                        : f < 0 &&
                        b.currentTranslate < a.maxTranslate() &&
                        ((l = !1),
                        e.resistance &&
                        (b.currentTranslate =
                            a.maxTranslate() +
                            1 -
                            (a.maxTranslate() - b.startTranslate - f) ** m)),
                l && (d.preventedByNestedSwiper = !0),
                !a.allowSlideNext &&
                'next' === a.swipeDirection &&
                b.currentTranslate < b.startTranslate &&
                (b.currentTranslate = b.startTranslate),
                !a.allowSlidePrev &&
                'prev' === a.swipeDirection &&
                b.currentTranslate > b.startTranslate &&
                (b.currentTranslate = b.startTranslate),
                a.allowSlidePrev ||
                a.allowSlideNext ||
                (b.currentTranslate = b.startTranslate),
                e.threshold > 0)
            ) {
                if (!(Math.abs(f) > e.threshold || b.allowThresholdMove))
                    return void (b.currentTranslate = b.startTranslate);
                if (!b.allowThresholdMove)
                    return (
                        (b.allowThresholdMove = !0),
                            (c.startX = c.currentX),
                            (c.startY = c.currentY),
                            (b.currentTranslate = b.startTranslate),
                            void (c.diff = a.isHorizontal()
                                ? c.currentX - c.startX
                                : c.currentY - c.startY)
                    );
            }
            e.followFinger &&
            !e.cssMode &&
            (((e.freeMode && e.freeMode.enabled && a.freeMode) ||
                e.watchSlidesProgress) &&
            (a.updateActiveIndex(), a.updateSlidesClasses()),
            a.params.freeMode &&
            e.freeMode.enabled &&
            a.freeMode &&
            a.freeMode.onTouchMove(),
                a.updateProgress(b.currentTranslate),
                a.setTranslate(b.currentTranslate));
        }

        function dI(r) {
            let a = this,
                b = a.touchEventsData,
                {
                    params: c,
                    touches: s,
                    rtlTranslate: t,
                    slidesGrid: e,
                    enabled: u,
                } = a;
            if (!u) return;
            let d = r;
            if (
                (d.originalEvent && (d = d.originalEvent),
                b.allowTouchCallbacks && a.emit('touchEnd', d),
                    (b.allowTouchCallbacks = !1),
                    !b.isTouched)
            )
                return (
                    b.isMoved && c.grabCursor && a.setGrabCursor(!1),
                        (b.isMoved = !1),
                        void (b.startMoving = !1)
                );
            c.grabCursor &&
            b.isMoved &&
            b.isTouched &&
            (!0 === a.allowSlideNext || !0 === a.allowSlidePrev) &&
            a.setGrabCursor(!1);
            let o = dv(),
                p = o - b.touchStartTime;
            if (a.allowClick) {
                let q = d.path || (d.composedPath && d.composedPath());
                a.updateClickedSlide((q && q[0]) || d.target),
                    a.emit('tap click', d),
                p < 300 &&
                o - b.lastClickTime < 300 &&
                a.emit('doubleTap doubleClick', d);
            }
            if (
                ((b.lastClickTime = dv()),
                    du(() => {
                        a.destroyed || (a.allowClick = !0);
                    }),
                !b.isTouched ||
                !b.isMoved ||
                !a.swipeDirection ||
                0 === s.diff ||
                b.currentTranslate === b.startTranslate)
            )
                return (b.isTouched = !1), (b.isMoved = !1), void (b.startMoving = !1);
            let h;
            if (
                ((b.isTouched = !1),
                    (b.isMoved = !1),
                    (b.startMoving = !1),
                    (h = c.followFinger
                        ? t
                            ? a.translate
                            : -a.translate
                        : -b.currentTranslate),
                    c.cssMode)
            )
                return;
            if (a.params.freeMode && c.freeMode.enabled)
                return void a.freeMode.onTouchEnd({currentPos: h});
            let f = 0,
                m = a.slidesSizesGrid[0];
            for (
                let g = 0;
                g < e.length;
                g += g < c.slidesPerGroupSkip ? 1 : c.slidesPerGroup
            ) {
                let n = g < c.slidesPerGroupSkip - 1 ? 1 : c.slidesPerGroup;
                void 0 !== e[g + n]
                    ? h >= e[g] && h < e[g + n] && ((f = g), (m = e[g + n] - e[g]))
                    : h >= e[g] && ((f = g), (m = e[e.length - 1] - e[e.length - 2]));
            }
            let j = null,
                i = null;
            c.rewind &&
            (a.isBeginning
                ? (i =
                    a.params.virtual && a.params.virtual.enabled && a.virtual
                        ? a.virtual.slides.length - 1
                        : a.slides.length - 1)
                : a.isEnd && (j = 0));
            let k = (h - e[f]) / m,
                l = f < c.slidesPerGroupSkip - 1 ? 1 : c.slidesPerGroup;
            if (p > c.longSwipesMs) {
                if (!c.longSwipes) return void a.slideTo(a.activeIndex);
                'next' === a.swipeDirection &&
                (k >= c.longSwipesRatio
                    ? a.slideTo(c.rewind && a.isEnd ? j : f + l)
                    : a.slideTo(f)),
                'prev' === a.swipeDirection &&
                (k > 1 - c.longSwipesRatio
                    ? a.slideTo(f + l)
                    : null !== i && k < 0 && Math.abs(k) > c.longSwipesRatio
                        ? a.slideTo(i)
                        : a.slideTo(f));
            } else {
                if (!c.shortSwipes) return void a.slideTo(a.activeIndex);
                a.navigation &&
                (d.target === a.navigation.nextEl || d.target === a.navigation.prevEl)
                    ? d.target === a.navigation.nextEl
                        ? a.slideTo(f + l)
                        : a.slideTo(f)
                    : ('next' === a.swipeDirection && a.slideTo(null !== j ? j : f + l),
                    'prev' === a.swipeDirection && a.slideTo(null !== i ? i : f));
            }
        }

        function dJ() {
            let a = this,
                {params: b, el: c} = a;
            if (c && 0 === c.offsetWidth) return;
            b.breakpoints && a.setBreakpoint();
            let {allowSlideNext: d, allowSlidePrev: e, snapGrid: f} = a;
            (a.allowSlideNext = !0),
                (a.allowSlidePrev = !0),
                a.updateSize(),
                a.updateSlides(),
                a.updateSlidesClasses(),
                ('auto' === b.slidesPerView || b.slidesPerView > 1) &&
                a.isEnd &&
                !a.isBeginning &&
                !a.params.centeredSlides
                    ? a.slideTo(a.slides.length - 1, 0, !1, !0)
                    : a.slideTo(a.activeIndex, 0, !1, !0),
            a.autoplay &&
            a.autoplay.running &&
            a.autoplay.paused &&
            a.autoplay.run(),
                (a.allowSlidePrev = e),
                (a.allowSlideNext = d),
            a.params.watchOverflow && f !== a.snapGrid && a.checkOverflow();
        }

        function dK(a) {
            this.enabled &&
            (this.allowClick ||
                (this.params.preventClicks && a.preventDefault(),
                this.params.preventClicksPropagation &&
                this.animating &&
                (a.stopPropagation(), a.stopImmediatePropagation())));
        }

        function dL() {
            let a = this,
                {wrapperEl: b, rtlTranslate: d, enabled: e} = a;
            if (!e) return;
            (a.previousTranslate = a.translate),
                a.isHorizontal()
                    ? (a.translate = -b.scrollLeft)
                    : (a.translate = -b.scrollTop),
            0 === a.translate && (a.translate = 0),
                a.updateActiveIndex(),
                a.updateSlidesClasses();
            let c = a.maxTranslate() - a.minTranslate();
            (0 === c ? 0 : (a.translate - a.minTranslate()) / c) !== a.progress &&
            a.updateProgress(d ? -a.translate : a.translate),
                a.emit('setTranslate', a.translate, !1);
        }

        let dM = !1;

        function dN() {
        }

        let dO = (a, i) => {
                let j = dm(),
                    {
                        params: d,
                        touchEvents: b,
                        el: e,
                        wrapperEl: m,
                        device: k,
                        support: f,
                    } = a,
                    g = !!d.nested,
                    c = 'on' === i ? 'addEventListener' : 'removeEventListener',
                    l = i;
                if (f.touch) {
                    let h = !(
                        'touchstart' !== b.start ||
                        !f.passiveListener ||
                        !d.passiveListeners
                    ) && {passive: !0, capture: !1};
                    e[c](b.start, a.onTouchStart, h),
                        e[c](
                            b.move,
                            a.onTouchMove,
                            f.passiveListener ? {passive: !1, capture: g} : g
                        ),
                        e[c](b.end, a.onTouchEnd, h),
                    b.cancel && e[c](b.cancel, a.onTouchEnd, h);
                } else
                    e[c](b.start, a.onTouchStart, !1),
                        j[c](b.move, a.onTouchMove, g),
                        j[c](b.end, a.onTouchEnd, !1);
                (d.preventClicks || d.preventClicksPropagation) &&
                e[c]('click', a.onClick, !0),
                d.cssMode && m[c]('scroll', a.onScroll),
                    d.updateOnWindowResize
                        ? a[l](
                            k.ios || k.android
                                ? 'resize orientationchange observerUpdate'
                                : 'resize observerUpdate',
                            dJ,
                            !0
                        )
                        : a[l]('observerUpdate', dJ, !0);
            },
            dP = (b, a) => b.grid && a.grid && a.grid.rows > 1;
        var dQ = {
            init: !0,
            direction: 'horizontal',
            touchEventsTarget: 'wrapper',
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            enabled: !0,
            focusableElements:
                'input, select, option, textarea, button, video, label',
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: 'slide',
            breakpoints: void 0,
            breakpointsBase: 'window',
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: 'swiper-no-swiping',
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: 'swiper-',
            slideClass: 'swiper-slide',
            slideBlankClass: 'swiper-slide-invisible-blank',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            runCallbacksOnInit: !0,
            _emitClasses: !1,
        };
        let aA = {
                eventsEmitter: {
                    on(b, c, d) {
                        let a = this;
                        if (!a.eventsListeners || a.destroyed || 'function' != typeof c)
                            return a;
                        let e = d ? 'unshift' : 'push';
                        return (
                            b.split(' ').forEach((b) => {
                                a.eventsListeners[b] || (a.eventsListeners[b] = []),
                                    a.eventsListeners[b][e](c);
                            }),
                                a
                        );
                    },
                    once(d, b, e) {
                        let a = this;
                        if (!a.eventsListeners || a.destroyed || 'function' != typeof b)
                            return a;

                        function c() {
                            a.off(d, c), c.__emitterProxy && delete c.__emitterProxy;
                            for (
                                var f = arguments.length, g = new Array(f), e = 0;
                                e < f;
                                e++
                            )
                                g[e] = arguments[e];
                            b.apply(a, g);
                        }

                        return (c.__emitterProxy = b), a.on(d, c, e);
                    },
                    onAny(a, b) {
                        if (
                            !this.eventsListeners ||
                            this.destroyed ||
                            'function' != typeof a
                        )
                            return this;
                        let c = b ? 'unshift' : 'push';
                        return (
                            0 > this.eventsAnyListeners.indexOf(a) &&
                            this.eventsAnyListeners[c](a),
                                this
                        );
                    },
                    offAny(b) {
                        if (
                            !this.eventsListeners ||
                            this.destroyed ||
                            !this.eventsAnyListeners
                        )
                            return this;
                        let a = this.eventsAnyListeners.indexOf(b);
                        return a >= 0 && this.eventsAnyListeners.splice(a, 1), this;
                    },
                    off(b, c) {
                        let a = this;
                        return (
                            !a.eventsListeners ||
                            a.destroyed ||
                            (a.eventsListeners &&
                                b.split(' ').forEach((b) => {
                                    void 0 === c
                                        ? (a.eventsListeners[b] = [])
                                        : a.eventsListeners[b] &&
                                        a.eventsListeners[b].forEach((d, e) => {
                                            (d === c ||
                                                (d.__emitterProxy && d.__emitterProxy === c)) &&
                                            a.eventsListeners[b].splice(e, 1);
                                        });
                                })),
                                a
                        );
                    },
                    emit() {
                        let b = this;
                        if (!b.eventsListeners || b.destroyed || !b.eventsListeners)
                            return b;
                        let c, e, f;
                        for (var g = arguments.length, a = new Array(g), d = 0; d < g; d++)
                            a[d] = arguments[d];
                        return (
                            'string' == typeof a[0] || Array.isArray(a[0])
                                ? ((c = a[0]), (e = a.slice(1, a.length)), (f = b))
                                : ((c = a[0].events), (e = a[0].data), (f = a[0].context || b)),
                                e.unshift(f),
                                (Array.isArray(c) ? c : c.split(' ')).forEach((a) => {
                                    b.eventsAnyListeners &&
                                    b.eventsAnyListeners.length &&
                                    b.eventsAnyListeners.forEach((b) => {
                                        b.apply(f, [a, ...e]);
                                    }),
                                    b.eventsListeners &&
                                    b.eventsListeners[a] &&
                                    b.eventsListeners[a].forEach((a) => {
                                        a.apply(f, e);
                                    });
                                }),
                                b
                        );
                    },
                },
                update: {
                    updateSize: function () {
                        let a,
                            b,
                            c = this.$el;
                        (a =
                            void 0 !== this.params.width && null !== this.params.width
                                ? this.params.width
                                : c[0].clientWidth),
                            (b =
                                void 0 !== this.params.height && null !== this.params.height
                                    ? this.params.height
                                    : c[0].clientHeight),
                        (0 === a && this.isHorizontal()) ||
                        (0 === b && this.isVertical()) ||
                        ((a =
                            a -
                            parseInt(c.css('padding-left') || 0, 10) -
                            parseInt(c.css('padding-right') || 0, 10)),
                            (b =
                                b -
                                parseInt(c.css('padding-top') || 0, 10) -
                                parseInt(c.css('padding-bottom') || 0, 10)),
                        Number.isNaN(a) && (a = 0),
                        Number.isNaN(b) && (b = 0),
                            Object.assign(this, {
                                width: a,
                                height: b,
                                size: this.isHorizontal() ? a : b,
                            }));
                    },
                    updateSlides: function () {
                        let a = this;

                        function j(b) {
                            return a.isHorizontal()
                                ? b
                                : {
                                    width: 'height',
                                    'margin-top': 'margin-left',
                                    'margin-bottom ': 'margin-right',
                                    'margin-left': 'margin-top',
                                    'margin-right': 'margin-bottom',
                                    'padding-left': 'padding-top',
                                    'padding-right': 'padding-bottom',
                                    marginRight: 'marginBottom',
                                }[b];
                        }

                        function m(a, b) {
                            return parseFloat(a.getPropertyValue(j(b)) || 0);
                        }

                        let b = a.params,
                            {$wrapperEl: r, size: f, rtlTranslate: s, wrongRTL: J} = a,
                            t = a.virtual && b.virtual.enabled,
                            K = t ? a.virtual.slides.length : a.slides.length,
                            h = r.children('.' + a.params.slideClass),
                            n = t ? a.virtual.slides.length : h.length,
                            c = [],
                            o = [],
                            k = [],
                            u = b.slidesOffsetBefore;
                        'function' == typeof u && (u = b.slidesOffsetBefore.call(a));
                        let v = b.slidesOffsetAfter;
                        'function' == typeof v && (v = b.slidesOffsetAfter.call(a));
                        let L = a.snapGrid.length,
                            M = a.slidesGrid.length,
                            _ = b.spaceBetween,
                            d = -u,
                            w = 0,
                            p = 0;
                        if (void 0 === f) return;
                        'string' == typeof _ &&
                        _.indexOf('%') >= 0 &&
                        (_ = (parseFloat(_.replace('%', '')) / 100) * f),
                            (a.virtualSize = -_),
                            s
                                ? h.css({marginLeft: '', marginBottom: '', marginTop: ''})
                                : h.css({marginRight: '', marginBottom: '', marginTop: ''}),
                        b.centeredSlides &&
                        b.cssMode &&
                        (dz(a.wrapperEl, '--swiper-centered-offset-before', ''),
                            dz(a.wrapperEl, '--swiper-centered-offset-after', ''));
                        let x = b.grid && b.grid.rows > 1 && a.grid,
                            e;
                        x && a.grid.initSlides(n);
                        let N =
                            'auto' === b.slidesPerView &&
                            b.breakpoints &&
                            Object.keys(b.breakpoints).filter(
                                (a) => void 0 !== b.breakpoints[a].slidesPerView
                            ).length > 0;
                        for (let i = 0; i < n; i += 1) {
                            e = 0;
                            let g = h.eq(i);
                            if (
                                (x && a.grid.updateSlide(i, g, n, j),
                                'none' !== g.css('display'))
                            ) {
                                if ('auto' === b.slidesPerView) {
                                    N && (h[i].style[j('width')] = '');
                                    let l = getComputedStyle(g[0]),
                                        y = g[0].style.transform,
                                        z = g[0].style.webkitTransform;
                                    if (
                                        (y && (g[0].style.transform = 'none'),
                                        z && (g[0].style.webkitTransform = 'none'),
                                            b.roundLengths)
                                    )
                                        e = a.isHorizontal() ? g.outerWidth(!0) : g.outerHeight(!0);
                                    else {
                                        let C = m(l, 'width'),
                                            O = m(l, 'padding-left'),
                                            P = m(l, 'padding-right'),
                                            D = m(l, 'margin-left'),
                                            E = m(l, 'margin-right'),
                                            F = l.getPropertyValue('box-sizing');
                                        if (F && 'border-box' === F) e = C + D + E;
                                        else {
                                            let {clientWidth: Q, offsetWidth: R} = g[0];
                                            e = C + O + P + D + E + (R - Q);
                                        }
                                    }
                                    y && (g[0].style.transform = y),
                                    z && (g[0].style.webkitTransform = z),
                                    b.roundLengths && (e = Math.floor(e));
                                } else
                                    (e = (f - (b.slidesPerView - 1) * _) / b.slidesPerView),
                                    b.roundLengths && (e = Math.floor(e)),
                                    h[i] && (h[i].style[j('width')] = e + 'px');
                                h[i] && (h[i].swiperSlideSize = e),
                                    k.push(e),
                                    b.centeredSlides
                                        ? ((d = d + e / 2 + w / 2 + _),
                                        0 === w && 0 !== i && (d = d - f / 2 - _),
                                        0 === i && (d = d - f / 2 - _),
                                        0.001 > Math.abs(d) && (d = 0),
                                        b.roundLengths && (d = Math.floor(d)),
                                        p % b.slidesPerGroup == 0 && c.push(d),
                                            o.push(d))
                                        : (b.roundLengths && (d = Math.floor(d)),
                                        (p - Math.min(a.params.slidesPerGroupSkip, p)) %
                                        a.params.slidesPerGroup ==
                                        0 && c.push(d),
                                            o.push(d),
                                            (d = d + e + _)),
                                    (a.virtualSize += e + _),
                                    (w = e),
                                    (p += 1);
                            }
                        }
                        if (
                            ((a.virtualSize = Math.max(a.virtualSize, f) + v),
                            s &&
                            J &&
                            ('slide' === b.effect || 'coverflow' === b.effect) &&
                            r.css({width: a.virtualSize + b.spaceBetween + 'px'}),
                            b.setWrapperSize &&
                            r.css({[j('width')]: a.virtualSize + b.spaceBetween + 'px'}),
                            x && a.grid.updateWrapperSize(e, c, j),
                                !b.centeredSlides)
                        ) {
                            let G = [];
                            for (let q = 0; q < c.length; q += 1) {
                                let A = c[q];
                                b.roundLengths && (A = Math.floor(A)),
                                c[q] <= a.virtualSize - f && G.push(A);
                            }
                            (c = G),
                            Math.floor(a.virtualSize - f) - Math.floor(c[c.length - 1]) >
                            1 && c.push(a.virtualSize - f);
                        }
                        if ((0 === c.length && (c = [0]), 0 !== b.spaceBetween)) {
                            let S = a.isHorizontal() && s ? 'marginLeft' : j('marginRight');
                            h.filter((c, a) => !b.cssMode || a !== h.length - 1).css({
                                [S]: _ + 'px',
                            });
                        }
                        if (b.centeredSlides && b.centeredSlidesBounds) {
                            let T = 0;
                            k.forEach((a) => {
                                T += a + (b.spaceBetween ? b.spaceBetween : 0);
                            });
                            let U = (T -= b.spaceBetween) - f;
                            c = c.map((a) => (a < 0 ? -u : a > U ? U + v : a));
                        }
                        if (b.centerInsufficientSlides) {
                            let H = 0;
                            if (
                                (k.forEach((a) => {
                                    H += a + (b.spaceBetween ? b.spaceBetween : 0);
                                }),
                                (H -= b.spaceBetween) < f)
                            ) {
                                let V = (f - H) / 2;
                                c.forEach((a, b) => {
                                    c[b] = a - V;
                                }),
                                    o.forEach((a, b) => {
                                        o[b] = a + V;
                                    });
                            }
                        }
                        if (
                            (Object.assign(a, {
                                slides: h,
                                snapGrid: c,
                                slidesGrid: o,
                                slidesSizesGrid: k,
                            }),
                            b.centeredSlides && b.cssMode && !b.centeredSlidesBounds)
                        ) {
                            dz(a.wrapperEl, '--swiper-centered-offset-before', -c[0] + 'px'),
                                dz(
                                    a.wrapperEl,
                                    '--swiper-centered-offset-after',
                                    a.size / 2 - k[k.length - 1] / 2 + 'px'
                                );
                            let W = -a.snapGrid[0],
                                X = -a.slidesGrid[0];
                            (a.snapGrid = a.snapGrid.map((a) => a + W)),
                                (a.slidesGrid = a.slidesGrid.map((a) => a + X));
                        }
                        if (
                            (n !== K && a.emit('slidesLengthChange'),
                            c.length !== L &&
                            (a.params.watchOverflow && a.checkOverflow(),
                                a.emit('snapGridLengthChange')),
                            o.length !== M && a.emit('slidesGridLengthChange'),
                            b.watchSlidesProgress && a.updateSlidesOffset(),
                                !(
                                    t ||
                                    b.cssMode ||
                                    ('slide' !== b.effect && 'fade' !== b.effect)
                                ))
                        ) {
                            let B = b.containerModifierClass + 'backface-hidden',
                                I = a.$el.hasClass(B);
                            n <= b.maxBackfaceHiddenSlides
                                ? I || a.$el.addClass(B)
                                : I && a.$el.removeClass(B);
                        }
                    },
                    updateAutoHeight: function (e) {
                        let a = this,
                            d = [],
                            i = a.virtual && a.params.virtual.enabled,
                            b,
                            c = 0;
                        'number' == typeof e
                            ? a.setTransition(e)
                            : !0 === e && a.setTransition(a.params.speed);
                        let f = (b) =>
                            i
                                ? a.slides.filter(
                                    (a) =>
                                        parseInt(
                                            a.getAttribute('data-swiper-slide-index'),
                                            10
                                        ) === b
                                )[0]
                                : a.slides.eq(b)[0];
                        if (
                            'auto' !== a.params.slidesPerView &&
                            a.params.slidesPerView > 1
                        ) {
                            if (a.params.centeredSlides)
                                (a.visibleSlides || dt([])).each((a) => {
                                    d.push(a);
                                });
                            else
                                for (b = 0; b < Math.ceil(a.params.slidesPerView); b += 1) {
                                    let g = a.activeIndex + b;
                                    if (g > a.slides.length && !i) break;
                                    d.push(f(g));
                                }
                        } else d.push(f(a.activeIndex));
                        for (b = 0; b < d.length; b += 1)
                            if (void 0 !== d[b]) {
                                let h = d[b].offsetHeight;
                                c = h > c ? h : c;
                            }
                        (c || 0 === c) && a.$wrapperEl.css('height', c + 'px');
                    },
                    updateSlidesOffset: function () {
                        let b = this.slides;
                        for (let a = 0; a < b.length; a += 1)
                            b[a].swiperSlideOffset = this.isHorizontal()
                                ? b[a].offsetLeft
                                : b[a].offsetTop;
                    },
                    updateSlidesProgress: function (f) {
                        void 0 === f && (f = (this && this.translate) || 0);
                        let a = this,
                            b = a.params,
                            {slides: c, rtlTranslate: j, snapGrid: n} = a;
                        if (0 === c.length) return;
                        void 0 === c[0].swiperSlideOffset && a.updateSlidesOffset();
                        let g = -f;
                        j && (g = f),
                            c.removeClass(b.slideVisibleClass),
                            (a.visibleSlidesIndexes = []),
                            (a.visibleSlides = []);
                        for (let d = 0; d < c.length; d += 1) {
                            let e = c[d],
                                h = e.swiperSlideOffset;
                            b.cssMode && b.centeredSlides && (h -= c[0].swiperSlideOffset);
                            let l =
                                    (g + (b.centeredSlides ? a.minTranslate() : 0) - h) /
                                    (e.swiperSlideSize + b.spaceBetween),
                                m =
                                    (g - n[0] + (b.centeredSlides ? a.minTranslate() : 0) - h) /
                                    (e.swiperSlideSize + b.spaceBetween),
                                i = -(g - h),
                                k = i + a.slidesSizesGrid[d];
                            ((i >= 0 && i < a.size - 1) ||
                                (k > 1 && k <= a.size) ||
                                (i <= 0 && k >= a.size)) &&
                            (a.visibleSlides.push(e),
                                a.visibleSlidesIndexes.push(d),
                                c.eq(d).addClass(b.slideVisibleClass)),
                                (e.progress = j ? -l : l),
                                (e.originalProgress = j ? -m : m);
                        }
                        a.visibleSlides = dt(a.visibleSlides);
                    },
                    updateProgress: function (d) {
                        if (void 0 === d) {
                            let i = this.rtlTranslate ? -1 : 1;
                            d = (this && this.translate && this.translate * i) || 0;
                        }
                        let e = this.params,
                            f = this.maxTranslate() - this.minTranslate(),
                            {progress: c, isBeginning: a, isEnd: b} = this,
                            g = a,
                            h = b;
                        0 === f
                            ? ((c = 0), (a = !0), (b = !0))
                            : ((a = (c = (d - this.minTranslate()) / f) <= 0), (b = c >= 1)),
                            Object.assign(this, {progress: c, isBeginning: a, isEnd: b}),
                        (e.watchSlidesProgress || (e.centeredSlides && e.autoHeight)) &&
                        this.updateSlidesProgress(d),
                        a && !g && this.emit('reachBeginning toEdge'),
                        b && !h && this.emit('reachEnd toEdge'),
                        ((g && !a) || (h && !b)) && this.emit('fromEdge'),
                            this.emit('progress', c);
                    },
                    updateSlidesClasses: function () {
                        let e = this,
                            {
                                slides: f,
                                params: a,
                                $wrapperEl: b,
                                activeIndex: h,
                                realIndex: i,
                            } = e,
                            j = e.virtual && a.virtual.enabled,
                            g;
                        f.removeClass(
                            `${a.slideActiveClass} ${a.slideNextClass} ${a.slidePrevClass} ${a.slideDuplicateActiveClass} ${a.slideDuplicateNextClass} ${a.slideDuplicatePrevClass}`
                        ),
                            (g = j
                                ? e.$wrapperEl.find(
                                    `.${a.slideClass}[data-swiper-slide-index="${h}"]`
                                )
                                : f.eq(h)).addClass(a.slideActiveClass),
                        a.loop &&
                        (g.hasClass(a.slideDuplicateClass)
                            ? b
                                .children(
                                    `.${a.slideClass}:not(.${a.slideDuplicateClass})[data-swiper-slide-index="${i}"]`
                                )
                                .addClass(a.slideDuplicateActiveClass)
                            : b
                                .children(
                                    `.${a.slideClass}.${a.slideDuplicateClass}[data-swiper-slide-index="${i}"]`
                                )
                                .addClass(a.slideDuplicateActiveClass));
                        let c = g
                            .nextAll('.' + a.slideClass)
                            .eq(0)
                            .addClass(a.slideNextClass);
                        a.loop &&
                        0 === c.length &&
                        (c = f.eq(0)).addClass(a.slideNextClass);
                        let d = g
                            .prevAll('.' + a.slideClass)
                            .eq(0)
                            .addClass(a.slidePrevClass);
                        a.loop &&
                        0 === d.length &&
                        (d = f.eq(-1)).addClass(a.slidePrevClass),
                        a.loop &&
                        (c.hasClass(a.slideDuplicateClass)
                            ? b
                                .children(
                                    `.${a.slideClass}:not(.${
                                        a.slideDuplicateClass
                                    })[data-swiper-slide-index="${c.attr(
                                        'data-swiper-slide-index'
                                    )}"]`
                                )
                                .addClass(a.slideDuplicateNextClass)
                            : b
                                .children(
                                    `.${a.slideClass}.${
                                        a.slideDuplicateClass
                                    }[data-swiper-slide-index="${c.attr(
                                        'data-swiper-slide-index'
                                    )}"]`
                                )
                                .addClass(a.slideDuplicateNextClass),
                            d.hasClass(a.slideDuplicateClass)
                                ? b
                                    .children(
                                        `.${a.slideClass}:not(.${
                                            a.slideDuplicateClass
                                        })[data-swiper-slide-index="${d.attr(
                                            'data-swiper-slide-index'
                                        )}"]`
                                    )
                                    .addClass(a.slideDuplicatePrevClass)
                                : b
                                    .children(
                                        `.${a.slideClass}.${
                                            a.slideDuplicateClass
                                        }[data-swiper-slide-index="${d.attr(
                                            'data-swiper-slide-index'
                                        )}"]`
                                    )
                                    .addClass(a.slideDuplicatePrevClass)),
                            e.emitSlidesClasses();
                    },
                    updateActiveIndex: function (l) {
                        let a = this,
                            e = a.rtlTranslate ? a.translate : -a.translate,
                            {
                                slidesGrid: d,
                                snapGrid: g,
                                params: h,
                                activeIndex: i,
                                realIndex: m,
                                snapIndex: n,
                            } = a,
                            f,
                            b = l;
                        if (void 0 === b) {
                            for (let c = 0; c < d.length; c += 1)
                                void 0 !== d[c + 1]
                                    ? e >= d[c] && e < d[c + 1] - (d[c + 1] - d[c]) / 2
                                        ? (b = c)
                                        : e >= d[c] && e < d[c + 1] && (b = c + 1)
                                    : e >= d[c] && (b = c);
                            h.normalizeSlideIndex && (b < 0 || void 0 === b) && (b = 0);
                        }
                        if (g.indexOf(e) >= 0) f = g.indexOf(e);
                        else {
                            let j = Math.min(h.slidesPerGroupSkip, b);
                            f = j + Math.floor((b - j) / h.slidesPerGroup);
                        }
                        if ((f >= g.length && (f = g.length - 1), b === i))
                            return void (
                                f !== n && ((a.snapIndex = f), a.emit('snapIndexChange'))
                            );
                        let k = parseInt(
                            a.slides.eq(b).attr('data-swiper-slide-index') || b,
                            10
                        );
                        Object.assign(a, {
                            snapIndex: f,
                            realIndex: k,
                            previousIndex: i,
                            activeIndex: b,
                        }),
                            a.emit('activeIndexChange'),
                            a.emit('snapIndexChange'),
                        m !== k && a.emit('realIndexChange'),
                        (a.initialized || a.params.runCallbacksOnInit) &&
                        a.emit('slideChange');
                    },
                    updateClickedSlide: function (g) {
                        let a = this,
                            d = a.params,
                            b = dt(g).closest('.' + d.slideClass)[0],
                            e,
                            f = !1;
                        if (b) {
                            for (let c = 0; c < a.slides.length; c += 1)
                                if (a.slides[c] === b) {
                                    (f = !0), (e = c);
                                    break;
                                }
                        }
                        if (!b || !f)
                            return (a.clickedSlide = void 0), void (a.clickedIndex = void 0);
                        (a.clickedSlide = b),
                            a.virtual && a.params.virtual.enabled
                                ? (a.clickedIndex = parseInt(
                                    dt(b).attr('data-swiper-slide-index'),
                                    10
                                ))
                                : (a.clickedIndex = e),
                        d.slideToClickedSlide &&
                        void 0 !== a.clickedIndex &&
                        a.clickedIndex !== a.activeIndex &&
                        a.slideToClickedSlide();
                    },
                },
                translate: {
                    getTranslate: function (i) {
                        var l, g, e;
                        void 0 === i && (i = this.isHorizontal() ? 'x' : 'y');
                        let {
                            params: m,
                            rtlTranslate: n,
                            translate: j,
                            $wrapperEl: p,
                        } = this;
                        if (m.virtualTranslate) return n ? -j : j;
                        if (m.cssMode) return j;
                        let o,
                            d,
                            f,
                            c,
                            b,
                            h,
                            a,
                            k =
                                ((l = p[0]),
                                void 0 === (g = i) && (g = 'x'),
                                    (f = dp()),
                                    (a =
                                        ((e = l),
                                        (o = dp()).getComputedStyle &&
                                        (d = o.getComputedStyle(e, null)),
                                        !d && e.currentStyle && (d = e.currentStyle),
                                        d || (d = e.style),
                                            d)),
                                    f.WebKitCSSMatrix
                                        ? ((b = a.transform || a.webkitTransform).split(',').length >
                                        6 &&
                                        (b = b
                                            .split(', ')
                                            .map((a) => a.replace(',', '.'))
                                            .join(', ')),
                                            (h = new f.WebKitCSSMatrix('none' === b ? '' : b)))
                                        : (c = (h =
                                            a.MozTransform ||
                                            a.OTransform ||
                                            a.MsTransform ||
                                            a.msTransform ||
                                            a.transform ||
                                            a
                                                .getPropertyValue('transform')
                                                .replace('translate(', 'matrix(1, 0, 0, 1,'))
                                            .toString()
                                            .split(',')),
                                'x' === g &&
                                (b = f.WebKitCSSMatrix
                                    ? h.m41
                                    : 16 === c.length
                                        ? parseFloat(c[12])
                                        : parseFloat(c[4])),
                                'y' === g &&
                                (b = f.WebKitCSSMatrix
                                    ? h.m42
                                    : 16 === c.length
                                        ? parseFloat(c[13])
                                        : parseFloat(c[5])),
                                b || 0);
                        return n && (k = -k), k || 0;
                    },
                    setTranslate: function (d, g) {
                        let a = this,
                            {
                                rtlTranslate: h,
                                params: e,
                                $wrapperEl: i,
                                wrapperEl: j,
                                progress: k,
                            } = a,
                            b = 0,
                            c = 0;
                        a.isHorizontal() ? (b = h ? -d : d) : (c = d),
                        e.roundLengths && ((b = Math.floor(b)), (c = Math.floor(c))),
                            e.cssMode
                                ? (j[a.isHorizontal() ? 'scrollLeft' : 'scrollTop'] =
                                    a.isHorizontal() ? -b : -c)
                                : e.virtualTranslate ||
                                i.transform(`translate3d(${b}px, ${c}px, 0px)`),
                            (a.previousTranslate = a.translate),
                            (a.translate = a.isHorizontal() ? b : c);
                        let f = a.maxTranslate() - a.minTranslate();
                        (0 === f ? 0 : (d - a.minTranslate()) / f) !== k &&
                        a.updateProgress(d),
                            a.emit('setTranslate', a.translate, g);
                    },
                    minTranslate: function () {
                        return -this.snapGrid[0];
                    },
                    maxTranslate: function () {
                        return -this.snapGrid[this.snapGrid.length - 1];
                    },
                    translateTo: function (d, b, e, f, h) {
                        void 0 === d && (d = 0),
                        void 0 === b && (b = this.params.speed),
                        void 0 === e && (e = !0),
                        void 0 === f && (f = !0);
                        let a = this,
                            {params: i, wrapperEl: j} = a;
                        if (a.animating && i.preventInteractionOnTransition) return !1;
                        let k = a.minTranslate(),
                            l = a.maxTranslate(),
                            c;
                        if (
                            ((c = f && d > k ? k : f && d < l ? l : d),
                                a.updateProgress(c),
                                i.cssMode)
                        ) {
                            let g = a.isHorizontal();
                            if (0 === b) j[g ? 'scrollLeft' : 'scrollTop'] = -c;
                            else {
                                if (!a.support.smoothScroll)
                                    return (
                                        dA({
                                            swiper: a,
                                            targetPosition: -c,
                                            side: g ? 'left' : 'top',
                                        }),
                                            !0
                                    );
                                j.scrollTo({[g ? 'left' : 'top']: -c, behavior: 'smooth'});
                            }
                            return !0;
                        }
                        return (
                            0 === b
                                ? (a.setTransition(0),
                                    a.setTranslate(c),
                                e &&
                                (a.emit('beforeTransitionStart', b, h),
                                    a.emit('transitionEnd')))
                                : (a.setTransition(b),
                                    a.setTranslate(c),
                                e &&
                                (a.emit('beforeTransitionStart', b, h),
                                    a.emit('transitionStart')),
                                a.animating ||
                                ((a.animating = !0),
                                a.onTranslateToWrapperTransitionEnd ||
                                (a.onTranslateToWrapperTransitionEnd = function (b) {
                                    a &&
                                    !a.destroyed &&
                                    b.target === this &&
                                    (a.$wrapperEl[0].removeEventListener(
                                        'transitionend',
                                        a.onTranslateToWrapperTransitionEnd
                                    ),
                                        a.$wrapperEl[0].removeEventListener(
                                            'webkitTransitionEnd',
                                            a.onTranslateToWrapperTransitionEnd
                                        ),
                                        (a.onTranslateToWrapperTransitionEnd = null),
                                        delete a.onTranslateToWrapperTransitionEnd,
                                    e && a.emit('transitionEnd'));
                                }),
                                    a.$wrapperEl[0].addEventListener(
                                        'transitionend',
                                        a.onTranslateToWrapperTransitionEnd
                                    ),
                                    a.$wrapperEl[0].addEventListener(
                                        'webkitTransitionEnd',
                                        a.onTranslateToWrapperTransitionEnd
                                    ))),
                                !0
                        );
                    },
                },
                transition: {
                    setTransition: function (a, b) {
                        this.params.cssMode || this.$wrapperEl.transition(a),
                            this.emit('setTransition', a, b);
                    },
                    transitionStart: function (a, c) {
                        void 0 === a && (a = !0);
                        let {params: b} = this;
                        b.cssMode ||
                        (b.autoHeight && this.updateAutoHeight(),
                            dF({
                                swiper: this,
                                runCallbacks: a,
                                direction: c,
                                step: 'Start',
                            }));
                    },
                    transitionEnd: function (a, b) {
                        void 0 === a && (a = !0);
                        let {params: c} = this;
                        (this.animating = !1),
                        c.cssMode ||
                        (this.setTransition(0),
                            dF({
                                swiper: this,
                                runCallbacks: a,
                                direction: b,
                                step: 'End',
                            }));
                    },
                },
                slide: {
                    slideTo: function (d, g, f, t, y) {
                        if (
                            (void 0 === d && (d = 0),
                            void 0 === g && (g = this.params.speed),
                            void 0 === f && (f = !0),
                            'number' != typeof d && 'string' != typeof d)
                        )
                            throw new Error(
                                `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof d}] given.`
                            );
                        if ('string' == typeof d) {
                            let u = parseInt(d, 10);
                            if (!isFinite(u))
                                throw new Error(
                                    `The passed-in 'index' (string) couldn't be converted to 'number'. [${d}] given.`
                                );
                            d = u;
                        }
                        let a = this,
                            b = d;
                        b < 0 && (b = 0);
                        let {
                            params: h,
                            snapGrid: n,
                            slidesGrid: l,
                            previousIndex: z,
                            activeIndex: j,
                            rtlTranslate: o,
                            wrapperEl: v,
                            enabled: A,
                        } = a;
                        if (
                            (a.animating && h.preventInteractionOnTransition) ||
                            (!A && !t && !y)
                        )
                            return !1;
                        let w = Math.min(a.params.slidesPerGroupSkip, b),
                            p = w + Math.floor((b - w) / a.params.slidesPerGroup);
                        p >= n.length && (p = n.length - 1),
                        (j || h.initialSlide || 0) === (z || 0) &&
                        f &&
                        a.emit('beforeSlideChangeStart');
                        let c = -n[p];
                        if ((a.updateProgress(c), h.normalizeSlideIndex))
                            for (let e = 0; e < l.length; e += 1) {
                                let k = -Math.floor(100 * c),
                                    m = Math.floor(100 * l[e]),
                                    q = Math.floor(100 * l[e + 1]);
                                void 0 !== l[e + 1]
                                    ? k >= m && k < q - (q - m) / 2
                                        ? (b = e)
                                        : k >= m && k < q && (b = e + 1)
                                    : k >= m && (b = e);
                            }
                        if (
                            a.initialized &&
                            b !== j &&
                            ((!a.allowSlideNext && c < a.translate && c < a.minTranslate()) ||
                                (!a.allowSlidePrev &&
                                    c > a.translate &&
                                    c > a.maxTranslate() &&
                                    (j || 0) !== b))
                        )
                            return !1;
                        let i;
                        if (
                            ((i = b > j ? 'next' : b < j ? 'prev' : 'reset'),
                            (o && -c === a.translate) || (!o && c === a.translate))
                        )
                            return (
                                a.updateActiveIndex(b),
                                h.autoHeight && a.updateAutoHeight(),
                                    a.updateSlidesClasses(),
                                'slide' !== h.effect && a.setTranslate(c),
                                'reset' !== i &&
                                (a.transitionStart(f, i), a.transitionEnd(f, i)),
                                    !1
                            );
                        if (h.cssMode) {
                            let r = a.isHorizontal(),
                                s = o ? c : -c;
                            if (0 === g) {
                                let x = a.virtual && a.params.virtual.enabled;
                                x &&
                                ((a.wrapperEl.style.scrollSnapType = 'none'),
                                    (a._immediateVirtual = !0)),
                                    (v[r ? 'scrollLeft' : 'scrollTop'] = s),
                                x &&
                                requestAnimationFrame(() => {
                                    (a.wrapperEl.style.scrollSnapType = ''),
                                        (a._swiperImmediateVirtual = !1);
                                });
                            } else {
                                if (!a.support.smoothScroll)
                                    return (
                                        dA({
                                            swiper: a,
                                            targetPosition: s,
                                            side: r ? 'left' : 'top',
                                        }),
                                            !0
                                    );
                                v.scrollTo({[r ? 'left' : 'top']: s, behavior: 'smooth'});
                            }
                            return !0;
                        }
                        return (
                            a.setTransition(g),
                                a.setTranslate(c),
                                a.updateActiveIndex(b),
                                a.updateSlidesClasses(),
                                a.emit('beforeTransitionStart', g, t),
                                a.transitionStart(f, i),
                                0 === g
                                    ? a.transitionEnd(f, i)
                                    : a.animating ||
                                    ((a.animating = !0),
                                    a.onSlideToWrapperTransitionEnd ||
                                    (a.onSlideToWrapperTransitionEnd = function (b) {
                                        a &&
                                        !a.destroyed &&
                                        b.target === this &&
                                        (a.$wrapperEl[0].removeEventListener(
                                            'transitionend',
                                            a.onSlideToWrapperTransitionEnd
                                        ),
                                            a.$wrapperEl[0].removeEventListener(
                                                'webkitTransitionEnd',
                                                a.onSlideToWrapperTransitionEnd
                                            ),
                                            (a.onSlideToWrapperTransitionEnd = null),
                                            delete a.onSlideToWrapperTransitionEnd,
                                            a.transitionEnd(f, i));
                                    }),
                                        a.$wrapperEl[0].addEventListener(
                                            'transitionend',
                                            a.onSlideToWrapperTransitionEnd
                                        ),
                                        a.$wrapperEl[0].addEventListener(
                                            'webkitTransitionEnd',
                                            a.onSlideToWrapperTransitionEnd
                                        )),
                                !0
                        );
                    },
                    slideToLoop: function (a, b, c, f) {
                        if (
                            (void 0 === a && (a = 0),
                            void 0 === b && (b = this.params.speed),
                            void 0 === c && (c = !0),
                            'string' == typeof a)
                        ) {
                            let d = parseInt(a, 10);
                            if (!isFinite(d))
                                throw new Error(
                                    `The passed-in 'index' (string) couldn't be converted to 'number'. [${a}] given.`
                                );
                            a = d;
                        }
                        let e = a;
                        return (
                            this.params.loop && (e += this.loopedSlides),
                                this.slideTo(e, b, c, f)
                        );
                    },
                    slideNext: function (c, d, e) {
                        void 0 === c && (c = this.params.speed), void 0 === d && (d = !0);
                        let a = this,
                            {animating: g, enabled: h, params: b} = a;
                        if (!h) return a;
                        let f = b.slidesPerGroup;
                        'auto' === b.slidesPerView &&
                        1 === b.slidesPerGroup &&
                        b.slidesPerGroupAuto &&
                        (f = Math.max(a.slidesPerViewDynamic('current', !0), 1));
                        let i = a.activeIndex < b.slidesPerGroupSkip ? 1 : f;
                        if (b.loop) {
                            if (g && b.loopPreventsSlide) return !1;
                            a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
                        }
                        return b.rewind && a.isEnd
                            ? a.slideTo(0, c, d, e)
                            : a.slideTo(a.activeIndex + i, c, d, e);
                    },
                    slidePrev: function (d, e, i) {
                        void 0 === d && (d = this.params.speed), void 0 === e && (e = !0);
                        let a = this,
                            {
                                params: b,
                                animating: j,
                                snapGrid: f,
                                slidesGrid: k,
                                rtlTranslate: l,
                                enabled: m,
                            } = a;
                        if (!m) return a;
                        if (b.loop) {
                            if (j && b.loopPreventsSlide) return !1;
                            a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
                        }

                        function n(a) {
                            return a < 0 ? -Math.floor(Math.abs(a)) : Math.floor(a);
                        }

                        let o = n(l ? a.translate : -a.translate),
                            p = f.map((a) => n(a)),
                            g = f[p.indexOf(o) - 1];
                        if (void 0 === g && b.cssMode) {
                            let h;
                            f.forEach((a, b) => {
                                o >= a && (h = b);
                            }),
                            void 0 !== h && (g = f[h > 0 ? h - 1 : h]);
                        }
                        let c = 0;
                        if (
                            (void 0 !== g &&
                            ((c = k.indexOf(g)) < 0 && (c = a.activeIndex - 1),
                            'auto' === b.slidesPerView &&
                            1 === b.slidesPerGroup &&
                            b.slidesPerGroupAuto &&
                            (c = Math.max(
                                (c = c - a.slidesPerViewDynamic('previous', !0) + 1),
                                0
                            ))),
                            b.rewind && a.isBeginning)
                        ) {
                            let q =
                                a.params.virtual && a.params.virtual.enabled && a.virtual
                                    ? a.virtual.slides.length - 1
                                    : a.slides.length - 1;
                            return a.slideTo(q, d, e, i);
                        }
                        return a.slideTo(c, d, e, i);
                    },
                    slideReset: function (a, b, c) {
                        return (
                            void 0 === a && (a = this.params.speed),
                            void 0 === b && (b = !0),
                                this.slideTo(this.activeIndex, a, b, c)
                        );
                    },
                    slideToClosest: function (e, f, k, d) {
                        void 0 === e && (e = this.params.speed),
                        void 0 === f && (f = !0),
                        void 0 === d && (d = 0.5);
                        let a = this,
                            b = a.activeIndex,
                            h = Math.min(a.params.slidesPerGroupSkip, b),
                            c = h + Math.floor((b - h) / a.params.slidesPerGroup),
                            g = a.rtlTranslate ? a.translate : -a.translate;
                        if (g >= a.snapGrid[c]) {
                            let i = a.snapGrid[c];
                            g - i > (a.snapGrid[c + 1] - i) * d &&
                            (b += a.params.slidesPerGroup);
                        } else {
                            let j = a.snapGrid[c - 1];
                            g - j <= (a.snapGrid[c] - j) * d &&
                            (b -= a.params.slidesPerGroup);
                        }
                        return (
                            (b = Math.max(b, 0)),
                                (b = Math.min(b, a.slidesGrid.length - 1)),
                                a.slideTo(b, e, f, k)
                        );
                    },
                    slideToClickedSlide: function () {
                        let a = this,
                            {params: b, $wrapperEl: f} = a,
                            d =
                                'auto' === b.slidesPerView
                                    ? a.slidesPerViewDynamic()
                                    : b.slidesPerView,
                            e,
                            c = a.clickedIndex;
                        if (b.loop) {
                            if (a.animating) return;
                            (e = parseInt(
                                dt(a.clickedSlide).attr('data-swiper-slide-index'),
                                10
                            )),
                                b.centeredSlides
                                    ? c < a.loopedSlides - d / 2 ||
                                    c > a.slides.length - a.loopedSlides + d / 2
                                        ? (a.loopFix(),
                                            (c = f
                                                .children(
                                                    `.${b.slideClass}[data-swiper-slide-index="${e}"]:not(.${b.slideDuplicateClass})`
                                                )
                                                .eq(0)
                                                .index()),
                                            du(() => {
                                                a.slideTo(c);
                                            }))
                                        : a.slideTo(c)
                                    : c > a.slides.length - d
                                        ? (a.loopFix(),
                                            (c = f
                                                .children(
                                                    `.${b.slideClass}[data-swiper-slide-index="${e}"]:not(.${b.slideDuplicateClass})`
                                                )
                                                .eq(0)
                                                .index()),
                                            du(() => {
                                                a.slideTo(c);
                                            }))
                                        : a.slideTo(c);
                        } else a.slideTo(c);
                    },
                },
                loop: {
                    loopCreate: function () {
                        let d = this,
                            l = dm(),
                            {params: a, $wrapperEl: e} = d,
                            b = e.children().length > 0 ? dt(e.children()[0].parentNode) : e;
                        b.children(`.${a.slideClass}.${a.slideDuplicateClass}`).remove();
                        let c = b.children('.' + a.slideClass);
                        if (a.loopFillGroupWithBlank) {
                            let h = a.slidesPerGroup - (c.length % a.slidesPerGroup);
                            if (h !== a.slidesPerGroup) {
                                for (let i = 0; i < h; i += 1) {
                                    let m = dt(l.createElement('div')).addClass(
                                        `${a.slideClass} ${a.slideBlankClass}`
                                    );
                                    b.append(m);
                                }
                                c = b.children('.' + a.slideClass);
                            }
                        }
                        'auto' !== a.slidesPerView ||
                        a.loopedSlides ||
                        (a.loopedSlides = c.length),
                            (d.loopedSlides = Math.ceil(
                                parseFloat(a.loopedSlides || a.slidesPerView, 10)
                            )),
                            (d.loopedSlides += a.loopAdditionalSlides),
                        d.loopedSlides > c.length && (d.loopedSlides = c.length);
                        let j = [],
                            k = [];
                        c.each((b, a) => {
                            let e = dt(b);
                            a < d.loopedSlides && k.push(b),
                            a < c.length && a >= c.length - d.loopedSlides && j.push(b),
                                e.attr('data-swiper-slide-index', a);
                        });
                        for (let f = 0; f < k.length; f += 1)
                            b.append(dt(k[f].cloneNode(!0)).addClass(a.slideDuplicateClass));
                        for (let g = j.length - 1; g >= 0; g -= 1)
                            b.prepend(dt(j[g].cloneNode(!0)).addClass(a.slideDuplicateClass));
                    },
                    loopFix: function () {
                        let a = this;
                        a.emit('beforeLoopFix');
                        let {
                                activeIndex: d,
                                slides: f,
                                loopedSlides: b,
                                allowSlidePrev: h,
                                allowSlideNext: i,
                                snapGrid: j,
                                rtlTranslate: g,
                            } = a,
                            c;
                        (a.allowSlidePrev = !0), (a.allowSlideNext = !0);
                        let e = -j[d] - a.getTranslate();
                        d < b
                            ? ((c = f.length - 3 * b + d),
                                (c += b),
                            a.slideTo(c, 0, !1, !0) &&
                            0 !== e &&
                            a.setTranslate((g ? -a.translate : a.translate) - e))
                            : d >= f.length - b &&
                            ((c = -f.length + d + b),
                                (c += b),
                            a.slideTo(c, 0, !1, !0) &&
                            0 !== e &&
                            a.setTranslate((g ? -a.translate : a.translate) - e)),
                            (a.allowSlidePrev = h),
                            (a.allowSlideNext = i),
                            a.emit('loopFix');
                    },
                    loopDestroy: function () {
                        let {$wrapperEl: b, params: a, slides: c} = this;
                        b
                            .children(
                                `.${a.slideClass}.${a.slideDuplicateClass},.${a.slideClass}.${a.slideBlankClass}`
                            )
                            .remove(),
                            c.removeAttr('data-swiper-slide-index');
                    },
                },
                grabCursor: {
                    setGrabCursor: function (b) {
                        if (
                            this.support.touch ||
                            !this.params.simulateTouch ||
                            (this.params.watchOverflow && this.isLocked) ||
                            this.params.cssMode
                        )
                            return;
                        let a =
                            'container' === this.params.touchEventsTarget
                                ? this.el
                                : this.wrapperEl;
                        (a.style.cursor = 'move'),
                            (a.style.cursor = b ? 'grabbing' : 'grab');
                    },
                    unsetGrabCursor: function () {
                        this.support.touch ||
                        (this.params.watchOverflow && this.isLocked) ||
                        this.params.cssMode ||
                        (this[
                            'container' === this.params.touchEventsTarget
                                ? 'el'
                                : 'wrapperEl'
                            ].style.cursor = '');
                    },
                },
                events: {
                    attachEvents: function () {
                        let a = this,
                            b = dm(),
                            {params: c, support: d} = a;
                        (a.onTouchStart = dG.bind(a)),
                            (a.onTouchMove = dH.bind(a)),
                            (a.onTouchEnd = dI.bind(a)),
                        c.cssMode && (a.onScroll = dL.bind(a)),
                            (a.onClick = dK.bind(a)),
                        d.touch &&
                        !dM &&
                        (b.addEventListener('touchstart', dN), (dM = !0)),
                            dO(a, 'on');
                    },
                    detachEvents: function () {
                        dO(this, 'off');
                    },
                },
                breakpoints: {
                    setBreakpoint: function () {
                        let a = this,
                            {
                                activeIndex: m,
                                initialized: g,
                                loopedSlides: n = 0,
                                params: b,
                                $el: f,
                            } = a,
                            d = b.breakpoints;
                        if (!d || (d && 0 === Object.keys(d).length)) return;
                        let e = a.getBreakpoint(d, a.params.breakpointsBase, a.el);
                        if (!e || a.currentBreakpoint === e) return;
                        let c = (e in d ? d[e] : void 0) || a.originalParams,
                            h = dP(a, b),
                            i = dP(a, c),
                            j = b.enabled;
                        h && !i
                            ? (f.removeClass(
                                `${b.containerModifierClass}grid ${b.containerModifierClass}grid-column`
                            ),
                                a.emitContainerClasses())
                            : !h &&
                            i &&
                            (f.addClass(b.containerModifierClass + 'grid'),
                            ((c.grid.fill && 'column' === c.grid.fill) ||
                                (!c.grid.fill && 'column' === b.grid.fill)) &&
                            f.addClass(b.containerModifierClass + 'grid-column'),
                                a.emitContainerClasses()),
                            ['navigation', 'pagination', 'scrollbar'].forEach((d) => {
                                let e = b[d] && b[d].enabled,
                                    f = c[d] && c[d].enabled;
                                e && !f && a[d].disable(), !e && f && a[d].enable();
                            });
                        let k = c.direction && c.direction !== b.direction,
                            o = b.loop && (c.slidesPerView !== b.slidesPerView || k);
                        k && g && a.changeDirection(), dy(a.params, c);
                        let l = a.params.enabled;
                        Object.assign(a, {
                            allowTouchMove: a.params.allowTouchMove,
                            allowSlideNext: a.params.allowSlideNext,
                            allowSlidePrev: a.params.allowSlidePrev,
                        }),
                            j && !l ? a.disable() : !j && l && a.enable(),
                            (a.currentBreakpoint = e),
                            a.emit('_beforeBreakpoint', c),
                        o &&
                        g &&
                        (a.loopDestroy(),
                            a.loopCreate(),
                            a.updateSlides(),
                            a.slideTo(m - n + a.loopedSlides, 0, !1)),
                            a.emit('breakpoint', c);
                    },
                    getBreakpoint: function (f, a, b) {
                        if (
                            (void 0 === a && (a = 'window'), !f || ('container' === a && !b))
                        )
                            return;
                        let c = !1,
                            g = dp(),
                            j = 'window' === a ? g.innerHeight : b.clientHeight,
                            d = Object.keys(f).map((a) => {
                                if ('string' == typeof a && 0 === a.indexOf('@')) {
                                    let b = parseFloat(a.substr(1));
                                    return {value: j * b, point: a};
                                }
                                return {value: a, point: a};
                            });
                        d.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
                        for (let e = 0; e < d.length; e += 1) {
                            let {point: h, value: i} = d[e];
                            'window' === a
                                ? g.matchMedia(`(min-width: ${i}px)`).matches && (c = h)
                                : i <= b.clientWidth && (c = h);
                        }
                        return c || 'max';
                    },
                },
                checkOverflow: {
                    checkOverflow: function () {
                        let a = this,
                            {isLocked: b, params: c} = a,
                            {slidesOffsetBefore: d} = c;
                        if (d) {
                            let e = a.slides.length - 1,
                                f = a.slidesGrid[e] + a.slidesSizesGrid[e] + 2 * d;
                            a.isLocked = a.size > f;
                        } else a.isLocked = 1 === a.snapGrid.length;
                        !0 === c.allowSlideNext && (a.allowSlideNext = !a.isLocked),
                        !0 === c.allowSlidePrev && (a.allowSlidePrev = !a.isLocked),
                        b && b !== a.isLocked && (a.isEnd = !1),
                        b !== a.isLocked && a.emit(a.isLocked ? 'lock' : 'unlock');
                    },
                },
                classes: {
                    addClasses: function () {
                        var b, f;
                        let c,
                            {
                                classNames: d,
                                params: a,
                                rtl: g,
                                $el: h,
                                device: e,
                                support: i,
                            } = this,
                            j =
                                ((b = [
                                    'initialized',
                                    a.direction,
                                    {'pointer-events': !i.touch},
                                    {'free-mode': this.params.freeMode && a.freeMode.enabled},
                                    {autoheight: a.autoHeight},
                                    {rtl: g},
                                    {grid: a.grid && a.grid.rows > 1},
                                    {
                                        'grid-column':
                                            a.grid && a.grid.rows > 1 && 'column' === a.grid.fill,
                                    },
                                    {android: e.android},
                                    {ios: e.ios},
                                    {'css-mode': a.cssMode},
                                    {centered: a.cssMode && a.centeredSlides},
                                    {'watch-progress': a.watchSlidesProgress},
                                ]),
                                    (f = a.containerModifierClass),
                                    (c = []),
                                    b.forEach((a) => {
                                        'object' == typeof a
                                            ? Object.keys(a).forEach((b) => {
                                                a[b] && c.push(f + b);
                                            })
                                            : 'string' == typeof a && c.push(f + a);
                                    }),
                                    c);
                        d.push(...j),
                            h.addClass([...d].join(' ')),
                            this.emitContainerClasses();
                    },
                    removeClasses: function () {
                        let {$el: a, classNames: b} = this;
                        a.removeClass(b.join(' ')), this.emitContainerClasses();
                    },
                },
                images: {
                    loadImage: function (d, c, e, f, g, i) {
                        let h = dp(),
                            a;

                        function b() {
                            i && i();
                        }

                        dt(d).parent('picture')[0] || (d.complete && g)
                            ? b()
                            : c
                                ? (((a = new h.Image()).onload = b),
                                    (a.onerror = b),
                                f && (a.sizes = f),
                                e && (a.srcset = e),
                                c && (a.src = c))
                                : b();
                    },
                    preloadImages: function () {
                        let b = this;

                        function d() {
                            null != b &&
                            b &&
                            !b.destroyed &&
                            (void 0 !== b.imagesLoaded && (b.imagesLoaded += 1),
                            b.imagesLoaded === b.imagesToLoad.length &&
                            (b.params.updateOnImagesReady && b.update(),
                                b.emit('imagesReady')));
                        }

                        b.imagesToLoad = b.$el.find('img');
                        for (let c = 0; c < b.imagesToLoad.length; c += 1) {
                            let a = b.imagesToLoad[c];
                            b.loadImage(
                                a,
                                a.currentSrc || a.getAttribute('src'),
                                a.srcset || a.getAttribute('srcset'),
                                a.sizes || a.getAttribute('sizes'),
                                !0,
                                d
                            );
                        }
                    },
                },
            },
            dR = {};

        class D {
            constructor() {
                let e, b;
                for (var i, j = arguments.length, c = new Array(j), f = 0; f < j; f++)
                    c[f] = arguments[f];
                if (
                    (1 === c.length &&
                    c[0].constructor &&
                    'Object' === Object.prototype.toString.call(c[0]).slice(8, -1)
                        ? (b = c[0])
                        : ([e, b] = c),
                    b || (b = {}),
                        (b = dy({}, b)),
                    e && !b.el && (b.el = e),
                    b.el && dt(b.el).length > 1)
                ) {
                    let l = [];
                    return (
                        dt(b.el).each((a) => {
                            let c = dy({}, b, {el: a});
                            l.push(new D(c));
                        }),
                            l
                    );
                }
                let a = this,
                    k,
                    h;
                (a.__swiper__ = !0),
                    (a.support = dE()),
                    (a.device =
                        ((i = {userAgent: b.userAgent}),
                        dC ||
                        (dC = (function (e) {
                            let {userAgent: h} = void 0 === e ? {} : e,
                                i = dE(),
                                d = dp(),
                                f = d.navigator.platform,
                                a = h || d.navigator.userAgent,
                                b = {ios: !1, android: !1},
                                j = d.screen.width,
                                k = d.screen.height,
                                l = a.match(/(Android);?[\s\/]+([\d.]+)?/),
                                c = a.match(/(iPad).*OS\s([\d_]+)/),
                                m = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                                n = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                                o = 'Win32' === f,
                                g = 'MacIntel' === f;
                            return (
                                !c &&
                                g &&
                                i.touch &&
                                [
                                    '1024x1366',
                                    '1366x1024',
                                    '834x1194',
                                    '1194x834',
                                    '834x1112',
                                    '1112x834',
                                    '768x1024',
                                    '1024x768',
                                    '820x1180',
                                    '1180x820',
                                    '810x1080',
                                    '1080x810',
                                ].indexOf(`${j}x${k}`) >= 0 &&
                                ((c = a.match(/(Version)\/([\d.]+)/)) ||
                                (c = [0, 1, '13_0_0']),
                                    (g = !1)),
                                l && !o && ((b.os = 'android'), (b.android = !0)),
                                (c || n || m) && ((b.os = 'ios'), (b.ios = !0)),
                                    b
                            );
                        })(i)),
                            dC)),
                    (a.browser =
                        (dD ||
                        (dD = {
                            isSafari:
                                (h = (k = dp()).navigator.userAgent.toLowerCase()).indexOf(
                                    'safari'
                                ) >= 0 &&
                                0 > h.indexOf('chrome') &&
                                0 > h.indexOf('android'),
                            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                                k.navigator.userAgent
                            ),
                        }),
                            dD)),
                    (a.eventsListeners = {}),
                    (a.eventsAnyListeners = []),
                    (a.modules = [...a.__modules__]),
                b.modules && Array.isArray(b.modules) && a.modules.push(...b.modules);
                let m = {};
                a.modules.forEach((c) => {
                    var d, e;
                    c({
                        swiper: a,
                        extendParams:
                            ((d = b),
                                (e = m),
                                function (b) {
                                    void 0 === b && (b = {});
                                    let a = Object.keys(b)[0],
                                        c = b[a];
                                    'object' == typeof c &&
                                    null !== c &&
                                    (['navigation', 'pagination', 'scrollbar'].indexOf(a) >= 0 &&
                                    !0 === d[a] &&
                                    (d[a] = {auto: !0}),
                                    a in d &&
                                    'enabled' in c &&
                                    (!0 === d[a] && (d[a] = {enabled: !0}),
                                    'object' != typeof d[a] ||
                                    'enabled' in d[a] ||
                                    (d[a].enabled = !0),
                                    d[a] || (d[a] = {enabled: !1}))),
                                        dy(e, b);
                                }),
                        on: a.on.bind(a),
                        once: a.once.bind(a),
                        off: a.off.bind(a),
                        emit: a.emit.bind(a),
                    });
                });
                let n = dy({}, dQ, m),
                    d,
                    g;
                return (
                    (a.params = dy({}, n, dR, b)),
                        (a.originalParams = dy({}, a.params)),
                        (a.passedParams = dy({}, b)),
                    a.params &&
                    a.params.on &&
                    Object.keys(a.params.on).forEach((b) => {
                        a.on(b, a.params.on[b]);
                    }),
                    a.params && a.params.onAny && a.onAny(a.params.onAny),
                        (a.$ = dt),
                        Object.assign(a, {
                            enabled: a.params.enabled,
                            el: e,
                            classNames: [],
                            slides: dt(),
                            slidesGrid: [],
                            snapGrid: [],
                            slidesSizesGrid: [],
                            isHorizontal: () => 'horizontal' === a.params.direction,
                            isVertical: () => 'vertical' === a.params.direction,
                            activeIndex: 0,
                            realIndex: 0,
                            isBeginning: !0,
                            isEnd: !1,
                            translate: 0,
                            previousTranslate: 0,
                            progress: 0,
                            velocity: 0,
                            animating: !1,
                            allowSlideNext: a.params.allowSlideNext,
                            allowSlidePrev: a.params.allowSlidePrev,
                            touchEvents:
                                ((d = ['touchstart', 'touchmove', 'touchend', 'touchcancel']),
                                    (g = ['pointerdown', 'pointermove', 'pointerup']),
                                    (a.touchEventsTouch = {
                                        start: d[0],
                                        move: d[1],
                                        end: d[2],
                                        cancel: d[3],
                                    }),
                                    (a.touchEventsDesktop = {start: g[0], move: g[1], end: g[2]}),
                                    a.support.touch || !a.params.simulateTouch
                                        ? a.touchEventsTouch
                                        : a.touchEventsDesktop),
                            touchEventsData: {
                                isTouched: void 0,
                                isMoved: void 0,
                                allowTouchCallbacks: void 0,
                                touchStartTime: void 0,
                                isScrolling: void 0,
                                currentTranslate: void 0,
                                startTranslate: void 0,
                                allowThresholdMove: void 0,
                                focusableElements: a.params.focusableElements,
                                lastClickTime: dv(),
                                clickTimeout: void 0,
                                velocities: [],
                                allowMomentumBounce: void 0,
                                isTouchEvent: void 0,
                                startMoving: void 0,
                            },
                            allowClick: !0,
                            allowTouchMove: a.params.allowTouchMove,
                            touches: {
                                startX: 0,
                                startY: 0,
                                currentX: 0,
                                currentY: 0,
                                diff: 0,
                            },
                            imagesToLoad: [],
                            imagesLoaded: 0,
                        }),
                        a.emit('_swiper'),
                    a.params.init && a.init(),
                        a
                );
            }

            enable() {
                let a = this;
                a.enabled ||
                ((a.enabled = !0),
                a.params.grabCursor && a.setGrabCursor(),
                    a.emit('enable'));
            }

            disable() {
                let a = this;
                a.enabled &&
                ((a.enabled = !1),
                a.params.grabCursor && a.unsetGrabCursor(),
                    a.emit('disable'));
            }

            setProgress(a, b) {
                a = Math.min(Math.max(a, 0), 1);
                let c = this.minTranslate(),
                    d = (this.maxTranslate() - c) * a + c;
                this.translateTo(d, void 0 === b ? 0 : b),
                    this.updateActiveIndex(),
                    this.updateSlidesClasses();
            }

            emitContainerClasses() {
                let a = this;
                if (!a.params._emitClasses || !a.el) return;
                let b = a.el.className
                    .split(' ')
                    .filter(
                        (b) =>
                            0 === b.indexOf('swiper') ||
                            0 === b.indexOf(a.params.containerModifierClass)
                    );
                a.emit('_containerClasses', b.join(' '));
            }

            getSlideClasses(a) {
                let b = this;
                return b.destroyed
                    ? ''
                    : a.className
                        .split(' ')
                        .filter(
                            (a) =>
                                0 === a.indexOf('swiper-slide') ||
                                0 === a.indexOf(b.params.slideClass)
                        )
                        .join(' ');
            }

            emitSlidesClasses() {
                let a = this;
                if (!a.params._emitClasses || !a.el) return;
                let b = [];
                a.slides.each((c) => {
                    let d = a.getSlideClasses(c);
                    b.push({slideEl: c, classNames: d}), a.emit('_slideClass', c, d);
                }),
                    a.emit('_slideClasses', b);
            }

            slidesPerViewDynamic(k, l) {
                void 0 === k && (k = 'current'), void 0 === l && (l = !1);
                let {
                        params: n,
                        slides: b,
                        slidesGrid: c,
                        slidesSizesGrid: o,
                        size: d,
                        activeIndex: a,
                    } = this,
                    e = 1;
                if (n.centeredSlides) {
                    let g,
                        h = b[a].swiperSlideSize;
                    for (let i = a + 1; i < b.length; i += 1)
                        b[i] &&
                        !g &&
                        ((h += b[i].swiperSlideSize), (e += 1), h > d && (g = !0));
                    for (let j = a - 1; j >= 0; j -= 1)
                        b[j] &&
                        !g &&
                        ((h += b[j].swiperSlideSize), (e += 1), h > d && (g = !0));
                } else if ('current' === k)
                    for (let f = a + 1; f < b.length; f += 1)
                        (l ? c[f] + o[f] - c[a] < d : c[f] - c[a] < d) && (e += 1);
                else for (let m = a - 1; m >= 0; m -= 1) c[a] - c[m] < d && (e += 1);
                return e;
            }

            update() {
                let a = this;
                if (!a || a.destroyed) return;
                let {snapGrid: d, params: b} = a;

                function c() {
                    let b = Math.min(
                        Math.max(
                            a.rtlTranslate ? -1 * a.translate : a.translate,
                            a.maxTranslate()
                        ),
                        a.minTranslate()
                    );
                    a.setTranslate(b), a.updateActiveIndex(), a.updateSlidesClasses();
                }

                b.breakpoints && a.setBreakpoint(),
                    a.updateSize(),
                    a.updateSlides(),
                    a.updateProgress(),
                    a.updateSlidesClasses(),
                    a.params.freeMode && a.params.freeMode.enabled
                        ? (c(), a.params.autoHeight && a.updateAutoHeight())
                        : (('auto' === a.params.slidesPerView ||
                        a.params.slidesPerView > 1) &&
                    a.isEnd &&
                    !a.params.centeredSlides
                        ? a.slideTo(a.slides.length - 1, 0, !1, !0)
                        : a.slideTo(a.activeIndex, 0, !1, !0)) || c(),
                b.watchOverflow && d !== a.snapGrid && a.checkOverflow(),
                    a.emit('update');
            }

            changeDirection(b, c) {
                void 0 === c && (c = !0);
                let a = this,
                    d = a.params.direction;
                return (
                    b || (b = 'horizontal' === d ? 'vertical' : 'horizontal'),
                    b === d ||
                    ('horizontal' !== b && 'vertical' !== b) ||
                    (a.$el
                        .removeClass(`${a.params.containerModifierClass}${d}`)
                        .addClass(`${a.params.containerModifierClass}${b}`),
                        a.emitContainerClasses(),
                        (a.params.direction = b),
                        a.slides.each((a) => {
                            'vertical' === b ? (a.style.width = '') : (a.style.height = '');
                        }),
                        a.emit('changeDirection'),
                    c && a.update()),
                        a
                );
            }

            changeLanguageDirection(b) {
                let a = this;
                (a.rtl && 'rtl' === b) ||
                (!a.rtl && 'ltr' === b) ||
                ((a.rtl = 'rtl' === b),
                    (a.rtlTranslate = 'horizontal' === a.params.direction && a.rtl),
                    a.rtl
                        ? (a.$el.addClass(a.params.containerModifierClass + 'rtl'),
                            (a.el.dir = 'rtl'))
                        : (a.$el.removeClass(a.params.containerModifierClass + 'rtl'),
                            (a.el.dir = 'ltr')),
                    a.update());
            }

            mount(b) {
                let a = this;
                if (a.mounted) return !0;
                let c = dt(b || a.params.el);
                if (!(b = c[0])) return !1;
                b.swiper = a;
                let f = () =>
                        '.' + (a.params.wrapperClass || '').trim().split(' ').join('.'),
                    d = (() => {
                        if (b && b.shadowRoot && b.shadowRoot.querySelector) {
                            let a = dt(b.shadowRoot.querySelector(f()));
                            return (a.children = (a) => c.children(a)), a;
                        }
                        return c.children ? c.children(f()) : dt(c).children(f());
                    })();
                if (0 === d.length && a.params.createElements) {
                    let e = dm().createElement('div');
                    (d = dt(e)),
                        (e.className = a.params.wrapperClass),
                        c.append(e),
                        c.children('.' + a.params.slideClass).each((a) => {
                            d.append(a);
                        });
                }
                return (
                    Object.assign(a, {
                        $el: c,
                        el: b,
                        $wrapperEl: d,
                        wrapperEl: d[0],
                        mounted: !0,
                        rtl: 'rtl' === b.dir.toLowerCase() || 'rtl' === c.css('direction'),
                        rtlTranslate:
                            'horizontal' === a.params.direction &&
                            ('rtl' === b.dir.toLowerCase() || 'rtl' === c.css('direction')),
                        wrongRTL: '-webkit-box' === d.css('display'),
                    }),
                        !0
                );
            }

            init(b) {
                let a = this;
                return (
                    a.initialized ||
                    !1 === a.mount(b) ||
                    (a.emit('beforeInit'),
                    a.params.breakpoints && a.setBreakpoint(),
                        a.addClasses(),
                    a.params.loop && a.loopCreate(),
                        a.updateSize(),
                        a.updateSlides(),
                    a.params.watchOverflow && a.checkOverflow(),
                    a.params.grabCursor && a.enabled && a.setGrabCursor(),
                    a.params.preloadImages && a.preloadImages(),
                        a.params.loop
                            ? a.slideTo(
                                a.params.initialSlide + a.loopedSlides,
                                0,
                                a.params.runCallbacksOnInit,
                                !1,
                                !0
                            )
                            : a.slideTo(
                                a.params.initialSlide,
                                0,
                                a.params.runCallbacksOnInit,
                                !1,
                                !0
                            ),
                        a.attachEvents(),
                        (a.initialized = !0),
                        a.emit('init'),
                        a.emit('afterInit')),
                        a
                );
            }

            destroy(c, d) {
                void 0 === c && (c = !0), void 0 === d && (d = !0);
                let a = this,
                    {params: b, $el: g, $wrapperEl: h, slides: e} = a,
                    f;
                return (
                    void 0 === a.params ||
                    a.destroyed ||
                    (a.emit('beforeDestroy'),
                        (a.initialized = !1),
                        a.detachEvents(),
                    b.loop && a.loopDestroy(),
                    d &&
                    (a.removeClasses(),
                        g.removeAttr('style'),
                        h.removeAttr('style'),
                    e &&
                    e.length &&
                    e
                        .removeClass(
                            [
                                b.slideVisibleClass,
                                b.slideActiveClass,
                                b.slideNextClass,
                                b.slidePrevClass,
                            ].join(' ')
                        )
                        .removeAttr('style')
                        .removeAttr('data-swiper-slide-index')),
                        a.emit('destroy'),
                        Object.keys(a.eventsListeners).forEach((b) => {
                            a.off(b);
                        }),
                    !1 !== c &&
                    ((a.$el[0].swiper = null),
                        (f = a),
                        Object.keys(f).forEach((a) => {
                            try {
                                f[a] = null;
                            } catch (b) {
                            }
                            try {
                                delete f[a];
                            } catch (c) {
                            }
                        })),
                        (a.destroyed = !0)),
                        null
                );
            }

            static extendDefaults(a) {
                dy(dR, a);
            }

            static get extendedDefaults() {
                return dR;
            }

            static get defaults() {
                return dQ;
            }

            static installModule(a) {
                D.prototype.__modules__ || (D.prototype.__modules__ = []);
                let b = D.prototype.__modules__;
                'function' == typeof a && 0 > b.indexOf(a) && b.push(a);
            }

            static use(a) {
                return Array.isArray(a)
                    ? (a.forEach((a) => D.installModule(a)), D)
                    : (D.installModule(a), D);
            }
        }

        function dS(a, d, b, c) {
            let e = dm();
            return (
                a.params.createElements &&
                Object.keys(c).forEach((f) => {
                    if (!b[f] && !0 === b.auto) {
                        let g = a.$el.children('.' + c[f])[0];
                        g ||
                        (((g = e.createElement('div')).className = c[f]),
                            a.$el.append(g)),
                            (b[f] = g),
                            (d[f] = g);
                    }
                }),
                    b
            );
        }

        function dT(a) {
            return (
                void 0 === a && (a = ''),
                '.' +
                a
                    .trim()
                    .replace(/([\.:!\/])/g, '\\$1')
                    .replace(/ /g, '.')
            );
        }

        Object.keys(aA).forEach((a) => {
            Object.keys(aA[a]).forEach((b) => {
                D.prototype[b] = aA[a][b];
            });
        }),
            D.use([
                function (b) {
                    let {swiper: c, on: a, emit: d} = b,
                        e = dp(),
                        f = null,
                        g = null,
                        h = () => {
                            c &&
                            !c.destroyed &&
                            c.initialized &&
                            (d('beforeResize'), d('resize'));
                        },
                        i = () => {
                            c && !c.destroyed && c.initialized && d('orientationchange');
                        };
                    a('init', () => {
                        c.params.resizeObserver && void 0 !== e.ResizeObserver
                            ? c &&
                            !c.destroyed &&
                            c.initialized &&
                            (f = new ResizeObserver((a) => {
                                g = e.requestAnimationFrame(() => {
                                    let {width: b, height: d} = c,
                                        e = b,
                                        f = d;
                                    a.forEach((g) => {
                                        let {contentBoxSize: a, contentRect: b, target: d} = g;
                                        (d && d !== c.el) ||
                                        ((e = b ? b.width : (a[0] || a).inlineSize),
                                            (f = b ? b.height : (a[0] || a).blockSize));
                                    }),
                                    (e === b && f === d) || h();
                                });
                            })).observe(c.el)
                            : (e.addEventListener('resize', h),
                                e.addEventListener('orientationchange', i));
                    }),
                        a('destroy', () => {
                            g && e.cancelAnimationFrame(g),
                            f && f.unobserve && c.el && (f.unobserve(c.el), (f = null)),
                                e.removeEventListener('resize', h),
                                e.removeEventListener('orientationchange', i);
                        });
                },
                function (b) {
                    let {swiper: d, extendParams: c, on: a, emit: e} = b,
                        f = [],
                        g = dp(),
                        h = function (c, a) {
                            void 0 === a && (a = {});
                            let b = new (g.MutationObserver || g.WebkitMutationObserver)(
                                (a) => {
                                    if (1 === a.length) return void e('observerUpdate', a[0]);
                                    let b = function () {
                                        e('observerUpdate', a[0]);
                                    };
                                    g.requestAnimationFrame
                                        ? g.requestAnimationFrame(b)
                                        : g.setTimeout(b, 0);
                                }
                            );
                            b.observe(c, {
                                attributes: void 0 === a.attributes || a.attributes,
                                childList: void 0 === a.childList || a.childList,
                                characterData: void 0 === a.characterData || a.characterData,
                            }),
                                f.push(b);
                        };
                    c({observer: !1, observeParents: !1, observeSlideChildren: !1}),
                        a('init', () => {
                            if (d.params.observer) {
                                if (d.params.observeParents) {
                                    let b = d.$el.parents();
                                    for (let a = 0; a < b.length; a += 1) h(b[a]);
                                }
                                h(d.$el[0], {childList: d.params.observeSlideChildren}),
                                    h(d.$wrapperEl[0], {attributes: !1});
                            }
                        }),
                        a('destroy', () => {
                            f.forEach((a) => {
                                a.disconnect();
                            }),
                                f.splice(0, f.length);
                        });
                },
            ]),
            new D('#reviewsSlider', {
                modules: [
                    function (c) {
                        let {swiper: b, extendParams: d, on: a, emit: i} = c;

                        function j(a) {
                            let c;
                            return (
                                a &&
                                ((c = dt(a)),
                                b.params.uniqueNavElements &&
                                'string' == typeof a &&
                                c.length > 1 &&
                                1 === b.$el.find(a).length &&
                                (c = b.$el.find(a))),
                                    c
                            );
                        }

                        function k(a, c) {
                            let d = b.params.navigation;
                            a &&
                            a.length > 0 &&
                            (a[c ? 'addClass' : 'removeClass'](d.disabledClass),
                            a[0] && 'BUTTON' === a[0].tagName && (a[0].disabled = c),
                            b.params.watchOverflow &&
                            b.enabled &&
                            a[b.isLocked ? 'addClass' : 'removeClass'](d.lockClass));
                        }

                        function e() {
                            if (b.params.loop) return;
                            let {$nextEl: a, $prevEl: c} = b.navigation;
                            k(c, b.isBeginning && !b.params.rewind),
                                k(a, b.isEnd && !b.params.rewind);
                        }

                        function l(a) {
                            a.preventDefault(),
                            (!b.isBeginning || b.params.loop || b.params.rewind) &&
                            (b.slidePrev(), i('navigationPrev'));
                        }

                        function m(a) {
                            a.preventDefault(),
                            (!b.isEnd || b.params.loop || b.params.rewind) &&
                            (b.slideNext(), i('navigationNext'));
                        }

                        function f() {
                            let d = b.params.navigation;
                            if (
                                ((b.params.navigation = dS(
                                    b,
                                    b.originalParams.navigation,
                                    b.params.navigation,
                                    {nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev'}
                                )),
                                !d.nextEl && !d.prevEl)
                            )
                                return;
                            let a = j(d.nextEl),
                                c = j(d.prevEl);
                            a && a.length > 0 && a.on('click', m),
                            c && c.length > 0 && c.on('click', l),
                                Object.assign(b.navigation, {
                                    $nextEl: a,
                                    nextEl: a && a[0],
                                    $prevEl: c,
                                    prevEl: c && c[0],
                                }),
                            b.enabled ||
                            (a && a.addClass(d.lockClass), c && c.addClass(d.lockClass));
                        }

                        function g() {
                            let {$nextEl: a, $prevEl: c} = b.navigation;
                            a &&
                            a.length &&
                            (a.off('click', m),
                                a.removeClass(b.params.navigation.disabledClass)),
                            c &&
                            c.length &&
                            (c.off('click', l),
                                c.removeClass(b.params.navigation.disabledClass));
                        }

                        d({
                            navigation: {
                                nextEl: null,
                                prevEl: null,
                                hideOnClick: !1,
                                disabledClass: 'swiper-button-disabled',
                                hiddenClass: 'swiper-button-hidden',
                                lockClass: 'swiper-button-lock',
                                navigationDisabledClass: 'swiper-navigation-disabled',
                            },
                        }),
                            (b.navigation = {
                                nextEl: null,
                                $nextEl: null,
                                prevEl: null,
                                $prevEl: null,
                            }),
                            a('init', () => {
                                !1 === b.params.navigation.enabled ? h() : (f(), e());
                            }),
                            a('toEdge fromEdge lock unlock', () => {
                                e();
                            }),
                            a('destroy', () => {
                                g();
                            }),
                            a('enable disable', () => {
                                let {$nextEl: a, $prevEl: c} = b.navigation;
                                a &&
                                a[b.enabled ? 'removeClass' : 'addClass'](
                                    b.params.navigation.lockClass
                                ),
                                c &&
                                c[b.enabled ? 'removeClass' : 'addClass'](
                                    b.params.navigation.lockClass
                                );
                            }),
                            a('click', (g, f) => {
                                let {$nextEl: a, $prevEl: c} = b.navigation,
                                    d = f.target;
                                if (
                                    b.params.navigation.hideOnClick &&
                                    !dt(d).is(c) &&
                                    !dt(d).is(a)
                                ) {
                                    if (
                                        b.pagination &&
                                        b.params.pagination &&
                                        b.params.pagination.clickable &&
                                        (b.pagination.el === d || b.pagination.el.contains(d))
                                    )
                                        return;
                                    let e;
                                    a
                                        ? (e = a.hasClass(b.params.navigation.hiddenClass))
                                        : c && (e = c.hasClass(b.params.navigation.hiddenClass)),
                                        i(!0 === e ? 'navigationShow' : 'navigationHide'),
                                    a && a.toggleClass(b.params.navigation.hiddenClass),
                                    c && c.toggleClass(b.params.navigation.hiddenClass);
                                }
                            });
                        let h = () => {
                            b.$el.addClass(b.params.navigation.navigationDisabledClass), g();
                        };
                        Object.assign(b.navigation, {
                            enable() {
                                b.$el.removeClass(b.params.navigation.navigationDisabledClass),
                                    f(),
                                    e();
                            },
                            disable: h,
                            update: e,
                            init: f,
                            destroy: g,
                        });
                    },
                    function (d) {
                        let {swiper: c, extendParams: e, on: b, emit: k} = d,
                            a = 'swiper-pagination',
                            l;
                        e({
                            pagination: {
                                el: null,
                                bulletElement: 'span',
                                clickable: !1,
                                hideOnClick: !1,
                                renderBullet: null,
                                renderProgressbar: null,
                                renderFraction: null,
                                renderCustom: null,
                                progressbarOpposite: !1,
                                type: 'bullets',
                                dynamicBullets: !1,
                                dynamicMainBullets: 1,
                                formatFractionCurrent: (a) => a,
                                formatFractionTotal: (a) => a,
                                bulletClass: a + '-bullet',
                                bulletActiveClass: a + '-bullet-active',
                                modifierClass: a + '-',
                                currentClass: a + '-current',
                                totalClass: a + '-total',
                                hiddenClass: a + '-hidden',
                                progressbarFillClass: a + '-progressbar-fill',
                                progressbarOppositeClass: a + '-progressbar-opposite',
                                clickableClass: a + '-clickable',
                                lockClass: a + '-lock',
                                horizontalClass: a + '-horizontal',
                                verticalClass: a + '-vertical',
                                paginationDisabledClass: a + '-disabled',
                            },
                        }),
                            (c.pagination = {el: null, $el: null, bullets: []});
                        let m = 0;

                        function n() {
                            return (
                                !c.params.pagination.el ||
                                !c.pagination.el ||
                                !c.pagination.$el ||
                                0 === c.pagination.$el.length
                            );
                        }

                        function o(d, a) {
                            let {bulletActiveClass: b} = c.params.pagination;
                            d[a]().addClass(`${b}-${a}`)[a]().addClass(`${b}-${a}-${a}`);
                        }

                        function f() {
                            let y = c.rtl,
                                a = c.params.pagination;
                            if (n()) return;
                            let h =
                                    c.virtual && c.params.virtual.enabled
                                        ? c.virtual.slides.length
                                        : c.slides.length,
                                e = c.pagination.$el,
                                d,
                                f = c.params.loop
                                    ? Math.ceil(
                                        (h - 2 * c.loopedSlides) / c.params.slidesPerGroup
                                    )
                                    : c.snapGrid.length;
                            if (
                                (c.params.loop
                                    ? ((d = Math.ceil(
                                        (c.activeIndex - c.loopedSlides) / c.params.slidesPerGroup
                                    )) >
                                    h - 1 - 2 * c.loopedSlides &&
                                    (d -= h - 2 * c.loopedSlides),
                                    d > f - 1 && (d -= f),
                                    d < 0 &&
                                    'bullets' !== c.params.paginationType &&
                                    (d = f + d))
                                    : (d =
                                        void 0 !== c.snapIndex
                                            ? c.snapIndex
                                            : c.activeIndex || 0),
                                'bullets' === a.type &&
                                c.pagination.bullets &&
                                c.pagination.bullets.length > 0)
                            ) {
                                let b = c.pagination.bullets,
                                    g,
                                    i,
                                    q;
                                if (
                                    (a.dynamicBullets &&
                                    ((l = b
                                        .eq(0)
                                        [c.isHorizontal() ? 'outerWidth' : 'outerHeight'](!0)),
                                        e.css(
                                            c.isHorizontal() ? 'width' : 'height',
                                            l * (a.dynamicMainBullets + 4) + 'px'
                                        ),
                                    a.dynamicMainBullets > 1 &&
                                    void 0 !== c.previousIndex &&
                                    ((m += d - (c.previousIndex - c.loopedSlides || 0)) >
                                    a.dynamicMainBullets - 1
                                        ? (m = a.dynamicMainBullets - 1)
                                        : m < 0 && (m = 0)),
                                        (q =
                                            ((i =
                                                    (g = Math.max(d - m, 0)) +
                                                    (Math.min(b.length, a.dynamicMainBullets) - 1)) +
                                                g) /
                                            2)),
                                        b.removeClass(
                                            ['', '-next', '-next-next', '-prev', '-prev-prev', '-main']
                                                .map((b) => `${a.bulletActiveClass}${b}`)
                                                .join(' ')
                                        ),
                                    e.length > 1)
                                )
                                    b.each((e) => {
                                        let b = dt(e),
                                            c = b.index();
                                        c === d && b.addClass(a.bulletActiveClass),
                                        a.dynamicBullets &&
                                        (c >= g &&
                                        c <= i &&
                                        b.addClass(a.bulletActiveClass + '-main'),
                                        c === g && o(b, 'prev'),
                                        c === i && o(b, 'next'));
                                    });
                                else {
                                    let r = b.eq(d),
                                        z = r.index();
                                    if ((r.addClass(a.bulletActiveClass), a.dynamicBullets)) {
                                        let s = b.eq(g),
                                            t = b.eq(i);
                                        for (let j = g; j <= i; j += 1)
                                            b.eq(j).addClass(a.bulletActiveClass + '-main');
                                        if (c.params.loop) {
                                            if (z >= b.length) {
                                                for (let p = a.dynamicMainBullets; p >= 0; p -= 1)
                                                    b.eq(b.length - p).addClass(
                                                        a.bulletActiveClass + '-main'
                                                    );
                                                b.eq(b.length - a.dynamicMainBullets - 1).addClass(
                                                    a.bulletActiveClass + '-prev'
                                                );
                                            } else o(s, 'prev'), o(t, 'next');
                                        } else o(s, 'prev'), o(t, 'next');
                                    }
                                }
                                if (a.dynamicBullets) {
                                    let A =
                                            (l * Math.min(b.length, a.dynamicMainBullets + 4) - l) /
                                            2 -
                                            q * l,
                                        B = y ? 'right' : 'left';
                                    b.css(c.isHorizontal() ? B : 'top', A + 'px');
                                }
                            }
                            if (
                                ('fraction' === a.type &&
                                (e
                                    .find(dT(a.currentClass))
                                    .text(a.formatFractionCurrent(d + 1)),
                                    e.find(dT(a.totalClass)).text(a.formatFractionTotal(f))),
                                'progressbar' === a.type)
                            ) {
                                let u;
                                u = a.progressbarOpposite
                                    ? c.isHorizontal()
                                        ? 'vertical'
                                        : 'horizontal'
                                    : c.isHorizontal()
                                        ? 'horizontal'
                                        : 'vertical';
                                let v = (d + 1) / f,
                                    w = 1,
                                    x = 1;
                                'horizontal' === u ? (w = v) : (x = v),
                                    e
                                        .find(dT(a.progressbarFillClass))
                                        .transform(`translate3d(0,0,0) scaleX(${w}) scaleY(${x})`)
                                        .transition(c.params.speed);
                            }
                            'custom' === a.type && a.renderCustom
                                ? (e.html(a.renderCustom(c, d + 1, f)),
                                    k('paginationRender', e[0]))
                                : k('paginationUpdate', e[0]),
                            c.params.watchOverflow &&
                            c.enabled &&
                            e[c.isLocked ? 'addClass' : 'removeClass'](a.lockClass);
                        }

                        function g() {
                            let a = c.params.pagination;
                            if (n()) return;
                            let e =
                                    c.virtual && c.params.virtual.enabled
                                        ? c.virtual.slides.length
                                        : c.slides.length,
                                d = c.pagination.$el,
                                b = '';
                            if ('bullets' === a.type) {
                                let f = c.params.loop
                                    ? Math.ceil(
                                        (e - 2 * c.loopedSlides) / c.params.slidesPerGroup
                                    )
                                    : c.snapGrid.length;
                                c.params.freeMode &&
                                c.params.freeMode.enabled &&
                                !c.params.loop &&
                                f > e &&
                                (f = e);
                                for (let g = 0; g < f; g += 1)
                                    a.renderBullet
                                        ? (b += a.renderBullet.call(c, g, a.bulletClass))
                                        : (b += `<${a.bulletElement} class="${a.bulletClass}"></${a.bulletElement}>`);
                                d.html(b), (c.pagination.bullets = d.find(dT(a.bulletClass)));
                            }
                            'fraction' === a.type &&
                            ((b = a.renderFraction
                                ? a.renderFraction.call(c, a.currentClass, a.totalClass)
                                : `<span class="${a.currentClass}"></span> / <span class="${a.totalClass}"></span>`),
                                d.html(b)),
                            'progressbar' === a.type &&
                            ((b = a.renderProgressbar
                                ? a.renderProgressbar.call(c, a.progressbarFillClass)
                                : `<span class="${a.progressbarFillClass}"></span>`),
                                d.html(b)),
                            'custom' !== a.type &&
                            k('paginationRender', c.pagination.$el[0]);
                        }

                        function h() {
                            c.params.pagination = dS(
                                c,
                                c.originalParams.pagination,
                                c.params.pagination,
                                {el: 'swiper-pagination'}
                            );
                            let a = c.params.pagination;
                            if (!a.el) return;
                            let b = dt(a.el);
                            0 !== b.length &&
                            (c.params.uniqueNavElements &&
                            'string' == typeof a.el &&
                            b.length > 1 &&
                            (b = c.$el.find(a.el)).length > 1 &&
                            (b = b.filter((a) => dt(a).parents('.swiper')[0] === c.el)),
                            'bullets' === a.type &&
                            a.clickable &&
                            b.addClass(a.clickableClass),
                                b.addClass(a.modifierClass + a.type),
                                b.addClass(
                                    c.isHorizontal() ? a.horizontalClass : a.verticalClass
                                ),
                            'bullets' === a.type &&
                            a.dynamicBullets &&
                            (b.addClass(`${a.modifierClass}${a.type}-dynamic`),
                                (m = 0),
                            a.dynamicMainBullets < 1 && (a.dynamicMainBullets = 1)),
                            'progressbar' === a.type &&
                            a.progressbarOpposite &&
                            b.addClass(a.progressbarOppositeClass),
                            a.clickable &&
                            b.on('click', dT(a.bulletClass), function (b) {
                                b.preventDefault();
                                let a = dt(this).index() * c.params.slidesPerGroup;
                                c.params.loop && (a += c.loopedSlides), c.slideTo(a);
                            }),
                                Object.assign(c.pagination, {$el: b, el: b[0]}),
                            c.enabled || b.addClass(a.lockClass));
                        }

                        function i() {
                            let a = c.params.pagination;
                            if (n()) return;
                            let b = c.pagination.$el;
                            b.removeClass(a.hiddenClass),
                                b.removeClass(a.modifierClass + a.type),
                                b.removeClass(
                                    c.isHorizontal() ? a.horizontalClass : a.verticalClass
                                ),
                            c.pagination.bullets &&
                            c.pagination.bullets.removeClass &&
                            c.pagination.bullets.removeClass(a.bulletActiveClass),
                            a.clickable && b.off('click', dT(a.bulletClass));
                        }

                        b('init', () => {
                            !1 === c.params.pagination.enabled ? j() : (h(), g(), f());
                        }),
                            b('activeIndexChange', () => {
                                (c.params.loop || void 0 === c.snapIndex) && f();
                            }),
                            b('snapIndexChange', () => {
                                c.params.loop || f();
                            }),
                            b('slidesLengthChange', () => {
                                c.params.loop && (g(), f());
                            }),
                            b('snapGridLengthChange', () => {
                                c.params.loop || (g(), f());
                            }),
                            b('destroy', () => {
                                i();
                            }),
                            b('enable disable', () => {
                                let {$el: a} = c.pagination;
                                a &&
                                a[c.enabled ? 'removeClass' : 'addClass'](
                                    c.params.pagination.lockClass
                                );
                            }),
                            b('lock unlock', () => {
                                f();
                            }),
                            b('click', (e, d) => {
                                let b = d.target,
                                    {$el: a} = c.pagination;
                                if (
                                    c.params.pagination.el &&
                                    c.params.pagination.hideOnClick &&
                                    a &&
                                    a.length > 0 &&
                                    !dt(b).hasClass(c.params.pagination.bulletClass)
                                ) {
                                    if (
                                        c.navigation &&
                                        ((c.navigation.nextEl && b === c.navigation.nextEl) ||
                                            (c.navigation.prevEl && b === c.navigation.prevEl))
                                    )
                                        return;
                                    k(
                                        !0 === a.hasClass(c.params.pagination.hiddenClass)
                                            ? 'paginationShow'
                                            : 'paginationHide'
                                    ),
                                        a.toggleClass(c.params.pagination.hiddenClass);
                                }
                            });
                        let j = () => {
                            c.$el.addClass(c.params.pagination.paginationDisabledClass),
                            c.pagination.$el &&
                            c.pagination.$el.addClass(
                                c.params.pagination.paginationDisabledClass
                            ),
                                i();
                        };
                        Object.assign(c.pagination, {
                            enable() {
                                c.$el.removeClass(c.params.pagination.paginationDisabledClass),
                                c.pagination.$el &&
                                c.pagination.$el.removeClass(
                                    c.params.pagination.paginationDisabledClass
                                ),
                                    h(),
                                    g(),
                                    f();
                            },
                            disable: j,
                            render: g,
                            update: f,
                            init: h,
                            destroy: i,
                        });
                    },
                ],
                navigation: {
                    nextEl: '#reviewsNextSlide',
                    prevEl: '#reviewsPrevSlide',
                },
            });
    },
]);

