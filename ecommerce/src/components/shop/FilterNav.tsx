import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GoTrash } from 'react-icons/go'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { filterProductsByObj } from '../../utils'

const CATEGORIES = ['Laptop', 'Phone', 'Computer', 'Monitor', 'All']
const BRANDS = ['Lenovo', 'HP', 'Dell', 'All']
const DEFAULT_FILTER_OBJ = {
  category: 'All',
  brand: 'All',
  price: [0, Number.POSITIVE_INFINITY],
}

export const Navigation = ({ filterProducts, products }) => {
  const { search } = useLocation()
  const categoryTerm = new URLSearchParams(search).get('cat') || 'Laptop'
  const brandTerm = new URLSearchParams(search).get('brand') || 'All'

  const [brand, setBrand] = useState(brandTerm)
  const [selectedCategory, setSelectedCategory] = useState(categoryTerm)
  //   const categoryRef = useRef('laptop')
  const minPriceRef = useRef(0)
  const maxPriceRef = useRef(Number.POSITIVE_INFINITY)
  const memoizedCategory = useMemo(() => selectedCategory, [selectedCategory])
  const memoizedBrand = useMemo(() => brand, [brand])
  // const filterOptions = {
  //   category: selectedCategory,
  //   brand: selectedOption,
  //   price: [
  //     +minPriceRef.current.value,
  //     maxPriceRef.current.value || Number.POSITIVE_INFINITY,
  //   ],
  // }

  const filterHandler = useCallback(() => {
    const filterOptions = {
      category: selectedCategory,
      brand: brand,
      price: [
        +minPriceRef.current.value,
        maxPriceRef.current.value || Number.POSITIVE_INFINITY,
      ],
    }

    const filteredProds = filterProductsByObj(products, filterOptions)
    filterProducts(filteredProds)
  }, [brand, filterProducts, products, selectedCategory])

  useEffect(() => {
    filterHandler()
  }, [filterHandler, memoizedCategory, memoizedBrand, minPriceRef, maxPriceRef])
  const changeCategory = (category: string) => {
    // categoryRef.current = category
    setSelectedCategory(category)
  }

  // const options = {
  //   option1: false,
  //   option2: false,
  //   option3: false,
  //   option4: false,
  // }

  // Object.keys(options).forEach((option) => {
  //   if (option === selectedOption) {
  //     options[option] = true
  //   } else {
  //     options[option] = false
  //   }
  // })

  return (
    <div className='first w-[300px] h-full mt-[80px] mr-4 border-r border-[#E3E2E2] border-solid pr-6 '>
      <div className='row'>
        <div className='head flex justify-between items-center pr-4 mb-2'>
          <h2 className='font-bold text-[19px]'>Categories</h2>
          <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
        </div>
        <ul className='text-grayish text-sm pl-5'>
          {CATEGORIES.map((category) => (
            <Category
              key={category}
              isActive={category === selectedCategory}
              onChangeCategory={changeCategory}
            >
              {category}
            </Category>
          ))}
        </ul>
      </div>
      <div className='row mt-10'>
        <div className='head flex justify-between text-center items-center pr-4 '>
          <h2 className='font-bold text-[19px]'>Brand</h2>
          <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
        </div>
        <ul className='text-grayish text-sm pl-6'>
          {BRANDS.map((br) => (
            <Brand onCheck={() => setBrand(br)} checked={br === brand} isActive>
              {br}
            </Brand>
          ))}
        </ul>
      </div>
      <div className='row mt-10'>
        <div className='head flex justify-between items-center pr-4'>
          <h2 className='font-bold text-[19px]'>Price</h2>
          <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
        </div>
        <div className='text-grayish text-sm pl-6 w-[160px] mt-2'>
          <div className='flex mb-2 justify-between items-center'>
            From
            <input
              ref={minPriceRef}
              type='number'
              className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] pl-3 text-black'
            />
          </div>
          <div className='flex justify-between items-center'>
            To
            <input
              ref={maxPriceRef}
              type='number'
              className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] pl-3 text-black'
            />
          </div>
        </div>
      </div>
      <div className='buttons mt-6 flex'>
        {/* <button
          onClick={filterHandler}
          className='w-[111px] h-[54px] bg-main hover:bg-[#068572] 
          text-white flex justify-center items-center text-xl font-bold duration-200'
        >
          Apply
        </button>
        <button
          className='ml-3 border border-[#D9D9D9] border-solid w-[51px] 
        h-[54px] flex justify-center items-center text-[29px] text-[#878787]'
        >
          <GoTrash />
        </button> */}
      </div>
    </div>
  )
}

