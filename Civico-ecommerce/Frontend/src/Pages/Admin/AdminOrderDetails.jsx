import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const AdminOrderDetails = () => {
    const location = useLocation()
    const [order,setOrder] = useState([])
    console.log(location.state.orders);


    useEffect(()=>{
        setOrder(location?.state?.orders)
    },[location?.state])
    
  return (
    <section>
    <div className="container border rounded-[10px] overflow-hidden py-2 px-3" style={{margin:"50px auto"}}>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                SR.
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Product Image
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item, i) => (
              <tr key={item._id} className="">
                <th scope="row">{i + 1}</th>
                <td>
                  <img src={item.product.image} className="w-[100px]" />
                </td>
                <td>{item.product.name}</td> {/* Display Product Name */}
                <td>{item.quantity}</td> {/* Display Quantity */}
                <td>₹{item.price.toFixed(2)}</td> {/* Display Price */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="container-fluid">
          <div className="row">
            <div className="amount flex justify-between">
              <span><span className="fs-18 leading-[30px] tracking-wider fw-400 p-color">Payment Method</span> : {order?.paymentMethod}</span>
              <span > <span className="fs-18 leading-[30px] tracking-wider fw-400 p-color">Total Amount </span>: ₹{order?.totalAmount}</span>
            </div>
          </div>
        </div>

      </div>
      <div className="container border rounded-[10px] overflow-hidden py-2 px-3" style={{margin:"50px auto"}}>
    <div className="row">
    <table className="table">
          <thead>
            <tr>
            <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Customer MobileNumber
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                Delivery Address
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                State
              </th>
              <th
                scope="col"
                className="leading-[30px] tracking-wider fw-400 p-color"
              >
                City
              </th>
             
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item, i) => (
              <tr key={item._id} className="">
                <th scope="row">{order.userId.name}</th>
                <td>
                   {order.DeleveryContact}* { " || "}
                  {order.userId.mobileNumber}
                </td>
                <td>{order.shippingAddress.address}</td> {/* Display Product Name */}
                <td>{order.shippingAddress.state}</td> {/* Display Quantity */}
                <td>{order.shippingAddress.city}</td> {/* Display Price */}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
</div>
    </div>
  </section>
  )
}

export default AdminOrderDetails
