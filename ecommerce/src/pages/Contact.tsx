import { FaPhoneAlt } from 'react-icons/fa'
import { BsEnvelope } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

import PageHeading from '../components/PageHeading'
import Reveal from '../UI/Reveal'

const ContactCard = () => {
  return (
    <Reveal className='mx-auto'>
      <div className='w-fit sm:w-[600px] md:flex md:w-[700px] lg:w-[900px] mx-auto -translate-y-20 shadow-md'>
        <div className='sec-1 bg-main text-white min-h-full md:w-[50%] p-10'>
          <h2 className='text-[23px] font-bold tracking-tight]'>
            Contact information
          </h2>
          <p className='text-[13px] w-[194px]'>
            You can message us whenever you want, you’re so welcome here
          </p>
          <div className='infos'>
            <div className='phone flex items-center mt-8 gap-5'>
              <FaPhoneAlt className='text-3xl' />
              <div className='numbers text-xs font-bold'>
                <p>+123 3974328</p>
                <p>+123 9954728</p>
              </div>
            </div>
            <div className='email flex items-center mt-5 gap-5'>
              <BsEnvelope className='text-3xl' />
              <p className='email-info font-bold text-xs'>izourne@gmail.com</p>
            </div>
            <div className='location flex items-center mt-5 gap-5'>
              <CiLocationOn className='text-3xl' />
              <div className='location-info'>
                <p className='text-xs font-bold leading-none -mb-1'>Agadir</p>
                <small className='text-[10px]'>Dakhla</small>
              </div>
            </div>
          </div>
        </div>
        <div className='sec-2 bg-white h-full w-[50%] py-10 px-5'>
          <div className='infos sm:flex'>
            <div className='name w-[153px] flex flex-col'>
              <label
                htmlFor='contact-name'
                className='font-bold text-[#808080] text-[13px]'
              >
                Your name
              </label>
              <input
                type='text'
                name=''
                id='contact-name'
                className='w-full border-b border-[#D9D9D9]  border-solid focus:outline-none font-bold text-[15px] italic'
              />
            </div>
            <div className='email flex-grow flex flex-col ml-1 mt-3 sm:mt-0'>
              <label
                htmlFor='contact-email'
                className='font-bold text-[#808080] text-[13px]'
              >
                Your email
              </label>
              <input
                type='text'
                name=''
                id='contact-email'
                className='border-b border-[#D9D9D9]  border-solid focus:outline-none font-bold text-[15px] italic'
              />{' '}
            </div>
          </div>
          <div className='subject mt-5 flex flex-col'>
            <label
              htmlFor='subject'
              className=' text-[15px] text-[#808080] font-bold'
            >
              Subject
            </label>
            <input
              type='text'
              className='border-b border-[#D9D9D9] text-opacity-5  border-solid focus:outline-none text-xs italic placeholder:font-light font-bold'
              name=''
              id='subject'
              placeholder='Enter your subject here'
            />
          </div>
          <div className='message mt-5'>
            <h4 className='text-[15px] text-main font-bold mb-2 pl-1'>
              Message
            </h4>
            <textarea
              id='message'
              // rows='4'
              className='block pl-1 w-[280px] sm:w-[304px] text-xs text-gray-900  focus:outline-none h-[73px] border-b border-main border-solid'
              placeholder='Your message...'
            ></textarea>
          </div>
          <button className='bg-main hover:bg-[#068572] w-[100px] h-[35px] font-bold text-white text-center text-xs mt-2 duration-200'>
            Send message
          </button>
        </div>
      </div>
    </Reveal>
  )
}
const ContactCardMobile = () => {
  return (
    <Reveal>
      <div className='w-fit mx-auto -translate-y-20 shadow-md'>
        <div className='sec-1 bg-main text-white p-10'>
          <h2 className='text-[23px] font-bold tracking-tight]'>
            Contact information
          </h2>
          <p className='text-[13px] w-[194px]'>
            You can message us whenever you want, you’re so welcome here
          </p>
          <div className='infos'>
            <div className='phone flex items-center mt-8 gap-5'>
              <FaPhoneAlt className='text-3xl' />
              <div className='numbers text-xs font-bold'>
                <p>+123 3974328</p>
                <p>+123 9954728</p>
              </div>
            </div>
            <div className='email flex items-center mt-5 gap-5'>
              <BsEnvelope className='text-3xl' />
              <p className='email-info font-bold text-xs'>izourne@gmail.com</p>
            </div>
            <div className='location flex items-center mt-5 gap-5'>
              <CiLocationOn className='text-3xl' />
              <div className='location-info'>
                <p className='text-xs font-bold leading-none -mb-1'>Agadir</p>
                <small className='text-[10px]'>Dakhla</small>
              </div>
            </div>
          </div>
        </div>
        <div className='sec-2 bg-white h-full w-[50%] py-10 px-5'>
          <div className='infos'>
            <div className='name w-[153px] flex flex-col'>
              <label
                htmlFor='contact-name'
                className='font-bold text-[#808080] text-[13px]'
              >
                Your name
              </label>
              <input
                type='text'
                name=''
                id='contact-name'
                className='w-full border-b border-[#D9D9D9]  border-solid focus:outline-none font-bold text-[15px] italic'
              />
            </div>
            <div className='email flex-grow flex flex-col ml-1 mt-3'>
              <label
                htmlFor='contact-email'
                className='font-bold text-[#808080] text-[13px]'
              >
                Your email
              </label>
              <input
                type='text'
                name=''
                id='contact-email'
                className='border-b border-[#D9D9D9]  border-solid focus:outline-none font-bold text-[15px] italic'
              />{' '}
            </div>
          </div>
          <div className='subject mt-5 flex flex-col'>
            <label
              htmlFor='subject'
              className=' text-[15px] text-[#808080] font-bold'
            >
              Subject
            </label>
            <input
              type='text'
              className='border-b border-[#D9D9D9] text-opacity-5  border-solid focus:outline-none text-xs italic placeholder:font-light font-bold'
              name=''
              id='subject'
              placeholder='Enter your subject here'
            />
          </div>
          <div className='message mt-5'>
            <h4 className='text-[15px] text-main font-bold mb-2 pl-1'>
              Message
            </h4>
            <textarea
              id='message'
              // rows='4'
              className='block pl-1 w-[280px] text-xs text-gray-900  focus:outline-none h-[73px] border-b border-main border-solid'
              placeholder='Your message...'
            ></textarea>
          </div>
          <button className='bg-main hover:bg-[#068572] w-[100px] h-[35px] font-bold text-white text-center text-xs mt-2 duration-200'>
            Send message
          </button>
        </div>
      </div>
    </Reveal>
  )
}

const Contact = () => {
  return (
    <section className='container'>
      <PageHeading title='Contact' />

      <ContactCard />
    </section>
  )
}

export default Contact
