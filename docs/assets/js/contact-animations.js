let tl = gsap.timeline();
tl.from(".fade-in-1", {ease: "slowMo", y: 60, opacity: 0, duration: .9});
tl.from(".fade-in-2", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");
tl.from(".fade-in-3", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");
tl.from(".fade-in-4", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.3");

gsap.fromTo("#ourClient1",{
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#ourClient1',
            start: 'top center+=160px',
            end: 'top center+=60px',
            scrub: true,
        }}
);
gsap.fromTo("#ourClient2", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#ourClient1',
            start: 'top center+=140px',
            end: 'top center+=40px',
            scrub: true,
        }}
);
gsap.fromTo("#ourClient3", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#ourClient1',
            start: 'top center+=120px',
            end: 'top center+=20px',
            scrub: true,
        }}
);
gsap.fromTo("#ourClient4", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#ourClient1',
            start: 'top center+=100px',
            end: 'top center',
            scrub: true,
        }}
);
