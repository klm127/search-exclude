import { Row } from "../Row";
import { TExclusion } from "../TYPES";
import { DRTestWindow } from "./DRTestWindow";
import { rando } from "./rando";

export class TestRow extends DRTestWindow<TExclusion.Row>{
    constructor() {
        super()
        this.bindStamper({url: "www.chegg.com"} as TExclusion.Row, Row)
        // document.addEventListener(CafeEventHandle, (e:any)=> {
        //     this.logs.log("Received an event of type " + CafeEventHandle)
        //     this.logs.log(" It has data: "+ JSON.stringify(e.detail))
        // })

        this.bindRandomizer(()=> {
            return {
                url: rando.maybeUrl()
            } as TExclusion.Row
        }, Row)
        
    }
}