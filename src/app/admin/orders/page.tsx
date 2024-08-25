import { Search } from "@/components/ui/catalog/catalog-header/search/search"
import { useState } from "react"
import { OrdersPage } from "./Orders"
import { OrdersWrapper } from "./OrdersWrapper"

function Orders() {
    
    //const [searchTerm, setSearchTerm] = useState('')

    return (
        <>  
            {/* <div className={s.search}>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <OrdersPage searchTerm={searchTerm} /> */}
            <OrdersWrapper />
        </>
    )
}

export default Orders