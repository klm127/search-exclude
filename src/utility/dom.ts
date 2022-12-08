
/**
 * dom is short for "Document Object Model". This file contains utility functions for getting HTML Elements. They are all members of the exported const 'dom'.
 */


 function el<T extends keyof HTMLElementTagNameMap>(tagName: T, cssClass?:string | string[], styles?:{[key:string]:string}) {
    let el = document.createElement(tagName)
    if(styles !== undefined) {
        for(let key of Object.keys(styles)) {
            el.style[key as any] = styles[key] as any
        }
    }    
    if(cssClass !== undefined && cssClass !== "") {
        if(Array.isArray(cssClass)) {
            for(let c of cssClass) {
                el.classList.add(c)
            }
        } else {
            el.classList.add(cssClass)
        }
    }
    return el as HTMLElementTagNameMap[T]
}

function textEl<T extends keyof HTMLElementTagNameMap>(el: T, text?: string, cssClass?:string | string[], styles?:{[key:string]:string})
{
    let x = dom.el<T>(el, cssClass, styles)
    x.textContent = text ? text : ""
    return x

}
function div(text?: string, cssClass?:string | string[], styles?:{[key:string]:string}) {
    return textEl("div", text, cssClass, styles)
}
function button(text?: string, cssClass?:string | string[], styles?:{[key:string]:string}) {
    return textEl("button", text, cssClass, styles)
}
function span(text?: string, cssClass?:string | string[], styles?:{[key:string]:string}) {
    return textEl("span", text, cssClass, styles)
}

function check(cssClass?: string | string[], styles?: {[key:string]:string}) {
    let inel = el("input", cssClass, styles)
    inel.type = "checkbox"
    return inel
}


export const dom = {
    el: el,
    textEl: textEl,
    div: div,
    button: button,
    span: span,
    check: check
}