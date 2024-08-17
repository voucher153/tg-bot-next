import { FC } from "react";
import { IListItem } from "../admin-list.interface";
import { useRouter } from "next/navigation";
import s from './admin-actions.module.scss'
import { Settings, Trash, View } from 'lucide-react'

interface IAdminActions extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
    removeHandler?: () => void
}

export const AdminActions: FC<IAdminActions> = ({
    editUrl,
    removeHandler,
    viewUrl,
}) => {
    const {push} = useRouter()

    return (
        <div className={s.actions}>
            {
                viewUrl && (
                    <button onClick={() => push(viewUrl)}>
                        <View />
                    </button>
            )}
            {editUrl && (
                <button onClick={() => push(editUrl)}>
                    <Settings />
                </button>
            )}
            {removeHandler && (
                <button onClick={removeHandler}>
                    <Trash />
                </button>
            )}
        </div>
    )
}