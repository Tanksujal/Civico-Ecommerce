import { useDispatch, useSelector } from "react-redux"; 
import Sidebar from "../../Components/Admin/Sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletesubcategory, getallsubcategory } from "../../redux/features/subcategorySlice";

const AdminSubCategoryList = () => {
    const dispatch = useDispatch();
    const { subcategories } = useSelector(state => state.subcategory);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(()=>{
      dispatch(getallsubcategory());
    },[dispatch])
    const subcategoryList = subcategories?.subcategories || [];
    
    //Filtered category list based on search term
    const filteredCategories = subcategoryList.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="flex">
            <div className="col-2">
                <Sidebar />
            </div>

            <div className="col-10">
                <h1 className="fs-25 p-color leading-[30px]  ms-3 fw-600 mt-2">SubCategory List</h1>

                <div className="border rounded-[15px] shadow-md overflow-hidden" style={{ margin: "20px 30px" }}>
                    <div className="row">
                        <div className="table-cate p-4">
                            <div className="input w-50 mb-3">
                                <input 
                                    type="text" 
                                    className="border rounded px-2 py-1 w-100 form-control" 
                                    placeholder="Search Subcategory .." 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    value={searchTerm}
                                />
                            </div>
                            <table className="table table-hover cursor-pointer">
                                <thead>
                                    <tr>
                                        <th className="leading-[30px] tracking-wider fw-400 p-color">SubCategory</th>
                                        <th className="leading-[30px] tracking-wider fw-400 p-color">Category</th>
                                        <th className="leading-[30px] tracking-wider fw-400 p-color text-center">Action</th>
                                        <th className="leading-[30px] tracking-wider fw-400 p-color text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map(category => (
                                            <tr key={category._id}>
                                                <th scope="row">
                                                    <div className="cate-box-img-text flex items-center">
                                                        <img src={category.image} alt="category" className="w-20 h-20 rounded me-3" />
                                                        <p className="text-sm fw-400">{category.name}</p>
                                                    </div>
                                                </th>
                                                <td>{category.CategoryId.name}</td>
                                                <td>
                                                    <Link to={`/subcategories/edit/${category._id}`} state={{ category }} className="mt-2 btn-main-add-edit justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-1 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                                                        Edit
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className="mt-2 btn-main-add-delete justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-1 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600" onClick={() => dispatch(deletesubcategory(category._id)).then(()=>{
                                                      dispatch(getallsubcategory())
                                                    })}>
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center p-3">No categories found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminSubCategoryList;
