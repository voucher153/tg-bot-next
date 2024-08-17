import { HomePage } from "@/components/ui/homePage/home";
import { productService } from "@/services/product/product.service";
import { IProduct, TypePaginationsProducts } from "@/types/product.interface";
import { useState } from "react";

export const revalidate = 3600

const fetchData = async () => {
  const {data} = await productService.getAll({
    page: 1,
    perPage: 4
  })
  return data
}

export default async function Home() {

  const data = await fetchData()

  return (
    <>
      
      <HomePage products={data.products} length={data.length} />
    </>
  );
}
