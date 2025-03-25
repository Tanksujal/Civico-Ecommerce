import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategory } from "../../redux/features/categorySlice";
import {
  getallsubcategory,
  adddsubcategory,
} from "../../redux/features/subcategorySlice";
import { addProducts } from "../../redux/features/productSlice";
import axios from "axios";

const AdminProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);
  const { subcategories, error: subcateerror } = useSelector(
    (state) => state.subcategory
  );
  const { products } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [delprice, setdelprice] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [manudeatils, setmanufacturedeatils] = useState("");
  const [policy, setpolicy] = useState("");
  const [addType, setAddType] = useState("adjust"); // Default selection
  const [width, setwidth] = useState("");
  const [height, setheight] = useState("");
  const [text, settext] = useState("");
  const [thickness, setthickness] = useState("");
  const [randomsize, setrandomsize] = useState("");
  const [sizeList, setSizeList] = useState([]); // Array of sizes
  const [weightNumber, setweightNumber] = useState("");
  const [weightUnit, setweightUnit] = useState("");
  const [weightList, setweightList] = useState("");




  const handleAddSize = (e) => {
    e.preventDefault();
    if (addType === "adjust") {
      if (width && height && text) {
        let newSize = {
          width: width,
          height: height,
          text: text,
        };

        setSizeList([...sizeList, newSize]);

        setwidth("");
        setheight("");
        settext("");
      } else {
        alert("Please fill width, height, and text fields");
      }
    } else if (addType === "random") {
      if (randomsize.trim() !== "") {
        let randomnew = {
          randomSize: randomsize,
        };
        setSizeList([...sizeList, randomnew]); // Store random size
        setrandomsize("");
      }
    }
  };
  const handleRemoveSize = (index) => {
    setSizeList(sizeList.filter((_, i) => i !== index));
  };
  const handleAddWeight = (e) => {
    e.preventDefault();
    console.log(weightNumber, weightUnit);

    if (weightNumber && weightUnit) {
      let newWeight = {
        weight: weightNumber,
        unit: weightUnit,
      };
      setweightList([...weightList, newWeight]);
      setweightNumber("");
      setweightUnit("");
    } else {
      alert("Please fill weight number and unit fields");
    }
  };
  const handleweightremove = (index) => {
    setweightList(weightList.filter((_, i) => i !== index));
  };
  const handleRadioChange = (e) => {
    setAddType(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllcategory());
    dispatch(getallsubcategory());
  }, [dispatch]);

  // Filter subcategories based on the selected category
  const filteredSubcategories = subcategories?.subcategories?.filter(
    (sub) => sub.CategoryId._id === category
  );
  useEffect(() => {
    if (products?.message === "Product added successfully") {
      alert(products.message);
      navigate("/product/list");
    }
  }, [products, navigate]);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !subcategory ||
      !category ||
      !price ||
      !unit ||
      !stock
    ) {
      alert("Please fill all the fields");
      return;
    }

    let obj = {
      name,
      description,
      categoryId: category,
      subcategoryId: subcategory,
      image,
      price,
      delprice,
      unit,
      stock,
      manufactureDetails: manudeatils,
      returnPolicy: policy,
      size: sizeList,
      thickness: thickness,
      weight: weightList,
    };
    console.log(obj);

   dispatch(addProducts(obj));
  };

  useEffect(() => {
    if (subcateerror) {
      alert(subcateerror);
    }
  }, [subcateerror]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  

  

  return (
    <section className="flex">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10">
        <h1 className="fs-25 p-color leading-[30px] ms-3 fw-600 mt-2">
          Product Add
        </h1>

        <div
          className="border rounded-[15px] shadow-md overflow-hidden"
          style={{ margin: "20px 30px" }}
        >
          <div className="row">
            <form className="col-3 p-4">
              {/* Product Name */}
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Name*
                </label>
                <input
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Category Selection */}
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Category Name*
                </label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.categories?.map((val) => (
                    <option key={val._id} value={val._id}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Selection (Filtered by Category) */}
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  SubCategory Name*
                </label>
                <select
                  className="form-control"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  disabled={!category} // Disable if no category selected
                >
                  <option value="">Select SubCategory</option>
                  {filteredSubcategories?.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Image*
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              {/* SubCategory Description */}
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Description*
                </label>
                <textarea
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="SubCategory Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Price*
                </label>
                <input
                  type="number"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product DiscountPrice*
                </label>
                <input
                  type="number"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product DelPrice"
                  value={delprice}
                  onChange={(e) => setdelprice(e.target.value)}
                />
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Unit*
                </label>
                <input
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Stock*
                </label>
                <input
                  type="number"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Unit"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Size*
                </label>
                <div>
                  <div className="form-cate-box mt-3">
                    <label className="form-label fs-14 fw-700 tracking-wide">
                      Select Add Type
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="adjust"
                        checked={addType === "adjust"}
                        onChange={handleRadioChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Adjust Size
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="random"
                        checked={addType === "random"}
                        onChange={handleRadioChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Random Add
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {addType === "adjust" && (
                <>
                  <div className="form-cate-box flex">
                    <label className="fs-14 fw-700 tracking-wide me-2">
                      Width*
                    </label>
                    <input
                      type="number"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={width}
                      onChange={(e) => setwidth(e.target.value)}
                    />
                    <label className="form-label fs-14 fw-700 tracking-wide mx-2">
                      Height*
                    </label>
                    <input
                      type="number"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={height}
                      onChange={(e) => setheight(e.target.value)}
                    />
                  </div>
                  <div className="form-cate-box flex mt-2">
                    <label className="fs-14 fw-700 tracking-wide me-2">
                      Text*
                    </label>
                    <input
                      type="text"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={text}
                      onChange={(e) => settext(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleAddSize}
                    className="btn btn-primary mt-2"
                  >
                    {addType === "adjust" ? "Add" : "Add"}
                  </button>
                </>
              )}
              {addType === "random" ? (
                <div className="form-cate-box">
                  <label className="form-label fs-14 fw-700 tracking-wide">
                    Add Random Size*
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control fs-14 fw-400 tracking-wide"
                      placeholder="Add size"
                      value={randomsize}
                      onChange={(e) => setrandomsize(e.target.value)}
                    />
                    <button
                      className="btn btn-primary ms-2"
                      onClick={handleAddSize}
                    >
                      Add
                    </button>
                  </div>

                  {/* ✅ Show added sizes with delete button */}
                  <div className="mt-3">
                    {sizeList.map((size, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <span className="me-2">{size.randomSize}</span>
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => handleRemoveSize(index)}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="form-cate-box border rounded px-2 pb-2 mt-3 mb-2">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Weight*
                </label>
                <>
                  <div className="form-cate-box flex">
                    <label className="fs-14 fw-700 tracking-wide me-2">
                      Number*
                    </label>
                    <input
                      type="text"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={weightNumber}
                      onChange={(e) => setweightNumber(e.target.value)}
                    />
                    <label className="form-label fs-14 fw-700 tracking-wide mx-2">
                      Unit*
                    </label>
                    <input
                      type="text"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={weightUnit}
                      onChange={(e) => setweightUnit(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleAddWeight}
                    className="btn btn-primary mt-2"
                  >
                    Add
                  </button>
                  <div className="mt-3">
                    {weightList &&
                      weightList.map((size, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mb-2"
                        >
                          <span className="me-2">
                            {size.weight} {size.unit}
                          </span>
                          <button
                            className="btn btn-danger btn-sm"
                            type="button"
                            onClick={() => handleweightremove(index)}
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                  </div>
                </>
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Thickness*
                </label>
                <textarea
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Thickness"
                  value={thickness}
                  onChange={(e) => setthickness(e.target.value)}
                />
              </div>







              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Manufacture Deatils*
                </label>
                <textarea
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Manufacture Deatils"
                  value={manudeatils}
                  onChange={(e) => setmanufacturedeatils(e.target.value)}
                />
              </div>

              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Product Return Policy*
                </label>
                <textarea
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Product Return Policy"
                  value={policy}
                  onChange={(e) => setpolicy(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="form-cate-box mt-3">
                <Link
                  type="submit"
                  onClick={handlesubmit}
                  className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                >
                  {loading ? "Adding" : "Add"}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProductAdd;
