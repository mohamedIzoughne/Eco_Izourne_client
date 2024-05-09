import { createSlice } from '@reduxjs/toolkit'
import { productType } from '../App'
type initialStateType = {
  items: productType[]
}
const initialState: initialStateType = {
  items: [],
}

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    replaceWishlist(state, action) {
      state.items = action.payload.items
    },
    addToWishList: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      )

      // if (!existingItem) {
      //   state.items.push({
      //     _id: action.payload._id,
      //     title: action.payload.title,
      //     imageURL: action.payload.imageURL,
      //     description: action.payload.description,
      //     addedToCart: action.payload.addedToCart,
      //     price: action.payload.price,
      //   })
      if (!existingItem) {
        state.items.push(action.payload)
        localStorage.setItem('wishlist', JSON.stringify(state))
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      localStorage.setItem('wishlist', JSON.stringify(state))
    },
  },
})

export const wishlistActions = wishListSlice.actions
export default wishListSlice
