import { motion } from 'framer-motion'
import SectionHeading from '../UI/SectionHeading'
import { RiShoppingBagLine } from 'react-icons/ri'
import Product from '../components/Product'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import PageHeading from '../components/PageHeading'
import { Navigation, MobileNavigation } from '../components/shop/FilterNav'
import { productType } from '../App'
import useHttp from '../hooks/useHttp'
import { ScrollToTop } from '../utils'
import Select from '../UI/Select'

type propsType = {
  OnChangePage: (arg1: number, arg2: number) => void
  size: number
}
// type brandPropTypes = {
//   onChangeCategory: (category: string) => void
//   children?: React.ReactNode
//   isActive?: boolean
// }
const PAG_NUMBER = 12

const Pagination = ({ OnChangePage, size }: propsType) => {
  const [isActive, setIsActive] = useState(0)
  const paginationButtons = []
  const numPages = Math.ceil(size / PAG_NUMBER)

  const handleClick = (i: number) => {
    setIsActive(i)
    OnChangePage(i * PAG_NUMBER, (i + 1) * PAG_NUMBER)
    ScrollToTop()
  }

  const handlePrev = () => {
    if (isActive > 0) {
      handleClick(isActive - 1)
      ScrollToTop()
    }
  }

  const handleNext = () => {
    if (isActive < numPages - 1) {
      handleClick(isActive + 1)
    }
  }

  for (let i = 0; i < numPages; i++) {
    paginationButtons.push(
      <motion.button
        className={`w-[29px] h-[30px] flex justify-center items-center bg-[#D9D9D9] rounded-[4px]
        ${i == isActive ? '' : 'bg-opacity-50'}`}
        key={i}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          handleClick(i)
        }}
      >
        {i + 1}
      </motion.button>
    )
  }

  return (
    <div className='pagination flex w-fit mx-auto mt-5'>
      <button
        className='text-[#747474] mr-3 hover:text-black duration-200'
        onClick={handlePrev}
      >
        previous
      </button>
      <ul className='flex gap-3 text-xs'>
        {paginationButtons.map((button, index) => (
          <li key={index}>{button}</li>
        ))}
      </ul>
      <button
        className='text-[#747474] ml-3 hover:text-black duration-200'
        onClick={handleNext}
      >
        next
      </button>
    </div>
  )
}

// const MobileNavigation = ({
//   isOpen,
//   closeNav,
// }: {
//   isOpen: boolean
//   closeNav: () => void
// }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{
//           height: isOpen ? '0' : '100%',
//           padding: isOpen ? '0' : 'auto',
//         }}
//         animate={{
//           height: isOpen ? '100%' : '0',
//           padding: isOpen ? 'auto' : '0',
//         }}
//         exit={{
//           height: '0',
//           padding: '0',
//         }}
//         transition={{
//           duration: 0.3,
//         }}
//         className='first absolute  top-[88px] bg-white mt-2 border-[#E3E2E2] border-solid flex w-full p-5 pb-16
//     justify-start mb-4 flex-col text-center items-center z-40 overflow-hidden'
//       >
//         <div className='row'>
//           <div className='head flex justify-center items-center max-w-full flex-wrap'>
//             <h2 className='font-bold text-[19px]'>Categories</h2>
//           </div>
//           {/* <ul className='text-grayish text-sm flex gap-1 flex-wrap justify-center'>
//             <Category isActive>Laptops</Category>
//             <Category>Phones</Category>
//             <Category>Computers</Category>
//             <Category>Monitors</Category>
//             <Category>Gaming</Category>
//           </ul> */}
//           <select name='' id=''>
//             <option value=''>laptops</option>
//             <option value=''>Computers</option>
//             <option value=''>Monitors</option>
//             <option value=''>Gaming</option>
//           </select>
//         </div>
//         <div className='row mt-7'>
//           <div className='head flex justify-center items-center mt-4'>
//             <h2 className='font-bold text-[19px]'>Brand</h2>
//           </div>
//           <ul className='text-grayish text-sm flex-grow flex flex-wrap gap-x-5'>
//             <MobileBrand isActive>Lenovo</MobileBrand>
//             <MobileBrand>Dell</MobileBrand>
//             <MobileBrand>HP</MobileBrand>
//             <MobileBrand>All</MobileBrand>
//           </ul>
//         </div>
//         <div className='row mt-7'>
//           <div className='head flex justify-center items-center'>
//             <h2 className='font-bold text-[19px]'>Price</h2>
//           </div>
//           <div className='text-grayish text-sm w-[160px] mt-2'>
//             <div className='flex mb-2 justify-between items-center'>
//               From
//               <input
//                 type='text'
//                 className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] text-black'
//               />
//             </div>
//             <div className='flex justify-between items-center'>
//               To
//               <input
//                 type='text'
//                 className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] text-black'
//               />
//             </div>
//           </div>
//         </div>
//         <div className='buttons mt-6 flex w-[80%] min-w[111px]'>
//           <button
//             className='min-w-[111px] h-[54px] bg-main hover:bg-[#068572] text-white flex justify-center
//         items-center text-xl font-bold flex-grow duration-200'
//           >
//             Apply
//           </button>
//         </div>
//         <button onClick={closeNav}>
//           <FaTimes className='absolute top-3 right-3 text-2xl cursor-pointer text-gray-500' />
//         </button>
//       </motion.div>
//     </AnimatePresence>
//   )
// }

