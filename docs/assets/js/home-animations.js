let weLoveCreativeText = document.querySelector(".we-love-creative");
let weLoveCreativeImg = document.querySelector(".we-love-bg--creative");
let weLoveBetterText = document.querySelector(".we-love-better");
let weLoveBetterImg = document.querySelector(".we-love-bg--better");
let weLoveReasonableText = document.querySelector(".we-love-reasonable");
let weLoveReasonableImg = document.querySelector(".we-love-bg--reasonable");
let weLoveBusinessText = document.querySelector(".we-love-business");
let weLoveBusinessImg = document.querySelector(".we-love-bg--business");
weLoveCreativeText.addEventListener("mouseover", function () {
  weLoveCreativeImg.classList.add("hover");
  weLoveCreativeText.classList.add("hover");
});
weLoveCreativeText.addEventListener("mouseleave", function () {
  weLoveCreativeImg.classList.remove("hover");
  weLoveCreativeText.classList.remove("hover");
});
weLoveBetterText.addEventListener("mouseover", function () {
  weLoveBetterImg.classList.add("hover");
  weLoveBetterText.classList.add("hover");
});
weLoveBetterText.addEventListener("mouseleave", function () {
  weLoveBetterImg.classList.remove("hover");
  weLoveBetterText.classList.remove("hover");
});
weLoveReasonableText.addEventListener("mouseover", function () {
  weLoveReasonableImg.classList.add("hover");
  weLoveReasonableText.classList.add("hover");
});
weLoveReasonableText.addEventListener("mouseleave", function () {
  weLoveReasonableImg.classList.remove("hover");
  weLoveReasonableText.classList.remove("hover");
});
weLoveBusinessText.addEventListener("mouseover", function () {
  weLoveBusinessImg.classList.add("hover");
  weLoveBusinessText.classList.add("hover");
});
weLoveBusinessText.addEventListener("mouseleave", function () {
  weLoveBusinessImg.classList.remove("hover");
  weLoveBusinessText.classList.remove("hover");
});
$(document).ready(function () {
  $("#images-slide").slick({
    /* autoplay: true,*/ arrows: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  });
  $("#slider-reviews").slick({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});

let tl = gsap.timeline();

tl.from(".fade-in-1", { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 });
tl.from(
  ".fade-in-2",
  { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 },
  "<0.07"
);
tl.from(
  ".fade-in-3",
  { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 },
  "<0.07"
);
tl.from(
  ".fade-in-4",
  { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 },
  "<0.3"
);
tl.from(
  ".fade-in-5",
  { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 },
  "<0.07"
);
tl.from(
  ".fade-in-6",
  { ease: "slowMo", y: 60, opacity: 0, duration: 0.9 },
  "<0.07"
);
gsap.to("#headingFadeOut", {
  opacity: 0,
  scale: 0.4,

  scrollTrigger: {
    trigger: ".video-cards-section",
    start: "top bottom",
    end: "550px center",
    // pin: "#headingFadeOut",
    scrub: true,
  },
});
gsap.to("#videoCardLeft", {
  x: "0",
  scrollTrigger: {
    trigger: "#videoCardLeft",
    start: "290px center",
    end: "bottom center",
    scrub: true,
    pin: true,
  },
});
gsap.to("#videoCardRight", {
  x: "0",
  scrollTrigger: {
    trigger: "#videoCardRight",
    start: "290px center",
    end: "bottom center",
    scrub: true,
    pin: true,
  },
});
gsap.fromTo(
  "#woShowreel0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#woShowreel1",
      start: "180px bottom",
      end: "280px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#woShowreel1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#woShowreel1",
      start: "200px bottom",
      end: "300px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#woShowreel2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#woShowreel1",
      start: "220px bottom",
      end: "320px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#woShowreel3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#woShowreel1",
      start: "240px bottom",
      end: "340px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#ourClient0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#ourClient1",
      start: "180px bottom",
      end: "280px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#ourClient1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#ourClient1",
      start: "200px bottom",
      end: "300px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#ourClient2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#ourClient1",
      start: "220px bottom",
      end: "320px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#ourClient3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#ourClient1",
      start: "240px bottom",
      end: "340px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#ourClient4",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#ourClient1",
      start: "400px bottom",
      end: "540px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "30px center",
      end: "130px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "50px center",
      end: "150px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "70px center",
      end: "170px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "90px center",
      end: "190px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo4",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "120px center",
      end: "220px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WWDo5",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WWDo1",
      start: "150px center",
      end: "250px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WCsay0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WCsay1",
      start: "230px bottom",
      end: "330px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WCsay1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WCsay1",
      start: "250px bottom",
      end: "350px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WCsay2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WCsay1",
      start: "270px bottom",
      end: "370px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WCsay3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WCsay1",
      start: "290px bottom",
      end: "390px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#WCsay4",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#WCsay1",
      start: "320px bottom",
      end: "420px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#COurBlog0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#COurBlog1",
      start: "230px bottom",
      end: "330px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#COurBlog1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#COurBlog1",
      start: "250px bottom",
      end: "350px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#COurBlog2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#COurBlog1",
      start: "270px bottom",
      end: "370px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#COurBlog3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#COurBlog1",
      start: "290px bottom",
      end: "390px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#COurBlog4",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: "#COurBlog1",
      start: "320px bottom",
      end: "420px bottom",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak0",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "800px center",
      end: "900px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak1",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "820px center",
      end: "920px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak2",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "840px center",
      end: "940px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak3",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "860px center",
      end: "960px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak4",
  { y: "50", opacity: "0", backgroundColor: "red" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "880px center",
      end: "980px center",
      scrub: true,
    },
  }
);
gsap.fromTo(
  "#LetsSpeak5",
  { y: "50", opacity: "0" },
  {
    y: "0",
    opacity: "1",
    scrollTrigger: {
      trigger: ".check-bolg-section",
      start: "900px center",
      end: "1000px center",
      scrub: true,
    },
  }
);
$(function () {
  if (window.innerWidth < 460) {
    document
      .getElementById("videoCardRight")
      .classList.remove("video-card-right");
  }
});
window.onresize = function () {
  if (window.innerWidth < 460) {
    document
      .getElementById("videoCardRight")
      .classList.remove("video-card-right");
  }
};
gsap.to("body", {
  background: "white",
  scrollTrigger: {
    trigger: ".client-section",
    start: "top center",
    end: "200px center",
    scrub: true,
    toggleActions: "play pause reset none",
  },
});
gsap.to("body", {
  background: "black",
  scrollTrigger: {
    trigger: ".what-we-do",
    start: "300px center",
    end: "500px center",
    scrub: true,
    toggleActions: "play pause resume reset",
  },
});
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
  /* fast*/ clamp = gsap.utils.clamp(-8, 8);
/* don't let the skew go beyond 20 degrees.*/ ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    /* only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.*/ if (
      Math.abs(skew) > Math.abs(proxy.skew)
    ) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});
/* make the right edge "stick" to the scroll bar. force3D: true improves performance*/ gsap.set(
  ".skewElem",
  { transformOrigin: "right center", force3D: true }
);
