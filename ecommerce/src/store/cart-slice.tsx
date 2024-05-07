import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCartPrice: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemToCart(state, action) {
      let newItem
      let quantity = 1
      if (action?.payload?.quantity) {
        quantity = action.payload.quantity
        newItem = action.payload.product
      } else {
        newItem = action.payload
      }
      const existingItem = state.items.find((item) => item._id === newItem._id)
      state.totalCartPrice += newItem.price * quantity
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          title: newItem.title,
          imageURL: newItem.imageURL,
          price: newItem.price,
          quantity: quantity,
          totalPrice: newItem.price,
          description: newItem.description.slice(0, 30) + '...',
        })
      } else {
        existingItem.quantity += quantity
        existingItem.totalPrice =
          existingItem.totalPrice + newItem.price * quantity
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeItemFromCart(state, action) {
      const { _id, totalPrice, quantity } = action.payload
      state.items = state.items.filter((item) => item._id !== _id)
      if (state.totalCartPrice > totalPrice * quantity) {
        state.totalCartPrice -= totalPrice * quantity
      } else {
        state.totalCartPrice = 0
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    incrementQuantity(state, action) {
      const _id = action.payload
      const item = state.items.find((item) => item._id === _id)
      if (item) {
        item.quantity++
        item.totalPrice += item.price
        state.totalCartPrice += item.price
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    decrementQuantity(state, action) {
      const _id = action.payload
      const item = state.items.find((item) => item._id === _id)
      if (item && item.quantity > 0) {
        item.quantity--
        item.totalPrice -= item.price
        state.totalCartPrice -= item.price
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
