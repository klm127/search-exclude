import { CONSTS } from "../CONSTS";
import { TExclusion } from "../TYPES";


export class PGenerator {
    data: TExclusion.List;
    urls: string[]

    constructor(data:TExclusion.List) {
        this.data = data
    }

    regenerateUrls() {

        let localData = JSON.parse(localStorage.getItem(CONSTS.localStorage)) as TExclusion.List

        if(!localData || !localData.orderedList) {
            localData = {
                orderedList : []
            }
        }

        this.data = localData
        
        this.urls = []
        for(let cat of this.data.orderedList) {
            if(cat.checked) {
                for(let url of cat.items) {
                    if(url.active) {
                        this.urls.push(url.url)
                    }
                }
            }
        }
    }

    getGoogleParam() : string {
        this.regenerateUrls()
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