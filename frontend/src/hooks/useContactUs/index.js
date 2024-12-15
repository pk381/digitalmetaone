import api from "../../constants/api";

const useContactUs = () => {
  const fetchQueries = async () => {
    try {
      const response = await api.get("/api/contact-us");

      console.log(response);

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          const reversedArray = jsonData.queries.map(
            (value, index, array) => array[array.length - 1 - index]
          );

          return reversedArray;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from usContactUS' fetchQueries", error);
      return false;
    }
  };

  const createQuery = async (data) => {
    try {
      const payload = JSON.stringify(data);
      const response = await api.post("/api/contact-us", payload);

      if (response?.data) {
        const jsonData = response?.data;
        if (jsonData.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from usContactUS' createQuery", error);
      return false;
    }
  };

  return {
    fetchQueries,
    createQuery,
  };
};

export default useContactUs;
