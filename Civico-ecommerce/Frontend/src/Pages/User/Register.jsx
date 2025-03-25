import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import TopHeader from "../../Components/TopHeader";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Getprofile, RegisterUser, sentOtp, verifyOtpuser } from "../../redux/features/AuthSlice";
const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [useFor, setUseFor] = useState(""); // Track "Personal" or "Company"
  const [companyName, setCompanyName] = useState("");
  const [hasGst, setHasGst] = useState(""); // Track GST selection
  const [gstNumber, setGstNumber] = useState("");
  const [showAddSite, setShowAddSite] = useState(false);

   const [sitename,setsitename] = useState("")
   const [siteaddress,setsiteaddress] = useState("")
   const [sitecity,setsitecity]= useState("")
   const [sitestate,setsitestate] = useState("")
   const [sitepin,setsitepin] = useState("")
   const [siteList,setsitelist]= useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {message,user,error,loading} = useSelector(state => state.user)
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const sendOtp = () => {
    if (mobileNumber.length === 10) {
      dispatch(sentOtp(mobileNumber))
    } else {
      alert("Enter a valid 10-digit mobile number");
    }
  };
  useEffect(()=>{
    if(message && message.includes("OTP sent successfully")){
      setOtpSent(true)
    }
  },[message])
  useEffect(() => {
    if (message && message.includes("OTP verified")) {
      setOtpVerified(true)
    }
  }, [message]);
  const handleOtpChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Ensure only one digit
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }
  const verifyOtp = () => {
    if (otp.join("").length === 4) {
      const otpmain = otp.join("");
      dispatch(verifyOtpuser({ mobileNumber, otpmain }));
    } else {
      alert("Enter the complete OTP");
    }
  };
  const addsite = () => {
    let sitedata = {
      siteName:sitename,
      siteAddress:siteaddress,
      siteCity:sitecity,
      siteState:sitestate,
      sitePin:sitepin
    }
    setsitelist([...siteList,sitedata])
    sitedata = null;
    setsitename("")
    setsiteaddress("")
    setsitecity("")
    setsitestate("")
    setsitepin("")
    closeModal()
  }
  const handlesubmit = () => {
    if(!useFor || !siteList){
      alert("Please select the use for and add the site")
    }
    let userdata = {
      Typeuse:useFor,
      COompany:{
        CompanyName:companyName?companyName:"",
        GSTNumber:gstNumber?gstNumber:""
      },
      Site:siteList
    }
    dispatch(RegisterUser(userdata))
  }
  useEffect(()=>{
    if(message && message.includes('User registered successfully')){
      navigate('/')
    }
  },[message,navigate])
 
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <section style={{ margin: "70px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="login-box flex justify-center flex-column items-center">
                <div className="login-text flex flex-column items-center">
                  <h4 className="fs-25 mb-2 banner-font section-title-color tracking-[0.03rem] leading-[1] capitalize fw-700">
                    Sign <span className="secondary-text">Up</span>
                  </h4>
                  <p className="fs-14 p-color tracking-[0.03rem] leading-[1] fw-300">
                    Best place to buy digital products.
                  </p>
                </div>
                <div className="col-4">
                  <div className="login-form border rounded-[20px] p-3">
                    {/* Mobile Number Input */}
                    {/* Mobile Number Input (Hidden after OTP is sent) */}
                    {!otpSent && (
                      <div className="form-box flex flex-column mt-3">
                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                          Mobile Number*
                        </label>
                        <input
                          type="text"
                          className="border rounded px-2 py-2 bg-main-text"
                          placeholder="Enter Your Mobile Number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                    )}

                    {/* Send OTP Button (Hidden after OTP is sent) */}
                    {!otpSent && (
                      <div className="form-box flex flex-column mt-2">
                        {message && (
                          <p className="fs-14 banner-font" style={{ color: "green", textAlign: "center" }}>
                            {message}
                          </p>
                        )}
                        {error && (
                          <p className="fs-14 banner-font" style={{ color: "red", textAlign: "center" }}>
                            {error}
                          </p>
                        )}
                        <Link
                          className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                          onClick={sendOtp}
                        >
                           {loading ? "Sending..." : "Send OTP"}
                        </Link>
                      </div>
                    )}

                    {/* OTP Input and Verify Button */}
                    {otpSent && !otpVerified && (
                      <>
                        <div className="form-box flex justify-center gap-2 mt-3">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-input-${index}`}
                              type="text"
                              value={digit}
                              onChange={(e) => handleOtpChange(e, index)}
                              maxLength={1}
                              className="border rounded px-2 py-1 text-center"
                              style={{
                                width: "40px",
                                height: "40px",
                                fontSize: "18px",
                              }}
                            />
                          ))}
                        </div>
                        <div className="form-box flex flex-column mt-2">
                        {message && (
                          <p className="fs-14 banner-font" style={{ color: "green", textAlign: "center" }}>
                            {message}
                          </p>
                        )}
                        {error && (
                          <p className="fs-14 banner-font" style={{ color: "red", textAlign: "center" }}>
                            {error}
                          </p>
                        )}
                          <Link
                            className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                            onClick={verifyOtp}
                          >
                           {loading ? "verifying..." : "verify OTP"}
                          </Link>
                        </div>
                      </>
                    )}

                    {/* Civico Options (Only Show After OTP Verification) */}
                    {otpVerified && (
                      <div className="form-box ">
                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                          Use Civico For*
                        </label>
                        <div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              value="Personal"
                              checked={useFor === "Personal"}
                              onChange={(e) => setUseFor(e.target.value)}
                            />
                            <label className="form-check-label fs-15 bg-main-text banner-font tracking-[0.02rem] leading-[26px] fw-600 ms-1">
                              Personal Use
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              value="Company"
                              checked={useFor === "Company"}
                              onChange={(e) => setUseFor(e.target.value)}
                            />
                            <label className="form-check-label fs-15 bg-main-text banner-font tracking-[0.02rem] leading-[26px] fw-600 ms-1">
                              Company Use
                            </label>
                          </div>
                          {useFor === "Personal" &&
                            (!showAddSite ? (
                              <Link
                                className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                                onClick={() => setShowAddSite(true)}
                              >
                                Next
                              </Link>
                            ) : null)}
                        </div>
                      </div>
                    )}
                    {/* for company use */}
                    {useFor === "Company" && (
                      <>
                        <div className="form-box">
                          <div className="setup-company">
                            <div className="form-box flex flex-column mt-3 border-t border-t-[#eee] pt-2">
                              <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                Company Name*
                              </label>
                              <input
                                type="text"
                                className="border rounded px-2 py-2 bg-main-text"
                                placeholder="Enter Your Company Name"
                              />
                            </div>
                            <div className="form-box mt-2">
                              <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                Have Registred GST Number?
                              </label>
                              <div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    value="Yes"
                                    checked={hasGst === "Yes"}
                                    onChange={(e) => setHasGst(e.target.value)}
                                  />
                                  <label className="form-check-label fs-15 bg-main-text banner-font tracking-[0.02rem] leading-[26px] fw-600 ms-1">
                                    Yes
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    value="No"
                                    checked={hasGst === "No"}
                                    onChange={(e) => setHasGst(e.target.value)}
                                  />
                                  <label className="form-check-label fs-15 bg-main-text banner-font tracking-[0.02rem] leading-[26px] fw-600 ms-1">
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                            {hasGst === "Yes" && (
                              <div className="form-box flex flex-column mt-3 border-t border-t-[#eee] pt-2">
                                <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                                  GST Number(Optional)
                                </label>
                                <input
                                  type="text"
                                  className="border rounded px-2 py-2 bg-main-text"
                                  placeholder="Enter Your GST Number"
                                />
                              </div>
                            )}
                            {!showAddSite && (
                              <Link
                                className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                                onClick={() => setShowAddSite(true)}
                              >
                                Next
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {/* add site section */}
                    {showAddSite && (
                      <div className="form-box mt-3">
                        <label className="fs-15 p-color tracking-[0.02rem] leading-[26px] fw-400 ms-1">
                          Add Site*
                        </label>
                        <div className="form-box flex flex-column border rounded p-2 my-3">
  {siteList.length > 0 ? (
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

                        <Link
                          className="mt-1 border justify-center items-center flex p-color leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                          onClick={() => openModal()}
                        >
                          + Add Site
                        </Link>
                      </div>
                    )}

                   {siteList.length > 0 ? (
                   <Link
                   className="mt-3 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600"
                   onClick={handlesubmit}
                 >
                   Finish
                 </Link>
                   ) : ""}

                    {/*model  */}

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
                            transition={{ duration: 0.3, ease: "easeInOut" }}
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
                                      onChange={(e) => setsitename(e.target.value)}
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
                                      onChange={(e) => setsiteaddress(e.target.value)}
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
                                      onChange={(e) => setsitepin(e.target.value)}
                                      value={sitepin}
                                    />
                                  </div>
                                  <div className="form-box flex flex-column mt-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) => setsitestate(e.target.value)}
                                      value={sitestate}
                                    >
                                      <option selected>State</option>
                                      <option value={"Gujarat"}>Gujarat</option>
                                      <option value={"vadodara"}>vadodara</option>
                                      <option value={"other"}>other</option>
                                    </select>
                                  </div>
                                  <div className="form-box flex flex-column mt-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) => setsitecity(e.target.value)}
                                      value={sitecity}
                                    >
                                      <option selected>City</option>
                                      <option value={"Surat"}>Surat</option>
                                      <option value={"Surt2"}>Surt2</option>
                                      <option value={"Three"}>Three</option>
                                    </select>
                                  </div>
                                  <div className="div flex justify-center">
                                    <Link className="mt-3  btn-main-add w-50 justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 p-0 m transition-all duration-500 ease-in-out rounded-lg banner-font fw-600" onClick={() => addsite()}>
                                      Add Site
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/**model  */}
                  </div>
                </div>
                <div className="col-4 px-2 mt-2">
                  <div className="forgot-register-btn flex justify-end items-center">
                    <Link className="  justify-center items-center flex  leading-[1.2] tracking-[0.03rem] fw-400 fs-14 pb-1 transition-all duration-500 ease-in-out border-b banner-font fw-600">
                      Login Here?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Register;
