import { PGenerator } from "./urlParamGenerator"



let centers = document.getElementsByTagName("center")

let glfyf = document.getElementsByClassName("gLFyf")

const pg = new PGenerator({orderedList:[]})

if(centers.length > 0) {
    // then we are on the main google page
}
else {
    // then we are a /search page
}

console.log(pg.getGoogleParam())