// const Navigation = ({ filterProducts, products }) => {
//   const [selectedOption, setSelectedOption] = useState('option1')
//   const filterHandler = () => {}
//   const categoryRef = useRef('laptop')
//   const brandRef = useRef('laptop')
//   const minPriceRef = useRef(0)
//   const maxPriceRef = useRef(10000)

//   const changeCategory = (category) => {
//     categoryRef.current = category
//     console.log(categoryRef.current)
//   }
//   const options = {
//     option1: false,
//     option2: false,
//     option3: false,
//     option4: false,
//   }

//   Object.keys(options).forEach((option) => {
//     if (option === selectedOption) {
//       options[option] = true
//     } else {
//       options[option] = false
//     }
//   })

//   return (
//     <div className='first w-[272px] h-full mt-[80px] border-r border-[#E3E2E2] border-solid pr-6'>
//       <div className='row'>
//         <div className='head flex justify-between items-center pr-4 mb-2'>
//           <h2 className='font-bold text-[19px]'>Categories</h2>
//           <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
//         </div>
//         <ul className='text-grayish text-sm pl-5'>
//           {CATEGORIES.map((category) => (
//             <Category
//               key={category}
//               isActive={category.toLowerCase() === 'laptop'}
//               onChangeCategory={changeCategory}
//             >
//               {category}
//             </Category>
//           ))}
//         </ul>
//       </div>
//       <div className='row mt-10'>
//         <div className='head flex justify-center text-center items-center pr-4 '>
//           <h2 className='font-bold text-[19px]'>Brand</h2>
//           <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
//         </div>
//         <ul className='text-grayish text-sm pl-5'>
//           <Brand
//             onCheck={() => setSelectedOption('option1')}
//             checked={options.option1}
//             isActive
//           >
//             Lenovo
//           </Brand>
//           <Brand
//             onCheck={() => setSelectedOption('option2')}
//             checked={options.option2}
//           >
//             Dell
//           </Brand>
//           <Brand
//             onCheck={() => setSelectedOption('option3')}
//             checked={options.option3}
//           >
//             HP
//           </Brand>
//           <Brand
//             onCheck={() => setSelectedOption('option4')}
//             checked={options.option4}
//           >
//             All
//           </Brand>
//         </ul>
//       </div>
//       <div className='row mt-10'>
//         <div className='head flex justify-between items-center pr-4'>
//           <h2 className='font-bold text-[19px]'>Price</h2>
//           <MdOutlineKeyboardArrowUp className='text-[30px] text-grayish cursor-pointer' />
//         </div>
//         <div className='text-grayish text-sm pl-5 w-[160px] mt-2'>
//           <div className='flex mb-2 justify-between items-center'>
//             From
//             <input
//               ref={minPriceRef}
//               type='text'
//               className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] pl-3 text-black'
//             />
//           </div>
//           <div className='flex justify-between items-center'>
//             To
//             <input
//               ref={maxPriceRef}
//               type='text'
//               className='border border-[#C6C6C6] border-solid focus:outline-none w-[95px] h-[32px] pl-3 text-black'
//             />
//           </div>
//         </div>
//       </div>
//       <div className='buttons mt-6 flex'>
//         <button className='w-[111px] h-[54px] bg-main text-white flex justify-center items-center text-xl font-bold'>
//           Apply
//         </button>
//         <button className='ml-3 border border-[#D9D9D9] border-solid w-[51px] h-[54px] flex justify-center items-center text-[29px] text-[#878787]'>
//           <GoTrash />
//         </button>
//       </div>
//     </div>
//   )
// }

