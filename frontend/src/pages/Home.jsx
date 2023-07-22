
import Banner from '../components/Banner'
import BookShowCategories from '../components/BookShowCategories'
import TheWhy from '../components/TheWhy'
import WhyWait from '../components/WhyWait'
import Footer from '../components/Footer'

function Home() {
  return (
    <div
    className='bg-white h-screen '
    >
      <Banner/>
      <TheWhy/>
      <BookShowCategories/>
      <WhyWait/>
      <Footer/>

    </div>
  )
}

export default Home