import api from "../../constants/api";

const usePayments = () => {
  const requestWithDrawal = async (data) => {
    try {
      const jsonData = JSON.stringify(data);
      const response = await api.post("/api/payments/withdrawals", jsonData);

      if (response?.data) {
        const responseData = response.data;
        return responseData.status === "success"
          ? responseData.withdrawalRequest
          : false;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from usePayments' requestWithDrawal", error);
      return false;
    }
  };

  const getWithdrawals = async () => {
    try {
      const response = await api.get("/api/payments/withdrawals");
      if (response?.data) {
        const responseData = response.data;

        if (responseData.status === "success") {
          const reversedArray = responseData.withdrawalRequests.map(
            (value, index, array) => array[array.length - 1 - index]
          );
          return reversedArray;
        }

        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from usePayments' getWithdrawals", error);
      return false;
    }
  };

  const getUserWithdrawals = async (userId) => {
    try {
      const response = await api.get(`/api/payments/withdrawals/${userId}`);

      console.log("response");
      console.log(response);

      if (response?.data) {
        const responseData = response.data;
        return responseData.status === "success"
          ? responseData.withdrawalRequests
          : false;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from usePayments' getWithdrawals", error);
      return false;
    }
  };

  const markWithdrawalComplete = async (id) => {
    try {
      console.log(id);

      const response = await api.put(
        `/api/payments/withdrawals/mark-complete/${id}`
      );

      if (response?.data) {
        const jsonData = response.data;
        if (jsonData.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from usePayments' markWithdrawalComplete", error);
      return false;
    }
  };

  const getTotalWithdrawals = async (userId) => {
    try {
      const response = await api.get(
        `/api/payments/withdrawals/company-withdrawals`
      );

      if (response?.data) {
        const responseData = response.data;
        return responseData.status === "success"
          ? {
              totalWithdrawals: responseData.totalWithdrawals,
              totalWithdrawalsThisMonth: responseData.totalWithdrawalsThisMonth,
              totalWithdrawalsToday: responseData.totalWithdrawalsToday,
            }
          : false;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from usePayments' getWithdrawals", error);
      return false;
    }
  };
  return {
    requestWithDrawal,
    getUserWithdrawals,
    getTotalWithdrawals,
    getWithdrawals,
    markWithdrawalComplete,
  };
};

export default usePayments;
