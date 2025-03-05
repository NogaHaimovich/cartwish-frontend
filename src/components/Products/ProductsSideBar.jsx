import React from "react"
import config from "../../config.json"
import "./ProductsSideBar.css"
import LinkWithIcon from "../NavBar/LinkWithIcon"
import useData from "../../hooks/useData"



const ProductsSideBar = () => {
    const {data:categories, error} = useData("/category", null, ["categories"], 24*60*60*1000)
    
    return (
        <aside className="products_sidebar">
            <h2>Catagory</h2>
            <div className="category_links">
                {error &&<em className="form_error">{error}</em>}
                {categories && categories.map((category)=>
                    <LinkWithIcon 
                        id={category._id}
                        key={category._id}
                        title={category.name}
                        emoji={`${config.backendURL}/category/${category.image}`}
                        link={`/products?category=${category.name}`}
                        sidebar
                    />
                )}
            </div>
        </aside>
    )
}
export default ProductsSideBar 