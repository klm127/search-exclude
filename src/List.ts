import { BaseInput } from "./BaseInput";
import { Category } from "./Category";
import { EVENTS } from "./Events";
import { TExclusion } from "./TYPES";
import { dom } from "./utility/dom";



export class List extends BaseInput<TExclusion.List> {

    categories : Map<number, Category>
    newCategory: HTMLDivElement;
    categoriesContainer: HTMLDivElement;

    constructor(data: TExclusion.List) {
        super(data)
        this.categories = new Map()
        // console.log("list created", data.orderedList)
        this.newCategory = dom.div("new category ✏")
        this.categoriesContainer = dom.div()
        this.el.append(this.newCategory, this.categoriesContainer)
        for(let category of this.data.orderedList) {
            let newCat = new Category(category)
            this.categories.set(category.id, newCat)
            this.categoriesContainer.insertBefore(newCat.el, this.categoriesContainer.firstChild)
            newCat.addEmitter(this.el)
        }
        this.listen()
    }

    private listen() {
        this.clickListen(this.newCategory, this.newCategoryClicked)
        this.clickListen(this.el, this.onCategoryDelete as any, true, EVENTS.category.delete)
    }

    private newCategoryClicked() {
        let nextId = Math.max(...Array.from(this.categories.keys())) + 1
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
    }
}