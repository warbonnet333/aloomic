let tl = gsap.timeline();
tl.from('.fade-in-1', { ease: 'slowMo', y: 60, opacity: 0, duration: 0.9 });
tl.from(
  '.fade-in-2',
  { ease: 'slowMo', y: 60, opacity: 0, duration: 0.9 },
  '<0.07'
);
tl.from(
  '.fade-in-3',
  { ease: 'slowMo', y: 60, opacity: 0, duration: 0.9 },
  '<0.07'
);
tl.from(
  '.fade-in-4',
  { ease: 'slowMo', y: 60, opacity: 0, duration: 0.9 },
  '<0.3'
);
tl.from(
  '.fade-in-5',
  { ease: 'slowMo', y: 60, opacity: 0, duration: 0.9 },
  '<0.07'
);
tl.from(
  '.fade-in-6',
  { ease: 'slowMo', y: 20, opacity: 0, duration: 0.9 },
  '1'
);
gsap.fromTo(
  '.webDev1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDev1',
      start: '200px bottom',
      end: '300px bottom',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDev2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDev1',
      start: '230px bottom',
      end: '330px bottom',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDev3',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDev1',
      start: '360px bottom',
      end: '460px bottom',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDes1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDes1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDes2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDes1',
      start: 'top center+=180px',
      end: 'top center+=80px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDes3',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDes1',
      start: 'top center+=160px',
      end: 'top center+=60px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDes4',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDes1',
      start: 'top center+=140px',
      end: 'top center+=40px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.webDes5',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.webDes1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.mobDev1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.mobDev1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.mobDev2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.mobDev1',
      start: 'top center+=180px',
      end: 'top center+=80px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.mobDev3',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.mobDev1',
      start: 'top center+=160px',
      end: 'top center+=60px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.mobDev4',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.mobDev1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.branding1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.branding1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.branding2',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.branding1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.dMarketing1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.dMarketing1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.dMarketing2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.dMarketing1',
      start: 'top center+=170px',
      end: 'top center+=70px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.dMarketing3',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.dMarketing1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.UX1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.UX1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.UX2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.UX1',
      start: 'top center+=180px',
      end: 'top center+=80px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.UX3',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.UX1',
      start: 'top center+=160px',
      end: 'top center+=60px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.UX4',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.UX1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.aReality1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.aReality1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.aReality2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.aReality1',
      start: 'top center+=170px',
      end: 'top center+=70px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.aReality3',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.aReality1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.supportMain1',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.supportMain1',
      start: 'top center+=200px',
      end: 'top center+=100px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.supportMain2',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.supportMain1',
      start: 'top center+=180px',
      end: 'top center+=80px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.supportMain3',
  { y: '100', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.supportMain1',
      start: 'top center+=160px',
      end: 'top center+=60px',
      scrub: true,
    },
  }
);
gsap.fromTo(
  '.supportMain4',
  { y: '20', opacity: '0' },
  {
    y: '0',
    opacity: '1',
    scrollTrigger: {
      trigger: '.supportMain1',
      start: 'top center+=100px',
      end: 'top center+=10px',
      scrub: true,
    },
  }
);
