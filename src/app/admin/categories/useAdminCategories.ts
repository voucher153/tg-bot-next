import { categoryService } from '@/services/category/category.service';
import { IListItem } from "@/components/ui/admin/products/admin-list/admin-list.interface"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useMutation, useQuery } from "@tanstack/react-query"
import { usePathname } from 'next/navigation';

export const useAdminCategories = () => {

    const pathname = usePathname()

    const {data, isFetching, refetch} = useQuery({
        queryKey: ['get admin categories'],
        queryFn: () => categoryService.getAll(),
        select: ({data}) => data.map((category): IListItem => {

            return {
                id: category.id,
                editUrl: `${pathname}/edit/${category.id}`,
                items: [
                    category.name,
                    category.slug
                ]
            }
        })
    })

    const {mutate} = useMutation({
        mutationKey: ['delete product'],
        mutationFn: (id: string) => categoryService.delete(id),
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