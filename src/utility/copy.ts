
function shallowCopy<T>(o:T) {
    let nob = {}
    for(let key of Object.keys(o)) {
        (nob as any)[key] = (o as any)[key]
    }
    return nob as T
}


export const copy = {
    shallow: shallowCopy
}