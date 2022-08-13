// ADVANTAGES TABS
export default class Tabs {
    constructor () {
        this.inProcess = false;
        this.activeAdvTab = document.querySelector('.advantages-tabs__item--active');
        this.advActiveLine = document.querySelector('.advantages-tabs__line-active');
    }

    setActiveLinePosition = (tabToActivate = this.activeAdvTab) => {
        this.advActiveLine.css('width', jQuery(tabToActivate).width());
        const leftOffset = jQuery(tabToActivate).position().left;
        this.advActiveLine.css('transform', `translateX(${leftOffset}px)`); 
    }

    setActiveClassToSelectedTab = tabToActivate => {
        jQuery('.advantages-tabs__item--active').removeClass('advantages-tabs__item--active');
        jQuery(tabToActivate).addClass('advantages-tabs__item--active');
    }

    disableTabContent = () => {
        jQuery('.advantages__content-item--active').fadeOut();
        jQuery('.advantages__content-item--active').removeClass('advantages__content-item--active');
    }

    showNewTabContent = tabContentToActivate => {
        jQuery(tabContentToActivate).fadeIn();
        jQuery(tabContentToActivate).addClass('advantages__content-item--active');
        // Set wrapper height after tab content changed
        jQuery('.advantages__content-inner').height(jQuery(tabContentToActivate).height())
        this.inProcess = false
    }

    tabActivate = tabToActivate => {
        if (!this.inProcess) {
            this.inProcess = true
    
            const tabIdPartToActivate = jQuery(tabToActivate).prop('hash');
            
            // Set active class to current tab
            this.setActiveClassToSelectedTab(tabToActivate)
    
            // Set init active line position
            this.setActiveLinePosition(tabToActivate)
    
            // Tab content class add/remove
            // tab content hide/show
            this.disableTabContent()
    
            const tabContentToActivate = document.getElementById(`advantage-${tabIdPartToActivate.substr(1)}`)
    
            setTimeout(() => this.showNewTabContent(tabContentToActivate), 500);
        }
    }
}