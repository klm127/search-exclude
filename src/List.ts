import { BaseInput } from "./BaseInput";
import { Category } from "./Category";
import { TExclusion } from "./TYPES";
import { dom } from "./utility/dom";



export class List extends BaseInput<TExclusion.List> {

    categories : Map<number, Category>
    newCategory: HTMLDivElement;
    categoriesContainer: HTMLDivElement;

    constructor(data: TExclusion.List) {
        super(data)
        this.categories = new Map()
        console.log("list created", data.orderedList)
        this.newCategory = dom.div("new category ✏")
        this.categoriesContainer = dom.div()
        this.el.append(this.newCategory, this.categoriesContainer)
        for(let category of this.data.orderedList) {
            let newCat = new Category(category)
            this.categories.set(category.id, newCat)
            this.categoriesContainer.append(newCat.el)
        }
        this.listen()
    }

    private listen() {
        this.clickListen(this.newCategory, this.newCategoryClicked)
    }

    private newCategoryClicked() {
        let nextId = Math.max(...Array.from(this.categories.keys())) + 1
        let newCat = new Category({
            id: nextId,
            name: "New Category",
            color: "yellow",
            checked: true,
            items: []
        })
        this.categories.set(nextId, newCat)
        this.categoriesContainer.insertBefore( newCat.el, this.categoriesContainer.firstChild)
    }
}