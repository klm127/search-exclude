import { dom } from "../utility/dom";

const TEST_NAV_LAST_STATE_KEY = "TEST-NAV-LAST"

/**
 * TestNav handles navigation buttons for the UI Testing page.
 * 
 * It populates a nav bar across the top of the page for each testing view.
 * Click a button shows that view and hides others.
 * 
 * It is simple to add a new view, just call TestNav.addNav with the name you want on the button and the element containing the window you want to hide.
 */
export class TestNav {
    el: HTMLElement;
    els: Set<HTMLElement>
    links: Map<string, [HTMLButtonElement, HTMLElement, string]>
    buts: Set<HTMLButtonElement>
    constructor() {
        this.el = dom.el("nav")
        this.els = new Set()
        this.links = new Map()
    }
    addNav(name:string, elToShowHide:HTMLElement) {
        let but = dom.button(name)
        let originalDisplay = elToShowHide.style.display
        elToShowHide.style.display = "none"
        this.els.add(elToShowHide)
        this.links.set(name, [but, elToShowHide, originalDisplay])
        let listnr = () => {
            this.selectNav(name)
        }
        but.addEventListener("click", listnr.bind(this))
        this.el.append(but)
    }

    hideAll() {
        for(let [name, els] of this.links.entries()) {
            let [but, window, originalDisplay] = els
            but.disabled = false
            window.style.display = "none"
        }
    }

    setFromLocal() {
        let last = localStorage.getItem(TEST_NAV_LAST_STATE_KEY)
        if(this.links.has(last)) {
            this.selectNav(last)
        }
    }

    selectNav(nameString:string) {
        this.hideAll()
        let [but, window, originalDisplay] = this.links.get(nameString)
        but.disabled = true
        window.style.display = originalDisplay
        localStorage.setItem(TEST_NAV_LAST_STATE_KEY, nameString)
    }
}