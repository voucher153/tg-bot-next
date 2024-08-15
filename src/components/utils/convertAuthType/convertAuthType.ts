export const convertAuthTypeValue = (value: string) => {
    if (value === 'Клиент') {
        return 'user'
    }
    return 'admin'
}