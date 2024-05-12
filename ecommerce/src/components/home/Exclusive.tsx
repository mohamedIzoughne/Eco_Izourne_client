import { MdOutlineNewLabel } from 'react-icons/md'
import SectionHeading from '../../UI/SectionHeading'
import { Link } from 'react-router-dom'
import watch from '../../assets/watch.png'
import Reveal from '../../UI/Reveal'
import { useEffect, useMemo, useState } from 'react'
const ExclusiveTime = () => {
  const date = useMemo(() => new Date('2024-12-3'), [])
  const [time, setTime] = useState(Number(date) - Number(new Date()))
  // const totalSeconds = time / 1000
  // const totalSeconds = time / 1000

  const days = Math.floor(time / (1000 * 60 * 60 * 24))
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((time % (1000 * 60)) / 1000)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(Number(date) - Number(new Date()))
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [time, setTime, date])

  return (
    <div className='time my-5'>
      <ul className='flex max-w-[200px] mx-auto sm:ml-0 justify-between text-center'>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{days}</p>
            <small className='text-[7.38px]'>days</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{hours}</p>
            <small className='text-[7.38px]'>hr</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{minutes}</p>
            <small className='text-[7.38px]'>min</small>
          </li>
        </Reveal>
        <Reveal>
          <li className='w-[42px] h-[40px] rounded-full bg-white flex flex-col justify-center leading-none'>
            <p className='text-[18.69px] font-bold'>{seconds}</p>
            <small className='text-[7.38px]'>sec</small>
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
          <Link to='/shop' className='block w-fit ml-auto mr-auto sm:mr-0'>
            <Reveal>
              <button className='btn-main sm:mr-0  rounded-sm px-3 py-2 ml-auto text-md relative z-20'>
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
