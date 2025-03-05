import React from "react";
import './MyOrder.css';
import Table from "../Common/Table";
import useData from "../../hooks/useData";


const MyOrder = () => {
  const{data:orders, errors} = useData("/order", null, ["myorder"],1*60*1000)

  const getProductsString = order=>{
      const ProsuctsArray = order.products.map(p => `${p.product.title}(${p.quantity})`)
      return ProsuctsArray.join(",")
  }

  return (
    <section className='align_center my_order_page'>
        {errors && <em className="form_error">{errors}</em>}
        {orders && 
          <Table headings={["Order", "Products", "Total", "Status"]}>
              <tbody>
                {orders.map((order, index)=> 
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{getProductsString(order)}</td>
                    <td >${order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                )}
                  
              </tbody>
          </Table>
        }
    </section>
  )
}
export default MyOrder 