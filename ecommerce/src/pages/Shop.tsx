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
import { useNavigate } from 'react-router-dom'
import Spinner from '../UI/Spinner'

type propsType = {
  OnChangePage: (arg1?: number) => void
  totalSize: number
  page: number
}

const PAGE_NUMBER = 12

const Pagination = ({ OnChangePage, totalSize, page }: propsType) => {
  const paginationButtons = []
  const numPages = Math.ceil(totalSize / PAGE_NUMBER)

  const handleNext = () => {
    if (page < numPages) {
      OnChangePage()
    }
  }

  const handleClick = (newPage: number) => {
    OnChangePage(newPage)
  }

  const handlePrev = () => {
    if (page > 1) {
      OnChangePage(-1)
    }
  }

  for (let i = 0; i < numPages; i++) {
    paginationButtons.push(
      <motion.button
        className={`w-[29px] h-[30px] flex justify-center items-center bg-[#D9D9D9] rounded-[4px]
        ${i + 1 == page ? '' : 'bg-opacity-50'}`}
        key={i}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          handleClick(i + 1)
        }}
      >
        {i + 1}
      </motion.button>
    )
  }

  return (
    <div className='pagination flex w-fit mx-auto mt-5'>
      <button
        disabled={page === 1}
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
        disabled={page === numPages}
        onClick={handleNext}
      >
        next
      </button>
    </div>
  )
}

const AllProducts = ({
  //  products,
  isMobile,
}: // onSearch,
{
  products: productType[]
  isMobile: boolean
  onSearch: (arg: string) => void
}) => {
  const { sendData, isLoading } = useHttp()
  const [page, setPage] = useState<number>(1)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [showedProducts, setShowedProducts] = useState([])
  const [params, setParams] = useState({
    minPrice: 0,
    maxPrice: undefined,
    category: undefined,
    brand: undefined,
  })
  const [sortByOption, setSortByOption] = useState('auto')
  const [totalSize, setTotalSize] = useState<number>(0)
  const navigate = useNavigate()

  const sortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    setSortByOption(value)
    console.log('Sorting by', value)

    applyFilters({ ...params, sortBy: value })
  }

  const pageHandler = (newPage: number | undefined) => {
    if (newPage === page) {
      return
    }

    if (!newPage) {
      setPage((page) => page + 1)
    } else if (newPage < 0) {
      setPage((page) => page - 1)
    } else {
      setPage(newPage)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    applyFilters({ ...params, page: newPage })
  }

  const getProducts = (queryString: string, options: { method: string }) => {
    sendData<{ products: productType[]; total: number }>(
      `products?${queryString}`,
      options,
      (res, err) => {
        if (err) {
          throw err
        }

        setTotalSize(res?.total)
        setShowedProducts(res?.products)
      }
    )
  }

  const applyFilters = (params: {}) => {
    const options = {
      method: 'GET',
    }

    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries({
          searchTerm: searchRef.current?.value,
          sortBy: sortByOption,
          chunk: PAGE_NUMBER,
          page: page,
          ...params,
        }).filter(([_, value]) => value !== undefined)
      )
    ).toString()

    setParams(params)
    getProducts(queryString, options)

    navigate(`${window.location.pathname}?${queryString}`)
  }

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    applyFilters(params)
  }

  useEffect(() => {
    getProducts(`chunk=${PAGE_NUMBER}`, { method: 'GET' })
  }, [])

  return (
    <>
      {!isMobile && <Navigation filterHandler={applyFilters} />}
      <div className='second flex-grow mb-20 relative'>
        <SectionHeading title='Our Products' icon={<RiShoppingBagLine />} />
        {!isMobile ? (
          <div className='filter flex justify-between items-center mb-6'>
            <div className='sort flex mt-4 items-center'>
              <h2 className='font-bold ml-3 mr-1 sm:mr-4'>Sort by:</h2>
              <Select
                className='min-w-[120px]'
                title='sort by'
                onChange={sortChangeHandler}
              >
                <option value='alphabet'>A to Z</option>
                <option value='alphabet-desc'>Z to A</option>
                <option value='price'>Price: Low to High</option>
                <option value='price-desc'>Price: High to Low</option>{' '}
              </Select>
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
          {isLoading ? (
            <Spinner />
          ) : (
            showedProducts.map((product) => (
              <Product
                key={product._id}
                className='flex-grow min-w-[250px]'
                product={product}
              />
            ))
          )}
        </ul>
        <Pagination
          page={page}
          totalSize={totalSize}
          OnChangePage={pageHandler}
        />
      </div>
    </>
  )
}

const Shop = () => {
  // const [filteredProducts, setFilteredProducts] = useState([])
  // const [params, setParams] = useState({
  //   minPrice: 0,
  //   maxPrice: undefined,
  //   category: undefined,
  //   brand: undefined,
  //   searchTerm: undefined,
  // })
  const [width, setWidth] = useState(window.innerWidth)
  // const [searchTerm, setSearchTerm] = useState('')
  const isMobile = +width < 640

  // const { sendData } = useHttp()

  // const applyFilters = () => {
  //   const options = {
  //     method: 'GET',
  //   }

  //   const queryString = new URLSearchParams({
  //     ...params,
  //     search: searchTerm,
  //   }).toString()

  //   sendData<{ products: productType[]; total: number }>(
  //     `products?${queryString}`,
  //     options,
  //     (res, err) => {
  //       if (err) {
  //         throw err
  //       }
  //       setFilteredProducts(res?.products)
  //     }
  //   )
  // }

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //   }

  //   sendData<{ products: productType[]; total: number }>(
  //     'products',
  //     options,
  //     (res, err) => {
  //       if (err) {
  //         throw err
  //       }
  //       setFilteredProducts(res?.products)
  //     }
  //   )
  // }, [sendData])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <section className='container'>
        <PageHeading title='Shop' />
        <section className={!isMobile ? 'flex' : ''}>
          {/* {!isMobile && <Navigation getFilterParams={paramsHandler} onApply={applyFilters} />} */}
          <AllProducts
            isMobile={isMobile}
            // products={filteredProducts}
            // onSearch={(searchTerm) => {
            //   setSearchTerm(searchTerm)
            //   applyFilters()
            // }}
          />
        </section>
      </section>
    </>
  )
}

export default Shop
