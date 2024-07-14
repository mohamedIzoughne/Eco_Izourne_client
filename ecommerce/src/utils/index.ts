/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const filterProductsByObj = (products: any, filterObj: any) => {
  let filteredProducts = [...products]

  console.log(filterObj)

  console.log(products)

  for (const key in filterObj) {
    if (key !== 'price' && filterObj[key] !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product[key].toLowerCase() === filterObj[key].toLowerCase()
      )
    } else if (key === 'price') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filterObj['price'][0] &&
          product.price <= filterObj['price'][1]
      )
    }
  }

  return filteredProducts
}

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function handleWindowResize(cb: (width: number) => void) {
  const handleResize = () => {
    cb(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}
