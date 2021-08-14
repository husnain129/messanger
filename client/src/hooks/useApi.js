import axios from "axios";

const useApi = () => {
  const baseUrl = "http://localhost:3300/api/v1";
  return {
    post: async (url, value, config) => {
      try {
        const { data } = await axios.post(baseUrl + url, value, config);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default useApi;
