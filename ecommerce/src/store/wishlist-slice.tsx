import { createSlice } from '@reduxjs/toolkit'
import { productType } from '../App'

type initialStateType = {
  items: { [id: string]: productType }
}
const initialState: initialStateType = {
  items: {},
}

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    replaceWishlist(state, action) {
      state.items = action.payload.items
    },
    addToWishList: (state, action) => {
      // const existingItem = state.items.find(
      //   (item) => item._id === action.payload._id
      // )
      const existingItem = state.items[action.payload._id]

      if (!existingItem) {
        state.items[action.payload._id] = action.payload
        localStorage.setItem('wishlist', JSON.stringify(state))
      }
    },
    removeFromWishlist: (state, action) => {
      // state.items = state.items.filter((item) => item._id !== action.payload)
      delete state.items[action.payload]
      localStorage.setItem('wishlist', JSON.stringify(state))
    },
  },
})

export const wishlistActions = wishListSlice.actions
export default wishListSlice