const AllProducts = ({
  products,
  isMobile,
  onSearch,
}: {
  products: productType[]
  isMobile: boolean
  onSearch: (arg: string) => void
}) => {
  const [pagItemsNumber, setPagItemsNumber] = useState<[number, number]>([
    0,
    PAG_NUMBER,
  ])
  const [showedProducts, setShowedProducts] = useState<productType[]>(products)
  const [pagedProducts, setPagedProducts] = useState<productType[]>(
    showedProducts.slice(pagItemsNumber[0], pagItemsNumber[1])
  )
  const memoizedProducts = useMemo(() => products, [products])
  // Actually the pagination should be in the backend not in the frontend, each time you send a request

  useEffect(() => {
    console.log(showedProducts, products)
  }, [memoizedProducts])

  const memoizedShowedProducts: productType[] = useMemo(
    () => showedProducts,
    [showedProducts]
  )
  const memoizedPagNumber = useMemo(() => pagItemsNumber, [pagItemsNumber])

  useEffect(() => {
    setPagedProducts(
      memoizedShowedProducts.slice(memoizedPagNumber[0], memoizedPagNumber[1])
    )
  }, [memoizedShowedProducts, memoizedPagNumber, setPagedProducts])

  const searchRef = useRef<HTMLInputElement | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target?.value) {
      case 'price':
        setShowedProducts((showed) => {
          showed.sort((a, b) => a.price - b.price)
          return [...showed]
        })
        break
      case 'alphabet':
        setShowedProducts((showed) => {
          showed.sort((a, b) => a.title.localeCompare(b.title))
          return [...showed]
        })
        break
      default:
        setShowedProducts(products)
    }
  }

  const searchSubmitHandler = (
    e: React.FormEvent<HTMLFormElement>,
    searchTerm = searchRef!.current!.value
  ) => {
    e.preventDefault()

    onSearch(searchTerm.toLowerCase)

    setShowedProducts(() => {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return filteredProducts
    })
  }

  const pageNumberHandler = (start: number, finish: number) => {
    setPagItemsNumber([start, finish])
  }

  return (
    <>
      {!isMobile && (
        <Navigation products={products} filterProducts={setShowedProducts} />
      )}
      <div className='second flex-grow mb-20 relative'>
        <SectionHeading title='Our Products' icon={<RiShoppingBagLine />} />
        {!isMobile ? (
          <div className='filter flex justify-between items-center mb-6'>
            <div className='sort flex mt-4 items-center'>
              <h2 className='font-bold ml-3 mr-1 sm:mr-4'>Sort by:</h2>
              <Select
                className='min-w-[120px]'
                title='sort by'
                onChange={handleChange}
              >
                <option value='alphabet'>Alphabetically</option>
                <option value='price'>price</option>
              </Select>
              {/* </select> */}
            </div>
            <form className='search' onSubmit={searchSubmitHandler}>
              <input
                type='text'
                placeholder='Search'
                className='w-[257px] italic h-[47px] rounded-[4px] pl-4 text-[17px] text-[#616161] border border-[#E0E0E0] border-solid focus:outline-none border-opacity-70'
                ref={searchRef}
              />
            </form>
          </div>
        ) : (
          <MobileNavigation
            onSearch={searchSubmitHandler}
            isOpen={true}
            closeNav={() => {}}
          />
        )}
        <ul className='products grid grid-column-main justify-start gap-5 mt-2 mx-auto'>
          {pagedProducts.map((product) => (
            <Product
              key={product._id}
              className='flex-grow min-w-[250px]'
              product={product}
            />
          ))}
        </ul>
        <Pagination
          size={showedProducts.length}
          OnChangePage={pageNumberHandler}
        />
      </div>
    </>
  )
}

