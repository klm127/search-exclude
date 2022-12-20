import { dom } from "../utility/dom"
import { PGenerator } from "./urlParamGenerator"



// // let centers = document.getElementsByTagName("center")

// // let glfyf = document.getElementsByClassName("gLFyf")

const pg = new PGenerator({orderedList:[]})

// // if(centers.length > 0) {
// //     // then we are on the main google page
// // }
// // else {
// //     // then we are a /search page
// // }

// console.log(pg.getGoogleParam())

pg.regenerateUrls().then( ()=> {
    let s = pg.getGoogleParam()
    console.log(s)
})

// redirect DOES work!
//document.location = "https://mozilla.org"

let params = new URLSearchParams(document.location.toString())
let val = params.get("sred")
console.log("value of sred was", val)
if(val != "true") {
    pg.regenerateUrls().then( ()=> {
        let search_apnd = pg.getGoogleParam()
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
        console.log("intended to redirect with new params:", new_params)
        document.location = "https://www.google.com/search?" + new_params.toString() 
    })
} else {
    console.log("s-red was not true!")
}


params.toString()

console.log(params)