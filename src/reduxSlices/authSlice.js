import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./services/authService";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await authService.register(user);
      console.log("auth slice ", response);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await authService.login(user);
      console.log("auth slice ", response);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
const initialState = {
  user: user ? user : null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      
      state.isError = false;
      state.isFetching= false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
    
      })
      .addCase(login.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.errorMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
      });
  },
});

const { reset } = authSlice.actions;
export default authSlice.reducer;
