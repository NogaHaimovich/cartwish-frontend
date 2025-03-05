import React, { useEffect, useState, useMemo } from "react"
import "./ProductsList.css"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductsCardSkeleton"
import { useSearchParams } from "react-router-dom"
import useProductList from "../../hooks/useProductList"

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("")
  const [search, setSearch] = useSearchParams()
  const category = search.get("category")
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8]
  const searchQuery = search.get("search")

  const { data, error, isFetching, hasNextPage, fetchNextPage } = useProductList({
        search: searchQuery,
        category,
        perPage: 10,
  })


  const sortedProducts = useMemo(() => {
    if (data && data.pages) {
      const products = data.pages.flatMap((page) => page.products)
      switch (sortBy) {
        case "price desc":
          return products.sort((a, b) => b.price - a.price)
        case "price asc":
          return products.sort((a, b) => a.price - b.price)
        case "rate desc":
          return products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        case "rate asc":
          return products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        default:
          return products
      }
    }
    return []
  }, [sortBy, data])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 1 && !isFetching) {
        if (data) {
          fetchNextPage()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [data, isFetching])

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {sortedProducts.length === 0 && !isFetching && hasNextPage && (
          <p>No products found.</p>
        )}
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {isFetching &&
          skeleton.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </section>
  )
}

export default ProductsList
