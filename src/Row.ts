import { BaseInput, BaseInputWithTextEntry } from "./BaseInput";
import { EVENTS } from "./Events";
import { STYLES } from "./STYLES";
import { TExclusion } from "./TYPES";
import { copy } from "./utility/copy";
import { dom } from "./utility/dom";


/**
 * Row represents an individual URL within a group.
 */
export class Row extends BaseInputWithTextEntry<TExclusion.Row> {
    text: HTMLSpanElement;
    xButton: HTMLButtonElement;
    newUrlInput: HTMLInputElement;
    check: HTMLInputElement;
    constructor(data:TExclusion.Row) {
        super(data)
        this.check = dom.check()
        this.check.checked = data.active
        this.xButton = dom.button("❌")
        this.text.innerHTML = this.data.url ? this.data.url : "No URL"
        this.textInput.placeholder = "Input URL to block here."
        this.before.append(this.check)
        this.after.append(this.xButton)
        this.listen()
    }
    // Listen attaches the event listeners - it is part of the constructor
    private listen() {
        this.clickListen(this.xButton, this.xButtonClicked)
        this.clickListen(this.check, this.checkButtonClicked)
    }

    /** Constructs a rowDeleteEvent and dispatches it using BaseInput.emit */
    private xButtonClicked() {
        let rowDeleteEvent = new CustomEvent(EVENTS.row.delete, {
            detail: {
                id: this.data.id
            }
        })
        // console.log("xButton clicked, emitting:", rowDeleteEvent, "my data:", this.data)
        this.emit(rowDeleteEvent)
    }
    private checkButtonClicked() {
        this.data.active = !this.data.active
        this.emitUpdate()
    }

    emitUpdate() {
        this.data.url = this.text.textContent
        let rowUpdateEvent = new CustomEvent(EVENTS.row.update, {
            detail: copy.shallow(this.data)
        })
        document.dispatchEvent(rowUpdateEvent)
    }
}