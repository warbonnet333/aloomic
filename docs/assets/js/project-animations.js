


gsap.fromTo("#artGal1",{
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#artGal1',
            start: 'top center+=60px',
            end: 'top center-=40px',
            scrub: true,
        }}
);
gsap.fromTo("#artGal2", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#artGal1',
            start: 'top center+=40px',
            end: 'top center-=60px',
            scrub: true,
        }}
);
gsap.fromTo("#artGal3", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#artGal1',
            start: 'top center+=20px',
            end: 'top center-=80px',
            scrub: true,
        }}
);
gsap.fromTo("#artGal4", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#artGal1',
            start: 'top center',
            end: 'top center-=100px',
            scrub: true,
        }}
);
gsap.fromTo("#artGal5", {
        y: "20",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#artGal1',
            start: 'top center-=20px',
            end: 'top center-=120px',
            scrub: true,
        }}
);


gsap.fromTo("#projAbout1",{
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#projAbout1',
            start: 'top center+=60px',
            end: 'top center-=40px',
            scrub: true,
        }}
);
gsap.fromTo("#projAbout2", {
        y: "100",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#projAbout1',
            start: 'top center+=40px',
            end: 'top center-=60px',
            scrub: true,
        }}
);
gsap.fromTo("#projAbout3", {
        y: "20",
        opacity: "0",
    },
    {
        y: "0",
        opacity: "1",
        scrollTrigger: {
            trigger: '#projAbout1',
            start: 'top center+=20px',
            end: 'top center-=80px',
            scrub: true,
        }}
);
