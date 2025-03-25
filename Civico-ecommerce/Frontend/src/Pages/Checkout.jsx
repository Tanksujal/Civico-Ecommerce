import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import TopHeader from "../Components/TopHeader";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteproductfromcart,
  GetCart,
  UpdateCartQuantity,
  UpdateminQuantity,
} from "../redux/features/cartSlice.js";
import { Placeorder } from "../redux/features/orderSlice.js";
const Checkout = () => {
  const dispatch = useDispatch();
  const [site, setSite] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [address, setaddress] = useState("");
  const { cart, error, loading, message } = useSelector((state) => state.cart);
  const {
    user,
    error: usererror,
    loading: userloading,
    message: usermessage,
  } = useSelector((state) => state.user);
  const {
    order,
    error: orderror,
    loading: orderloading,
    message: ordermessage,
  } = useSelector((state) => state.order);
  const [quantity, setQuantity] = useState(1);
  const [paymentmethod, setpaymentmethod] = useState("COD");
  const navigate = useNavigate();
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [GSTNumber, setGSTnumber] = useState("");
  const [pin,setpin] = useState("")
  const [comment, setcomment] = useState("");
  const minQuantity = 1;
  const increaseQuantity = ({ productId, size }) => {
    dispatch(
      UpdateCartQuantity({ productId, newQuantity: 1, selectedSize: size })
    ).then(() => dispatch(GetCart()));
  };
  useEffect(() => {
    setSite(user?.Site[0]?.siteName),
      setmobileNumber(user?.mobileNumber),
      setaddress(user?.Site[0].siteAddress);
    setGSTnumber(user?.Company?.GSTnumber);
    setstate(user?.Site[0].siteState);
    setcity(user?.Site[0].siteCity);
    setpin(user?.Site[0].sitePin)
  }, [user]);

  useEffect(() => {
    dispatch(GetCart());
  }, [dispatch, cart]);
  const decreaseQuantity = ({ productId, size }) => {
    dispatch(
      UpdateminQuantity({ productId, newQuantity: 1, selectedSize: size })
    ).then(() => dispatch(GetCart()));
  };
  const handlesubmit = () => {
    const obj = {
      paymentMethod: paymentmethod,
      shippingAddress: {
        address:address,
        city:city,
        postalCode:pin,
        state:state
      },
      deleiveryContact: mobileNumber,
      sitename: site,
      comment: comment,
    };
    dispatch(Placeorder(obj));
  };
  // useEffect(() => {
  //   if (ordermessage === "Order placed successfully") {
  //     alert(ordermessage);
  //     navigate("/");
  //   }
  // }, [ordermessage, navigate]);
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="cart-box px-3 py-2">
                {cart?.length > 0 &&
                  cart[0]?.cartItems?.map((item, i) => (
                    <div
                      className="cart-item-box bg-2 border rounded-[20px] flex overflow-hidden p-3 mt-3"
                      key={i}
                    >
                      <div className="col-4 me-3">
                        <div className="cart-image border rounded-[20px] overflow-hidden">
                          <img
                            src={item.productId.image}
                            className=""
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="cart-content">
                          <div className="cart-name">
                            <h4 className="fs-14 section-title-color tracking-[0.03rem] leading-[30px] fw-700 banner-font">
                              {item.productId.name}
                            </h4>
                          </div>
                          <div className="product-price-and-unit flex flex-column">
                            <span className="price-text fs-14 li-color fw-200 tracking-[0.03rem] leading-[30px] bg-main-text">
                              ₹{item.price}/piece (₹{item.productId.price}/
                              {item.productId.unit}) +18% GST
                            </span>
                            <span className="fs-16 p-color   text-black ">
                              ₹{item.GstPrice?.toFixed(2)}
                            </span>
                          </div>
                          <div className="product-item-quantity mt-3 flex items-center justify-between">
                            <div className="qty-box w-[85px] h-[40px] border flex items-center justify-center rounded-[10px]">
                              <div
                                className="min w-[25px] flex items-center justify-center cursor-pointer"
                                onClick={() =>
                                  decreaseQuantity({
                                    productId: item.productId._id,
                                    size: item.productId.size[0],
                                  })
                                }
                              >
                                -
                              </div>
                              <input
                                type="text"
                                className="w-[32px] h-auto text-center border-none outline-none flex items-center justify-center p-color"
                                value={item.quantity}
                                onChange={(e) => {
                                  let value = parseInt(e.target.value, 10);
                                  if (!isNaN(value) && value >= minQuantity) {
                                    setQuantity(value);
                                  }
                                }}
                              />
                              <div
                                className="plus w-[25px] flex items-center justify-center cursor-pointer"
                                onClick={() =>
                                  increaseQuantity({
                                    productId: item.productId._id,
                                    size: item.productId.size[0],
                                  })
                                }
                              >
                                +
                              </div>
                            </div>
                            <div className="remove-btn border p-1 rounded me-3">
                              <span className="cursor-pointer">
                                <MdDeleteOutline
                                  className="fs-18 text-red-500"
                                  onClick={() =>
                                    dispatch(
                                      deleteproductfromcart(item.productId._id)
                                    ).then(() => dispatch(GetCart()))
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-8">
              <div className="shipping-form">
                <form>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      For Site
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={site}
                      onChange={(e) => setSite(e.target.value)}
                    />
                  </div>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      Delivery Contact
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={mobileNumber}
                      onChange={(e) => setmobileNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      Address
                    </label>
                    <textarea
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      Pincode
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={pin}
                      onChange={(e) => setpin(e.target.value)}
                    />
                  </div>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      Address
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </div>
                  <div className="form-box flex flex-column mt-3">
                    <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                      Address
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 bg-main-text"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>

                  {user?.Typeuse == "company" ? (
                    <div className="form-box flex flex-column mt-3">
                      <label className="fs-16 section-title-color tracking-[0.02rem] leading-[26px] fw-500 ">
                        GST account
                      </label>
                      <div className="gst-box flex border  rounded p-2">
                        <div className="gstnumber flex flex-column  me-3">
                          <span className="bg-main-text banner-font fw-500">
                            GST number
                          </span>
                          <span className="fs-15 fw-500 p-color border-t border-t-[#eee] pt-2">
                            {GSTNumber}
                          </span>
                        </div>
                        <div className="gst-address flex flex-column">
                          <span className="bg-main-text banner-font fw-500">
                            Address
                          </span>
                          <span className="fs-15 fw-500 p-color flex banner-font border-t border-t-[#eee] pt-2">
                            {address}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
              <div className="delevery-method-box border rounded-[10px] p-3 mt-3">
                <div className="delevery-m">
                  <div className="delevery-text">
                    <h4 className="fs-20 bg-main-text banner-font tracking-[0.03rem] leading-[1.2] fw-700">
                      Delivery Method
                    </h4>
                  </div>
                  <div className="delevery-p mt-3">
                    <p className="fs-15 m-0 p-color banner-font tracking-[0.03rem] leading-[1.2] fw-500">
                      Please select the preferred shipping method to use on this
                      order.
                    </p>
                  </div>
                  <div className="methods mt-1">
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultChecked
                          value="COD"
                          onChange={(e) => setpaymentmethod(e.target.value)}
                        />
                        <label
                          className="form-check-label fs-16 p-color fw-500 banner-font"
                          htmlFor="flexRadioDefault2"
                        >
                          Cash On Delivary
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="deluvery-comments mt-3">
                    <label
                      htmlFor=""
                      className="fs-15 p-color tracking-[0.03rem] leading-[1.2] fw-500 banner-font"
                    >
                      Add Comments About Your Order
                    </label>
                    <textarea
                      className="w-full h-[100px] border rounded mt-2 px-2 p-color"
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="total-price-box mt-4 border-t-[#eee] border-t p-3">
                <div className="price-cart flex justify-between">
                  <span className="fs-14 li-color fw-500 tracking-[0.03rem] leading-[30px]">
                    Total :{" "}
                  </span>
                  <span className="fs-16 text-black fw-500 tracking-[0.03rem] leading-[30px]">
                    ₹{cart ? cart[0]?.totalAmount : ""}
                  </span>
                </div>
                <div className="price-cart flex justify-end border-t border-t-[#eee] mt-2">
                  <Link
                    onClick={handlesubmit}
                    className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                  >
                    Place Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
