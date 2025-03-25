import AdsBanner from "../Components/AdsBanner"
import Banner from "../Components/Banner"
import BottomFooter from "../Components/BottomFooter"
import ExploreCategories from "../Components/ExploreCategories"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import Products from "../Components/Products"
import Support from "../Components/Support"
import TopHeader from "../Components/TopHeader"

const Home = () => {
  return (
    <>
       <TopHeader/>
       <Header/>
       <Banner/>
       <ExploreCategories/>
       <Products/>
       <AdsBanner/>
       <Support/>
       <Footer/>
       <BottomFooter/>
    </>
  )
}

export default Home