import { FaLongArrowAltLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'

const PageHeading = ({ title }) => {
  let subTitle = title.charAt(0).toUpperCase() + title.slice(1)
  subTitle = title.split(' ')[0]
  return (
    <div className='page-heading bg-gradient-to-b from-[#EFFFFB] to-white min-h-[238px] py-8 pl-10'>
      <Link to='/' className='flex items-center p-3 w-fit'>
        <HiOutlineArrowLeft className='inline-block mr-1 text-light' />
        <span>Go Back</span>
      </Link>
      {/* <span>
      </span> */}
      <h1 className='text-4xl text-center mt-3 font-bold'>{title}</h1>
      <p className='text-grayish text-center text-xs'>Home/{subTitle}</p>
    </div>
  )
}

export default PageHeading
