import { List } from "../popup/List";
import { TExclusion } from "../TYPES";
import { DRTestWindow } from "./DRTestWindow";
import { rando } from "./rando";

export class TestList extends DRTestWindow<TExclusion.List>{
    constructor() {
        super()
        this.bindStamper({
            active: true,
            orderedList: [
                {
                    id: 0,
                    name: "Study Related 📚",
                    color: "0xfffaaccd",
                    items: [
                        {
                            id: 0,
                            url: "chegg.com",
                            active: true
                        }
                    ],
                    checked: true
                }
            ]
        }, List)

        this.createDataLogButton()
    }
}