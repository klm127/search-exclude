import { BaseInput } from "./BaseInput";
import { Category } from "./Category";
import { CONSTS } from "../CONSTS";
import { EVENTS } from "../SE_EVENTS";
import { STYLES } from "../STYLES";
import { TExclusion } from "../TYPES";
import { dom } from "../utility/dom";



export class List extends BaseInput<TExclusion.List> {

    toggleActive: HTMLInputElement

    categories : Map<number, Category>
    newCategory: HTMLDivElement;
    categoriesContainer: HTMLDivElement;
    saveButton: HTMLButtonElement;
    saveResult: HTMLSpanElement;
    saveDiv: HTMLDivElement;

    constructor(data: TExclusion.List) {
        super(data)

        this.el.style.position = "relative"
        this.el.classList.add(STYLES.list.base)
        this.categories = new Map()
        // console.log("list created", data.orderedList)

        this.toggleActive = dom.check()
        this.toggleActive.checked = data.active
        let toggleActiveLabel = dom.span("Site blocking active?")
        let toggleActiveDiv = dom.div()
        toggleActiveDiv.append(this.toggleActive, toggleActiveLabel)

        this.newCategory = dom.div("category", STYLES.widget.new)
        this.categoriesContainer = dom.div()

        this.saveDiv = dom.div(undefined, STYLES.list.saveDiv, {position:"relative"})
        this.saveButton = dom.button("save changes", STYLES.list.saveButton, {display:"none"})
        this.saveResult = dom.span("", STYLES.list.saveResult)
        this.saveDiv.append(this.saveButton, this.saveResult)

        this.el.append(toggleActiveDiv, this.saveDiv, this.newCategory, this.categoriesContainer)
        for(let category of this.data.orderedList) {
            let newCat = new Category(category)
            this.categories.set(category.id, newCat)
            this.categoriesContainer.insertBefore(newCat.el, this.categoriesContainer.firstChild)
            newCat.addEmitter(this.el)
        }

        this.listen()
    }

    /** Part of constructor; instantiates all listeners */
    private listen() {
        this.clickListen(this.newCategory, this.newCategoryClicked)
        this.clickListen(this.el, this.onCategoryDelete as any, true, EVENTS.category.delete)
        this.clickListen(this.el, this.onCategoryUpdate as any, true, EVENTS.category.update)
        this.clickListen(this.saveButton, this.onSaveButtonClicked as any, true)
        this.clickListen(this.toggleActive, this.onListActivetoggle as any, true)
    }

    /** Called when new category button is clicked. Instances a new category, adds it to .data and the DOM */
    private newCategoryClicked() {
        let nextId = this.categories.size > 0 ? Math.max(...Array.from(this.categories.keys())) + 1 : 0
        let catData : TExclusion.Category = {
            id: nextId,
            name: "New Category",
            color: "yellow",
            checked: true,
            items: []
        }
        let newCat = new Category(catData)
        this.categories.set(nextId, newCat)
        this.categoriesContainer.insertBefore( newCat.el, this.categoriesContainer.firstChild)
        this.data.orderedList.push(catData)
        newCat.addEmitter(this.el)
        newCat.focus()
    }

    /**
     * called when the active check is toggled
     */
    private onListActivetoggle(e: CustomEvent<TExclusion.List>) {
        this.data.active = !this.data.active
        this.saveButton.style.display = "inline-block"
    }

    /** called when an event fired by clicking the "X" button of any contained row is detected. That row is deleted and removed from the data. */
    private onCategoryDelete(e: CustomEvent<TExclusion.Category>) {
        let targetToDelete = this.categories.get(e.detail.id)
        if(targetToDelete) {
            targetToDelete.destroy()
            this.categories.delete(e.detail.id)
        }
        let i= 0;
        for(; i < this.data.orderedList.length; i++) {
            let test_cat = this.data.orderedList[i]
            if(test_cat.id == e.detail.id) {
                break;
            }
        }
        this.data.orderedList.splice(i, 1)
        this.onCategoryUpdate({} as any)
    }

    /** Called when something updates on an inner category. Shows the save button. */
    private onCategoryUpdate(e: CustomEvent<TExclusion.Category>) {
        this.saveButton.style.display = "inline-block"
    }

    /** Called when save button is clicked. */
    private onSaveButtonClicked() {
        this.saveButton.style.display = "none"

        this.saveResult.remove()

        this.saveResult = dom.span("Saved!", STYLES.list.saveResultFadeAnimation)
        this.saveDiv.append(this.saveResult)

        this.emitUpdate()

        //let data = JSON.stringify(this.data)
        //localStorage.setItem(CONSTS.localStorage, data)
    }

    private emitUpdate() {
        let customEvent = new CustomEvent<TExclusion.List>(EVENTS.list.update, {
            detail: this.data
        })
        this.emit(customEvent)
    }
}