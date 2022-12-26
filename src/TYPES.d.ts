


export namespace TExclusion {

    type Row = {
        id: number
        url: string
        active: boolean
    }
    type RowDeleteEvent = CustomEvent & {
        detail: {id: number}
    }
    type RowUpdateEvent = CustomEvent & {
        detail: Row
    }

    type Category = {
        id: number
        name: string
        color: string
        checked: boolean
        items: TExclusion.Row[]
    }

    type List = {
        active: boolean,
        orderedList: TExclusion.Category[]
    }

}