import { STYLES } from "./STYLES"
import { dom } from "./utility/dom"

export class BaseInput<T>{
    data: T
    el: HTMLElement
    listeners: Array<[HTMLElement, (e:any)=>any, string]>
    emitters: EventTarget[]
    constructor(data: T) {
        this.data = data
        this.el = dom.div(undefined, undefined, {"position":"relative", "zIndex": "0"})
        this.listeners = []
        this.emitters = []
    }
    /** Use this function to set all DOM Event Listeners for elements of extending classes. 
     * 
     * It keeps a reference to the element, function, and event in an array so that when the BaseInput is deleted for any reason, it can remove all listeners and prevent browser slowdowns. 
     * 
     */
    clickListen(el:HTMLElement | HTMLElement[], fun: ((e:MouseEvent)=>any) | Array<(e:MouseEvent)=>any>, bind=true, alternateEvent="click") {
        if(bind) {
            if(Array.isArray(fun)) {
                let boundArr : Array<(e:MouseEvent)=>any> = []
                for(let f of fun) {
                    boundArr.push(f.bind(this))
                }
                fun = boundArr
            } else {
                fun = fun.bind(this)
            }
        }
        if(Array.isArray(el)) {
            if(Array.isArray(fun)) {
                for(let elinst of el) {
                    for(let cb of fun) {
                        elinst.addEventListener(alternateEvent, cb)
                        this.listeners.push([elinst, cb, alternateEvent])
                    }
                }
            } else {
                for(let elinst of el) {
                    elinst.addEventListener(alternateEvent, fun)
                    this.listeners.push([elinst, fun, alternateEvent])
                }
            }
        } else {
            if(Array.isArray(fun)) {
                for(let cb of fun) {
                    el.addEventListener(alternateEvent, cb)
                    this.listeners.push([el, cb, alternateEvent])
                }
            } else {
                el.addEventListener(alternateEvent, fun)
                this.listeners.push([el, fun, alternateEvent])
            }
        }
    }

    /** This adds an emitter to this.emitters that can emit CustomEvents. 
     * 
     * @Note Every DOM node, that is, every HTML element, is an EventTarget. So another elements main HTML element is a good candidate to use for an emitter here.
     * 
    */
    addEmitter(DOMEmitter:EventTarget) {
        this.emitters.push(DOMEmitter)
    }

    /** This calls dispatchEvent on all emitters */
    emit(e:CustomEvent<any>) {
        for(let emitter of this.emitters) {
            emitter.dispatchEvent(e)
        }
    }
    /** Destroys this BaseInput by doing the following:
     *   - removing every listener that was attached with BaseInput.clickListen
     *   - calling remove() on BaseInput.el
     */
    destroy() {
        for(let triplet of this.listeners) {
            let [el, listnr, evname] = triplet
            el.removeEventListener(evname, listnr)
        }
        this.el.remove()
    }
}

/**
 * BaseInputWithTextEntry extends BaseInput by adding a before span, an after span, and a textZone in between. The textZone switches to and from a static span and a textInput when the user clicks on the zone to edit the name. This encapsulates the "rename" feature inherit in (at least) two elements in this project; Row and Category. 
 * 
 * @todo improve this functionality
 */
export class BaseInputWithTextEntry<T> extends BaseInput<T>{
    before: HTMLSpanElement
    after: HTMLSpanElement
    textZone: HTMLSpanElement
    textInput: HTMLInputElement
    text: HTMLSpanElement
    constructor(data: T) {
        super(data)
        this.before = dom.span(undefined, STYLES.baseInput.before, {display:"inline-flex"})
        this.textZone = dom.span(undefined, STYLES.baseInput.text, {display:"inline-flex"})
        this.after = dom.span(undefined, STYLES.baseInput.after, {display:"inline-flex"})

        this.el.append(this.before, this.textZone, this.after)

        this.text = dom.span()
        this.textInput = dom.textInput(undefined, undefined, {display:"none"})
        this.textZone.append(this.text, this.textInput)

        this.clickListen(this.text, this.textClicked)
        this.clickListen(this.textInput, this.inputChanged, true, "change")
        this.clickListen(this.textInput, this.enterOnInput, true, "keydown")
    }
    
    private textClicked() {
        this.text.style.display = "none"
        this.textInput.value = this.text.textContent
        this.textInput.style.display = "inline-block"
    }
    private enterOnInput(e:any) {
        let kbe = e as KeyboardEvent
        if(kbe.key == "Enter") {
            this.inputChanged()
        }
    }
    private inputChanged() {
        this.textInput.style.display = "none"
        this.text.style.display = "inline-block"
        this.text.textContent = this.textInput.value
        this.emitUpdate()
    }

    emitUpdate() {
        console.log("override the emitUpdate method in this class")
    }
}