import PageHeading from '../components/PageHeading'
import { useState } from 'react'
import { cartActions, cartItemState } from '../store/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../components/cart/Cart'
import CartItem from '../components/cart/CartItem'
import Checkout from '../components/cart/Checkout'
import { RootState } from '../store'

const CartPage = () => {
  const [isCart, setIsCart] = useState(true)
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const handleCart = () => {
    setIsCart(false)
  }
  const removeFromCart = (product: cartItemState) => {
    dispatch(cartActions.removeItemFromCart(product))
  }

  return (
    <section className='container'>
      <PageHeading title='Cart' />
      <main className='flex flex-col-reverse lg:grid lg:grid-cols-3 mb-16'>
        <div className='products lg:col-span-2'>
          <div className='row grid grid-cols-8 font-bold'>
            <div className='col-span-3 p-2'>Product Details</div>
            <div className='col-span-2 p-2'>Quantity</div>
            <div className='col-span-1 p-2'>Price</div>
            <div className='col-span-1 p-2'>Total</div>
          </div>
          {Object.values(cart.items).map((item: cartItemState) => (
            <CartItem
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}
          {/* <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem /> */}
        </div>
        {isCart ? (
          <Cart total={cart.totalCartPrice} OnContinue={handleCart} />
        ) : (
          <Checkout />
        )}
      </main>
    </section>
  )
}

export default CartPage
