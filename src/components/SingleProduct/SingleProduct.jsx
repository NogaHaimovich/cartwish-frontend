import React, { memo, useContext, useState } from "react"
import "./SingleProduct.css"
import config from "../../config.json"

import QuantityInput from "../Common/QuantityInput"
import { useParams} from "react-router-dom";
import useData from "../../hooks/useData";
import CartContext from "../../Contexts/CartContext";
import UserContext from "../../Contexts/UserContext";


const SingleProduct = () => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const {id} = useParams()
    const {data: product, error} = useData(`/products/${id}`,null,["products",id])
    const {addToCart} = useContext(CartContext)
    const user = useContext(UserContext)

    return (
    <section className="align_center single_product">
        {error && <em className="form_error">{error}</em>}
       {product&&
       <>
            <div className="align_center">
                <div className="single_product_thumbnails">
                    {
                        product.images.map((image, index) =>
                            <img 
                                key = {index}
                                src={`${config.backendURL}/products/${image}`}
                                alt={product.title}
                                className={selectedImage === index? "selected_image": ""}
                                onClick={()=>setSelectedImage(index)}
                            />)
                    }
                </div>
                <img 
                    src={`${config.backendURL}/products/${product.images[selectedImage]}`}
                    alt={product.title}
                    className="single_product_display"
                />
            </div>
            <div className="single_product_details">
                    <h1 className="single_product_title">{product.title}</h1>
                    <p className="single_product_description">{product.description}</p>
                    <p className="single_product_price">${product.price.toFixed(2)}</p>
                    { user && 
                    <>
                        <h2 className="quantity_title">Quantity:</h2>
                        <QuantityInput 
                            curentQuant={selectedQuantity}
                            setQuantity={setSelectedQuantity} 
                            stock={product.stock}
                        />
                    
                        <button 
                            className="general_button add_to_cart_button"
                            onClick={()=>addToCart(product,selectedQuantity)}
                        >
                        Add to Cart
                        </button>
                    </>
                    }
            </div>
            </>
        }
       
    </section>
  )
}
export default memo(SingleProduct) 