import { Link } from "react-router-dom"

const AdsBanner = () => {
  return (
    <section className="mt-5">
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="ads-box border py-5 px-4 rounded-[10px] bg-[url(https://img.freepik.com/free-photo/front-view-male-builder-yellow-helmet-with-plan-blue-background-building-worker-architecture-constructor-color-flat-property_140725-155185.jpg?t=st=1740479360~exp=1740482960~hmac=7311c499226541e4f027173544b8f9ba7a8f86ca73a1c2124e76b2e4c3dc8d01&w=1380)] bg-top bg-cover">
                    <div className="banner-text">
              <span className="fs-12 text-white  fs-300 leading-[28px] tracking-[0.03rem] flex">
                Flat 30% Off
              </span>
              <h2 className="fs-16 text-white mb-4 fw-700 leading-[1.2] tracking-[0.03rem] banner-font ">
                Welcome to <span className="secondary-text">CIVICO</span> – Your <br></br> Trusted Construction Material <br></br> Supplier
              </h2>
              <Link className="mt-2 btn-main-add    text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                        Shop Now
                      </Link>
            </div>
                    </div>
                   
                </div>
                <div className="col-6">
                <div className="ads-box border py-5 px-4 rounded-[10px] bg-[url(https://img.freepik.com/free-photo/front-view-female-architect-yellow-helmet-holding-plan-blue_140725-147492.jpg?t=st=1740481869~exp=1740485469~hmac=5a7966de065d0b02d448bfe08e5e6619d872f13673fdfbdea38b9f6130813bdc&w=1380)] bg-top bg-cover">
                    <div className="banner-text">
              <span className="fs-12 text-white mb-4 fs-300 leading-[28px] tracking-[0.03rem] flex">
                Flat 30% Off
              </span>
              <h2 className="fs-16 text-white mb-4 fw-700 leading-[1.2] tracking-[0.03rem] banner-font ">
                Welcome to <span className="secondary-text">CIVICO</span> – Your Trusted <br></br> Construction Material Supplier
              </h2>
              <Link className="mt-2 btn-main-add    text-white leading-[1.2] tracking-[0.03rem] fw-400 fs-14 py-3 px-4 transition-all duration-500 ease-in-out rounded-lg banner-font fw-600">
                        Shop Now
                      </Link>
            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AdsBanner
