import { motion } from 'framer-motion'
import SectionHeading from '../UI/SectionHeading'
import { RiShoppingBagLine } from 'react-icons/ri'
import Product from '../components/Product'
import React, { useEffect, useRef, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { Navigation, MobileNavigation } from '../components/shop/FilterNav'
import Select from '../UI/Select'
import Spinner from '../UI/Spinner'
import { useGetProductsQuery } from '../api/productsApi'
import useQueryParams from '../hooks/useQueryParams'

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

const AllProducts = ({ isMobile }) => {
  const [page, setPage] = useState(1)
  const searchRef = useRef(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)

  const { getQueryParams, setQueryParams } = useQueryParams()
  const params = getQueryParams()
  console.log('The params', params)

  const { data, isLoading } = useGetProductsQuery({
    ...params,
    page,
    chunk: PAGE_NUMBER,
  })

  const totalSize = data?.total || 0
  const products = data?.products || []

  const sortChangeHandler = (e) => {
    const { value } = e.target
    applyFilters({ sortBy: value })
  }

  const pageHandler = (newPage) => {
    if (newPage === page) return
    if (!newPage) {
      setPage((prev) => prev + 1)
    } else if (newPage === -1) {
      setPage((prev) => prev - 1)
    } else {
      setPage(newPage)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    applyFilters({ page: newPage })
  }

  const applyFilters = (updatedParams = {}) => {
    setQueryParams({
      chunk: PAGE_NUMBER,
      page: page,
      ...updatedParams,
    })
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    applyFilters({
      searchTerm: isMobile
        ? mobileSearchRef.current?.value
        : searchRef.current?.value,
    })
  }

  return (
    <>
      {!isMobile && <Navigation filterHandler={applyFilters} />}
      <div className='second flex-grow mb-20 relative'>
        <SectionHeading title='Our Products' icon={<RiShoppingBagLine />} />
        {!isMobile ? (
          <div className='filter flex justify-between items-end  mb-6'>
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
                <option value='price-desc'>Price: High to Low</option>
              </Select>
            </div>
            <form className='search' onSubmit={searchSubmitHandler}>
              <input
                type='text'
                placeholder='Search'
                className='lg:w-[257px] italic h-[34px] lg:h-[47px] rounded-[4px] pl-4 text-[17px] text-[#616161] border border-[#E0E0E0] border-solid focus:outline-none border-opacity-70'
                ref={searchRef}
              />
            </form>
          </div>
        ) : (
          <MobileNavigation
            onFilter={applyFilters}
            onSort={sortChangeHandler}
            onSearch={searchSubmitHandler}
            searchRef={mobileSearchRef}
            isOpen={true}
          />
        )}
        <ul className='products grid grid-column-main justify-start gap-5 mt-2 mx-auto'>
          {isLoading ? (
            <Spinner className='my-40' />
          ) : (
            products.map((product) => (
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
  const [width, setWidth] = useState(window.innerWidth)
  const isMobile = +width < 640

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
