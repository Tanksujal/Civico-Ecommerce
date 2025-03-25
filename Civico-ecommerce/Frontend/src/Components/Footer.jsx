import { IoLocationSharp } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
const Footer = () => {
  return (
    <section className="bg-[#f8f8fb] py-5">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="footer-content">
              <div className="footer-logo w-[144px]">
                <img src="../../civico-main.png" alt="" />
              </div>
              <div className="footer-text">
                <p className="p-color leading-[27px] fw-400 fs-14 tracking-[0.03rem]">
                  Civico Is the Biggest Market of Consttruction and
                  Infastructure Tools.Get Your Daily Needs From Our Store.
                </p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="footer-text-ul border-b-[#eee] border-b mb-3">
              <h4 className="fs-18 banner-font section-title-color leading-[1.2] capitalize fw-700 pb-[15px]">
                Category
              </h4>
            </div>
            <div className="footer-ul">
              <ul className="p-0">
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Dairy & Milk
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Dairy & Milk
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Dairy & Milk
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Dairy & Milk
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Dairy & Milk
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2">
            <div className="footer-text-ul border-b-[#eee] border-b mb-3">
              <h4 className="fs-18 banner-font section-title-color leading-[1.2] capitalize fw-700 pb-[15px]">
                Company
              </h4>
            </div>
            <div className="footer-ul">
              <ul className="p-0">
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    About Us
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Contact
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Terms & Condition
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2">
            <div className="footer-text-ul border-b-[#eee] border-b mb-3">
              <h4 className="fs-18 banner-font section-title-color leading-[1.2] capitalize fw-700 pb-[15px]">
                Account
              </h4>
            </div>
            <div className="footer-ul">
              <ul className="p-0">
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Sign In
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    View Cart
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-14">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-text-ul border-b-[#eee] border-b mb-3">
              <h4 className="fs-18 banner-font section-title-color leading-[1.2] capitalize fw-700 pb-[15px]">
                Contact
              </h4>
            </div>
            <div className="footer-ul">
              <ul className="p-0">
                <li className="leading-[1.5] items-center flex mb-3">
                  <a href="" className="p-color leading-[20px] fw-400 fs-18 flex">
                  <IoLocationSharp className="me-3"/>
                  <span className="fs-14">971 Lajamni, Motavarachha, Surat, Gujarat, Bharat 394101.</span>
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                <a href="" className="p-color leading-[20px] fw-400 fs-18 flex">
                  <FaWhatsapp className="me-3"/>
                  <span className="fs-14">+91 9999999999</span>
                  </a>
                </li>
                <li className="leading-[1.5] items-center flex mb-3">
                <a href="" className="p-color leading-[20px] fw-400 fs-18 flex">
                  <MdOutlineMail className="me-3"/>
                  <span className="fs-14">123@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
