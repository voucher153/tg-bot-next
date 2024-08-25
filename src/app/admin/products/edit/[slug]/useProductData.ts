import { productService } from "@/services/product/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProductData = (id: string) => {
    const {data: responce, isFetching} = useQuery({
        queryKey: ['get data by id'],
        queryFn: () => productService.getById(id)
    })

    return {
        data: responce?.data,
        isFetching
    }
}