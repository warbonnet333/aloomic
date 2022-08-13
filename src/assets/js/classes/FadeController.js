export default class FadeController {
    static fadeIn = el => {
        el.classList.add('fade--first')
        setTimeout(() => {
            el.classList.add('fade--second')
        }, 100)
    }

    static fadeOut = el => {
        el.classList.remove('fade--second')
        setTimeout(() => {
            el.classList.remove('fade--first')
        }, 600)
    }
}