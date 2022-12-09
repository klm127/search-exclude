import { BaseInput } from "./BaseInput";
import { Row } from "./Row";
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
    instancedRows: Map<number, Row>

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
        this.containedRows.style.display = "none"

        this.el.append(this.check, this.textName, this.newCategoryNameInput, this.editButton, this.dropDownButton, this.xButton, this.containedRows)
        this.listen()
        this.instancedRows = new Map()
        this.createRows()
    }
    private listen() {
        this.clickListen(this.dropDownButton, this.toggleDropDown)
    }
    private createRows() {
        for(let row of this.data.items) {
            let nRow = new Row(row)
            this.instancedRows.set(row.id, nRow)
            this.containedRows.append(nRow.el)
        }
    }
    private toggleDropDown() {
        if(this.containedRows.style.display == "block") {
            this.containedRows.style.display = "none"
            this.dropDownButton.textContent = "⬆"
        } else {
            this.containedRows.style.display = "block"
            this.dropDownButton.textContent = "🔽"
        }

    }
}