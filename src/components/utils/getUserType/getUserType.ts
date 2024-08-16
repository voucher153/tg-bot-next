import Cookies from "js-cookie"

export const getUserType = () => {
    return Cookies.get('type')
}