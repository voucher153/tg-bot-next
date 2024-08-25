import s from './button.module.scss'

export const Button = ({children, pagination, isCurrentPag}: {children: React.ReactNode, pagination?: boolean, isCurrentPag?: boolean}) => {
    return (
        <button className={pagination ? 
            isCurrentPag ? 
                `${s.button} ${s.pagination} ${s.current}` : 
                `${s.button} ${s.pagination}`
            : s.button}>
            {children}
        </button>
    )
}