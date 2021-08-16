import axios from "axios";

const useApi = () => {
  const baseUrl = "http://localhost:3300/api/v1";
  return {
    get: async (url, value, config) => {
      try {
        const { data } = await axios.get(baseUrl + url, value, config);
        if (data.status !== "success") {
          throw new Error("request failed");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    post: async (url, value, config) => {
      try {
        const { data } = await axios.post(baseUrl + url, value, config);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    patch: async (url, value, config) => {
      try {
        const { data } = await axios.patch(baseUrl + url, value, config);
        if (data.status !== "success") {
          throw new Error("request failed");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default useApi;
