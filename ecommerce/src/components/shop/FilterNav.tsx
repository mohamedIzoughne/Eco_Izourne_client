import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { filterProductsByObj } from '../../utils'
import { productType } from '../../App'
import Select from '../../UI/Select'
const CATEGORIES = ['Laptop', 'Phone', 'Computer', 'Monitor', 'All']
const BRANDS = ['Lenovo', 'HP', 'Dell', 'All']

export const Navigation = ({
  filterProducts,
  products,
}: {
  filterProducts: (arg: productType[]) => void
  products: productType[]
}) => {
  const { search } = useLocation()
  const categoryTerm = new URLSearchParams(search).get('cat') || 'All'
  const brandTerm = new URLSearchParams(search).get('brand') || 'All'

  const [selectedBrand, setSelectedBrand] = useState(brandTerm)
  const [selectedCategory, setSelectedCategory] = useState(categoryTerm)
  const minPriceRef = useRef<HTMLInputElement>(null)
  const maxPriceRef = useRef<HTMLInputElement>(null)
  const memoizedProducts = useMemo(() => products, [products])

  const filterHandler = useCallback(() => {
    const filterOptions = {
      category: selectedCategory,
      brand: selectedBrand,
      price: [
        +minPriceRef.current!.value || 0,
        maxPriceRef.current!.value || Number.POSITIVE_INFINITY,
      ],
    }
    const filteredProds = filterProductsByObj(memoizedProducts, filterOptions)
    filterProducts(filteredProds)
  }, [selectedCategory, selectedBrand])

  useEffect(() => {
    filterHandler()
  }, [filterHandler])

  const changeCategory = (category: string) => {
    setSelectedCategory(category)
  }

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
            <Brand
              onCheck={() => setSelectedBrand(br)}
              checked={br === selectedBrand}
            >
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

// const Select: React.FC<{ children: React.JSX; title: string }> = ({
//   children,
//   title,
// }) => {
//   return (
//     <select
//       name=''
//       id=''
//       className='border min-h-8 border-gray-300 border-solid rounded-sm
//             w-1/3 focus:outline-none items-center'
//     >
//       <option value='default' hidden selected disabled>
//         {title}
//       </option>
//       {children}
//     </select>
//   )
// }

export const MobileNavigation = ({
  isOpen,
  closeNav,
  onSearch,
}: {
  isOpen: boolean
  closeNav: () => void
  onSearch: (e: React.FormEvent<HTMLFormElement>, searchRef?: Element) => void
}) => {
  const searchRef = useRef<Element>(null)
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
        className='first bg-white mt-2 border-[#E3E2E2] border-solid flex w-full p-5 pb-16
      justify-start mb-4 flex-col text-center items-center z-40 overflow-hidden'
      >
        <form
          className='search w-full mt-3 mb-1'
          onSubmit={(e) => onSearch(e, searchRef!.current!.value)}
        >
          <input
            type='text'
            placeholder='Search'
            className='italic w-full h-[47px] rounded-[4px] pl-4 text-[17px] text-[#616161] border border-[#E0E0E0] border-solid focus:outline-none border-opacity-70'
            ref={searchRef}
          />
        </form>
        <div className='row flex w-full justify-between gap-1'>
          <Select title='sort by' className='w-1/3'>
            <option value='default' hidden selected disabled>
              sort by
            </option>
            <option value='alphabet'>Alphabetically</option>
            <option value='price'>price</option>
          </Select>
          <Select title='brand' className='w-1/3'>
            <option value='lenovo'>Lenovo</option>
            <option value='dell'>Dell</option>
            <option value='hp'>HP</option>
            <option value='all'>aLL</option>
          </Select>
          <Select title='category' className='w-1/3'>
            <option value='laptops'>laptops</option>
            <option value='computers'>Computers</option>
            <option value='monitors'>Monitors</option>
            <option value='gaming'>Gaming</option>
          </Select>
        </div>
        {/* <div className='row mt-7'>
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
        </div> */}
        {/* <div className='buttons mt-6 flex w-[80%] min-w[111px]'>
          <button
            className='min-w-[111px] h-[54px] bg-mai hover:bg-[#068572]n hover:bg-[#068572] text-white flex justify-center 
          items-center text-xl font-bold flex-grow duration-200'
          >
            Apply
          </button>
        </div> */}
        {/* <button onClick={closeNav}>
          <FaTimes className='absolute top-3 right-3 text-2xl cursor-pointer text-gray-500' />
        </button> */}
      </motion.div>
    </AnimatePresence>
  )
}

type ItemType = {
  onChangeCategory: (category: string) => void
  children: string
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

// function MobileCategory({ children, isActive }: ItemType) {
//   return (
//     <li
//       className={`${
//         isActive ? 'font-bold bg-black text-white' : 'bg-white text-black'
//       }  hover:bg-black hover:text-white
//         px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300`}
//     >
//       {children}
//     </li>
//   )
// }

function Brand({
  children,
  checked,
  onCheck,
}: {
  checked: boolean
  onCheck: () => void
  children: React.ReactNode
}) {
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

function MobileBrand({ children }: { children: React.ReactNode }) {
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
