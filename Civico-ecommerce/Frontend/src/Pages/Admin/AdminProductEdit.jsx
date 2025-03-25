import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategory } from "../../redux/features/categorySlice";
import {
  getallsubcategory,
  adddsubcategory,
} from "../../redux/features/subcategorySlice";
import { addProducts, editproduct } from "../../redux/features/productSlice";

const AdminProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {id} = useParams;
    const location = useLocation()
  const { categories, loading } = useSelector((state) => state.category);
  const { subcategories, error: subcateerror } = useSelector(
    (state) => state.subcategory
  );
  const { products } = useSelector(
    (state) => state.product
  );

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
  const [randomsize,setrandomsize] = useState("")
  const handleRadioChange = (e) => {
    setAddType(e.target.value);
  };

console.log(location?.state?.category);

  useEffect(()=>{
    setName(location?.state?.category?.name)
    setCategory(location?.state?.category.CategoryId._id)
    setSubcategory(location?.state?.category.SubCategoryId._id)
    setImage(location?.state?.category.image)
    setPrice(location?.state?.category.price)
    setdelprice(location?.state?.category.delPrice)
    setUnit(location?.state?.category.unit)
    setStock(location?.state?.category.stock)
    setmanufacturedeatils(location?.state?.category.manufacturedeatils) 
    setpolicy(location?.state?.category.policy)
    if(location?.state?.category.size[0].width ||location?.state?.category.size[0].height || location?.state?.category.size[0].text){
        setwidth(location?.state?.category.size[0].width)
        setheight(location?.state?.category.size[0].height)
        settext(location?.state?.category.size[0].text)
    }
  })

  useEffect(() => {
    dispatch(getAllcategory());
    dispatch(getallsubcategory());
  }, [dispatch]);

  // Filter subcategories based on the selected category
  const filteredSubcategories = subcategories?.subcategories?.filter(
    (sub) => sub.CategoryId._id === category
  );
  useEffect(()=>{
    if(products?.message === "Product added successfully"){
      alert(products.message)
      navigate('/product/list')
    }
  },[products,navigate])

  const handlesubmit = () => {
    if (
      !name ||
      !description ||
      !image ||
      !subcategory ||
      !category ||
      !image ||
      !price ||
      !unit ||
      !stock
    ) {
      alert("Please fill all the fields");
      return;
    }
    let size = {
      width: width,
      height: height,
      text: text,
    };
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
      size: size,
      thickness: thickness,
    };
    console.log(obj);

    dispatch(editproduct({id,obj}));
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
                  value={name}
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
                  value={description}
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

              {addType === "adjust" ? (
                <>
                  <div className="form-cate-box flex">
                    <label className=" fs-14 fw-700 tracking-wide me-2">
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
                    <label className=" fs-14 fw-700 tracking-wide me-2">
                      Text*
                    </label>
                    <input
                      type="text"
                      className="form-control fs-14 fw-400 tracking-wide"
                      value={text}
                      onChange={(e) => settext(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}   

              {addType === "random" ? (
                 <div className="form-cate-box">
                 <label className="form-label fs-14 fw-700 tracking-wide">
                   Add RandomSize*
                 </label>
                 <textarea
                   type="text"
                   className="form-control fs-14 fw-400 tracking-wide"
                   placeholder="add"
                   value={randomsize}
                   onChange={(e) => setrandomsize(e.target.value)}
                 />
               </div>
              ): ""}
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

export default AdminProductEdit;
