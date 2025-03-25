import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteproductfromcart,
  GetCart,
  UpdateCartQuantity,
  UpdateminQuantity,
} from "../redux/features/cartSlice";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const increaseQuantity = ({ productId, size }) => {
    dispatch(
      UpdateCartQuantity({ productId, newQuantity: 1, selectedSize: size })
    ).then(() => dispatch(GetCart()));
  };

  const { cart, error, loading, message } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(GetCart());
  }, [dispatch, cart]);
  const decreaseQuantity = ({ productId, size }) => {
    dispatch(
      UpdateminQuantity({ productId, newQuantity: 1, selectedSize: size })
    ).then(() => dispatch(GetCart()));
  };

  return (
    <section>
      <div className="container ">
        <div className="row flex items-center">
          <div className="col-2">
            <div className="logo-header cursor-pointer">
              <img
                src="../../c-webp.webp"
                className="h-[70px] w-[130px]"
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="search-bar w-100">
              <input
                type="text"
                placeholder="Search"
                className="border p-2 w-100 rounded-[10px]"
              />
            </div>
          </div>
          <div className="col-4 flex align-center justify-end">
            {/* Dropdown Wrapper */}
            <div
              className="links-header pe-3 relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Account Login Button */}
              <div className="login-button flex items-center cursor-pointer">
                <FaUserTie className="h-[25px] secondary-text" />
                <span className="ps-2 bg-main-text tracking-[0.03rem] leading-[28px]">
                  {user ? "Profile" : "Login"}
                </span>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className="absolute top-full left-0 mt-0 w-40 bg-white border rounded-lg shadow-lg z-50"
                  style={{ minHeight: "10px", paddingTop: "5px" }}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 p-color hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 p-color hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 p-color hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <div className="links-header pe-3">
              <button onClick={() => setIsCartOpen(true)} className="relative">
                🛒 Cart
                {cart?.[0]?.cartItems?.length > 0 && (
                  <span className="absolute top-[-10px] right-[-22px] bg-red-500 text-white text-xs px-2 py-1 rounded-[30px]">
                    {cart[0].cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal (Animated) */}
      <div className={`fixed top-0 right-0 w-[600px] h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
  {/* Header */}
  <div className="flex justify-between items-center border-b border-b-[#eee] p-4 bg-white">
    <h2 className="fs-18 banner-font bg-main-text tracking-[0.03rem] leading-[1.2] fw-800">
      My Cart
    </h2>
    <button
      className="bg-main-text pe-2 hover:text-black"
      onClick={() => setIsCartOpen(false)}
    >
      ✖
    </button>
  </div>

  {/* Scrollable Content */}
  <div className="h-[calc(100vh-60px)] overflow-y-auto">
    <div className="container-fluid p-3">
      <div className="cart-box">
        {cart[0]?.cartItems?.length > 0 ? (
          cart[0]?.cartItems?.map((item, i) => (
            <div className="cart-item-box bg-2 border rounded-[20px] flex overflow-hidden p-3 mt-3" key={i}>
              <div className="col-4 me-3">
                <div className="cart-image border rounded-[20px] overflow-hidden">
                  <img src={item.productId.image} alt={item.name} />
                </div>
              </div>
              <div className="col-8">
                <div className="cart-content flex flex-column">
                  <h4 className="fs-14 section-title-color tracking-[0.03rem] leading-[30px] fw-700 banner-font">
                    {item.productId.name}
                  </h4>
                  <span className="price-text fs-14 li-color fw-200 tracking-[0.03rem] leading-[30px] bg-main-text">
                    ₹{item.price}/{item.quantity}{item.productId.unit}  (₹{item.productId.price}/{item.productId.unit}) +18% GST
                  </span>
                  <span className="fs-16 p-color text-black">
                    ₹{item.GstPrice?.toFixed(2)}
                  </span>
                  <div className="product-item-quantity mt-3 flex items-center justify-between">
                    <div className="qty-box w-[85px] h-[40px] border flex items-center justify-center rounded-[10px]">
                      <div className="min w-[25px] flex items-center justify-center cursor-pointer" onClick={() => decreaseQuantity({ productId: item.productId._id, size: item.productId.size[0] })}>
                        -
                      </div>
                      <input type="text" className="w-[32px] h-auto text-center border-none outline-none flex items-center justify-center p-color" value={item.quantity} readOnly />
                      <div className="plus w-[25px] flex items-center justify-center cursor-pointer" onClick={() => increaseQuantity({ productId: item.productId._id, size: item.productId.size[0] })}>
                        +
                      </div>
                    </div>
                    <div className="remove-btn border p-1 rounded me-3">
                      <span className="cursor-pointer">
                        <MdDeleteOutline className="fs-18 text-red-500" onClick={() => dispatch(deleteproductfromcart(item.productId._id)).then(() => dispatch(GetCart()))} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Show this when the cart is empty
          <div className="flex flex-col items-center justify-center text-center py-10">
            <img src="https://i.pinimg.com/736x/c6/0f/ea/c60fea3ac3aab2e82c2f7ea901ef55f6.jpg" alt="Empty Cart" className="w-40 h-40 mb-4" />
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="mt-4 px-4 py-2 secondary-bg text-white rounded-lg hover:bg-blue-600 transition">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>

    {/* Footer */}
    {cart[0]?.cartItems?.length > 0 && (
      <div className="total-price-box border-t-[#eee] border-t p-3 bg-white sticky bottom-0">
        <div className="price-cart flex justify-between">
          <span className="fs-14 li-color fw-500 tracking-[0.03rem] leading-[30px]">Total:</span>
          <span className="fs-14 li-color fw-500 tracking-[0.03rem] leading-[30px]">₹{cart[0].totalAmount}</span>
        </div>
        <div className="price-cart flex justify-end border-t border-t-[#eee] my-3">
          <Link to="/checkout" className="mt-3 btn-main-add flex justify-center items-center text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
            Checkout
          </Link>
        </div>
      </div>
    )}
  </div>
</div>


      {/* Overlay Background when Modal is Open */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)} // Close modal on clicking outside
        />
      )}
    </section>
  );
};

export default Header;
