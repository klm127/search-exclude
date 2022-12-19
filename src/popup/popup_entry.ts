import { CONSTS } from "../CONSTS"
import { List } from "./List"
import { TExclusion } from "../TYPES"


var localData = JSON.parse(localStorage.getItem(CONSTS.localStorage)) as TExclusion.List

if(!localData || !localData.orderedList) {
    localData = {
        orderedList: []
    }
}

const list = new List(localData)

document.body.append(list.el)
