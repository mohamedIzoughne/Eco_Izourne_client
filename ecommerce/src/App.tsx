import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import About from './pages/About'
import Wishlist from './pages/Wishlist'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { productsActions } from './store/products-slice'
import useHttp from './hooks/useHttp'
import { cartActions } from './store/cart-slice'
import { wishlistActions } from './store/wishlist-slice'
import { ScrollToTop } from './utils'

export type productType = {
  _id: string
  title: string
  imageURL: string
  images: string[]
  price: number
  category: {
    name: string
    imageURL: string
    _id: string
  }
  state: string
  description: string
  isAddedToCart: boolean
  isAddedToWishList: boolean
}

export type cartType = {
  items: productType[]
}

function App() {
  const dispatch = useDispatch()
  const { sendData } = useHttp()

  useEffect(() => {
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!)
      : null
    const wishlist = localStorage.getItem('wishlist')
      ? JSON.parse(localStorage.getItem('wishlist')!)
      : ''
    if (cart) {
      dispatch(cartActions.replaceCart(cart))
    }
    if (wishlist) {
      dispatch(wishlistActions.replaceWishlist(wishlist))
    }
    const options = {
      method: 'GET',
    }

    sendData<productType[]>('products', options, (res, err) => {
      if (err) {
        console.log(err)
        return
      }
      if (res) {
        res?.forEach((pr) => {
          if (
            cart &&
            cart.items.find((item: productType) => item._id === pr._id)
          ) {
            pr.isAddedToCart = true
          } else {
            pr.isAddedToCart = false
          }
          if (
            wishlist &&
            wishlist.items.find((item: productType) => item._id === pr._id)
          ) {
            pr.isAddedToWishList = true
          } else {
            pr.isAddedToWishList = false
          }
        })
      }
      dispatch(productsActions.replaceProducts(res))
    })
  }, [dispatch, sendData])

  ScrollToTop()

  return (
    <div className='min-h-dvh flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/products/:prodId' element={<ProductDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/FAQs' element={<FAQs />} />
        <Route path='/about' element={<About />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
