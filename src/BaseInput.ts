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