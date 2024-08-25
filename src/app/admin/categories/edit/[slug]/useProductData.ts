import { categoryService } from "@/services/category/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategoryData = (id: string) => {
    const {data: responce, isFetching} = useQuery({
        queryKey: ['get data by id'],
        queryFn: () => categoryService.getById(id)
    })

    return {
        data: responce?.data,
        isFetching
    }
}