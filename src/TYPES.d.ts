


export namespace TExclusion {

    type Row = {
        url: string
    }

    type Category = {
        name: string
        color: string
        checked: boolean
        items: TExclusion.Row[]
    }

    type List = {
        orderedList: TExclusion.Category[]
        checked: Map<string, TExclusion.Category>
    }

}