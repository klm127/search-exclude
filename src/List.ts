import { BaseInput } from "./BaseInput";
import { Category } from "./Category";
import { TExclusion } from "./TYPES";
import { dom } from "./utility/dom";



export class List extends BaseInput<TExclusion.List> {

    categories : Map<number, Category>

    constructor(data: TExclusion.List) {
        super(data)
        this.categories = new Map()
        console.log("list created", data.orderedList)
        for(let category of this.data.orderedList) {
            let newCat = new Category(category)
            this.categories.set(category.id, newCat)
            this.el.append(newCat.el)
        }
    }
}