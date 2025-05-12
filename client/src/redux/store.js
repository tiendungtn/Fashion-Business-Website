import { configureStore } from '@reduxjs/toolkit'
import connterSlice from './slice/counterSlice'
export const store = configureStore({
  reducer: {
    counter: connterSlice
  },
})