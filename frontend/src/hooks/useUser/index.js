import api from "../../constants/api";

const useUser = () => {
  const activateUserId = async (userId) => {
    try {
      const response = await api.post(`/api/user/${userId}`);

      if (response?.data) {
        const responseData = response.data;
        return responseData.status;
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's activateUserId", error);
      return false;
    }
  };

  const fetchEarnings = async (userId) => {
    try {
      const response = await api.get(`/api/user/earnings/${userId}`);

      if (response?.data) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.status === "success") {
          return responseData.earnings;
        }

        return false;
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's fetchEarnings", error);
      return false;
    }
  };

  const fetchUsersJoinedThisMonth = async () => {
    try {
      const response = await api.get(`/api/user/joined-this-month`);

      if (response?.data) {
        const responseData = response.data;
        if (responseData.status === "success") {
          const reversedArray = responseData.members.map(
            (value, index, array) => array[array.length - 1 - index]
          );
          return reversedArray;
        }
        return [];
      }
      return [];
    } catch (error) {
      console.log("Error from useUser's fetchUsersJoinedThisMonth", error);
      return false;
    }
  };

  const upgradePlan = async (
    userId,
    existingPlan,
    upgradedPlan,
    amount,
    mode = "auto"
  ) => {
    try {
      const payload = JSON.stringify({
        userId: userId,
        existingPlan: existingPlan,
        upgradedPlan: upgradedPlan.toLowerCase(),
        amount: amount,
        mode,
      });

      const response = await api.post("/api/user/upgrade-plan", payload);

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          console.log("success status");
          return jsonData.updatedUser;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's upgradePlan", error);
      return false;
    }
  };

  const deactivateUser = async (userId) => {
    try {
      const response = await api.get(`/api/user/deactivate-user/${userId}`);

      if (response?.data) {
        const jsonData = response?.data;

        if (jsonData.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's deactivateUser", error);
      return false;
    }
  };

  const searchUsers = async (query) => {
    try {
      const response = await api.get(`/api/user/${query}`);
      if (response?.data) {
        const jsonData = response?.data;
        if (jsonData.status === "success") {
          return jsonData.users;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's searchUsers", error);
      return false;
    }
  };

  const updateUser = async (data, userId) => {
    try {
      const payload = JSON.stringify(data);
      const response = await api.patch(`/api/user/${userId}`, payload);
      if (response.data) {
        const data = response.data;
        if (data.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's updateUserF", error);
      return false;
    }
  };

  const getInvestmentsUnderUser = async (referenceId) => {
    try {
      const response = await api.get(`/api/user/investment/${referenceId}`);

      if (response?.data) {
        const jsonData = response?.data;
        if (jsonData.status === "success") {
          return jsonData?.investment;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useUser's getInvestment", error);
      return false;
    }
  };

  return {
    activateUserId,
    fetchEarnings,
    fetchUsersJoinedThisMonth,
    getInvestmentsUnderUser,
    upgradePlan,
    deactivateUser,
    searchUsers,
    updateUser,
  };
};

export default useUser;
