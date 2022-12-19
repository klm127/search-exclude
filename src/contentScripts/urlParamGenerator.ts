import { CONSTS } from "../CONSTS";
import { TExclusion } from "../TYPES";


export class PGenerator {
    data: TExclusion.List;
    urls: string[]

    constructor(data:TExclusion.List) {
        this.data = data
    }

    regenerateUrls() {
        let me = this

        return browser.storage.local.get(CONSTS.localStorage).then( (rawdat)=> {
            let listDataString = rawdat[CONSTS.localStorage]
            if(listDataString) {
                let listData = JSON.parse(listDataString)
                if(listData.orderedList) {
                    return listData as TExclusion.List
                } else {
                    return {orderedList: []} as TExclusion.List
                }
            }
        }).then( (listData)=> {
            me.data = listData
            me.urls = []
            for(let cat of this.data.orderedList) {
                if(cat.checked) {
                    for(let url of cat.items) {
                        if(url.active) {
                            me.urls.push(url.url)
                        }
                    }
                }
            }
        })
    }

    getGoogleParam() : string {
        let outstr = ""
        let i = 0;
        for(; i < this.urls.length - 1; i++) {
            let url = this.urls[i]
            outstr+= `-site%3A${url}+`
        }
        let last_url = this.urls[i]
        outstr+= `-site%3A${last_url}`
        return outstr
    }
}