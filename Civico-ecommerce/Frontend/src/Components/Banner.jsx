import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section style={{padding:"120px 0"}} className="bg-[url(https://img.freepik.com/free-photo/crane-building-construction_23-2147785504.jpg?t=st=1740836186~exp=1740839786~hmac=e39d6555b7a2712943c29f9ffac35d2071c3680af746eca48a6fb83489e562a6&w=1380)] bg-cover bg-center ">
      <div className="container">
        <div className="row align-center">
          <div className="col-5">
            <div className="banner-text">
              <span className="fs-18 li-color mb-4 fs-300 leading-[28px] tracking-[0.03rem] flex">
                Flat 30% Off
              </span>
              <h2 className="fs-40 bg-main-text mb-4 fw-700 leading-[1.2] tracking-[0.03rem] banner-font ">
                Welcome to <span className="secondary-text">CIVICO</span> – Your Trusted Construction Material Supplier
              </h2>
              <Link className="mt-2 btn-main-add    text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                        Shop Now
                      </Link>
            </div>
          </div>
          <div className="col-7">
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
