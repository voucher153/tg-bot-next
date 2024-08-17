import { userService } from "@/services/user/user.service"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const { data } = useQuery({
        queryKey: ['get profile'],
        queryFn: () => userService.getProfile(),
    })

    return { profile: data?.data }
}