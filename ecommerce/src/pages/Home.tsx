import Categories from '../components/home/Categories'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import Products from '../components/Products'
import Testimonials from '../components/home/Testimonials'
import Services from '../components/home/Services'
import Hero from '../components/home/Hero'

const Home = ({ products }) => {
  // const products = useSelector((state: RootState) => state.prods.products)
  return (
    <>
      <Hero />
      <Categories />
      <Products title='Our products' products={products} />
      <Testimonials />
      <Services />
    </>
  )
}

export default Home
