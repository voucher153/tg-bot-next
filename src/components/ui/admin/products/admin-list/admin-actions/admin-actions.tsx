import { FC } from "react";
import { IListItem } from "../admin-list.interface";
import { useRouter } from "next/navigation";
import s from './admin-actions.module.scss'
import { Settings, Trash, View } from 'lucide-react'

interface IAdminActions extends Pick<IListItem, 'editUrl'> {
    removeHandler?: () => void
}

export const AdminActions: FC<IAdminActions> = ({
    editUrl,
    removeHandler,
}) => {
    const {push} = useRouter()

    return (
        <div className={s.actions}>
            {editUrl && (
                <button onClick={() => push(editUrl)}>
                    <Settings size={20} />
                </button>
            )}
            {removeHandler && (
                <button onClick={removeHandler}>
                    <Trash size={20} />
                </button>
            )}
        </div>
    )
}