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
document.location = "https://mozilla.org"