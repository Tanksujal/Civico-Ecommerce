import { useState } from "react";
import { FaHome, FaUserCog } from "react-icons/fa";
import { IoReorderFour } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Sidebar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [issubCategoryOpen, setIssubCategoryOpen] = useState(false);
  const [isproductopen, setisproductopen] = useState(false);

  return (
    <div className="sidebar-main-admin w-[250px] h-screen left-0 top-0 bg-white border p-4">
      <ul className="p-0">
        <li className="rounded mt-2">
          <Link
            to="/dashboard"
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="rounded mt-2">
          <Link
            to="/manageusers"
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
          >
            <FaUserCog className="me-2" />
            Manage Users
          </Link>
        </li>

        <li className="rounded mt-2">
          <Link
            to="/orders"
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex items-center banner-font"
          >
            <IoReorderFour className="me-2" />
            Manage Orders
          </Link>
        </li>

        {/* Categories Dropdown */}
        <li className="rounded mt-2">
          <div
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex justify-between items-center cursor-pointer banner-font"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center">
              <BiCategory className="me-2" />
              <span className="fs-15 fw-600 bg-main-text banner-font">Categories</span>
            </div>
            <span>{isCategoryOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
          </div>

          {isCategoryOpen && (
            <ul className="ml-5 ">
              <li className="py-2">
                <Link to="/categories/list" className="fs-15 fw-600 bg-main-text banner-font py-3 px-3 rounded-[4px] ">
                  ⬦ Category List
                </Link>
              </li>
              <li className="py-2">
                <Link to="/categories/add" className="fs-15 fw-600 bg-main-text banner-font py-3 px-3 rounded-[4px]">
                  ⬦ New Category
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="rounded mt-2">
          <div
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex justify-between items-center cursor-pointer banner-font"
            onClick={() => setIssubCategoryOpen(!issubCategoryOpen)}
          >
            <div className="flex items-center">
              <BiCategory className="me-2" />
              <span className="fs-15 fw-600 bg-main-text banner-font">SubCategories</span>
            </div>
            <span>{issubCategoryOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
          </div>

          {issubCategoryOpen && (
            <ul className="ml-3 ">
              <li className="py-2">
                <Link to="/subcategories/list" className="fs-15 fw-600 bg-main-text banner-font rounded-[4px] ">
                  ⬦ SubCategory List
                </Link>
              </li>
              <li className="py-2">
                <Link to="/subcategories/add" className="fs-15 fw-600 bg-main-text banner-font  rounded-[4px]">
                  ⬦ New SubCategory
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="rounded mt-2">
          <div
            className="fs-15 fw-600 bg-main-text rounded-[4px] py-3 px-3 flex justify-between items-center cursor-pointer banner-font"
            onClick={() => setisproductopen(!isproductopen)}
          >
            <div className="flex items-center">
              <BiCategory className="me-2" />
              <span className="fs-15 fw-600 bg-main-text banner-font">Product</span>
            </div>
            <span>{isproductopen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
          </div>

          {isproductopen && (
            <ul className="ml-3 ">
              <li className="py-2">
                <Link to="/product/list" className="fs-15 fw-600 bg-main-text banner-font rounded-[4px] ">
                  ⬦ Products List
                </Link>
              </li>
              <li className="py-2">
                <Link to="/product/add" className="fs-15 fw-600 bg-main-text banner-font  rounded-[4px]">
                  ⬦ New Products
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
