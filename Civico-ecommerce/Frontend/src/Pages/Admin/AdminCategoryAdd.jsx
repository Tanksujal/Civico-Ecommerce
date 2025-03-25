import { Link } from "react-router-dom"
import Sidebar from "../../Components/Admin/Sidebar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { adddcategory } from "../../redux/features/categorySlice";
import { CgSpinner } from "react-icons/cg";

const AdminCategoryAdd = () => {
const {categories,error,message,loading} = useSelector((state)=>state.category)
const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [image,setImage] = useState("");
const dispatch = useDispatch()
const handlesubmit = () => {
    if (!name || !description || !image) {
        alert("Please fill all the fields");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image); // Ensure `image` is a File object

    // Debugging: Check FormData contents
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);  // This should log name, description, and image
    }

    dispatch(adddcategory(formData));
};



useEffect(()=>{
    if(error){
        alert(error);
    }
    if(categories.message == "Category created successfully"){
        alert(categories.message);
        setName('')
        setDescription('')
        setImage('')
    }
},[categories,error])


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
        <h1 className="fs-25 p-color leading-[30px]  ms-3 fw-600 mt-2">Category Add</h1>

        <div className="border rounded-[15px] shadow-md overflow-hidden" style={{ margin: "20px 30px" }}>
            <div className="row">
                <form className="col-3 p-4" >
                    <div className="form-cate-box">
                        <label className="form-label fs-14 fw-700 tracking-wide">Category Name*</label>
                        <input type="text" className="form-control fs-14 fw-400 tracking-wide" placeholder="Category Name" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="form-cate-box mt-3">
                        <label className="form-label fs-14 fw-700 tracking-wide">Image*</label>
                        <input type="file" className="form-control fs-14 fw-400 tracking-wide" placeholder="Category Name" onChange={handleFileChange}/>
                    </div>
                    <div className="form-cate-box mt-3">
                        <label className="form-label fs-14 fw-700 tracking-wide">Category Description*</label>
                        <textarea type="text" className="form-control fs-14 fw-400 tracking-wide" placeholder="Category Description" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-cate-box mt-3">
                    <Link type="submit" onClick={handlesubmit} className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                              {
                                loading ? "Adding" : "Add"
                              }
                            </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default AdminCategoryAdd
