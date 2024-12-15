import api from "../../constants/api";

const useTree = () => {
  const fetchTree = async (id) => {
    try {
      if (!id || id === "") {
        return false;
      }

      const response = await api.get(`/api/tree/${id}`);

      if (response?.data) {
        if ((response.data.message = "success")) {
          return response.data.data;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from useTree's fetchTree", error);
      return false;
    }
  };

  return { fetchTree };
};

export default useTree;
