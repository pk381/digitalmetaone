import api from "../../constants/api";

const useUpgradeRequests = () => {

    
  const getUpgradeRequests = async () => {
    try {
      const response = await api.get("/api/upgrade-requests");

      if (response?.data) {
        const responseData = response.data;

        if (responseData.status === "success") {

          
          return responseData.upgradeRequests;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUpgradeRequests' getUpgradeRequests: ", error);
      return false;
    }
  };

  return { getUpgradeRequests };
};


export default useUpgradeRequests;
