import { userService } from "@/services/user/user.service"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['get profile'],
        queryFn: () => {
            console.log('work')
            return userService.getProfile()
        },
    })
    return { profile: data?.data, isLoading }
}