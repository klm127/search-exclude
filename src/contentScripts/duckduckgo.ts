import { dom } from "../utility/dom"
import { PGenerator } from "./urlParamGenerator"

// pGenerator is used to generate search strings from the list the user has saved in browser.storage
const pg = new PGenerator({orderedList:[], active:false})

// browser storage has to be accessed asynchronously... this log is for test purposes
pg.regenerateUrls().then( ()=> {
    if(pg.data.active) {
        redirectIfNecessary()
    }
})

function redirectIfNecessary() {
    // get the current URL Search Parameters
    let params = new URLSearchParams(document.location.toString())
    // we will add another search param to tell the extension whether we need to apply the search filters or if they have already been applied. Sred is for "searchexclude redirect"
    let val = params.get("sred")
    // if its not true, a redirect has not yet occurred and we should add the custom parameters.
    if(val != "true") {
        let new_params = getDuckDuckGoParams(pg, params)
        document.location = "https://www.duckduckgo.com/?" + new_params.toString() 
        // browser storage accessed asynchronously
        } else {
            console.log("s-red was not true!")
        }
}

function getDuckDuckGoParams(pg:PGenerator, params:URLSearchParams) {
    // get the search string for google
    let search_apnd = pg.getDuckDuckGoParam()
    // get the "original query the ddg way"
    let searchval = params.get("https://duckduckgo.com/?q")
    searchval = searchval ? searchval : ""
    searchval += " " + search_apnd
    let new_params = new URLSearchParams()
    //DDGs params: q, t, h_, ia
    /**
     * We will keep all existing params in the hope that we don't get flagged as, e.g. robots
     */
    new_params.set("q", searchval)
    if(params.get("t")) {
        new_params.set("t", params.get("t"))
    }
    if(params.get("h_")) {
        new_params.set("h_", params.get("h_"))
    }
    if(params.get("ia")) {
        new_params.set("ia", params.get("ia"))
    }
    new_params.set("sred", "true")
    return new_params
}

