import { useLocation, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import TopHeader from "../../Components/TopHeader";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(location?.state?.order);
  }, [location, id]);

  console.log(order);

  return (
    <section>
      <TopHeader />
      <Navbar />

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
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default OrderDetails;
