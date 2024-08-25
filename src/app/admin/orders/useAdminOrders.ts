import { formatDate } from './../../../components/utils/formatDate/formatDate';
import { IListItem } from "@/components/ui/admin/products/admin-list/admin-list.interface"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { orderService } from "@/services/order/order.service"
import { TypeOrdersDataSearch } from '@/types/order.interface';
import { useMutation, useQuery } from "@tanstack/react-query"
import { usePathname } from 'next/navigation';

export const useAdminOrders = ({page, perPage, searchTerm}: TypeOrdersDataSearch) => {

    const pathname = usePathname()
    console.log(pathname)

    const {data, isFetching, refetch} = useQuery({
        queryKey: ['get admin products', page, searchTerm],
        queryFn: () => orderService.getAll({
            searchTerm,
            page,
            perPage: 30
        }),
        select: (data) => data.orders.map((order): IListItem => {
            return {
                id: order.id,
                length: data.length,
                editUrl: `${pathname}/edit/${order.id}`,
                items: [
                    `#${order.id}`,
                    formatDate(order.createdAt),
                    order.status
                ]
            }
        })
    })
    
    return {
        data,
        isFetching,
    }
}