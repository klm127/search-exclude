import { TestNav } from "./nav"
import { TestCategory } from "./TestCategory"
import { TestList } from "./TestList"
import { TestRow } from "./TestRow"

// The entry file for the UI test page.

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM CONTENT LOADED")
    const nav = new TestNav()
    const testRow = new TestRow()
    const testCategory = new TestCategory()
    const testList = new TestList()

    document.body.append(nav.el, testRow.el, testCategory.el, testList.el)
    nav.addNav("Row", testRow.el)
    nav.addNav("Category", testCategory.el)
    nav.addNav("List", testList.el)
    nav.setFromLocal()
})   