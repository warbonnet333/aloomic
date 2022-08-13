import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles

// init Swiper:
const swiper = new Swiper('#reviewsSlider', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  // Navigation arrows
  navigation: {
    nextEl: '#reviewsNextSlide',
    prevEl: '#reviewsPrevSlide',
  },
});