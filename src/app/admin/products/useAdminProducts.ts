import { IListItem } from "@/components/ui/admin/admin-list/admin-list.interface"
import { productService } from "@/services/product/product.service"
import { useQuery } from "@tanstack/react-query"

// export const useAdminProducts = () => {
//     const {data, isFetching, refetch} = useQuery({
//         queryKey: ['get admin products'],
//         queryFn: () => productService.getAll(),
//         select: data => data.data.map((product): IListItem => {
//             return {
//                 id: product.id,
//                 viewUrl: `/product/${product.slug}`,
//                 editUrl: 
//             }
//         })
//     })

    
// }