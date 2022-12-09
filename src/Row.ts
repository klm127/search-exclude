import { BaseInput } from "./BaseInput";
import { EVENTS } from "./Events";
import { TExclusion } from "./TYPES";
import { copy } from "./utility/copy";
import { dom } from "./utility/dom";


/**
 * Row represents an individual URL within a group.
 */
export class Row extends BaseInput<TExclusion.Row> {
    text: HTMLSpanElement;
    xButton: HTMLButtonElement;
    newUrlInput: HTMLInputElement;
    check: HTMLInputElement;
    constructor(data:TExclusion.Row) {
        super(data)
        this.check = dom.check()
        this.check.checked = data.active
        this.xButton = dom.button("❌")
        this.text = dom.span(this.data.url)
        this.newUrlInput = dom.el("input", undefined, {display:"none"})
        this.el.append(this.check, this.text, this.newUrlInput, this.xButton)
        this.updateData(data)
        this.listen()
    }
    // Listen attaches the event listeners - it is part of the constructor
    private listen() {
        this.clickListen(this.xButton, this.xButtonClicked)
        this.clickListen(this.check, this.checkButtonClicked)
        this.clickListen(this.text, this.textClicked)
        this.clickListen(this.newUrlInput, this.inputFocusLost, true, "focusout")
        this.clickListen(this.newUrlInput, this.enterOnInput, true, "keydown")
    }
    private xButtonClicked() {
        let rowDeleteEvent = new CustomEvent(EVENTS.row.delete, {
            detail: {
                id: this.data.id
            }
        })
        document.dispatchEvent(rowDeleteEvent)
    }
    private checkButtonClicked() {
        this.data.active = !this.data.active
        this.emitUpdate()
    }
    private textClicked() {
        this.text.style.display = "none"
        this.newUrlInput.value = this.text.textContent
        this.newUrlInput.style.display = "inline"
    }
    private inputFocusLost() {
        this.text.textContent = this.newUrlInput.value
        this.data.url = this.newUrlInput.value
        this.newUrlInput.style.display = "none"
        this.text.style.display = "inline"
        this.emitUpdate()
    }
    private enterOnInput(e:MouseEvent) {
        let kbe = (e as any) as KeyboardEvent
        if(kbe.key == "Enter") {
            this.text.focus()
            this.inputFocusLost()
        }
    }

    private emitUpdate() {
        let rowUpdateEvent = new CustomEvent(EVENTS.row.update, {
            detail: copy.shallow(this.data)
        })
        document.dispatchEvent(rowUpdateEvent)
    }

    updateData(data:TExclusion.Row) {
        this.data = data
        if(data.url == undefined) {
            this.text.style.display = "none"
            this.newUrlInput.style.display = "inline"
            this.newUrlInput.placeholder = "Input a URL to exclude here."
        }
    }
}