export const getContentType = () => ({
    'Content-Type': 'application/json'
})

export const errorCatch = (error: any): string => {
    const message = error?.message?.data?.message
    return message
        ? typeof error.responce.data.message === 'object'
            ? message[0]
            : message
        : error.message
}