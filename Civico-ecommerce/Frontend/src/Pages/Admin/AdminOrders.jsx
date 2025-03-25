import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Components/Admin/Sidebar";
import { useEffect, useState } from "react";
import { getallorder, updatestatusorder } from "../../redux/features/Admin/adminorder.slice";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("pending"); // State to track active tab

  useEffect(() => {
    dispatch(getallorder());
  }, [dispatch]);

  const { orders, message, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  // Filter orders based on the selected tab's status
  const filteredOrders = orders.filter((order) => order.status.toLowerCase() === activeTab);

  const handleAccept = (id) => {
    console.log(id);
    const confirmAccept = window.confirm(
        "Are you sure you want to accept this order?"
      );
      if (!confirmAccept) return;
      dispatch(updatestatusorder({id,status:"ready to ship"})).then(()=>{
        dispatch(getallorder());
      })
  }
  const handleCancel = (id) => {
    console.log(id);
    const confirmAccept = window.confirm(
        "Are you sure you want to Cancel this order?"
      );
      if (!confirmAccept) return;
      dispatch(updatestatusorder({id,status:"cancelled"})).then(()=>{
        dispatch(getallorder());
      })
  }
  return (
    <section className="flex">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10">
        <div className="container-fluid ">
          <div className="row">
            <div className="main-bg-admin p-5 h-100">
              <h3 className="fs-24 p-2">Orders</h3>
              <div className="side-box-admin">
              <div className="order-status-tabs flex justify-between border rounded px-2 py-2">
  {["pending", "ready to ship", "shipped", "cancelled"].map((tab) => (
    <div className="col-3" key={tab}>
      <span
        className={`cursor-pointer w-100 flex justify-center relative pb-1 ${
          activeTab === tab ? "active-tab" : ""
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </span>
    </div>
  ))}
</div>

                <table className="table mt-4" >
                  <thead>
                    <tr>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Order No.</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Order Id</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Name</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">MobileNumber</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Order Date</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Total Price</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Payment Method</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Status</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Details</th>
                      <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((val, i) => (
                        <tr key={++i}>
                          <td>{i + 1}</td>
                          <td>{val._id}</td>
                          <td>{val.userId.name}</td>
                          <td>{val.userId.mobileNumber}</td>
                          <td>
                            {new Date(val.createdAt)
                              .toLocaleDateString("en-GB")
                              .split("/")
                              .join("-")}
                          </td>
                          <td>₹{val.totalAmount}</td>
                          <td>{val.paymentMethod}</td>
                          <td>{val.status}</td>
                          <td className="">
                            <Link to={`/adminorderdetails/${val._id}`} state={{ orders: val }} className="border rounded p-2 text-white secondary-bg">
                              View
                            </Link>
                          </td>
                          <td>
                           {
                            val.status === "ready to ship" ? (
                                <Link className="border rounded p-2 text-white bg-blue-500 me-2"> Invoice</Link>
                            ) : (
                                <>
                                <Link className="border rounded p-2 text-white bg-blue-500 me-2" onClick={()=>handleAccept(val._id)}>Accept</Link>
                                <Link className="border rounded p-2 text-white bg-red-500 me-2" onClick={()=>handleCancel(val._id)}>Cancel</Link></>
                            )
                           }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No Orders Found
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
    </section>
  );
};

export default AdminOrders;
