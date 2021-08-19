import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "../redux/ProfileSlice";
import { userSlice } from "../redux/UserSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
  },
});
