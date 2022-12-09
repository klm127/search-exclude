import { BaseInput } from "./BaseInput";
import { TExclusion } from "./TYPES";
import { dom } from "./utility/dom";



export class Category extends BaseInput<TExclusion.Category> {
    containedRows: any;
    check: HTMLInputElement;
    xButton: HTMLButtonElement;
    editButton: HTMLButtonElement;
    newCategoryNameInput: HTMLInputElement;
    dropDownButton: HTMLButtonElement;
    textName: HTMLSpanElement;

    constructor(data: TExclusion.Category) {
        super(data)
        this.check = dom.check()
        this.check.checked = data.checked
        this.xButton = dom.button("❌")
        this.editButton = dom.button("✏")
        this.textName = dom.span(data.name)
        this.newCategoryNameInput = dom.el("input", undefined, {display:"none"})
        this.dropDownButton = dom.button("🔽")
        this.containedRows = dom.div()

        this.el.append(this.check, this.textName, this.newCategoryNameInput, this.editButton, this.dropDownButton, this.xButton, this.containedRows)
    }
}