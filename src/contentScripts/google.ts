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
        let new_params = getGoogleParams(pg, params)
        document.location = "https://www.google.com/search?" + new_params.toString() 
        // browser storage accessed asynchronously
        } else {
            console.log("s-red was not true!")
        }
}

function getGoogleParams(pg:PGenerator, params:URLSearchParams) {
    // get the search string for google
    let search_apnd = pg.getGoogleParam()
    // get the "original query"
    let searchval = params.get("oq")
    console.log("QUERY IS", searchval)
    searchval = searchval ? searchval : ""
    searchval += " " + search_apnd
    console.log("APPENDED QUERY IS", searchval)
    let new_params = new URLSearchParams()
    //Googles params: q, ei, ved, uact, oq, gs_lcp, sclient
    /**
     * We will keep all existing params in the hope that we don't get flagged as, e.g. robots
     */
    new_params.set("q", searchval)
    if(params.get("sxsrf")) {
        new_params.set("sxsrf", params.get("sxsrf"))
    }
    if(params.get("ei")) {
        new_params.set("ei", params.get("ei"))
    }
    if(params.get("ved")) {
        new_params.set("ved", params.get("ved"))
    }
    if(params.get("uact")) {
        new_params.set("uact", params.get("uact"))
    }
    new_params.set("oq", searchval)
    if(params.get("gs_lcp")) {
        new_params.set("gs_lcp", params.get("gs_lcp"))
    }
    if(params.get("sclient")) {
        new_params.set("sclient", params.get("sclient"))
    }
    new_params.set("sred", "true")
    return new_params
}

