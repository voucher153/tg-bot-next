export interface IListItem {
    id: string
    editUrl?: string
    items: (string | boolean)[]
    length?: number
}

export interface IAdminListItem {
    listItem: IListItem
    removeHandler?: () => void
}