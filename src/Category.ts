import { BaseInput, BaseInputWithTextEntry } from "./BaseInput";
import { EVENTS } from "./Events";
import { Row } from "./Row";
import { STYLES } from "./STYLES";
import { TExclusion } from "./TYPES";
import { copy } from "./utility/copy";
import { dom } from "./utility/dom";



export class Category extends BaseInputWithTextEntry<TExclusion.Category> {
    containedRows: any;
    check: HTMLInputElement;
    xButton: HTMLButtonElement;
    newCategoryNameInput: HTMLInputElement;
    dropDownButton: HTMLButtonElement;
    textName: HTMLSpanElement;
    instancedRows: Map<number, Row>
    newRow: HTMLDivElement;

    constructor(data: TExclusion.Category) {
        super(data)
        this.el.classList.add(STYLES.category)
        this.check = dom.check()
        this.check.checked = data.checked
        this.before.append(this.check)

        this.text.innerHTML = data.name

        this.xButton = dom.button("❌")
        this.dropDownButton = dom.button("🔽")
        this.containedRows = dom.div()
        this.containedRows.style.display = "none"
        this.after.append(this.xButton, this.dropDownButton, this.containedRows)
        this.newRow = dom.div("new row ✏")
        this.containedRows.append(this.newRow)

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
            this.dropDownButton.textContent = "🔽"
        } else {
            this.containedRows.style.display = "block"
            this.dropDownButton.textContent = "⬆"
        }
    }

    emitUpdate(): void {
        this.data.name = this.text.textContent
        let rowUpdateEvent = new CustomEvent(EVENTS.category.update, {
            detail: copy.shallow(this.data)
        })
        document.dispatchEvent(rowUpdateEvent)
    }
    
}