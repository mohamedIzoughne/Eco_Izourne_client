const Cart = ({ total, OnContinue }) => {
  return (
    <div
      className='cart lg:col-span-1 m-1 mb-[44px] lg:mt-[44px] lg:mb-0 py-5 px-5 lg:h-[473px] border 
      border-[#C6C6C6] lg:border-opacity-20 border-solid'
    >
      <h2 className='font-bold text-[23px] text-center'>Total</h2>
      <hr className='w-[302px]  border-[#C6C6C6] border-opacity-30 mx-auto' />
      <p className='flex justify-between mt-5 w-full lg:w-[302px] mx-auto'>
        <span className='font-bold'>Sub-total</span>
        <span className=''>${total}</span>
      </p>
      <p className='flex justify-between mt-3 mb-5 w-full lg:w-[302px] mx-auto'>
        <span className='font-bold'>Delovery</span>
        <span>$3</span>
      </p>
      <hr className='w-full lg:w-[302px] mx-auto border-[#C6C6C6] border-opacity-30' />
      <button
        onClick={OnContinue}
        className='block mx-auto bg-main hover:bg-[#068572] w-full lg:w-[302px] h-[58px] text-white font-bold text-xl
         mt-4 cursor-pointer rounded-sm duration-200'
      >
        Continue
      </button>
      <form className='coupon w-full lg:w-[302px] mt-5 mx-auto'>
        <p className='text-sm text-[#616161] italic'>Have a discount code?</p>
        <input
          className='w-[257px] h-[47px] italic pl-3 focus:outline-none rounded-sm border-2 border-[#E0E0E0] border-opacity-50 border-solid'
          type='text'
          placeholder='Enter your code'
        />
        <button
          className='bg-main w-[60px] hover:bg-[#068572] h-[47px] -ml-[60px] text-white font-bold rounded-tr-sm rounded-br-sm duration-200'
          type='submit'
        >
          Apply
        </button>
        <p className='text-sm text-danger'>This is an incorrect code</p>
      </form>
    </div>
  )
}

export default Cart
