import { Link } from 'react-router-dom'
import cart from '../assets/cart.svg'
import cartAdded from '../assets/cart_added.svg'
import { IoCartOutline } from 'react-icons/io5'
import { CiHeart } from 'react-icons/ci'
import { PiShoppingCartThin } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../store/cart-slice'
import { wishlistActions } from '../store/wishlist-slice'
import { useState } from 'react'
import Reveal from '../UI/Reveal'
const Product = ({ product, className = '' }) => {
  const products = useSelector((state) => state.prods.products)
  const cart = useSelector((state) => state.cart)
  const wish = useSelector((state) => state.wish)
  const dispatch = useDispatch()
  const isAddedToCart = !!cart.items.find((item) => item._id === product._id)
  const isAddedToWishList = !!wish.items.find(
    (item) => item._id === product._id
  )
  const [something, setSomething] = useState(Math.random())

  // const [isAddedToWishList, setIsAddedToWishlist] = useState<boolean>(
  //   product.isAddedToWishList
  // )
  // const [isAddedToCart, setIsAddedToCart] = useState<boolean>(
  //   product.isAddedToCart
  // )

  const addToWishList = () => {
    dispatch(wishlistActions.addToWishList(product))
    // console.log(wishListItems)
  }

  const removeFromWishlist = () => {
    dispatch(wishlistActions.removeFromWishlist(product._id))
  }

  const addToCart = () => {
    dispatch(cartActions.addItemToCart(product))
  }

  const removeFromCart = () => {
    dispatch(cartActions.removeItemFromCart(product))
  }

  const toggleToWishList = () => {
    if (isAddedToWishList) removeFromWishlist()
    else addToWishList()
  }

  const toggleToCart = () => {
    if (isAddedToCart) removeFromCart()
    else addToCart()
  }

  const isAddedClasses = 'bg-black text-white'
  const isNotAddedClasses =
    'bg-white hover:bg-black hover:text-white hover:border-white'

  return (
    <li className={className + ' relative shadow-customed '}>
      <Reveal width='100%'>
        <Link to={`/products/${product._id}`}>
          <div
            className='image-holder bg-secondary 
         mx-auto h-20 h- h-80'
          >
            <img
              className='w-full h-full object-cover'
              src={import.meta.env.VITE_SERVER_API + product.imageURL}
              loading='lazy'
              alt={product.title}
            />
          </div>
        </Link>
        <div className='details p-3'>
          <div className='flex justify-between items-center'>
            <p className='name font-bold text-[12px]'>{product.title}</p>
            {
              <button
                className={`w-[30px] h-[30px] border border-solid border-gray-400 flex 
              justify-center items-center rounded-full p-[3px]  hover:bg-black hover:text-white
              hover:border-white duration-300 text-xl text-light cursor-pointer 
              ${isAddedToCart ? isAddedClasses : isNotAddedClasses}`}
                onClick={toggleToCart}
              >
                <PiShoppingCartThin />
              </button>
            }
            <button
              className={`absolute top-2 right-2 w-[30px] h-[30px] border border-solid border-gray-400 flex justify-center 
            items-center rounded-full p-[3px]  duration-300 text-xl 
            cursor-pointer ${
              isAddedToWishList ? isAddedClasses : isNotAddedClasses
            }`}
              onClick={toggleToWishList}
            >
              <CiHeart />
            </button>
          </div>

          <p className='price text-[12px]'>
            <span className='text-lg'>${product.price}</span>
          </p>
        </div>
      </Reveal>
    </li>
  )
}

export default Product
