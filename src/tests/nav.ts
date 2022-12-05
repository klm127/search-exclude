import { dom } from "../utility/dom";

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
    links: Map<HTMLButtonElement, HTMLElement>
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
        let listnr = ()=>{
            for(let [but, window] of this.links.entries()) {
                but.disabled = false
                window.style.display = "none"
            }
            but.disabled = true
            elToShowHide.style.display = originalDisplay
        }
        this.links.set(but, elToShowHide)
        but.addEventListener("click", listnr.bind(this))
        this.el.append(but)
    }
}