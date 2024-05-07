export const getSwiperSlidesNumber = (prodsNum: number, slidesNum: number) => {
  return prodsNum > slidesNum ? slidesNum : prodsNum
}

export const filterProductsByObj = (products, filterObj) => {
  let filteredProducts = [...products]

  for (const key in filterObj) {
    // console.log(key, filterObj[key])

    // filteredProducts[0].forEach((prod) => {
    //   console.log(key, prod[key])
    // })

    if (filterObj[key] !== 'All' && key !== 'price') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product[key].name.toLowerCase() === filterObj[key].toLowerCase()
      )
    } else if (key === 'price') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filterObj[key][0] &&
          product.price <= filterObj[key][1]
      )
    }
  }

  return filteredProducts
}
