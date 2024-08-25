import { IListItem } from "@/components/ui/admin/products/admin-list/admin-list.interface"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { productService } from "@/services/product/product.service"
import { TypeProductDataFilters } from "@/types/product.interface"
import { useMutation, useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"

export const useAdminProducts = ({page, searchTerm}: TypeProductDataFilters) => {

    const pathName = usePathname()

    const {data, isFetching, refetch} = useQuery({
        queryKey: ['get admin products', page, searchTerm],
        queryFn: () => productService.getAll({
            page,
            searchTerm,
            perPage: 30
        }),
        select: data => data.products.map((product): IListItem => {

            return {
                id: product.id,
                length,
                editUrl: `${pathName}/edit/${product.id}`,
                items: [
                    product.name,
                    product.articule,
                    product.new
                ]
            }
        })
    })

    const {mutate} = useMutation({
        mutationKey: ['delete product'],
        mutationFn: (id: string) => productService.delete(id),
        onSuccess: () => {
            refetch()
        }
    })
    
    return {
        mutate,
        data,
        isFetching,
        refetch
    }
}