import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { IoMdMenu } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { AnimatePresence, motion } from 'framer-motion'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { CiHeart } from 'react-icons/ci'
import { useReducer } from 'react'
import { cartActions, cartItemState } from '../store/cart-slice'
import { wishlistActions } from '../store/wishlist-slice'
import { RootState } from '../store'

// hovering on cart state
type stateType = {
  isActive: boolean
  isPreviewActive: boolean
}

const initialCartState: stateType = {
  isActive: false,
  isPreviewActive: false,
}

const initialWishState: stateType = {
  isActive: false,
  isPreviewActive: false,
}

const reducer = (
  state: stateType,
  action: { payload: boolean; type?: string }
) => {
  switch (action.type) {
    case 'isActive':
      return { ...state, isActive: action.payload }
    case 'previewIsActive':
      return { ...state, isPreviewActive: action.payload }
    default:
      return state
  }
}

const NavbarItem = ({
  location,
  itemName,
}: {
  location: string
  itemName: string
}) => {
  let wordToMatch
  if (itemName === 'Home') {
    wordToMatch = '/'
  } else {
    wordToMatch = '/' + itemName.split(' ')[0].toLowerCase()
  }

  return (
    <li
      className={`${location === wordToMatch ? 'font-bold ' : ' '}
        hover:bg-[#C8FFF2] hover:font-light  transition-all duration-300 cursor-pointer`}
    >
      <Link className='block py-5 px-2' to={wordToMatch}>
        {itemName}
      </Link>
    </li>
  )
}

const MobileNavbarItem = ({
  location,
  itemName,
}: {
  location: string
  itemName: string
}) => {
  let wordToMatch
  if (itemName === 'Home') {
    wordToMatch = '/'
  } else {
    wordToMatch = '/' + itemName.split(' ')[0].toLowerCase()
  }

  return (
    <li
      className={`${location === wordToMatch ? 'font-bold ' : ' '}
        hover:font-semibold transition-all duration-100 cursor-pointer`}
    >
      <Link className='block px-5 py-3' to={wordToMatch}>
        {itemName}
      </Link>
    </li>
  )
}

const NavbarList = ({
  className,
  location,
  isOpen,
}: {
  className: string
  location: string
  isOpen: boolean
}) => {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{
          height: isOpen ? '0' : 'auto',
        }}
        animate={{
          height: isOpen ? 'auto' : '0',
        }}
        exit={{
          height: '0',
        }}
        className={`overflow-hidden flex gap-3 z-30 ${className}`}
      >
        <NavbarItem location={location} itemName='Home' />
        <NavbarItem location={location} itemName='Shop' />
        <NavbarItem location={location} itemName='Contact' />
        <NavbarItem location={location} itemName='About us' />
      </motion.ul>
    </AnimatePresence>
  )
}

const MobileNavbarList = ({ location }: { location: string }) => {
  return (
    <ul className='flex'>
      <MobileNavbarItem location={location} itemName='Home' />
      <MobileNavbarItem location={location} itemName='Shop' />
      <MobileNavbarItem location={location} itemName='Contact' />
      <MobileNavbarItem location={location} itemName='About us' />
    </ul>
  )
}

const Mobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname: location } = useLocation()

  const handleClick = () => {
    setIsOpen((open) => !open)
  }

  return (
    <nav className='container flex justify-between items-center py-3 relative bg-white z-40 sticky top-0'>
      {/* <NavbarList location={location} /> */}
      {/* <h2 className='logo mr-8'>List</h2> */}
      {/* {isOpen && ( */}
      <NavbarList
        isOpen={isOpen}
        location={location}
        className='absolute container flex-col bg-white left-0 top-[54px] w-full text-xl '
      />
      {/* )} */}
      <button onClick={handleClick}>
        {isOpen ? (
          <LiaTimesSolid className='text-3xl cursor-pointer' />
        ) : (
          <IoMdMenu className='text-3xl cursor-pointer' />
        )}
      </button>
      <h2 className='logo mr-8'>IZOURNE</h2>
      <Link to='/cart'>
        <IoCartOutline className='text-3xl font-bold cursor-pointer' />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='navbar'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              display: 'block',
            }}
            exit={{
              opacity: 0,
              display: 'none',
            }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className='overlay fixed left-0 top-[54px] w-screen h-screen bg-[#00000038] z-20'
          ></motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const CartPreview = ({
  onMouseLeave,
  onMouseOver,
}: {
  onMouseLeave: () => void
  onMouseOver: () => void
}) => {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const items = Object.values(cart.items)
  return (
    <div
      className='cartShowed bg-white absolute transform 
     -translate-x-[80%] text-center w-[400px] rounded-sm text-xl
     text-grayish top-[58px] p-2 shadow-md'
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      {!items ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {' '}
          {items.map((item: cartItemState) => (
            <li
              className='flex items-center mb-2 border-b border-gray-200 border-solid py-2'
              key={item._id}
            >
              <div className='image-holder w-[100px] aspect-square bg-secondary mr-2'>
                <img src={item.imageURL} alt='' />
              </div>
              <div className='details text-left text-black'>
                <p className='font-bold'>{item.title}</p>
                <p className='font-light text-sm'>{item.description}</p>
                <p>${item.price}</p>
              </div>
              <LiaTimesSolid
                className='cursor-pointer ml-1'
                onClick={() => dispatch(cartActions.removeItemFromCart(item))}
              />
            </li>
          ))}
        </ul>
      )}
      <Link to='/cart' className='text-main font-bold text-base'>
        <button
          className='block bg-main hover:bg-[#068572] py-2 
        text-white w-[350px] font-bold mx-auto my-4 duration-200'
        >
          Go To Cart
        </button>
      </Link>
    </div>
  )
}

