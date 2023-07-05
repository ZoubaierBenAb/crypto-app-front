import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const token = user.token;

      const response = await axios.get('http://localhost:5000/wishlist', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return response.data.wishlist;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const addCoinToWishlist = createAsyncThunk(
  'wishlist/addCoinToWishlist',
  async (coin, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const token = user.token;

      const response = await axios.post(
        'http://localhost:5000/wishlist',
        { coin },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchWishlist()); 
      return response.data.wishlistItem;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const deleteCoinFromWishlist = createAsyncThunk(
  'wishlist/deleteCoinFromWishlist',
  async (coinId, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      const token = user.token;

      await axios.delete(`http://localhost:5000/wishlist/${coinId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchWishlist()); 

      return coinId;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCoinToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCoinToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addCoinToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoinFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoinFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCoinFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
