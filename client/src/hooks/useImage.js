import useApi from "./useApi";

const UseImage = () => {
  const api = useApi();
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  return {
    Image: async (value) => {
      try {
        const data = await api.post("/image", value, config);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default UseImage;
