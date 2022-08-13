export default class HeaderController {
    constructor(scrollPos = 0, headerActiveClass = 'header--active', headerDisabledClass = 'header--active-disabled') {
        this.header = document.getElementById('header')
        
        this.headerActiveClass = headerActiveClass
        this.headerDisabledClass = headerDisabledClass

        this.headerTypeTop = 'top'
        this.headerTypeScroll = 'scroll'

        // First page postition
        this.prevScrollPos = scrollPos

        this.headerType = 'top'
    }

    handleScroll = () => {
        // On scoll
        document.addEventListener('scroll', () => {
            // console.log('scroll')
            if (window.scrollY > 0 && this.prevScrollPos > window.scrollY) this.showHeader()
            else if (window.scrollY > 0 && this.prevScrollPos < window.scrollY) this.hideHeader()
            else this.headerToTopPos()

            this.prevScrollPos = window.scrollY
        })
    }

    handlePageLoaded = () => {
        // When page loaded
        document.addEventListener('DOMContentLoaded', () => {
            if (window.scrollY > 0) this.showHeader()
        })
    }

    showHeader = () => {
        this.header.classList.add(this.headerActiveClass)
        this.header.classList.remove(this.headerDisabledClass)

        this.headerType = this.headerTypeScroll
    }
    
    hideHeader = () => {
        this.header.classList.add(this.headerDisabledClass)
    }
    
    headerToTopPos = () => {
        this.header.classList.remove(this.headerActiveClass)
        this.header.classList.remove(this.headerDisabledClass)

        this.headerType = this.headerTypeTop
    }

    /**
     * Get current header type
     */
    getHeaderType = () => {
        return this.headerType
    }

    /**
     * Get scroll position
     */
    getScrollPosition = () => {
        return this.scrollPos
    }
}