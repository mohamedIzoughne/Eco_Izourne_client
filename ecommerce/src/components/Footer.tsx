import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-black text-white py-20 mt-auto'>
      <div className='container grid gap-10 sm:gap-0 sm:grid-cols-2 md:grid-cols-4 text-center sm:text-left'>
        <div className='logo-disc mb-5 text-sm'>
          <h1 className='text-[34px] font-bold  mb-2 leading-none'>IZOURNE</h1>
          <p className=' max-w-52 mx-auto sm:ml-0'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
          </p>
          <div className='icons'></div>
        </div>
        <div className='links'>
          <h2 className='text-[20px] font-bold mb-2 leading-none'>
            Quick Links
          </h2>
          <ul className='grid grid-cols-2'>
            <li>
              <Link to='/' className='underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                Shop
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                Cart
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                FAQs
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                Wishlist
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                Contact
              </Link>
            </li>
            <li>
              <Link to='/' className='underline'>
                About us
              </Link>
            </li>
          </ul>
        </div>
        <div className='contact'>
          <h2 className='text-[20px] font-bold mb-2 leading-none'>Contact</h2>
          <p>Al Hassan 2 Street</p>
          <p>Dakhla Agadir</p>
          <p>Morocco</p>
          <p>+212 603811677</p>
        </div>
        <div className='FAQs hidden sm:block'>
          <h2 className='text-[20px] font-bold mb-2 leading-none'>FAQs</h2>
          <ul className='questions ml-5 list-disc'>
            <li>
              <Link to='/FAQs' className='underline'>
                What is your return policy?
              </Link>
            </li>
            <li>
              <Link to='/FAQs' className='underline'>
                Do you ship internationally??
              </Link>
            </li>
            <li>
              <Link to='/FAQs' className='underline'>
                How can I contact customer support?
              </Link>
            </li>
            <li>
              <Link to='/FAQs' className='underline'>
                How long will it take to receive my order?
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
