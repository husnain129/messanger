import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config, fulfilled, pending, rejected } from "./helper";
import userApi from "./userApi";

const api = userApi();

const initialState = {
  user: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signupUser = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      console.log("thunk data = ", data);
      if (data) {
        return { username: "husnain", email: "mlhlk1212" };
      } else {
        return rejectWithValue("data not found");
      }
    } catch (error) {
      return rejectWithValue("signup data error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (dataObj, { rejectWithValue }) => {
    try {
      const data = await api.post("/users/login", dataObj, config);
      localStorage.setItem("user", JSON.stringify(data));
      if (data) {
        console.log("login data is success ");
        return data;
      } else {
        return rejectWithValue("login data not found");
      }
    } catch (error) {
      return rejectWithValue("login data error");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
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
    [signupUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      console.log("payload", payload);
      fulfilled(state, payload);
    },
    [signupUser.pending]: (state) => {
      pending(state);
    },
    [signupUser.rejected]: (state, { payload }) => {
      rejected(state, payload);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.user = payload;
      fulfilled(state, payload);
    },
    [loginUser.pending]: (state) => {
      pending(state);
    },
    [loginUser.rejected]: (state, { payload }) => {
      rejected(state, payload);
    },
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
