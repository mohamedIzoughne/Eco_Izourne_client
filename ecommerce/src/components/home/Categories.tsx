import { IoGridOutline } from 'react-icons/io5'
import SectionHeading from '../../UI/SectionHeading'
import phone from '../../assets/images/phone.jpg'
import computer from '../../assets/images/computer.jpg'
import monitor from '../../assets/images/monitor.jpg'
import controller from '../../assets/images/controller.jpg'
import laptop from '../../assets/images/laptop.jpg'
import Exclusive from './Exclusive'
import { Link } from 'react-router-dom'
import Reveal from '../../UI/Reveal'

const Category = ({ title, image }) => {
  return (
    <div className='category-image category z-10 shadow-customed aspect-square flex flex-col justify-center items-center cursor-pointer mx-auto min-w-[250px] overflow-hidden rounded-md'>
      <img
        className='category-image w-full h-full object-cover brightness-50'
        src={image}
        alt={title}
      />
      <p className='text text-lg font-bold m-auto mt-4 absolute bottom-0 py-2 bg-white w-full text-center z-10'>
        {title}
      </p>
    </div>
  )
}

const Categories = () => {
  return (
    <section className='container my-20 text-sm overflow-hidden'>
      <SectionHeading
        title='Browse by Category'
        icon={<IoGridOutline className='text-xl' />}
      />
      <div className='categories grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-7 ml-4'>
        <Link to='/shop?cat=Laptop'>
          <Reveal>
            <Category title='Laptops' image={laptop} />
          </Reveal>
        </Link>
        <Link to='/shop?cat=Phone'>
          <Reveal>
            <Category title='Phones' image={phone} />
          </Reveal>
        </Link>
        <Link to='/shop?cat=Computer'>
          <Reveal>
            <Category title='Computers' image={computer} />
          </Reveal>
        </Link>
        <Link to='/shop?cat=Monitor'>
          <Reveal>
            <Category title='Monitors' image={monitor} />
          </Reveal>
        </Link>
        <Link to='/shop?cat=Gaming'>
          <Reveal>
            <Category title='Gaming' image={controller} />
          </Reveal>
        </Link>
      </div>
      <Exclusive />
    </section>
  )
}

export default Categories
