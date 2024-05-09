import { BsTruck } from 'react-icons/bs'
import { HiOutlineCheckBadge } from 'react-icons/hi2'
import { MdOutlinePayment, MdSupportAgent } from 'react-icons/md'
import Reveal from '../../UI/Reveal'

const Service = ({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) => {
  return (
    <Reveal className='mx-auto'>
      <li className='flex flex-col items-center text-center'>
        <div className='icon text-[60px]'>
          {/* <img src={icon} alt='' /> */}
          {icon}
        </div>
        <div className='details leading-none pt-1 pl-1'>
          <h2 className='font-bold text-[35px] sm:text-[28px]'>{title}</h2>
          <p className='text-grayish text-[30px] sm:text-[24px]'>{desc}</p>
        </div>
      </li>
    </Reveal>
  )
}

const Services = () => {
  return (
    <section className='services container pb-20 pt-5'>
      <h1 className='text-[70px] sm:text-[106.89px] text-center text-[#EEEEEE] font-extrabold leading-none'>
        <Reveal className='mx-auto'>Services</Reveal>
      </h1>
      <div className='service-list mt-8'>
        <ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-y-8'>
          <Service
            title='Free shipping'
            desc='Free Shipping On All Orders'
            icon={<BsTruck />}
          />
          <Service
            title='Money guarantee'
            desc='30 Days Money Back '
            icon={<HiOutlineCheckBadge />}
          />
          <Service
            title='Online Support'
            desc='Technical Support 24/7'
            icon={<MdSupportAgent />}
          />
          <Service
            title='Secure  payment'
            desc='All Cards Accepted'
            icon={<MdOutlinePayment />}
          />
        </ul>
      </div>
    </section>
  )
}

export default Services
