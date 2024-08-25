import { FC } from "react";
import { IAdminListItem } from "./admin-list.interface";
import s from './admin-list-item.module.scss'
import { AdminActions } from "./admin-actions/admin-actions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const AdminListItem: FC<IAdminListItem> = ({ removeHandler,
    listItem }) => {

        const check = (value: string | boolean) => {
            
            if (value === true) {
                return 'Новинка'
            } else if (value === false) {
                return 'Не новинка'
            }

            if (value === 'new_order') {
                return 'Новый заказ'
            } else if (value === 'order_accepted') {
                return 'Заказ принят'
            }
            return value
        }

        return (
            <div className={s.item}>
                <div className={s.value}>
                    {listItem.items.map((value, id) => (
                        <div key={id} className={s.text}>{check(value)}</div>
                    ))}
                </div>
                <AdminActions
                    editUrl={listItem.editUrl}
                    removeHandler={removeHandler}
                />
            </div>
        )
    }