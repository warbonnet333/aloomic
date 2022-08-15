$(document).ready(function(){
    $('#best-works').slick({
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        adaptiveHeight: true
    });
});


let weLoveCreativeText = document.querySelector(".we-love-creative");
let weLoveCreativeImg = document.querySelector(".we-love-bg--creative");
let weLoveBetterText = document.querySelector(".we-love-better");
let weLoveBetterImg = document.querySelector(".we-love-bg--better");
let weLoveReasonableText = document.querySelector(".we-love-reasonable");
let weLoveReasonableImg = document.querySelector(".we-love-bg--reasonable");
let weLoveBusinessText = document.querySelector(".we-love-business");
let weLoveBusinessImg = document.querySelector(".we-love-bg--business");


weLoveCreativeText.addEventListener("mouseover", function() {
    weLoveCreativeImg.classList.add('hover');
    weLoveCreativeText.classList.add('hover');
});
weLoveCreativeText.addEventListener("mouseleave", function() {
    weLoveCreativeImg.classList.remove('hover')
    weLoveCreativeText.classList.remove('hover')
});
weLoveBetterText.addEventListener("mouseover", function() {
    weLoveBetterImg.classList.add('hover');
    weLoveBetterText.classList.add('hover');
});
weLoveBetterText.addEventListener("mouseleave", function() {
    weLoveBetterImg.classList.remove('hover')
    weLoveBetterText.classList.remove('hover')
});
weLoveReasonableText.addEventListener("mouseover", function() {
    weLoveReasonableImg.classList.add('hover');
    weLoveReasonableText.classList.add('hover');
});
weLoveReasonableText.addEventListener("mouseleave", function() {
    weLoveReasonableImg.classList.remove('hover')
    weLoveReasonableText.classList.remove('hover')
});
weLoveBusinessText.addEventListener("mouseover", function() {
    weLoveBusinessImg.classList.add('hover');
    weLoveBusinessText.classList.add('hover');
});
weLoveBusinessText.addEventListener("mouseleave", function() {
    weLoveBusinessImg.classList.remove('hover')
    weLoveBusinessText.classList.remove('hover')
});


let tl = gsap.timeline();
tl.from(".fade-in-1", {ease: "slowMo", y: 60, opacity: 0, duration: .9});
tl.from(".fade-in-2", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");
tl.from(".fade-in-3", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");
tl.from(".fade-in-4", {ease: "slowMo", y: 20, opacity: 0, duration: .9}, ">0.2");
tl.from(".fade-in-5", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07>");
tl.from(".fade-in-6", {ease: "slowMo", y: 20, opacity: 0, duration: .9}, "<0.07>");

gsap.fromTo("#WWDo0", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: '30px center',
            end: '130px center',
            scrub: true,
        }}
);
gsap.fromTo("#WWDo1", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: 'top center+=260px',
            end: 'top center+=160px',
            scrub: true,
        }}
);
gsap.fromTo("#WWDo2", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: 'top center+=240px',
            end: 'top center+=140px',
            scrub: true,
        }}
);
gsap.fromTo("#WWDo3", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: 'top center+=220px',
            end: 'top center+=120px',
            scrub: true,
        }}
);
gsap.fromTo("#WWDo4", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: 'top center+=200px',
            end: 'top center+=100px',
            scrub: true,
        }}
);
gsap.fromTo("#WWDo5", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#WWDo1',
            start: 'top center+=180px',
            end: 'top center+=80px',
            scrub: true,
        }}
);


gsap.fromTo("#weCreate1", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#weCreate1',
            start: 'top center+=260px',
            end: 'top center+=160px',
            scrub: true,
        }}
);
gsap.fromTo("#weCreate2", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#weCreate1',
            start: 'top center+=240px',
            end: 'top center+=140px',
            scrub: true,
        }}
);
gsap.fromTo("#weCreate3", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#weCreate1',
            start: 'top center+=220px',
            end: 'top center+=120px',
            scrub: true,
        }}
);
gsap.fromTo("#weCreate4", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#weCreate1',
            start: 'top center+=200px',
            end: 'top center+=100px',
            scrub: true,
        }}
);

/*

let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-8, 8); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
    onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
        }
    }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {transformOrigin: "right center", force3D: true});
*/
