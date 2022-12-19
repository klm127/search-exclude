import { BaseInput, BaseInputWithTextEntry } from "./BaseInput";
import { EVENTS } from "./Events";
import { Row } from "./Row";
import { STYLES } from "./STYLES";
import { TExclusion } from "./TYPES";
import { copy } from "./utility/copy";
import { dom } from "./utility/dom";



export class Category extends BaseInputWithTextEntry<TExclusion.Category> {

    /** A div containing the .els of each Row. */
    containedRows: HTMLDivElement;
    /** The input for selecting/deselecting this category */
    check: HTMLInputElement;
    /** The input for deleting this category */
    xButton: HTMLButtonElement;
    /** The input for typing a new name to rename this category */
    newCategoryNameInput: HTMLInputElement;
    /** The button for dropping down / pulling up the rows in this category */
    dropDownButton: HTMLButtonElement;
    /** The Row classes that have been instanced for each blocked website. */
    instancedRows: Map<number, Row>
    /** The display for the category name, */
    textName: HTMLSpanElement;
    /** The button for the user to add a new Row. */
    newRow: HTMLDivElement;

    constructor(data: TExclusion.Category) {
        super(data)
        // All CSS styles are in STYLES.ts
        this.el.classList.add(STYLES.category)
        this.check = dom.check()
        this.check.checked = data.checked        
        // before is part of BaseInputWithTextEntry
        this.before.append(this.check)
        this.text.innerHTML = data.name
        this.xButton = dom.button("❌")
        this.dropDownButton = dom.button("🔽")
        this.containedRows = dom.div()
        this.containedRows.style.display = "none"
        this.after.append(this.xButton, this.dropDownButton)
        this.newRow = dom.div("new row ✏")
        this.containedRows.append(this.newRow)
        this.el.append(this.containedRows)
        this.instancedRows = new Map()
        this.createRows()
        this.listen()

        // console.log("CATEGORY INSTANCED:", this)
    }
    /** instantiates all listeners ; part of constructor */
    private listen() {
        this.clickListen(this.dropDownButton, this.toggleDropDown)
        this.clickListen(this.el, this.onRowDelete as any, true, EVENTS.row.delete)
        this.clickListen(this.newRow, this.onNewRowClicked as any, true)
        this.clickListen(this.xButton, this.xButtonClicked, true)
    }
    /** instantiates rows; part of constructor */
    private createRows() {
        for(let row of this.data.items) {
            let nRow = new Row(row)
            // this is important; it allows Row to emit its events on this.el
            nRow.addEmitter(this.el)
            this.instancedRows.set(row.id, nRow)
            this.containedRows.insertBefore(nRow.el, this.containedRows.firstChild)
            this.containedRows.insertBefore(this.newRow, this.containedRows.firstChild)

        }
    }
    /** shows or hides the containedRows div when button clicked; internal listener */
    private toggleDropDown() {
        if(this.containedRows.style.display == "block") {
            this.containedRows.style.display = "none"
            this.dropDownButton.textContent = "🔽"
        } else {
            this.containedRows.style.display = "block"
            this.dropDownButton.textContent = "⬆"
        }
    }

    /** called when an event fired by clicking the "X" button of any contained row is detected. That row is deleted and removed from the data. */
    private onRowDelete(e: CustomEvent<TExclusion.Row>) {
        let targetToDelete = this.instancedRows.get(e.detail.id)
        if(targetToDelete) {
            targetToDelete.destroy()
            this.instancedRows.delete(e.detail.id)
        }
        let i= 0;
        for(; i < this.data.items.length; i++) {
            let test_row = this.data.items[i]
            if(test_row.id == e.detail.id) {
                break;
            }
        }
        this.data.items.splice(i, 1)
    }

    /** dispatched by Row when data changes; e.g. check button toggled, url changed */
    private onRowUpdate(e: CustomEvent<TExclusion.Row>) {
        this.emitUpdate()
    }

    /** Constructs a categoryDeleteEvent and dispatches it using BaseInput.emit */
    private xButtonClicked() {
        let categoryDeleteEvent = new CustomEvent(EVENTS.category.delete, {
            detail: {
                id: this.data.id
            }
        })
        // console.log("xButton clicked, emitting:", rowDeleteEvent, "my data:", this.data)
        this.emit(categoryDeleteEvent)
    }

    /** Called when the new row button is clicked. Instances a new row and selects it. */
    private onNewRowClicked() {
        let next_id = Math.max(...Array.from(this.instancedRows.keys())) + 1
        let rowdata : TExclusion.Row = {
            id: next_id,
            url: "enter url.com",
            active: true
        }
        let nRow = new Row(rowdata)
        this.data.items.push(rowdata)
        this.instancedRows.set(next_id, nRow)
        nRow.addEmitter(this.el)
        this.containedRows.insertBefore(nRow.el, this.containedRows.firstChild)
        this.containedRows.insertBefore(this.newRow, this.containedRows.firstChild)
        nRow.focus()
    }

    /** emit update event to all registered emitters */
    emitUpdate(): void {
        this.data.name = this.text.textContent
        let categoryUpdateEvent = new CustomEvent(EVENTS.category.update, {
            detail: this.data
        })
        this.emit(categoryUpdateEvent)
    }
    
}