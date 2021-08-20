import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authConfig, config, fulfilled, pending, rejected } from "./helper";
import userApi from "./userApi";

const api = userApi();

const initialState = {
  profile: "",
  profiles: [],
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

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (dataObj, { rejectWithValue }) => {
    try {
      const data = await api.patch("/profile/", dataObj, authConfig);
      if (data) {
        console.log(data);
        return data.profile;
      } else {
        console.log("profile not updated");
        return rejectWithValue("profile data not found");
      }
    } catch (error) {
      console.log("error in profile update = ", error);
    }
  }
);

export const getOthersProfile = createAsyncThunk(
  "profile/getOthersProfile",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id = ", id);
      const data = await api.get(`/profile/all/${id}`, config);
      if (data) {
        return data.profiles;
      } else {
        console.log("profile data not found");
        return rejectWithValue("profile data not found");
      }
    } catch (error) {
      console.log(error);
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

    [updateProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      fulfilled(state, payload);
    },
    [updateProfile.pending]: (state) => {
      pending(state);
    },
    [updateProfile.rejected]: (state, { payload }) => {
      rejected(state, payload);
    },

    [getOthersProfile.fulfilled]: (state, { payload }) => {
      state.profiles = payload;
      fulfilled(state, payload);
    },
    [getOthersProfile.pending]: (state) => {
      pending(state);
    },
    [getOthersProfile.rejected]: (state, { payload }) => {
      rejected(state, payload);
    },
  },
});

export const { clearState } = profileSlice.actions;
export const profileSelector = (state) => state.profile;
