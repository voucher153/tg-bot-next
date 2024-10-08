'use client'

import { FC } from "react"
import { IListItem } from "./admin-list.interface"
import { Loader } from "@/components/utils/loader/loader"
import { AdminListItem } from "./admin-list-item"
import s from './admin-list.module.scss'

interface IAdminList {
    listItems?: IListItem[]
    isLoading: boolean
    removeHandler?: (id: string) => void
}

export const AdminList: FC<IAdminList> = ({
    isLoading,
    removeHandler,
    listItems
}) => {
    return (
        <div className={s.list}>
                {listItems!.map(listItem => (
                    <AdminListItem
                        key={listItem.id}
                        removeHandler={
                            removeHandler ? () => removeHandler(listItem.id) :
                            undefined
                        }
                        listItem={listItem}
                    />
                ))}
        </div>
    )
}