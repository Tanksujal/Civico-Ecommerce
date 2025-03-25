import { useState } from "react";
import { PiSquaresFour } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { categories,} = useSelector((state) => state.category);
  const categoryList = categories?.categories || []; // Ensure it's an array

  const { products } = useSelector((state) => state.product);
  const productslist = products?.products || []; 

  const dropdownItems = {
    Categories: categoryList, // Dynamically setting categories
    Products: productslist,
    Pages: ["About Us", "FAQs", "Terms & Conditions"],
  };

  return (
    <nav className="border py-2 ps-5">
      <div className="container flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className={`navbar-nav flex flex-wrap flex-row relative lg:flex ${isMobileMenuOpen ? "block" : "hidden"} lg:block`}>
          <li className="nav-item flex items-center me-5">
            <a
              href="#"
              className="bb-header-btn bb-sidebar-toggle bb-category-toggle transition-all duration-300 ease-in-out h-[45px] w-[45px] mr-[30px] p-[8px] flex items-center justify-center bg-[#fff] border border-[#eee] rounded-[10px] relative"
            >
              <PiSquaresFour className="w-[25px] h-[25px] secondary-text" />
            </a>
          </li>

          {["Home", "Categories", "Products", "Pages", "Contact"].map((item) => (
            <li
              key={item}
              className="nav-item relative flex items-center me-5"
              onMouseEnter={() => setOpenDropdown(item)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a href="#" className="nav-link font-medium text-[#3d4750]">
                {item}
              </a>

              {/* Check if the item has a dropdown */}
              {dropdownItems[item] && dropdownItems[item].length > 0 && (
                <div
                  className={`absolute top-full left-0 mt-1 bg-white border shadow-md rounded-lg w-60 z-50 transition-all duration-300 transform ${
                    openDropdown === item
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-2 invisible"
                  }`}
                  onMouseEnter={() => setOpenDropdown(item)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {dropdownItems[item].map((subItem, index) => (
                    <Link   to={`/showproducts/category/${subItem._id}`}
                      key={index}
                      href="#"
                      className="block px-4 py-2 bg-main-text tracking-[0.03rem] leading-[28px] hover:bg-gray-100"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
