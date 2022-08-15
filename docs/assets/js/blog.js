function blogPage() {
    const paginationPrev = document.querySelector('.pagination-list__prev');
    const paginationNext = document.querySelector('.pagination-list__next');
    const paginationItems = document.querySelectorAll('.pagination-list__item')
    const currentString = document.querySelector('.js-current-page')
    const pageCount = paginationItems.length;

    if(!pageCount) {
        return;
    }

    pageCount === 1 && document.querySelector('.pagination').remove();
    paginationPrev.addEventListener('click', () => onPaginationClick());
    paginationNext.addEventListener('click', () => onPaginationClick(true));
    paginationItems.forEach(item => item.addEventListener('click', onPaginationItemClick))

    function updateArrows(nextPage) {
        if (nextPage <= 1) {
            paginationPrev.classList.add('hidden');
            paginationNext.classList.remove('hidden');
        } else if (nextPage >= pageCount) {
            paginationPrev.classList.remove('hidden');
            paginationNext.classList.add('hidden');
        } else {
            paginationPrev.classList.remove('hidden');
            paginationNext.classList.remove('hidden');
        }
        console.log(currentString);
        currentString.innerHTML = nextPage;
    }

    function onPaginationClick(isNextClick = false) {
        const curPage = document.querySelector('.pagination-list__item.active');
        if (!curPage) return;
        curPage.classList.remove('active');

        let nextPage = +curPage.dataset.pagItem;
        isNextClick ? ++nextPage : --nextPage;
        updateArrows(nextPage);

        console.log('UPDATE ITEMS');

        const nextActiveElement = document.querySelector(`[data-pag-item="${nextPage}"]`);
        nextActiveElement && nextActiveElement.classList.add('active');
    }

    function onPaginationItemClick(e) {
        const btn = e.currentTarget;
        if (btn.classList.contains('active')) return;

        const nextPage = +btn.dataset.pagItem;
        updateArrows(nextPage);

        document.querySelector('.pagination-list__item.active')?.classList.remove('active');
        btn.classList.add('active');
    }

}

window.onload = blogPage;