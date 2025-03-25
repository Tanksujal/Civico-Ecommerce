import { useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getalluser } from "../../redux/features/Admin/adminUserSlice";
const ManageUsers = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getalluser())
    },[dispatch])

    const {users,message,loading,error} = useSelector((state) => state.adminuser)
    console.log(users);
    
    
    

  return (
    <section className="flex">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10">
        <div className="container-fluid ">
          <div className="row">
            <div className="users-box border rounded p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">No</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Name</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">MobileNumber</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Email</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Typeuse</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">CompanyName</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">GST Number</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Site Name</th>
                    <th scope="col" className="leading-[30px] tracking-wider fw-400 p-color">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users?.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index+1}</td>
                            <td>{user.name || "Not Edited Yet"} </td>
                            <td>{user.mobileNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.Typeuse}</td>
                            <td>{user.Company?.companyName}</td>
                            <td>{user.Company?.GSTnumber}</td>
                            <td>{user.Site[0]?.siteName}</td>
                            <td>{user.Site[0]?.siteAddress} {user.Site[0]?.siteState} {user.Site[0]?.siteCity} {user.Site[0]?.sitePin}</td>
                        </tr>

                  
                  ))  }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