const WishPreview = ({
  onMouseLeave,
  onMouseOver,
}: {
  onMouseLeave: () => void
  onMouseOver: () => void
}) => {
  const wish = useSelector((state: RootState) => state.wish)
  const dispatch = useDispatch()

  // const handleClick = (ite) => {
  //   dispatch(cartActions.addItemToCart(item))
  // }
  return (
    <div
      className='cartShowed bg-white absolute transform 
     -translate-x-[80%] text-center w-[400px] rounded-sm text-xl
     text-grayish top-[58px] p-2 shadow-md'
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      {!wish || !wish.items  ? (
        <p>Your wish list is empty</p>
      ) : (
        <ul>
          {' '}
          {Object.values(wish.items).map((item) => (
            <li
              className='mb-2 border-b border-gray-200 border-solid py-2'
              key={item._id}
            >
              <div className='flex items-center'>
                <div className='image-holder w-[100px] aspect-square bg-secondary mr-2'>
                  <img src={item.imageURL} alt='' />
                </div>
                <div className='details text-left text-black'>
                  <p className='font-bold'>{item.title}</p>
                  <p title='font-light text-sm'>{item.description}</p>
                  <p>${item.price}</p>
                </div>
                <LiaTimesSolid
                  className='cursor-pointer ml-1'
                  onClick={() =>
                    dispatch(wishlistActions.removeFromWishlist(item._id))
                  }
                />
              </div>
              <button
                onClick={() => dispatch(cartActions.addItemToCart(item))}
                className='block py-2 border border-main border-solid w-[350px] 
                font-bold mx-auto my-4 duration-200 hover:bg-main hover:text-white'
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* <Link to='/cart' className='text-main font-bold text-base'>
        Go to cart
      </Link> */}
      <Link to='/wishlist'>
        <button className='block bg-main hover:bg-[#068572] py-2 hover:bg-[#068572] text-white w-[350px] font-bold mx-auto my-4 duration-200'>
          Go To wishlist
        </button>
      </Link>
    </div>
  )
}

const Desktop = () => {
  // const [isActive, setIsActive] = useState(false)
  const { pathname: location } = useLocation()
  // const [isPreviewActive, setIsCartActive] = useState(false)

  const [cart, dispatchCart] = useReducer(reducer, initialCartState)
  const [wish, dispatchWish] = useReducer(reducer, initialWishState)
  // const { isActive, IsCartActive } = state

  const hoveringCartPreviewHandler = () => {
    dispatchCart({ type: 'previewIsActive', payload: true })
  }

  const leavingCartPreviewHandler = () => {
    dispatchCart({ type: 'previewIsActive', payload: false })
  }

  const hoveringCartHandler = () => {
    dispatchCart({ type: 'isActive', payload: true })
  }

  const leavingCartHandler = () => {
    setTimeout(() => {
      dispatchCart({ type: 'isActive', payload: false })
    }, 100)
  }

  const hoveringWishPreviewHandler = () => {
    dispatchWish({ type: 'previewIsActive', payload: true })
  }

  const leavingWishPreviewHandler = () => {
    dispatchWish({ type: 'previewIsActive', payload: false })
  }

  const hoveringWishHandler = () => {
    dispatchWish({ type: 'isActive', payload: true })
  }

  const leavingWishHandler = () => {
    setTimeout(() => {
      dispatchWish({ type: 'isActive', payload: false })
    }, 100)
  }

  return (
    <div className='sticky top-0 bg-white z-40'>
      <nav className='container flex justify-between items-center py-3 relative'>
        <h2 className='logo mr-8'>IZOURNE</h2>
        <MobileNavbarList location={location} />
        <div className='heart flex gap-x-3'>
          <div className='heart relative'></div>
          <div
            className='heart relative'
            onMouseOver={hoveringWishHandler}
            onMouseLeave={leavingWishHandler}
          >
            <Link to='/wishlist'>
              <CiHeart className='text-3xl font-bold cursor-pointer hover:text-main transition-colors duration-100' />
            </Link>
            {(wish.isActive || wish.isPreviewActive) && (
              <WishPreview
                onMouseOver={hoveringWishPreviewHandler}
                onMouseLeave={leavingWishPreviewHandler}
              />
            )}
          </div>

          <div
            className='cart relative'
            onMouseOver={hoveringCartHandler}
            onMouseLeave={leavingCartHandler}
          >
            <Link to='/cart'>
              <IoCartOutline className='text-3xl font-bold cursor-pointer hover:text-main transition-colors duration-100' />
            </Link>
            {(cart.isActive || cart.isPreviewActive) && (
              <CartPreview
                onMouseOver={hoveringCartPreviewHandler}
                onMouseLeave={leavingCartPreviewHandler}
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = +width < 640
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>{isMobile ? <Mobile /> : <Desktop />}</>
}
export default Navbar
