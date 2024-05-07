import { FaBagShopping } from 'react-icons/fa6'
import SectionHeading from '../UI/SectionHeading'
import Product from './Product'
import { Link } from 'react-router-dom'

const Products = ({ products, title }) => {
  return (
    <section className='products container pb-40'>
      {products.length > 0 && (
        <SectionHeading
          title={title}
          icon={<FaBagShopping className='text-lg' />}
        />
      )}
      <div className='products-list my-10'>
        <ul className='ml-5 grid-columns-main gap-5 '>
          {products.map((product) => {
            return <Product key={product._id} product={product} />
          })}
        </ul>
      </div>
      <Link
        className='flex mx-auto w-[211px] h-[46px] bg-[#4AEED6]
          text-black font-bold text-center justify-center items-center bg-opacity-20 hover:bg-main hover:text-white
           transition-all duration-300'
        to='/shop'
      >
        Open Store
      </Link>
    </section>
  )
}

export default Products
