/**
 * DRTestWindow stands for Data Render Test Window.
 * 
 * This is a base class for testing "windows" of testing frameworks whose purpose is testing an object which renders a datumn using HTML Elements, and which sends CafeEvents to the document global object. There are several boundary classes that fit this pattern, such as CafeComment, CafeModReport, CafeModActionReport , CafeUserProfile and others. 
 * 
 * These classes should all be capable of unit tests.
 */

 import { dom } from "../utility/dom";
 import { TestDomLogs } from "./domlogs";
 
 
 type class_that_takes<T> = {
     new(d:T):instanceMustHave<T>
 
 } 
 
 type instanceMustHave<T> = {
     data: T
     destroy(): void
     el: HTMLElement
 }
 
 export class DRTestWindow<DType> {
 
     logs: TestDomLogs
     el: HTMLDivElement
 
     container: HTMLDivElement
     toDestroy: {data:DType, destroy(): void}[]
     nav: HTMLElement
     clearButton: HTMLButtonElement;
 
     constructor() {
         this.toDestroy = []
         this.el = dom.div()
         this.nav = dom.el("div")
         let rlcontainer = dom.el("div", undefined, {"display":"flex"})
         this.logs = new TestDomLogs()
         this.container = dom.div()
         rlcontainer.append(this.container, this.logs.el)
         this.el.append(this.nav, rlcontainer)
 
         this.clearButton = dom.button("clear")
         this.clearButton.addEventListener("click", this.clear.bind(this))
         this.nav.append(this.clearButton)

 
     }

     createDataLogButton() {
        let logButton = dom.button("console.log all data")
        logButton.addEventListener("click", this.logData.bind(this) )
        this.nav.append(logButton)
     }
 
     clear() {
         for(let inst of this.toDestroy) {
             inst.destroy()
         }
         this.toDestroy = []
     }
 
     boundButton(n:string, cb:()=>void) {
         let but = dom.button(n)
         but.addEventListener("click", cb.bind(this))
         return but
     }
 
     bindStamper(data: DType, domInstance:class_that_takes<DType>) {
         let but = this.boundButton("stamp", ()=>{
             // todo: deep copy data
             let boundry = new domInstance(data)
             this.container.append(boundry.el)
             this.toDestroy.push(boundry)
         })
         this.nav.append(but)
     }
 
     bindRandomizer(randomizerFunction:()=>DType, domInstance: class_that_takes<DType>) {
         let but = this.boundButton("random", ()=>{
             let newdat = randomizerFunction()
             let boundry = new domInstance(newdat)
             this.container.append(boundry.el)
             this.toDestroy.push(boundry)
         })
         this.nav.append(but)
     }
 
     logEvents(evname:string) {
         let f = (e:any) => {
             this.logs.log("Event of type: " + evname)
             this.logs.log("---- Data: " + JSON.stringify(e.detail))
         }
         document.addEventListener(evname, f.bind(this))
     }

     logData() {
        for(let el of this.toDestroy) {
            console.log(el.data)
        }
     }
 
 
 }