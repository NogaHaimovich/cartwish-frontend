import React from "react";
import './QuantityInput.css';


const QuantityInput = ({curentQuant, setQuantity, stock, cartPage, productId}) => {
  return (
    <div className="align_center quantity_input">
        <button
            className="quantity_input_button"
            disabled = {curentQuant<=1}
            onClick={()=>{cartPage ? setQuantity("decrease", productId ): setQuantity(curentQuant-1)}}
        >
            -
        </button>
        <p className="quantity_input_count">
            {curentQuant}
        </p>
        <button 
            className="quantity_input_button"
            onClick={()=>{cartPage ? setQuantity("increase", productId ): setQuantity(curentQuant+1)}}
            disabled= {curentQuant>= stock}
        >
            +
        </button>
    </div>
  )
}
export default QuantityInput 