import React, { useContext, useMemo, memo } from "react";
import './CartPage.css';
import config from "../../config.json"
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../Common/QuantityInput";
import UserContext from "../../Contexts/UserContext";
import CartContext from "../../Contexts/CartContext"
import { checkOutAPI } from "../../Services/orderServices";


const CartPage = () => {
    const user = useContext(UserContext)
    const {cart, removeFromCart, updateCart, setCart} = useContext(CartContext)

    const subtotal = useMemo(()=> {
        let total=0
        cart.forEach(item=>{
            total+= item.product.price * item.quantity
        })
        return total
    },[cart])

    const checkout = () => {
        const oldCart=[...cart]
        setCart([])
        checkOutAPI().then(()=>{
            toast.sucess("Order placed successfully!")
        }).catch(()=>{
            toast.error("Somthing went wrong")
            setCart(oldCart)
        })
    }

    return (
        <section className="align_center cart_page">
            <div className="align_center user_info">
                <img src={`${config.backendURL}/profile/${user?.profilePic}`} alt="user profile"/>
                <div>
                    <p className="user_name"> Name: {user?.name}</p>
                    <p className="user_mail">Email: {user?.email}</p>
                </div>
            </div>
            
            <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
                <tbody>
                    {cart.map(({product, quantity}) => 
                        <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td className="align_center table_quantity_input">
                            <QuantityInput 
                                curentQuant={quantity}
                                stock={product.stock}
                                setQuantity={updateCart}
                                cartPage={true}
                                productId={product._id}   
                            />
                        </td>
                        <td>${(quantity*product.price)}</td>
                        <td>
                            <img src={remove} alt="remove icon" className="remove_icon" onClick={()=> removeFromCart(product._id)}/>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
            
            <table className="cart_bill">
            <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${subtotal}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charge</td>
                        <td>$5</td>
                    </tr>
                    <tr className="cart_bill_final">
                        <td>Total</td>
                        <td>${subtotal + 5}</td>
                    </tr>
                </tbody>
            </table>
            <button 
                className="general_button checkout_button" 
                onClick={checkout}
            >
                Checkout
            </button>
        </section>
    )
}
export default memo(CartPage)