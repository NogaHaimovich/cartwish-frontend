import React from "react"

import useData from "../../hooks/useData"
import "./FeatureProducts.css"
import ProductCard from"../Products/ProductCard"
import ProductCardSkeleton from "../Products/ProductsCardSkeleton"

const FeatureProducts = () => {
  const { data, error, isLoading } = useData("/products/featured", null, ["products","featured"], 10*60*60*1000);
  const skeleton = [1, 2, 3]

  return (
   <section className="featured_products">
        <h2>Featured Products</h2>

        <div className="align_center featured_product_list">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data.map((product) => (
            <ProductCard
              key={product._id}
              product = {product}
            />
          ))}
        {isLoading &&
          skeleton.map((n) => <ProductCardSkeleton key={n} />)}
        </div>
   </section>
  )
}
export default FeatureProducts