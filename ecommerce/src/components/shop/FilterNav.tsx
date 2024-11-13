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
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import useQueryParams from '../../hooks/useQueryParams'

const AnimatedFilterItem = ({ children, className = '', title }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`row ${className}`}>
      <motion.div
        initial={{
          height: isOpen ? '30px' : '183px',
        }}
        animate={{
          height: isOpen ? 'auto' : '30px',
        }}
        transition={{
          duration: 0.25,
        }}
        className='overflow-hidden'
      >
        <div
          className='head flex justify-between items-center pr-4'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <h2 className='font-bold text-[19px]'>{title}</h2>
          {isOpen ? (
            <MdOutlineKeyboardArrowDown className='text-[30px] text-grayish cursor-pointer' />
          ) : (
            <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
          )}
        </div>
        <motion.div
          initial={{
            opacity: isOpen ? '0' : '1',
          }}
          animate={{
            opacity: isOpen
              ? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
              : '0',
          }}
          transition={{
            duration: 0.25,
          }}
          className='text-grayish text-sm pl-3  mt-2'
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Navigation = ({
  filterHandler,
}: {
  filterHandler: (arg: {}) => void
}) => {
  const { getQueryParams } = useQueryParams()
  const params = getQueryParams()

  const [width, setWidth] = useState(300)
  const { search } = useLocation()
  const categoryTerm = params.category || 'All'
  const brandTerm = params.brand || 'All'

  const [selectedBrand, setSelectedBrand] = useState(brandTerm)
  const [selectedCategory, setSelectedCategory] = useState(categoryTerm)

  const [minPrice, setMinPrice] = useState(+params.minPrice || 0)
  const [maxPrice, setMaxPrice] = useState(+params.maxPrice || 1000000)

  const minPriceRef = useRef<HTMLInputElement>(null)
  const maxPriceRef = useRef<HTMLInputElement>(null)

  const timerRef = useRef()

  const minPriceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value
      if (value >= maxPrice) return

      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setMinPrice(value)
      }, 300)
    },
    [maxPrice]
  )

  const maxPriceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value

      if (value <= minPrice) return

      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setMaxPrice(value)
      }, 300)
    },
    [minPrice]
  )
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startWidth, setStartWidth] = useState(300)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof Element && !e.target.closest('.price-range')) {
      setIsDragging(true)
      setStartX(e.clientX)
      setStartWidth(width)
      document.body.style.userSelect = 'none'
    }
  }

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX
        const newWidth = Math.max(200, Math.min(600, startWidth + deltaX))
        setWidth(newWidth)
      }

      const handleGlobalMouseUp = () => {
        setIsDragging(false)
        document.body.style.userSelect = 'text'
      }

      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
        document.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, startX, startWidth])

  const changeCategory = (category: string) => {
    setSelectedCategory(category)
  }

  const filterClickHandler = () => {
    const params = {
      category: selectedCategory,
      brand: selectedBrand,
      minPrice: minPriceRef.current!.value || 0,
      maxPrice: maxPriceRef.current!.value || Number.POSITIVE_INFINITY,
    }

    filterHandler(params)
  }

  return (
    <div
      className='first h-full mt-[80px] mr-4 mb-10 pb-3 relative'
      style={{
        width: width + 'px',
        cursor: isDragging ? 'col-resize' : 'auto',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className='absolute right-0 top-0 bottom-0 w-[2px] bg-[#E3E2E2] cursor-col-resize hover:bg-main/20' />
      <div className='pr-6'>
        <AnimatedFilterItem title='Category'>
          {CATEGORIES.map((category) => (
            <Category
              key={category}
              isActive={category === selectedCategory}
              onChangeCategory={changeCategory}
            >
              {category}
            </Category>
          ))}
        </AnimatedFilterItem>
        <AnimatedFilterItem className='mt-4' title='Brand'>
          {BRANDS.map((br) => (
            <Brand
              onCheck={() => setSelectedBrand(br)}
              checked={br === selectedBrand}
              label={br}
            ></Brand>
          ))}
        </AnimatedFilterItem>
        <AnimatedFilterItem className='mt-4' title='Price'>
          <div className='flex flex-col w-full pr-7'>
            <div className='flex justify-between mb-2'>
              <span>$50</span>
              <span>$3500</span>
            </div>
            <div className='flex flex-col gap-4'>
              <div>
                <label className='block mb-2'>minimum price:</label>
                <input
                  type='range'
                  min='50'
                  max='3500'
                  step='10'
                  className='price-range w-full h-2 bg-main/20 rounded-lg appearance-none cursor-pointer accent-main hover:accent-[#068572]'
                  ref={minPriceRef}
                  defaultValue={minPrice}
                  onChange={minPriceHandler}
                />
              </div>
              <div>
                <label className='block mb-2'>maximum price:</label>
                <input
                  type='range'
                  min='50'
                  max='3500'
                  defaultValue={maxPrice}
                  step='10'
                  className='price-range w-full h-2 bg-main/20 rounded-lg appearance-none cursor-pointer accent-main hover:accent-[#068572]'
                  ref={maxPriceRef}
                  onChange={maxPriceHandler}
                />
              </div>
            </div>{' '}
            <div className='mt-4 text-center text-grayish'>
              Price Range: $
              <span className='font-medium text-main'>{minPrice || 0}</span>
              {' - $'}
              <span className='font-medium text-main'>{maxPrice || 1000}</span>
            </div>
          </div>
        </AnimatedFilterItem>
        <div className='buttons mt-20 flex justify-start mr-6'>
          <button
            onClick={filterClickHandler}
            className='py-2 bg-main w-full hover:bg-[#068572] 
            text-white flex justify-center items-center text-lg duration-200 rounded-md'
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export const MobileNavigation = ({
  isOpen,
  onSearch,
  searchRef,
  onSort,
  onFilter,
}: {
  isOpen: boolean
  searchRef: Element
  onSearch: (e: React.FormEvent<HTMLFormElement>, searchRef?: Element) => void
  onSort: (e) => void
  onFilter: () => void
}) => {
  const { setQueryParams } = useQueryParams()

  const brandChangeHandler = (e) => {
    onFilter({ brand: e.target.value })
  }

  const categoryChangeHandler = (e) => {
    onFilter({ category: e.target.value })
  }

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
        className='first bg-white mt-2 border-[#E3E2E2] border-solid flex w-full max-w-[300px] p-5 pb-16
      justify-start mb-4 flex-col text-center items-center z-40 overflow-hidden'
      >
        <form className='search w-full mt-3 mb-1' onSubmit={onSearch}>
          <input
            type='text'
            placeholder='Search'
            className='italic w-full h-[47px] rounded-[4px] pl-4 text-[17px] text-[#616161] border border-[#E0E0E0] border-solid focus:outline-none border-opacity-70'
            ref={searchRef}
          />
        </form>
        <div className='row flex w-full justify-between gap-1'>
          <Select onChange={onSort} title='sort by' className='w-1/3'>
            <option value='auto' hidden selected disabled>
              sort by
            </option>
            <option value='alphabet'>A to Z</option>
            <option value='alphabet-desc'>Z to A</option>
            <option value='price'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
          </Select>
          <Select onChange={brandChangeHandler} title='brand' className='w-1/3'>
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
          <Select
            onChange={categoryChangeHandler}
            title='category'
            className='w-1/3'
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
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
        isActive ? 'font-bold bg-main text-white' : 'bg-white text-black'
      }  hover:bg-main hover:text-white 
        px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300 w-[120px] mb-2 list-none`}
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
  label,
  checked,
  onCheck,
}: {
  checked: boolean
  onCheck: () => void
  label: string
}) {
  return (
    <li className='flex items-center mt-2'>
      <div className='relative mr-2 w-[20px] aspect-square'>
        <input
          className='absolute opacity-0 w-full h-full cursor-pointer accent-main'
          value='3'
          type='checkbox'
          onChange={onCheck}
          checked={checked}
          id={label}
        />
        {checked ? (
          <div className='w-[20px] aspect-square border  bg-main rounded flex items-center justify-center'>
            <svg
              className='w-4 h-4 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
            </svg>
          </div>
        ) : (
          <div className='w-[20px] aspect-square border border-gray-300 rounded'></div>
        )}
      </div>
      <label htmlFor={label}>{label}</label>
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
