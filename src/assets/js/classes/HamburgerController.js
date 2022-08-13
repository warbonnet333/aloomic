// import HeaderController from "./HeaderController"
import MobileNavController from './MobileNavController'

export default class HamburgerController {
    constructor() {
        
        // Elements
        this.elHamburgerBtn = document.getElementById('hamburger')
        this.elHeader = document.getElementById('header')
        
        // Class names
        this.classHeaderMobNavOpening = 'header--mobile-nav-opening'
        this.classHeaderMobNavOpened = 'header--mobile-nav-opened'
        
        this.hamburgerActive = 'is-active'
        
        // State
        this.menuIsOpen = false
        this.headerTypeScroll = false
        
        // Hanlders
        this.handleHamburgerClick()

        // this.HeaderController = new HeaderController(this.elHeader)
    }

    /**
     * Handle click on hamburger button
     */
    handleHamburgerClick = () => {
        this.elHamburgerBtn.addEventListener('click', () => {
            if (!this.menuIsOpen) {
                this.elHeader.classList.remove('header--active')

                this.headerModChangeToMobNav()
                this.hamburgerMenuActivate()
                MobileNavController.openMenu()
            } else {
                this.headerModChangeToClear()
                this.hamburgerMenuDisabeling()
                MobileNavController.closeMenu()

                window.scrollY > 0 && (this.elHeader.classList.add('header--active'))
            }
        })
    }

    /**
     * Change menu mod to "Mobile nav is opened"
     */
    headerModChangeToMobNav = () => {
        this.elHeader.classList.add(this.classHeaderMobNavOpening)
        
        setTimeout(() => {
            this.elHeader.classList.add(this.classHeaderMobNavOpened)
            this.elHeader.classList.remove(this.classHeaderMobNavOpening)

            this.menuIsOpen = true
        }, 300)
    }

    /**
     * Change menu mod to "Mobile nav is closed"
     */
    headerModChangeToClear = () => {
        this.elHeader.classList.add(this.classHeaderMobNavOpening)
        
        setTimeout(() => {
            this.elHeader.classList.remove(this.classHeaderMobNavOpened)
            this.elHeader.classList.remove(this.classHeaderMobNavOpening)

            this.menuIsOpen = false
        }, 300)
    }

    /**
     * Hamburger menu is active
     */
    hamburgerMenuActivate = () => {
        this.elHamburgerBtn.classList.add(this.hamburgerActive)
    }

    /**
     * Hamburger menu disabeling
     */
    hamburgerMenuDisabeling = () => {
        this.elHamburgerBtn.classList.remove(this.hamburgerActive)
    }
}