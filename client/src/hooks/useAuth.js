import useApi from "./useApi";

const useAuth = () => {
  const api = useApi();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { token } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return {
    login: async (dataObj) => {
      try {
        const data = await api.post("/users/login", dataObj, config);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log("Login error = ", error);
      }
    },
    signUp: async (dataObj) => {
      try {
        const data = await api.post("/users/", dataObj, config);
        localStorage.setItem("token", JSON.stringify(data.token));
        return data;
      } catch (error) {
        console.log("registerUser error = ", error);
      }
    },
    updateProfile: async (dataObj) => {
      try {
        const data = await api.patch("/profile/", dataObj, authConfig);
        return data;
      } catch (error) {
        console.log("update profile error = ", error);
      }
    },
    getProfile: async (id) => {
      try {
        const data = await api.get(`/profile/${id}`, config);
        return data;
      } catch (error) {
        console.log("get profile error = ", error);
      }
    },
  };
};

export default useAuth;
