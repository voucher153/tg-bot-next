import s from './button.module.scss'

export const Button = ({children}: {children: React.ReactNode}) => {
    return (
        <button className={s.button}>
            {children}
        </button>
    )
}