let tl = gsap.timeline();
tl.from(".fade-in-1", {ease: "slowMo", y: 60, opacity: 0, duration: .9});
tl.from(".fade-in-2", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");
tl.from(".fade-in-3", {ease: "slowMo", y: 60, opacity: 0, duration: .9}, "<0.07");

$(document).ready(function(){
    $('#blog-images-slide').slick({
        autoplay: true,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        dots: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            }
        ]
    });
});

