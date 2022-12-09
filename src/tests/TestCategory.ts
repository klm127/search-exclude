import { Category } from "../Category";
import { TExclusion } from "../TYPES";
import { DRTestWindow } from "./DRTestWindow";
import { rando } from "./rando";

export class TestCategory extends DRTestWindow<TExclusion.Category>{
    constructor() {
        super()
        this.bindStamper({
            name: "Study Sites",
            color: "red",
            checked: true,
            items: [{
                url: "www.chegg.com",
                active: true
            },{
                url: "www.homeworkhelp.com",
                active:true
            },{
                url: "www.yahoo.com/answers",
                active: false
            }
        ]
        } as TExclusion.Category, Category)
        this.bindRandomizer(()=> {
            return {
                id: rando.next.int(),
                name: rando.category(),
                color: rando.color(),
                checked: rando.bool(),
                items: rando.array(10, ()=>{
                    return {
                        url: rando.maybeUrl(),
                        active: rando.bool()
                    } as TExclusion.Row
                })
            } as TExclusion.Category
        }, Category)
        // document.addEventListener(CafeEventHandle, (e:any)=> {
        //     this.logs.log("Received an event of type " + CafeEventHandle)
        //     this.logs.log(" It has data: "+ JSON.stringify(e.detail))
        // })

        // this.bindRandomizer(()=> {
        //     return {
        //         active: rando.bool(),
        //         url: rando.maybeUrl()
        //     } as TExclusion.Row
        // }, Row)
        
    }
}