import React from "react"
import "./ProductsPage.css"
import ProductsSideBar from "./ProductsSideBar"
import ProductsList from "./ProductsList"

const ProductsPage = () => {
  return (
    <section className="products_page">
        <ProductsSideBar/>
        <ProductsList/>
    </section>
  )
}
export default ProductsPage 