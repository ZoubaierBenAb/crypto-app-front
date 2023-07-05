import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reduxSlices/authSlice'
import globalStatsReducer from './reduxSlices/globalStatsSlice'
import wishlistReducer from './reduxSlices/wishlistSlice'



const reducer = {
    auth: authReducer,
    global : globalStatsReducer,
    wishlist : wishlistReducer
  
  }
  
  export const store = configureStore({
    reducer: reducer,
    devTools: true,
  });