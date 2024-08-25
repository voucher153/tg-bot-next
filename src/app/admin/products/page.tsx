import { Search } from "@/components/ui/catalog/catalog-header/search/search"
import { useState } from "react"
import { ProductsPage } from "./Products"
import { ProductsWrapper } from "./ProductsWrapper"

function Products() {
    
    //const [searchTerm, setSearchTerm] = useState('')

    return (
        <>  
            {/* <div className={s.search}>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ProductsPage searchTerm={searchTerm} /> */}
            <ProductsWrapper />
        </>
    )
}

export default Products