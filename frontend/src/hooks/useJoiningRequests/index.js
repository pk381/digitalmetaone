import api from "../../constants/api";

const useJoiningRequests = () => {
  const fetchJoiningRequests = async () => {
    try {
      const response = await api.get("/api/joining-requests");

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          const reversedArray = jsonData.joiningRequests.map(
            (value, index, array) => array[array.length - 1 - index]
          );

          return reversedArray;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error from useJoiningRequests fetchJoiningRequests", error);
      return false;
    }
  };

  const addJoiningRequest = async (
    name,
    address,
    value,
    fileKey,
    referenceId
  ) => {
    try {
      const payload = JSON.stringify({
        name: name,
        usdtTrcId: address,
        amount: value,
        recieptKey: fileKey,
        referenceId: referenceId,
      });

      console.log(payload);

      const response = await api.post("/api/joining-requests", payload);

      console.log("from addJoiningRequest");
      console.log(response);

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useJoiningRequests addJoiningRequest", error);
      return false;
    }
  };

  const acceptJoiningRequest = async (id, referenceId) => {
    try {
      const payload = JSON.stringify({
        referenceId,
        id,
      });

      console.log(payload);

      const response = await api.put(
        `/api/joining-requests/${id}?referenceId=${referenceId}`,
        payload
      );

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error from useJoiningRequests acceptJoiningRequest", error);
      return false;
    }
  };

  const declineJoiningRequest = async (id) => {
    try {
      const response = await api.put(
        `/api/joining-requests/decline-request/${id}`
      );

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error from useJoiningRequests declineJoiningRequest", error);
      return false;
    }
  };

  return {
    fetchJoiningRequests,
    addJoiningRequest,
    acceptJoiningRequest,
    declineJoiningRequest,
  };
};

export default useJoiningRequests;
