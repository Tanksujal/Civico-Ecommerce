import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"; // Removed navigation CSS
import { Autoplay } from "swiper/modules"; // Removed Navigation
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ExploreCategories = () => {
  const { categories, message, error, loading } = useSelector(
    (state) => state.category
  );
  const categoryList = categories?.categories || [];

  return (
    <section style={{ margin: "120px 0", position: "relative" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-5">
            <div className="category-main-img relative w-100  overflow-hidden rounded-[30px]">
              <img
                src="https://img.freepik.com/free-photo/medium-short-architect-holding-plan_23-2148269814.jpg?t=st=1740461103~exp=1740464703~hmac=9dc6a58d333ec20bfd9282c5044b135abbf2382bea9ad69bb15cee4a9aef2f16&w=900"
                className="rounded-[30px] w-100 h-100 object-cover"
                alt="Category Image"
              />
              <div className="bb-offers py-2 px-3 cursor-pointer absolute top-[20px] right-[20px] bg-[#000] opacity-[0.8] rounded-[15px]">
                <span className="fs-14 text-white font-normal">50% Off</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-7">
            <div className="expo-cate-main-box">
              <div className="cate-title">
                <h2 className="banner-font fs-124 text-white opacity-[0.15] font-bold tracking-[0.03rem]">
                  Explore Categories
                </h2>
              </div>

              {/* Swiper Slider (Without Navigation) */}
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                autoplay={{
                  delay: 1000, // Slide every 1 second
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper mt-4"
              >
                {categoryList.map((category, i) => (
                  <SwiperSlide key={category._id || i}>
                    <Link to={`/showproducts/category/${category._id}`} className="overflow-hidden rounded-[15px] text-center w-100 h-auto cursor-pointer">
                      {/* Category Image */}
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-[150px] object-cover rounded-[15px]"
                      />

                      {/* Category Name Below the Image */}
                      <h3 className="cate-box banner-font fs-18 text-center bg-main-text mt-2 fw-600 leading-2 tracking-[0.03rem]">
                        {category.name}
                      </h3>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
