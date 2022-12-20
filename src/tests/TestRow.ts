import { EVENTS } from "../SE_EVENTS";
import { Row } from "../popup/Row";
import { TExclusion } from "../TYPES";
import { DRTestWindow } from "./DRTestWindow";
import { rando } from "./rando";

export class TestRow extends DRTestWindow<TExclusion.Row>{
    constructor() {
        super()
        this.bindStamper({ id: 0, active: true, url: "www.chegg.com"} as TExclusion.Row, Row)
        // document.addEventListener(CafeEventHandle, (e:any)=> {
        //     this.logs.log("Received an event of type " + CafeEventHandle)
        //     this.logs.log(" It has data: "+ JSON.stringify(e.detail))
        // })

        this.bindRandomizer(()=> {
            return {
                id: rando.next.int(),
                active: rando.bool(),
                url: rando.maybeUrl()
            } as TExclusion.Row
        }, Row)

        document.addEventListener(EVENTS.row.delete, (e)=>{
            this.logs.evLog(EVENTS.row.delete, e as CustomEvent)
        }
        )

        document.addEventListener(EVENTS.row.update, (e)=> {
            this.logs.evLog(EVENTS.row.update, e as CustomEvent)
        })
        
    }
}