import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer        from './reducers/userSlice'
import productReducer     from './reducers/productSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers( {
  user   : userReducer,
  products: productReducer,
} )

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore( {
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
} )
