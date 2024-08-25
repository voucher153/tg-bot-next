import { HomePage } from "@/components/ui/homePage/home";
import { Footer } from "@/components/utils/footer/footer";
import { Loader } from "@/components/utils/loader/loader";
import { categoryService } from "@/services/category/category.service";
import { productService } from "@/services/product/product.service";
import { IProduct, TypePaginationsProducts } from "@/types/product.interface";
import { useState } from "react";

export const revalidate = 3600

const fetchData = async () => {
  const data = await productService.getAll({
    page: 1,
    perPage: 10
  })

  const dataCategories = await categoryService.getAll()

  return {data, dataCategories}
}

export default async function Home() {

  const {data, dataCategories} = await fetchData()

  if (!data || !dataCategories) {
    return <Loader />
  }

  return (
    <>
    <HomePage 
            products={data.products} 
            length={data.length} 
            categories={dataCategories.data} 
        />
      <Footer />
    </>
  );
}
