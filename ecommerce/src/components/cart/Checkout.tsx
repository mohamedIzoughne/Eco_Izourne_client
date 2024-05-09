import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Checkout = () => {
  const thisMonth = new Date().getMonth() + 1
  const thisYear = new Date().getFullYear()
  const date = `${thisYear}-${thisMonth}`
  const totalCartPrice = useSelector((state: RootState) => state.cart.totalCartPrice)

  return (
    <div className='m-1 mt-[44px] py-5 px-5 h-[473px] border border-[#C6C6C6] border-opacity-20 border-soli'>
      <h2 className='font-bold text-[23px]'>Payment Info.</h2>
      <hr className='w-[302px]  border-[#C6C6C6] border-opacity-30 mx-auto' />
      <h3 className='text-[19px] flex justify-between font-bold mt-3 mb-4'>
        <span>Total Price</span>
        <span>
          <u>${totalCartPrice}</u>
        </span>
      </h3>
      <h3 className=' flex justify-between items-center'>
        <span className='font-bold'>Name on card</span>
        <span className='text-xs text-[#9A9A9A]'>required</span>
      </h3>{' '}
      <input
        className='w-[300px] border border-[#D9D9D9] border-solid p-2 text-sm focus:outline-none mb-5'
        type='text'
        placeholder='name on card'
      />
      <h3 className=' flex justify-between items-center'>
        <span className='font-bold'>Card number</span>
        <span className='text-xs text-[#9A9A9A]'>required</span>
      </h3>{' '}
      <input
        className='w-[300px] border border-[#D9D9D9] border-solid p-2 text-sm focus:outline-none mb-5'
        type='text'
        placeholder='card number'
      />
      <div className='flex'>
        <div className='col-1'>
          <h3 className='flex justify-between items-center'>
            <span className='font-bold'>expiry date</span>
            <small className='text-xs text-[#9A9A9A]'>required</small>
          </h3>
          <input
            className='border border-[#D9D9D9] border-solid p-2 text-sm focus:outline-none mb-3'
            type='month'
            id='start'
            name='start'
            min={date}
          />
        </div>
        <div className='col-2 ml-1'>
          <h3 className=' flex justify-between items-center'>
            <span className='font-bold'>CVC/CVV</span>
            <span className='text-xs text-[#9A9A9A]'>required</span>
          </h3>
          <input
            className='border border-[#D9D9D9] border-solid p-2 text-sm focus:outline-none mb-3'
            type='text'
            placeholder='CVC'
          />
        </div>
      </div>
      <button
        className='block mx-auto bg-main hover:bg-[#068572] w-[302px] h-[58px] text-white font-bold text-xl 
        mt-4 cursor-pointer rounded-sm duration-200'
      >
        Check Out
      </button>
    </div>
  )
}

export default Checkout
