import React, { memo, useContext } from "react"
import "./ProductCard.css"
import config from "../../config.json"
import whiteStar from "../../assets/white-star.png"
import basket from "../../assets/basket.png"
import { NavLink } from "react-router-dom"
import CartContext from "../../Contexts/CartContext"
import UserContext from "../../Contexts/UserContext"

const ProductCard = ({product}) => {
    const {addToCart} = useContext(CartContext)
    const user = useContext(UserContext)
    return (
    <div className="product_card">
            <div className="product_image">
                <NavLink to={`/product/${product?._id}`}>
                    <img src={`${config.backendURL}/products/${product?.images[0]}`} alt=""/>
                </NavLink>
            </div>

            <div className="product_details">
                <h3 className="product_price">${product?.price}</h3>
                <p className="product_title">{product?.title}</p>

                <footer className="align_center product_info_footer">
                    <div className="align_center">
                        <p className="align_center product_rating">
                            <img src={whiteStar} alt="star"/>
                            {product?.reviews.rate}
                        </p>
                        <p className="product_review_count">
                            {product?.reviews.counts}
                        </p>
                    </div>
                    {product?.stock > 0 && user && (
                        <button className="add_to_cart">
                            <img src={basket} alt="basket button" onClick={()=>addToCart(product,1)}/>
                        </button> 
                    )}
                </footer>

            </div>
    </div>
    )
}
export default memo(ProductCard)