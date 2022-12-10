import { dom } from "./utility/dom"

export class BaseInput<T>{
    data: T
    el: HTMLElement
    listeners: Array<[HTMLElement, (e:any)=>any, string]>
    constructor(data: T) {
        this.data = data
        this.el = dom.div(undefined, undefined, {"position":"relative", "zIndex": "0"})
        this.listeners = []
    }
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
    destroy() {
        for(let triplet of this.listeners) {
            let [el, listnr, evname] = triplet
            el.removeEventListener(evname, listnr)
        }
        this.el.remove()
    }
}


export class BaseInputWithTextEntry<T> extends BaseInput<T>{
    before: HTMLSpanElement
    after: HTMLSpanElement
    textZone: HTMLSpanElement
    textInput: HTMLInputElement
    text: HTMLSpanElement
    constructor(data: T) {
        super(data)
        this.before = dom.span(undefined,undefined, {display:"inline-block"})
        this.textZone = dom.span(undefined, undefined, {display:"inline-block"})
        this.after = dom.span(undefined, undefined, {display:"inline-block"})

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
        console.log("enter on input fired")
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