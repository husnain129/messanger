import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config, fulfilled, pending, rejected } from "./helper";
import userApi from "./userApi";

const api = userApi();

const initialState = {
  profile: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getProfile = createAsyncThunk(
  "profile/gerProfile",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/profile/${id}`, config);
      if (data) {
        return data.profile;
      } else {
        console.log("profile data not found");
        return rejectWithValue("profile data not found");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("profile ger error");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      fulfilled(state, payload);
    },
    [getProfile.pending]: (state) => {
      pending(state);
    },
    [getProfile.rejected]: (state, { payload }) => {
      rejected(state, payload);
    },
  },
});

export const { clearState } = profileSlice.actions;
export const profileSelector = (state) => state.profile;
