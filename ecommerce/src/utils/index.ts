/* eslint-disable @typescript-eslint/no-explicit-any */

export const getSwiperSlidesNumber = (prodsNum: number, slidesNum: number) => {
  return prodsNum > slidesNum ? slidesNum : prodsNum
}

// type filterObjType = {[key: string]: any}

export const filterProductsByObj = (
  products: any,
  filterObj: any
) => {
  let filteredProducts = [...products]

  for (const key in filterObj) {

    if (filterObj[key] !== 'All' && key !== 'price') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product[key].name.toLowerCase() === filterObj[key].toLowerCase()
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
