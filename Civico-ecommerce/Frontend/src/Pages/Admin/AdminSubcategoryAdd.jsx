import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adddcategory,
  getAllcategory,
} from "../../redux/features/categorySlice";
import { adddsubcategory } from "../../redux/features/subcategorySlice";

const AdminSubCategoryAdd = () => {
  const { categories, error, message, loading } = useSelector(
    (state) => state.category
  );
  const { subcategories, error:subcateerror, loading:subcateloading } = useSelector(
    (state) => state.subcategory
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
const navigate = useNavigate()
  const categorylist = categories?.categories || "";

  useEffect(() => {
    dispatch(getAllcategory());
  }, [dispatch]);
  const handlesubmit = () => {
    if (!name || !description || !image) {
      alert("Please fill all the fields");
      return;
    }

   let obj = {
    name:name,
    description:description,
    categoryId:category,
    image:image
   }
console.log(obj);

    dispatch(adddsubcategory(obj));
  };

  useEffect(()=>{
      if(subcateerror){
          alert(subcateerror);
      }
      if(subcategories.message == "Subcategory created successfully"){
          alert(categories.message);
          setName('')
          setDescription('')
          setImage('')
          setCategory('')
          navigate('/subcategories/list')
      }
  },[subcategories,subcateerror])

  const handleFileChange = (e) => {
    console.log("Selected File:", e.target.files[0]); // Debugging: Ensure file is captured
    setImage(e.target.files[0]);
  };

  return (
    <section className="flex">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10">
        <h1 className="fs-25 p-color leading-[30px]  ms-3 fw-600 mt-2">
          SubCategory Add
        </h1>

        <div
          className="border rounded-[15px] shadow-md overflow-hidden"
          style={{ margin: "20px 30px" }}
        >
          <div className="row">
            <form className="col-3 p-4">
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  SubCategory Name*
                </label>
                <input
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="SubCategory Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Category Name*
                </label>
                <select
                  className="form-control"
                  value={category} // Bind the selected value
                  onChange={(e) => setCategory(e.target.value)} // Handle change
                >
                  <option value="">Select Category</option>
                  {categorylist && categorylist.map((val, i) => (
                    <option key={i} value={val._id}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Image*
                </label>
                <input
                  type="file"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="SubCategory image"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  SubCategory Description*
                </label>
                <textarea
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="SubCategory Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
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

export default AdminSubCategoryAdd;
