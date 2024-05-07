import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {
    replaceProducts: (state, action) => {
      // const wishItems = localStorage.getItem('wish')
      // const cartItems = localStorage.getItem('cart')
      // const products = action.payload.map((product) => {
      //   if (cartItems.find((item) => item._id === product._id)) {
      //     product.isAddedToCart = true
      //   }
      //   if (wishItems.find((item) => item._id === product._id)) {
      //     product.isAddedToWishList = true
      //   }
      //   return product
      // })
      // console.log(products)
      const products = action.payload

      state.products = products
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
