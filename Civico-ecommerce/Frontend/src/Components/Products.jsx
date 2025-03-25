import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../redux/features/productcateSlice";
import { AnimatePresence, motion } from "framer-motion";
import { AddCart } from "../redux/features/cartSlice";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); //
  const navigate = useNavigate()
  const dispatch = useDispatch();
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

  // Get categories from Redux
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category
  );

  // Get products from Redux
  const { categoryProducts, loading: productLoading } = useSelector(
    (state) => state.productCategory
  );
  const { user, loading: usersloading } = useSelector(
    (state) => state.user
  );


  // Fetch products when categories load
  useEffect(() => {
    if (categories?.categories) {
      categories.categories.forEach((category) => {
        dispatch(fetchProductsByCategory(category._id));
      });
    }
  }, [categories, dispatch]);

  const handleAddToCart = () => {
    if(!user){
      alert("Please login to add product to cart")
      navigate('/login')
    }
    if(selectedProduct.unit === "sqf"){
      if (activeIndex === null) {
        alert("Please select a size before adding to cart!");
        return;
      }
    }

    // Create cart item object with the selected size/weight

    dispatch(
      AddCart({
        productId: selectedProduct._id,
        quantity,
        selectedSize: selectedProduct.size[activeIndex],
      })
    );
    closeModal(); // Close modal after adding
  };

  return (
    <section>
      <div className="container">
        {categoryLoading ? (
          <p>Loading Categories...</p>
        ) : (
          categories?.categories?.map((category, i) => (
            <div key={category._id} className="mb-10">
              {/* Category Name */}
              <h2 className="banner-font fs-25 section-title-color capitalize leading-[1] tracking-[0.03rem]">
                {category.name}
              </h2>

              {/* Product List */}
              <div className="my-5 product-box grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {productLoading ? (
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
                ) : categoryProducts[category._id]?.length > 0 ? (
                  categoryProducts[category._id].map((val) => {
                    const discountPercentage =
                      ((val.delPrice - val.price) / val.delPrice) * 100;

                    return (
                      <div
                        key={val._id}
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
                                  {" "}
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
                            <Link
                              className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                              onClick={() => openModal(val)}
                            >
                              Add to Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500">
                    No products available in this category.
                  </p>
                )}
               <AnimatePresence>
      {isModalOpen && selectedProduct && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative overflow-hidden"
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
              {console.log(selectedProduct)
              }
              <div className="col-5">
                <div className="model-box-img border h-100 rounded flex justify-center items-center overflow-hidden cursor-pointer px-2">
                  <img
                    src={selectedProduct.image}
                    className="h-50 overflow-hidden rounded"
                    alt={selectedProduct.name}
                  />
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
                            ((selectedProduct.delPrice - selectedProduct.price) /
                              selectedProduct.delPrice) *
                            100
                          ).toFixed(2)}
                          % OFF
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Size - Only show if product has sizes */}
                  {selectedProduct.size && selectedProduct.size.length > 0 && (
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">Size</span>
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
                           {unit.width ? `${unit.width}x${unit.height} ${unit.text}` : unit.randomSize}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Weight - Only show if product has weight */}
                  {selectedProduct.weight && selectedProduct.weight.length > 0 && (
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">Weight</span>
                      <ul className="p-0 mt-1 flex">
                        {selectedProduct.weight.map((unit, index) => (
                          <li
                            key={index}
                            className="py-3 me-2 px-3 h-[22px] border cursor-pointer p-color flex items-center justify-center fs-14 leading-[22px] rounded-[10px] fw-300 secondary-bg text-white"
                          >
                            {unit.weight} {unit.unit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {console.log(selectedProduct.weight)
                  }
                  {/* Thickness - Only show if product has thickness */}
                  {/* {selectedProduct.thickness &&selectedProduct.thickness.length > 0 && (
                    <div className="unit-btn mt-1">
                      <span className="fs-14 banner-font fw-600 ps-1">Thickness</span>
                      <ul className="p-0 mt-1 flex">
                        <li className="py-3 me-2 px-3 h-[22px] border cursor-pointer p-color flex items-center justify-center fs-14 leading-[22px] rounded-[10px] fw-300">
                          {selectedProduct.thickness}
                        </li>
                      </ul>
                    </div>
                  )} */}
                  
                  {/* Price calculation info - Only show for area-based products */}
                  {selectedProduct.unit === "sqf" && 
                   selectedProduct.size && 
                   selectedProduct.size.length > 0 && 
                   activeIndex !== null && (
                    <div className="mt-3 border rounded-[10px] p-3 bg-gray-50">
                      <span className="fs-14 banner-font fw-600">Price Calculation</span>
                      <ul className="p-0 mt-1">
                        <li className="fs-14 fw-300">
                          Area: {selectedProduct.size[activeIndex].width} × {selectedProduct.size[activeIndex].height} = {selectedProduct.size[activeIndex].width * selectedProduct.size[activeIndex].height} sqf
                        </li>
                        <li className="fs-14 fw-300">
                          Base: ₹{selectedProduct.price} × {selectedProduct.size[activeIndex].width * selectedProduct.size[activeIndex].height} = ₹{(selectedProduct.price * selectedProduct.size[activeIndex].width * selectedProduct.size[activeIndex].height).toFixed(2)}
                        </li>
                        <li className="fs-14 fw-300">
                          GST (18%): ₹{(selectedProduct.price * selectedProduct.size[activeIndex].width * selectedProduct.size[activeIndex].height * 0.18).toFixed(2)}
                        </li>
                        <li className="fs-14 fw-600">
                          Final: ₹{(selectedProduct.price * selectedProduct.size[activeIndex].width * selectedProduct.size[activeIndex].height * 1.18).toFixed(2)}
                        </li>
                      </ul>
                    </div>
                  )}

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
                    <Link
                      className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                      onClick={handleAddToCart}
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
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Products;
