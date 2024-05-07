import { AiOutlineMinus } from 'react-icons/ai'
import { IoAdd } from 'react-icons/io5'
import { LiaTimesSolid } from 'react-icons/lia'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'

const CartItem = ({ item, removeFromCart }) => {
  const dispatch = useDispatch()
  const quantity = item.quantity

  const incrementQuantity = () => {
    dispatch(cartActions.incrementQuantity(item._id))
  }

  const decrementQuantity = () => {
    dispatch(cartActions.decrementQuantity(item._id))
  }

  return (
    <div className='row grid grid-cols-8 border border-[#E0E0E0] border-solid my-1'>
      <div className='col-span-3 flex p-2'>
        <div className='image-holder w-[110px] h-[110px] bg-secondary'></div>
        <div className='details ml-2 mt-6'>
          <h2 className='font-bold'>{item.title}</h2>
          <p className='text-xs text-grayish italic'>{item.description}</p>
        </div>
      </div>
      <div className='col-span-2 flex items-center p-2'>
        <button onClick={decrementQuantity}>
          <AiOutlineMinus className='font-bold cursor-pointer' />
        </button>
        <input
          type='text'
          value={quantity}
          className='w-[40px] h-[40px] text-center border border-solid border-[#E0E0E0] mx-1 focus:outline-none'
        />
        <button onClick={incrementQuantity}>
          <IoAdd className='font-bold cursor-pointer' />
        </button>
      </div>
      <div className='col-span-1 flex items-center p-2'>
        <p className='italic'>${item.price}</p>
      </div>
      <div className='col-span-1 flex items-center p-2'>
        <p className='italic'>${item.totalPrice}</p>
      </div>
      <button
        className='col-span-1 flex items-center p-2'
        onClick={() => removeFromCart(item)}
      >
        <LiaTimesSolid className='text-lg cursor-pointer' />
      </button>
    </div>
  )
}

export default CartItem
