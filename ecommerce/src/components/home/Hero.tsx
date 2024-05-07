import { IoCartOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import blob from '../../assets/Vector.png'
import hero from '../../assets/hero.png'
import Reveal from '../../UI/Reveal'
const Hero = () => {
  return (
    <section className='bg-gradient-to-b from-[#C8FFF2] to-[#EFFFFE]'>
      <main className='container grid sm:grid-cols-12 gap-4 items-center py-5 min-h-[500px]'>
        <div className='col-span-5 my-28 sm:my-0 mx:auto sm:ml-5 sm:mr-0 text-center sm:text-left'>
          <Reveal>
            <h1 className='spa tracking-tighter text-4xl font-bold'>
              Next Generation Technology
            </h1>
          </Reveal>
          <Reveal>
            <p className='text-xs text-[#616161] '>
              Explore limitless options with us. Find your perfect match in
              curated selections. Elevate your shopping experience today!
            </p>
          </Reveal>
          <Link to='/shop' className='block w-fit ml-auto mr-auto sm:mr-0'>
            <Reveal>
              <button className='btn-main flex items-center sm:mr-0 px-3 py-2 mt-8 rounded-sm relative z-10'>
                Shop now <IoCartOutline className='ml-3 text-xl' />
              </button>
            </Reveal>
          </Link>
        </div>
        <div className='hidden sm:block col-span-7 relative'>
          <Reveal>
            <img className='w-[90%]' src={blob} alt='' />
            <img
              className='absolute top-0 w-[140%] left-[-30%]'
              src={hero}
              alt=''
            />
          </Reveal>
        </div>
      </main>
    </section>
  )
}

export default Hero
