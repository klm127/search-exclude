import { dom } from "../utility/dom"

/**
 * TestDomLogs is an alternative to console logging. By calling log() with some string, you can put some elements in the DOM to describe the log, along with an X button to delete them.
 */
export class TestDomLogs {
    el: HTMLElement
    delete: HTMLButtonElement
    logged: Array<Log>
    constructor() {
        this.logged = []
        this.el = dom.div("","",{"border":"1px dashed blue", "padding":"5px"})
        this.delete = dom.button("clear logs", undefined, {"display":"block"})
        this.el.append(this.delete)
        this.delete.addEventListener("click", this.delClicked.bind(this))

    }
    delClicked() {
        for(let log of this.logged) {
            log.xClick()
        }
        this.logged = []
    }
    log(s:string) {
        console.log("LOG RECEIVED")
        let l = new Log(s)
        this.el.append(l.el)
        this.logged.push(l)
    }
    evLog(e:string, s:CustomEvent) {
        console.log("EV LOG RECEIVED")
        let l = new Log(`Event: ${e}: ${JSON.stringify(s.detail)}`)
        this.el.append(l.el)
        this.logged.push(l)
    }
}


class Log {
    el: HTMLElement
    content: HTMLSpanElement
    xBut: HTMLButtonElement
    listener: (e:any)=>void
    constructor(text:string) {
        this.el = dom.div("","",{"color":"darkred"})
        let time = ""+new Date()
        this.content = dom.span(text)
        this.xBut = dom.button("✖")
        this.xBut.addEventListener("click", this.xClick.bind(this))
        this.el.append(this.xBut, this.content)
    }

    xClick() {
        this.xBut.removeEventListener("click", this.listener)
        this.el.remove()
    }
}