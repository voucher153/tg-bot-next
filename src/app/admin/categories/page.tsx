import { Search } from "@/components/ui/catalog/catalog-header/search/search"
import { useState } from "react"
import { CategoriesPage } from "./Categories"

function Categories() {
    
    //const [searchTerm, setSearchTerm] = useState('')

    return (
        <>  
            {/* <div className={s.search}>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <CategoriesPage searchTerm={searchTerm} /> */}
            <CategoriesPage />
        </>
    )
}

export default Categories