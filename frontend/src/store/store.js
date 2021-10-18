import { configureStore } from '@reduxjs/toolkit'
import userReducer        from './reducers/userSlice'
import productReducer     from './reducers/productSlice'

// const reducers = combineReducers( {
//   user   : userReducer,
//   product: productReducer,
// } )

export const store = configureStore( {
  reducer: {
    user   : userReducer,
    product: productReducer,
  },
} )
