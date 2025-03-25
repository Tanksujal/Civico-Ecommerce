import TopHeader from "../Components/TopHeader";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"; // Removed navigation CSS
import { Autoplay } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getsubcategorybycategory } from "../redux/features/subcategorySlice";
import { getallproductBysubcategory } from "../redux/features/productSlice";
import { AddCart } from "../redux/features/cartSlice";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

const ShowProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Example options

  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    categories,
    error: categoryError,
    message: categoryMessage,
    loading: categoryLoading,
  } = useSelector((state) => state.category);

  const {
    subcategories,
    error: subcategoryError,
    message: subcategoryMessage,
    loading: subcategoryLoading,
  } = useSelector((state) => state.subcategory);
  const {
    products,
    error: producterror,
    message: productMessage,
    loading: productLoading,
  } = useSelector((state) => state.product);
  const {
    cart,
    error: carterror,
    message: cartMessage,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  

  const categoryList = categories?.categories || [];
  const subcategoryList = subcategories?.subcategories || [];
  const productList = products?.products || [];

  useEffect(() => {
    if (location.pathname.includes("category")) {
      console.log(id);

      // Fetch subcategories by category ID
      dispatch(getsubcategorybycategory(id));
    } else if (location.pathname.includes("sub")) {
      // Fetch products by subcategory ID
      console.log(id);

      dispatch(getallproductBysubcategory(id));
    }
  }, [id, location.pathname, dispatch]);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Mixed fruits chocolates pack",
  //     image:
  //       "https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/product/1.jpg",
  //     price: "₹ 250",
  //     oldPrice: "₹ 270",
  //     description: "A delicious mix of fruits and chocolates in one pack.",
  //   },
  //   {
  //     id: 2,
  //     name: "Organic Apple Pack",
  //     image:
  //       "https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/product/2.jpg",
  //     price: "₹ 180",
  //     oldPrice: "₹ 200",
  //     description: "Fresh and organic apples sourced from the best farms.",
  //   },
  // ];
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Swiper
                slidesPerView={6}
                spaceBetween={20}
                autoplay={{
                  delay: 1000, // Slide every 1 second
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper mt-4"
              >
                {categoryLoading ? (
                  <SwiperSlide>
                    <div className="animate-pulse overflow-hidden rounded-[15px] text-center w-100 h-auto cursor-pointer">
                      <div className="bg-gray-300 w-full h-[150px] rounded-[15px]"></div>
                      <div className="mt-2 bg-gray-300 h-5 w-3/4 mx-auto rounded"></div>
                    </div>
                  </SwiperSlide>
                ) : (
                  categoryList.map((category, i) => (
                    <SwiperSlide key={category._id || i}>
                      <Link
                        to={`/showproducts/category/${category._id}`}
                        className="overflow-hidden rounded-[15px] text-center w-100 h-auto cursor-pointer"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-[150px] object-cover rounded-[15px]"
                        />
                        <h3 className="cate-box banner-font bg-main-text fs-18 text-center mt-2 fw-600 leading-2 tracking-[0.03rem]">
                          {category.name}
                        </h3>
                      </Link>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section style={{ marginBottom: "50px" }}>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="subcate-box">
                {subcategoryLoading
                  ? Array(5)
                      .fill()
                      .map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse flex items-center border rounded p-2 cursor-pointer mt-2"
                        >
                          <div className="bg-gray-300 w-[100px] h-[100px] rounded overflow-hidden"></div>
                          <div className="ms-2 flex flex-col justify-center w-full">
                            <div className="bg-gray-300 h-5 w-3/4 rounded mb-2"></div>
                            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                          </div>
                        </div>
                      ))
                  : subcategoryList.map((subcategory, i) => (
                      <Link
                        to={`/showproducts/sub/${subcategory._id}`}
                        className="subcate-boxes border rounded p-2 flex items-center cursor-pointer mt-2"
                        key={i}
                      >
                        <div className="img-subcate w-[100px] rounded overflow-hidden">
                          <img src={subcategory.image} alt="" />
                        </div>
                        <div className="content-subcate ms-2 flex flex-column justify-center">
                          <span className="fs-16 leading-[1.5] tracking-[0.03rem]">
                            {subcategory.name}
                          </span>
                          <p className="p-color m-0 fs-14 leading-[1.5] tracking-[0.03rem]">
                            items
                          </p>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="col-9">
              <div className="product-box grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {productList.map((val, i) => {
                  const discountPercentage =
                    ((val.delPrice - val.price) / val.delPrice) * 100;
                  return (
                    <div key={++i}>
                      <div
                        className="products-box border rounded-[10px] overflow-hidden cursor-pointer flex flex-col h-full"
                        onClick={() => openModal(val)}
                      >
                        <div className="products-image bg-white h-[200px] flex items-center justify-center">
  <img
    src={val.image}
    alt={val.name}
    className="w-full h-full object-cover"
  />
</div>

                        <div
                          className="products-content border-t border-t-[#dee2e6] flex-grow flex flex-col justify-between"
                          style={{ padding: "3px 15px" }}
                        >
                          <div className="subtitle py-1">
                            <a
                              href="#"
                              className="fs-15 banner-font bg-main-text tracking-[0.03rem] leading-[18px] fw-800 text-ellipsis w-full"
                            >
                              {val.name}
                            </a>
                          </div>
                          <div className="pricing flex justify-between">
                            <div className="price flex flex-column">
                              <span className="price-text fs-16 bg-main-text fw-700 banner-font">
                                ₹{val.price}
                                <span className="fw-300 fs-14 li-color">
                                  / {val.unit}
                                </span>
                              </span>
                              <del className="fs-16 bg-main-text banner-font">
                                ₹{val.delPrice}
                              </del>
                              {val.delPrice > val.price && (
                                <span className="discount-text fs-14 text-success">
                                  {discountPercentage.toFixed(2)}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="py-2">
                            <Link className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                              Add to Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className=" bg-white p-6 rounded-lg shadow-lg w-1/2 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="row relative">
                <button
                  className="absolute top-2 right-2 text-xl text-gray-600 flex justify-end pe-3"
                  onClick={closeModal}
                >
                  ✖
                </button>
                <div className="col-4">
                  <div className="model-box-img border m-3 rounded">
                    <img src={selectedProduct.image} alt="" />
                  </div>
                </div>
                <div className="col-6 flex justify-center">
                  <div className="model-contet my-3">
                    <div className="model-name">
                      <h4 className="fs-14 section-title-color tracking-[0.03rem] leading-[30px] fw-600 banner-font">
                        {selectedProduct.name}{" "}
                      </h4>
                    </div>
                    <div className="model-describtion">
                      <p className="fs-15 li-color fw-300 leading-[24px]">
                        {selectedProduct.description}
                      </p>
                    </div>
                    <div className="pricing flex justify-between">
                      <div className="price flex">
                        <span className="price-text fs-16 bg-main-text fw-700 banner-font">
                          ₹{selectedProduct.price}
                          <span className="li-color fw-300 fs-14">
                            /{selectedProduct.unit}
                          </span>
                        </span>
                        <del className="fs-16 bg-main-text banner-font px-2">
                          ₹{selectedProduct.delPrice}
                        </del>
                        {selectedProduct.delPrice > selectedProduct.price && (
                          <p className="discount-text fs-14 text-success">
                            {(
                              ((selectedProduct.delPrice -
                                selectedProduct.price) /
                                selectedProduct.delPrice) *
                              100
                            ).toFixed(2)}
                            % OFF
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">
                        Size
                      </span>
                      <ul className="p-0 mt-1 flex">
                        {selectedProduct.size.map((unit, index) => (
                          <li
                            key={index}
                            className={`py-3 me-2 px-3 h-[22px] border cursor-pointer p-color flex items-center justify-center fs-14 leading-[22px] rounded-[10px] fw-300 ${
                              activeIndex === index
                                ? "secondary-bg text-white"
                                : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                          >
                            {unit.width}x{unit.height} {unit.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">
                        Weight
                      </span>
                      <ul className="p-0 mt-1 flex">
                        {selectedProduct.weight.map((unit, index) => (
                          <li
                            key={index}
                            className={`py-3 me-2 px-3 h-[22px] border cursor-pointer p-color flex items-center justify-center fs-14 leading-[22px] rounded-[10px] fw-300 secondary-bg text-white
                            }`}
                            
                          >
                            {unit.number} {unit.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">
                        Thickness
                      </span>
                      <ul className="p-0 mt-1 flex">
                        <li
                          className={`py-3 me-2 px-3 h-[22px] border cursor-pointer p-color flex items-center justify-center fs-14 leading-[22px] rounded-[10px] fw-300}`}
                        >
                          {selectedProduct.thickness}
                        </li>
                      </ul>
                    </div>
                    <div className="product-item-quantity mt-3">
                      <div className="qty-box w-[85px] h-[40px] border flex items-center justify-center rounded-[10px]">
                        <div
                          className="min w-[25px] flex items-center justify-center cursor-pointer"
                          onClick={decreaseQuantity}
                        >
                          -
                        </div>
                        <input
                          type="text"
                          className="w-[32px] h-auto text-center border-none outline-none flex items-center justify-center p-color"
                          value={quantity}
                          onChange={(e) => {
                            let value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value >= minQuantity) {
                              setQuantity(value);
                            }
                          }}
                        />
                        <div
                          className="plus w-[25px] flex items-center justify-center cursor-pointer"
                          onClick={increaseQuantity}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="add-to-cart">
                      <Link className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                         onClick={()=>
                          dispatch(AddCart({productId:selectedProduct._id,quantity,selectedSize:selectedProduct.size[activeIndex]}))
                         }
                      >
                     Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default ShowProducts;
