import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import kittenReducer from './slices/kittenSlice'
import { kittenAPI } from '../services/KittenService'


const rootReducer = combineReducers({
  reducer: kittenReducer,
  [kittenAPI.reducerPath]: kittenAPI.reducer,
})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        kittenAPI.middleware
      ),
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
