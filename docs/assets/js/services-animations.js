
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
tl.from(".fade-in-2", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, ".2");
tl.from(".fade-in-3", {ease: "slowMo", y: 20, opacity: 0, duration: .9}, "0.45");


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

gsap.fromTo("#processRD0", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: '30px center',
            end: '130px center',
            scrub: true,
        }}
);
gsap.fromTo("#processRD1", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: 'top center+=260px',
            end: 'top center+=160px',
            scrub: true,
        }}
);
gsap.fromTo("#processRD2", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: 'top center+=240px',
            end: 'top center+=140px',
            scrub: true,
        }}
);
gsap.fromTo("#processRD3", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: 'top center+=220px',
            end: 'top center+=120px',
            scrub: true,
        }}
);
gsap.fromTo("#processRD4", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: 'top center+=200px',
            end: 'top center+=100px',
            scrub: true,
        }}
);
gsap.fromTo("#processRD5", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#processRD1',
            start: 'top center+=180px',
            end: 'top center+=80px',
            scrub: true,
        }}
);


gsap.fromTo("#RW1", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#RW1',
            start: 'top center+=260px',
            end: 'top center+=160px',
            scrub: true,
        }}
);
gsap.fromTo("#RW2", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#RW1',
            start: 'top center+=240px',
            end: 'top center+=140px',
            scrub: true,
        }}
);


gsap.fromTo("#OS1", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#OS1',
            start: 'top center+=260px',
            end: 'top center+=160px',
            scrub: true,
        }}
);
gsap.fromTo("#OS2", {
        y: "50",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#OS1',
            start: 'top center+=240px',
            end: 'top center+=140px',
            scrub: true,
        }}
);
