import { MdOutlineNewLabel } from 'react-icons/md'
import SectionHeading from '../../UI/SectionHeading'
import { Link } from 'react-router-dom'
import watch from '../../assets/watch.png'
import Reveal from '../../UI/Reveal'
const ExclusiveTime = () => {
  const date = new Date('2024-12-3')
  const time = date - new Date()
  // const totalSeconds = time / 1000
  const totalSeconds = time / 1000

  // Convert seconds to minutes
  const totalMinutes = Math.floor(totalSeconds / 60)

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = Math.floor(totalMinutes % 60)

  const totalDays = Math.floor(totalHours / 24)
  const remainingHours = Math.floor(totalHours % 24)

  const remainingMonths = Math.floor(totalDays / 30.44) // Approximate number of days in a month
  const remainingDays = Math.floor(totalDays % 30.44)

  return (
    <div className='time my-5'>
      <ul className='flex max-w-[200px] mx-auto sm:ml-0 justify-between text-center'>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{remainingMonths}</p>
            <small className='text-[7.38px]'>months</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{remainingDays}</p>
            <small className='text-[7.38px]'>days</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{remainingHours}</p>
            <small className='text-[7.38px]'>hr</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{remainingMinutes}</p>
            <small className='text-[7.38px]'>min</small>
          </li>
        </Reveal>
      </ul>
    </div>
  )
}

const Exclusive = () => {
  return (
    <div className='bg-[#e0ebe462] relative py-10 mt-40'>
      <SectionHeading
        title='Exclusive'
        icon={<MdOutlineNewLabel className='text-xl' />}
      />{' '}
      <div className='grid sm:grid-cols-12 gap-4 items-center my-10'>
        <div className='col-span-5 col-start-2 mx:auto sm:ml-5 sm:mr-0 text-center sm:text-left'>
          <Reveal>
            <h1 className='tracking-tighter text-4xl font-bold'>
              Enhance your life experience
            </h1>
          </Reveal>
          <ExclusiveTime />
          <Link to='/shop'>
            <Reveal>
              <button className='btn-main sm:mr-0  rounded-sm px-3 py-2 ml-auto text-md relative z-50'>
                Check it Out
              </button>
            </Reveal>
          </Link>
        </div>
        <div
          className='absolute -top-[139px] hidden sm:block col-span-7 w-[600px]  rotate-[7deg] -translate-y-10
  -right-[140px]'
        >
          <Reveal>
            <img src={watch} alt='' />
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export default Exclusive
