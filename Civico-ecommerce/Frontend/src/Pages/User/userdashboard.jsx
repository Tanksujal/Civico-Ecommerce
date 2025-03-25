import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import Navbar from "../../Components/Navbar"
import TopHeader from "../../Components/TopHeader"
import SidebarProfile from "../../Components/User/sidebarProfile"

const Userdashboard = () => {
  return (
    <section>
    <TopHeader />
    <Header />
    <Navbar />
    <div className="container-fluid" style={{ padding: "50px 20px" }}>
      <div className="row flex">
        <SidebarProfile />
        <div className="col-10">
          <div className="container-fluid">
            <div className="row">
            <div className="flex flex-wrap">
            <div className="col-3 px-3">
              <div className='bg-green-600 py-5 px-2 flex flex-column items-center shadow-lg rounded-lg h-60'>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '>Total Orders</h2>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '></h2>
              </div>
            </div>
            <div className="col-3 px-3">
              <div className='bg-yellow-500 py-5 px-2 flex flex-column items-center shadow-lg rounded-lg h-60'>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '>Pending Orders</h2>
                  <h2 className=' text-white fs-25 leading-[30px] tracking-wider fw-400 '></h2>
              </div>
            </div>
            <div className="col-3 px-3">
              <div className='bg-red-600 py-5 px-2 flex flex-column items-center shadow-lg rounded-lg h-60'>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '>Processing Order</h2>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '></h2>
              </div>
            </div>
            <div className="col-3 px-3">
              <div className='bg-red-400 py-5 px-2 flex flex-column items-center shadow-lg rounded-lg h-60'>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '>Complete Orders</h2>
                  <h2 className='text-white fs-25 leading-[30px] tracking-wider fw-400 '></h2>
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
  )
}

export default Userdashboard
