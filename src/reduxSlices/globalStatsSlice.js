import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const globalStats = createAsyncThunk('global/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");
    console.log('globalStats', response);
    return response.data;

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    return rejectWithValue(message);
  }
});

const initialState = {
    data : [],
    isError: false,
    errorMessage: ''
}
const globalStatsSlice = createSlice({
name : 'global',
initialState ,
extraReducers: (builder)=>{

builder.addCase(globalStats.fulfilled, (state,{payload})=>{
state.data = payload;
})
.addCase(globalStats.rejected,(state,{payload})=>{
state.isError = true;
state.errorMessage = payload;

})
}
})

export default globalStatsSlice.reducer;