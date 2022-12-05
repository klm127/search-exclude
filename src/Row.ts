import { BaseInput } from "./BaseInput";
import { TExclusion } from "./TYPES";
import { dom } from "./utility/dom";


/**
 * Row represents an individual URL within a group.
 */
export class Row extends BaseInput<TExclusion.Row> {
    text: HTMLSpanElement;
    xButton: HTMLButtonElement;
    newUrlInput: HTMLInputElement;
    constructor(data:TExclusion.Row) {
        super(data)
        this.xButton = dom.button("❌")
        this.text = dom.span(this.data.url)
        this.newUrlInput = dom.el("input", undefined, {display:"none"})
        this.el.append(this.text, this.newUrlInput, this.xButton)
        this.updateData(data)
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