const Shop = () => {
  // let products = useSelector((state: RootState) => state.prods.products)
  // products = useMemo(() => products, [products])
  const [filteredProducts, setFilteredProducts] = useState()
  const [params, setParams] = useState({
    minPrice: 0,
    maxPrice: undefined,
    category: undefined,
    brand: undefined,
    searchTerm: undefined,
  })
  const [width, setWidth] = useState(window.innerWidth)
  const [searchTerm, setSearchTerm] = useState('')
  const isMobile = +width < 640
  const memoizedParams = useMemo(() => params, [params])

  const { sendData } = useHttp()

  const paramsHandler = (params) => [
    setParams({ ...params, searchTerm: searchTerm }),
  ]

  const searchHandler = (searchTerm: string) => {
    const options = {
      method: 'GET',
    }

    const queryString = new URLSearchParams({
      ...memoizedParams,
      search: searchTerm,
    }).toString()

    sendData<{ products: productType[]; total: number }>(
      `products?${queryString}`,
      options,
      (res, err) => {
        if (err) {
          throw err
        }
        setFilteredProducts(res?.products)
      }
    )
  } // I should also add a sort by if we already had a sort by so that we keep the order without sorting again in the client

  useEffect(() => {
    const options = {
      method: 'GET',
    }

    const queryString = new URLSearchParams(memoizedParams).toString()

    sendData<{ products: productType[]; total: number }>(
      `products?${queryString}`,
      options,
      (res, err) => {
        if (err) {
          throw err
        }
        setFilteredProducts(res?.products)
      }
    )
  }, [memoizedParams, sendData]) // I should also add a sort by if we already had a sort by so that we keep the order without sorting again in the client

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!filteredProducts) return <></>

  return (
    <>
      <section className='container'>
        <PageHeading title='Shop' />
        <section className={!isMobile ? 'flex' : ''}>
          {!isMobile && <Navigation getFilterParams={paramsHandler} />}
          <AllProducts
            isMobile={isMobile}
            products={filteredProducts}
            onSearch={searchHandler}
          />
        </section>
      </section>
    </>
  )
}

// function Category({ onChangeCategory, children, isActive }: ItemType) {
//   return (
//     <li
//       onClick={() => onChangeCategory(children)}
//       className={`${
//         isActive ? 'font-bold bg-black text-white' : 'bg-white text-black'
//       }  hover:bg-black hover:text-white
//       px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300 w-[120px] mb-2`}
//     >
//       {children}
//     </li>
//   )
// }

// function MobileCategory({ children, isActive }: ItemType) {
//   return (
//     <li
//       className={`${
//         isActive ? 'font-bold bg-black text-white' : 'bg-white text-black'
//       }  hover:bg-black hover:text-white
//       px-4 py-2 rounded-md max-w-full flex-wrap cursor-pointer transition-all duration-300`}
//     >
//       {children}
//     </li>
//   )
// }

// function Brand({ children, isActive, checked, onCheck }: ItemType) {
//   return (
//     <li className='flex items-center mt-2 ml-10'>
//       <input
//         className='mr-2 w-[20px] aspect-square'
//         name='brand'
//         value='3'
//         type='checkbox'
//         onChange={onCheck}
//         checked={checked}
//       />
//       {children}
//     </li>
//   )
// }

// function MobileBrand({ children }: brandPropTypes) {
//   return (
//     <li className='flex items-center mt-2'>
//       <input
//         className='mr-2 w-[20px] aspect-square'
//         name='brand'
//         value='3'
//         type='checkbox'
//       />
//       {children}
//     </li>
//   )
// }

export default Shop
