export const fulfilled = (state, payload) => {
  state.isFetching = false;
  state.isSuccess = true;
};

export const pending = (state) => {
  state.isFetching = true;
  state.isSuccess = false;
  state.isError = false;
};

export const rejected = (state, payload) => {
  state.isFetching = false;
  state.isSuccess = false;
  state.isError = true;
  state.errorMessage = payload;
};

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const { token } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

export const authConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
