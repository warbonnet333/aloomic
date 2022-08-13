const elMobileNav = document.getElementById('mobileNav')

const clsMobileNavActive = 'mobile-nav--active'

export default class MobileNavController {
    static openMenu = () => {
        elMobileNav.classList.add(clsMobileNavActive)
    }

    static closeMenu = () => {
        elMobileNav.classList.remove(clsMobileNavActive)
    }
}