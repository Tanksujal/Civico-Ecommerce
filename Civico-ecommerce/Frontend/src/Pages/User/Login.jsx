import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import TopHeader from "../../Components/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { sentOtp, verifyOtpuser } from "../../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.user);
  const sendOtp = () => {
    if (mobileNumber.length === 10) {
      dispatch(sentOtp(mobileNumber));
    } else {
      alert("Enter a valid 10-digit mobile number");
    }
  };

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
  };

  const verifyOtp = () => {
    if (otp.join("").length === 4) {
      const otpmain = otp.join("");
      dispatch(verifyOtpuser({ mobileNumber, otpmain }));
    } else {
      alert("Enter the complete OTP");
    }
  };

  useEffect(() => {
    if (message && message.includes("OTP sent successfully")) {
      setOtpSent(true);
    }
  }, [message]);

  useEffect(() => {
    if (message && message.includes("OTP verified")) {
      navigate("/");
    }
  }, [message, navigate]);

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
                    Log <span className="secondary-text">In</span>
                  </h4>
                  <p className="fs-14 p-color tracking-[0.03rem] leading-[1] fw-300">
                    Best place to buy digital products.
                  </p>
                </div>
                <div className="col-4">
                  <div className="login-form border rounded-[20px] p-3">
                    {/* Mobile Number Input */}
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
                        disabled={otpSent}
                      />
                    </div>

                    {/* Send OTP Button */}
                    {!otpSent ? (
                      <div className="form-box flex flex-column mt-2">
                        {/* Display success or error messages */}
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
                    ) : (
                      <>
                        {/* OTP Input Boxes */}
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

                        {/* Verify OTP Button */}
                        <div className="form-box flex flex-column mt-2">
                          {/* Display success or error messages */}
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
                          {message && (
                            <p style={{ color: "green" }}>{message}</p>
                          )}
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-4 px-2 mt-2">
                  <div className="forgot-register-btn flex justify-between items-center">
                    <Link className="fs-15">Forgot Password?</Link>
                    <Link to={'/registernumber'} className="mt-2 btn-main-add justify-center items-center flex text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-2 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                      Register
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

export default Login;
