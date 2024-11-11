import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './cart-slice'
// import productsSlice from './products-slice'
import wishListSlice from './wishlist-slice'

const store = configureStore({
  reducer: {
    // ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    // prods: productsSlice.reducer,
    wish: wishListSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