export const MobileNavigation = ({ isOpen, closeNav }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          height: isOpen ? '0' : '100%',
          padding: isOpen ? '0' : 'auto',
        }}
        animate={{
          height: isOpen ? '100%' : '0',
          padding: isOpen ? 'auto' : '0',
        }}
        exit={{
          height: '0',
          padding: '0',
        }}
        transition={{
          duration: 0.3,
        }}
        className='first absolute  top-[88px] bg-white mt-2 border-[#E3E2E2] border-solid flex w-full p-5 pb-16
      justify-start mb-4 flex-col text-center items-center z-40 overflow-hidden'
      >
        <div className='row'>
          <div className='head flex justify-center items-center max-w-full flex-wrap'>
            <h2 className='font-bold text-[19px]'>Categories</h2>
          </div>
          {/* <ul className='text-grayish text-sm flex gap-1 flex-wrap justify-center'>
              <Category isActive>Laptops</Category>
              <Category>Phones</Category>
              <Category>Computers</Category>
              <Category>Monitors</Category>
              <Category>Gaming</Category>
            </ul> */}
          <select name='' id=''>
            <option value=''>laptops</option>
            <option value=''>Computers</option>
            <option value=''>Monitors</option>
            <option value=''>Gaming</option>
          </select>
        </div>
        <div className='row mt-7'>
          <div className='head flex justify-center items-center mt-4'>
            <h2 className='font-bold text-[19px]'>Brand</h2>
          </div>
          <ul className='text-grayish text-sm flex-grow flex flex-wrap gap-x-5'>
            <MobileBrand isActive>Lenovo</MobileBrand>
            <MobileBrand>Dell</MobileBrand>
            <MobileBrand>HP</MobileBrand>
            <MobileBrand>All</MobileBrand>
          </ul>
        </div>
        <div className='row mt-7'>
          <div className='head flex justify-center items-center'>
            <h2 className='font-bold text-[19px]'>Price</h2>
          </div>
          <div className='text-grayish text-sm w-[160px] mt-2'>
            <div className='flex mb-2 justify-between items-center'>
              From
              <input
                type='text'
                className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] text-black'
              />
            </div>
            <div className='flex justify-between items-center'>
              To
              <input
                type='text'
                className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] text-black'
              />
            </div>
          </div>
        </div>
        <div className='buttons mt-6 flex w-[80%] min-w[111px]'>
          <button
            className='min-w-[111px] h-[54px] bg-mai hover:bg-[#068572]n hover:bg-[#068572] text-white flex justify-center 
          items-center text-xl font-bold flex-grow duration-200'
          >
            Apply
          </button>
        </div>
        <button onClick={closeNav}>
          <FaTimes className='absolute top-3 right-3 text-2xl cursor-pointer text-gray-500' />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

type ItemType = {
  onChangeCategory: (category: string) => void
  children: React.ReactNode
  isActive?: boolean
}

function Category({ onChangeCategory, children, isActive }: ItemType) {
  return (
    <li
      onClick={() => onChangeCategory(children)}
      className={`${
        isActive ? 'font-bold bg-black text-white' : 'bg-white text-black'
      }  hover:bg-black hover:text-white 
        px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300 w-[120px] mb-2`}
    >
      {children}
    </li>
  )
}

function MobileCategory({ children, isActive }: ItemType) {
  return (
    <li
      className={`${
        isActive ? 'font-bold bg-black text-white' : 'bg-white text-black'
      }  hover:bg-black hover:text-white 
        px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300`}
    >
      {children}
    </li>
  )
}

function Brand({ children, isActive, checked, onCheck }: ItemType) {
  return (
    <li className='flex items-center mt-2'>
      <input
        className='mr-2 w-[20px] aspect-square'
        name='brand'
        value='3'
        type='checkbox'
        onChange={onCheck}
        checked={checked}
      />
      {children}
    </li>
  )
}

function MobileBrand({ children, isActive }: ItemType) {
  return (
    <li className='flex items-center mt-2'>
      <input
        className='mr-2 w-[20px] aspect-square'
        name='brand'
        value='3'
        type='checkbox'
      />
      {children}
    </li>
  )
}
