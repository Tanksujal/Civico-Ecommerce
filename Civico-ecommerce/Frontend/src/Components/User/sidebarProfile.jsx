import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoReorderFour } from "react-icons/io5";

const SidebarProfile = () => {
  return (
    
      <div className="col-2 sidebar-main-admin border px-3 rounded my-3 py-1">
        <ul className="p-0">
          <Link className="rounded mt-1" to={'/userdashboard'}>
            <a
              href=""
              className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
            >
              <FaHome className="me-2" />
              Dashboard
            </a>
          </Link>
          <Link className="rounded" to={'/profile'}>
            <a
              href="#"
              className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
            >
              <CgProfile className="me-2" />
              Profile
            </a>
          </Link>
          <Link className="rounded" to={'/myorders'}>
            <a
              href=""
              className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
            >
              <IoReorderFour className="me-2" />
              My Orders
            </a>
          </Link>
        </ul>
      </div>
    
  );
};

export default SidebarProfile;
