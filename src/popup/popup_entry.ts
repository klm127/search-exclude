import { CONSTS } from "../CONSTS"
import { List } from "./List"
import { TExclusion } from "../TYPES"
import { EVENTS } from "../EVENTS"


var list: List

// on popup window, check extension storage for previously saved data and use it to create the list, if it exists.
browser.storage.local.get(CONSTS.localStorage).then( (v)=> {
    let s_data = v[CONSTS.localStorage]
    let list_data : TExclusion.List = {orderedList:[]}
    if(s_data) {
        let p_data = JSON.parse(s_data)
        if(p_data != undefined && p_data.orderedList) {
            list_data = p_data
        }
    }
    list = new List(list_data)
    list.addEmitter(document)
    document.body.append(list.el)
})

// when "save" is clicked, update the extension storage with the new data, as a stringified JSON.
document.addEventListener(EVENTS.list.update, (cevent : CustomEvent<TExclusion.List>)=>{
    let newlistData = cevent.detail
    browser.storage.local.set({
        [CONSTS.localStorage] : JSON.stringify(newlistData)
    })
})