import { useState } from 'react'
import PageHeading from '../components/PageHeading'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../data'
const FAQ = ({ question }) => {
  const [isOpen, seIsOpen] = useState(false)
  const duration = 0.25
  return (
    <>
      <AnimatePresence>
        {/* {isOpen && ( */}
        <motion.li
          initial={{
            height: isOpen ? '50px' : '183px',
          }}
          animate={{
            height: isOpen ? '183px' : '50px',
          }}
          transition={{
            duration,
          }}
          className={`faq text-sm px-2 py-2 border border-[#D9D9D9] 
          border-solid xs:py-3 xs:px-5 xs:max-h-[163px] xs:text-base 
          overflow-hidden `}
        >
          <div
            className='question flex justify-between items-center cursor-pointer pb-1'
            onClick={() => seIsOpen((open) => !open)}
          >
            <h3 className='font-bold'>{question}</h3>
            {isOpen ? (
              <MdOutlineKeyboardArrowDown className='text-xl cursor-pointer' />
            ) : (
              <MdOutlineKeyboardArrowUp className='text-xl cursor-pointer' />
            )}
          </div>
          <div className='answer origin-top'>
            <motion.p
              initial={{
                opacity: isOpen ? '0' : '1',
              }}
              animate={{
                opacity: isOpen
                  ? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                  : '0',
              }}
              transition={{
                duration,
              }}
              className='answer text-sm text-[#7A7A7A] w-[345px] max-w-full'
            >
              {faqs[question]}
            </motion.p>
          </div>
          {/* // </AnimatePresence> */}
        </motion.li>
        {/* )} */}
      </AnimatePresence>
    </>
  )
}

const questions = Object.keys(faqs)
const FAQs = () => {
  return (
    <section className='container mb-16'>
      <PageHeading title='FAQs' />
      <h1 className=' text-4xl font-bold'>Frequently Asked Questions</h1>
      <p className='text-sm font-bold text-[#808080]'>
        Quick Answers to Questions you may have
      </p>
      <ul className='mt-8 grid md:grid-cols-2 gap-10'>
        {questions.map((quest) => (
          <FAQ key={quest} question={quest} />
        ))}
      </ul>
    </section>
  )
}

export default FAQs
