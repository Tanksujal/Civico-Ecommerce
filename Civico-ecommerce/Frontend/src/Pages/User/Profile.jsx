import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import TopHeader from "../../Components/TopHeader";
import SidebarProfile from "../../Components/User/sidebarProfile";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
const Profile = () => {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [Typeuse, setTypeuse] = useState("");
  const [commpanyname, setcommpanyname] = useState("");
  const [Gstnumber, setGstnumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sitename, setsitename] = useState("");
  const [sitecity, setsitecity] = useState("");
  const [sitestate, setsitestate] = useState("");
  const [sitepin, setsitepin] = useState("");
  const [siteaddress, setsiteaddress] = useState("");
  const [siteList, setsitelist] = useState([]);
  const { user, error, loading, message } = useSelector((state) => state.user);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const Editsite = () => {
    let sitedata = {
      siteName: sitename,
      siteAddress: siteaddress,
      siteCity: sitecity,
      siteState: sitestate,
      sitePin: sitepin,
    };
    setsitelist([sitedata]);
    sitedata = null;
    setsitename("");
    setsiteaddress("");
    setsitecity("");
    setsitestate("");
    setsitepin("");
    closeModal();
  };
  useEffect(() => {
    setname(user?.name);
    setemail(user?.email);
    setTypeuse(user?.typeuse);
    setcommpanyname(user?.Company?.companyName);
    setGstnumber(user?.Company?.GSTnumber);
    setsitelist(user?.Site);
  }, [user]);
  useEffect(()=>{
    if(error){
      alert(error);
      toast.error(error)
    }else if(message === "Profile updated successfully"){
      toast.success(message);
    }
  },[error,message])

  const handlesubmit = () => {
    let userdata = {
      name: name,
      email: email,
      Typeuse: Typeuse,
      Company: {
        companyName: commpanyname,
        GSTnumber: Gstnumber,
      },
      Site: siteList,
    };
    dispatch(updateUser(userdata));
  };
  return (
    <section>
      <ToastContainer />
      <TopHeader />
      <Header />
      <Navbar />

      <div className="container-fluid " style={{ padding: "50px 20px" }}>
        <div className="row flex">
          <SidebarProfile />
          <div className="col-10">
            <div className="container-fluid">
              <div className="row">
                <div className="profile-box flex border rounded my-3">
                  <div className="col-6 my-3">
                    <div className="form-box flex flex-column">
                      <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500 ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="border w-50 rounded px-2 py-1 bg-main-text mt-2"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="form-box flex flex-column mt-3">
                      <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500 ">
                        MobileNumber*
                      </label>
                      <input
                        type="number"
                        className="border w-50 rounded px-2 py-1 bg-main-text mt-2"
                        value={user?.mobileNumber}
                      />
                    </div>
                    <div className="form-box flex flex-column mt-3">
                      <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500 ">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border w-50 rounded px-2 py-1 bg-main-text mt-2"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <div className="form-box flex flex-column mt-3">
                      <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500 ">
                        TypeUse*
                      </label>
                      <select
                        className="form-select w-50 mt-2"
                        onChange={(e) => setTypeuse(e.target.value)}
                        value={Typeuse}
                      >
                        <option value={"Personal"}>Personal</option>
                        <option value={"Company"}>Company</option>
                      </select>
                    </div>
                    {
                      Typeuse === "Company" ? (
                        <>
                          <div className="form-box flex flex-column mt-3">
                            <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500">
                              Companyname
                            </label>
                            <input
                              type="text"
                              className="border w-50 rounded px-2 py-1 bg-main-text"
                              value={commpanyname}
                              onChange={(e) => setcommpanyname(e.target.value)}
                            />
                          </div>

                          <div className="form-box flex flex-column mt-3">
                            <label className="fs-16 li-color tracking-[0.02rem] leading-[26px] fw-500">
                              GST Number
                            </label>
                            <input
                              type="text"
                              className="border w-50 rounded px-2 py-1 bg-main-text"
                              value={Gstnumber}
                              onChange={(e) => setGstnumber(e.target.value)}
                            />
                          </div>
                        </>
                      ) : null // Don't render anything if Typeuse is not "Company"
                    }
                  </div>
                  <div className="col-6">
                    <div className="form-box flex flex-column mt-3">
                      <div className="form-box mt-3">
                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                          Edit Site*
                        </label>
                        <div className="form-box flex flex-column border rounded p-2 my-3">
                          {siteList?.length > 0 ? (
                            siteList.map((val, index) => (
                              <div key={index} className="mb-2">
                                <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  {val.siteName}
                                </span>
                                <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  {val.siteAddress}
                                </span>
                                <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  {val.siteState}
                                </span>
                                <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  {val.siteCity}
                                </span>
                                <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  {val.sitePin}
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                              No Site Found.
                            </span>
                          )}
                        </div>

                        <AnimatePresence>
                          {isModalOpen && (
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
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                              >
                                <div className="row relative">
                                  <button
                                    className="absolute top-2 right-2 text-xl text-gray-600 flex justify-end pe-3"
                                    onClick={closeModal}
                                  >
                                    ✖
                                  </button>

                                  <div className="container-fluid">
                                    <div className="row px-3 py-4">
                                      <div className="form-box flex flex-column mt-3">
                                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                          Site Name*
                                        </label>
                                        <input
                                          type="text"
                                          className="border rounded px-2 py-2 bg-main-text"
                                          placeholder="Enter Your Site Name"
                                          onChange={(e) =>
                                            setsitename(e.target.value)
                                          }
                                          value={sitename}
                                        />
                                      </div>
                                      <div className="form-box flex flex-column mt-3">
                                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                          Address*
                                        </label>
                                        <textarea
                                          type="text"
                                          className="border rounded px-2 py-2 bg-main-text w-full h-[50px]"
                                          placeholder="Enter Your Address"
                                          onChange={(e) =>
                                            setsiteaddress(e.target.value)
                                          }
                                          value={siteaddress}
                                        />
                                      </div>
                                      <div className="form-box flex flex-column mt-3">
                                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                          Pin Code*
                                        </label>
                                        <input
                                          type="number"
                                          className="border rounded px-2 py-2 bg-main-text"
                                          placeholder="Enter Your Pincode"
                                          onChange={(e) =>
                                            setsitepin(e.target.value)
                                          }
                                          value={sitepin}
                                        />
                                      </div>
                                      <div className="form-box flex flex-column mt-3">
                                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                          State*
                                        </label>
                                        <input
                                          type="text"
                                          className="border rounded px-2 py-2 bg-main-text"
                                          placeholder="Enter Your State"
                                          onChange={(e) =>
                                            setsitestate(e.target.value)
                                          }
                                          value={sitestate}
                                        />
                                      </div>
                                      <div className="form-box flex flex-column mt-3">
                                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                          City*
                                        </label>
                                        <input
                                          type="text"
                                          className="border rounded px-2 py-2 bg-main-text"
                                          placeholder="Enter Your City"
                                          onChange={(e) =>
                                            setsitecity(e.target.value)
                                          }
                                          value={sitecity}
                                        />
                                      </div>
                                      <div className="div flex justify-center">
                                        <Link
                                          className="mt-3  btn-main-add w-50 justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 p-0 m transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                                          onClick={() => Editsite()}
                                        >
                                          Edit Site
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Link
                          className="mt-1 border justify-center items-center flex p-color leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                          onClick={() => openModal()}
                        >
                          + Edit Site
                        </Link>
                      </div>
                    </div>


                    <div className="error-box">
                      {error ? (
                        <div className="error-message">
                          <p className="fs-14 fw-800 text-red-500 banner-font">{error}</p>
                          </div>
                      ) : ""}
                    </div>
                    <div className="form-box">
                      <Link
                        className="mt-5 w-100   btn-main-add  justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 p-0 m transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                        onClick={() => handlesubmit()}
                      >
                        {loading ? "...." : "Edit Profile"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Profile;
