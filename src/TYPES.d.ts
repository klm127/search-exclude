


export namespace TExclusion {

    type Row = {
        url: string
        active: boolean
    }

    type Category = {
        id: number
        name: string
        color: string
        checked: boolean
        items: TExclusion.Row[]
    }

    type List = {
        orderedList: TExclusion.Category[]
    }

}