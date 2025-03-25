import { useEffect, useState } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { editCategory } from "../../redux/features/categorySlice";

const AdminCategoryEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, error, loading } = useSelector(
    (state) => state.category
  );

useEffect(() => {
    setName(location?.state?.category?.name || "");
    setDescription(location?.state?.category?.description || "");
    setImage(location?.state?.category?.image || "");
  }, [location.state]);
  

  const handlesubmit = () => {
  if (!name || !description) {
    alert("Please fill all the fields");
    return;
  }

  const obj = {
    name:name,
    description:description,
    image:image
  }
  dispatch(editCategory({ id, obj }));
};

  const handleFileChange = (e) => {// Debugging: Ensure file is captured
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (categories.message === "Category updated successfully") {
      alert(categories.message);
      navigate("/categories/list");
    }
  },);
  return (
    <section className="flex">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10">
        <h1 className="fs-25 p-color leading-[30px]  ms-3 fw-600 mt-2">
          Category Edit
        </h1>

        <div
          className="border rounded-[15px] shadow-md overflow-hidden"
          style={{ margin: "20px 30px" }}
        >
          <div className="row">
            <form className="col-3 p-4">
              <div className="form-cate-box">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Category Name*
                </label>
                <input
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Category Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Image*
                </label>
                <input
                  type="file"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Category Name"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-cate-box mt-3">
                <label className="form-label fs-14 fw-700 tracking-wide">
                  Category Description*
                </label>
                <textarea
                  type="text"
                  className="form-control fs-14 fw-400 tracking-wide"
                  placeholder="Category Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="form-cate-box mt-3">
                <Link
                  type="submit"
                  onClick={handlesubmit}
                  className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                >
                  {
                                loading ? "Loading" : "Edit"
                              }
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCategoryEdit;
