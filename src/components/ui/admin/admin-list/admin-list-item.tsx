import { FC } from "react";
import { IAdminListItem } from "./admin-list.interface";
import s from './admin-list.module.scss'
import { AdminActions } from "./admin-actions/admin-actions";

export const AdminListItem: FC<IAdminListItem> = ({ removeHandler,
    listItem }) => {
        return (
            <div className="">
                {listItem.items.map(value => (
                    <div key={value}>{value}</div>
                ))}
                <AdminActions
                    viewUrl={listItem.viewUrl}
                    editUrl={listItem.editUrl}
                    removeHandler={removeHandler}
                />
            </div>
        )
    }