import { TestNav } from "./nav"
import { TestRow } from "./TestRow"

// The entry file for the UI test page.

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM CONTENT LOADED")
    const nav = new TestNav()
    const testRow = new TestRow()

    document.body.append(nav.el, testRow.el)
    nav.addNav("Row", testRow.el)
})   