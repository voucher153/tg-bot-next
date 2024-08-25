import { OrdersPage } from "@/components/ui/orders/orders"
import { Footer } from "@/components/utils/footer/footer"
import s from './orders.module.scss'

function Orders() {
    return (
        <div className={s.orders}>
            <OrdersPage />
            <Footer />
        </div>
    )
}

export default Orders