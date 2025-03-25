import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import TopHeader from "../../Components/TopHeader";
import SidebarProfile from "../../Components/User/sidebarProfile";
import { useEffect } from "react";
import { getUserOrder } from "../../redux/features/orderSlice";
import { Link } from "react-router-dom";
const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  const { order, error, message, loading } = useSelector(
    (state) => state.order
  );
  console.log(order);

  return (
    <section>
      <TopHeader />
      <Header />
      <Navbar />
      <div className="container-fluid" style={{ padding: "50px 20px" }}>
        <div className="row flex">
          <SidebarProfile />
          <div className="col-10">
            <div className="container-fluid">
              <div className="row">
                <div className="order-box">
                  <table className="table">
                    <thead className="">
                      <tr>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Order Time
                        </th>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Method
                        </th>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="leading-[30px] tracking-wider fw-400 p-color"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order && order.length > 0 ? (
                        order.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item._id}</th>
                            <td>
                              {new Date(item.createdAt)
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .join("-")}
                            </td>

                            <td>{item.paymentMethod}</td>
                            <td>
  <button
    className={`border rounded p-1 ${
      item.status === "pending" ? "text-red-500" :
      item.status === "ready to ship" ? "text-yellow-500" :
      item.status === "shipped" ? "text-blue-500" :
      item.status === "cancelled" ? "text-gray-500" :
      "text-black"
    }`}
  >
    {item.status}
  </button>
</td>

                            <td>₹{item.totalAmount}</td>
                            <td>
                              <Link
                                className="btn secondary-bg text-white"
                                to={`/orderdetails/${item._id}`}
                                state={{ order: item }}
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Orders;
