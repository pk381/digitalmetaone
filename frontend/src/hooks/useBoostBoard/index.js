import api from "../../constants/api";

const useBoostBoard = () => {
  const joinBoostBoard = async (referenceId, amount, name) => {
    try {
      const payload = JSON.stringify({
        referenceId,
        amount,
        name,
      });

      const response = await api.post(
        `/api/boost-board/join-boost-board`,
        payload
      );

      console.log("response join bb");
      console.log(response);

      if (response?.data) {
        const data = response.data;

        if (data.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useBoostBoard's joinBoostBoard:", error);
      return false;
    }
  };

  const getBoostBoardEntries = async () => {
    try {
      const response = await api.get(`/api/boost-board`);

      if (response?.data) {
        const data = response.data;

        if (data.status === "success") {
          return data.entries;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useBoostBoard's getBoostBoardEntries:", error);
      return false;
    }
  };

  const addRewardAmount = async (referenceId, amount) => {
    try {
      console.log(amount);
      const payload = JSON.stringify({
        referenceId,
        amount,
      });

      console.log(payload);
      const response = await api.post(
        `/api/boost-board/reward-income`,
        payload
      );

      if (response?.data) {
        const data = response.data;

        if (data.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useBoostBoard's joinBoostBoard:", error);
      return false;
    }
  };

  return { joinBoostBoard, getBoostBoardEntries, addRewardAmount };
};

export default useBoostBoard;
