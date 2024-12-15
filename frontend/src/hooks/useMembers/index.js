import React from "react";

import api from "../../constants/api";

const useMembers = () => {
  const getMembersData = async () => {
    try {
      const response = await api.get("/api/members");

      if (response?.data) {
        const data = response.data;

        if (data.message === "success") {
          const reversedArray = data.members.map(
            (value, index, array) => array[array.length - 1 - index]
          );
          return reversedArray;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log("Error from useMember's getMembersData");
      return false;
    }
  };

  const getMyTeamMembersData = async (referenceId) => {
    try {
      const response = await api.get(`/api/members/${referenceId}`);

      if (response?.data) {
        const data = response.data;

        if (data.message === "success") {
          return response.data;
        }
        return false;
      }
    } catch (error) {
      console.log("Error from useMember's getMyTeamMembersData");
      return false;
    }
  };

  return { getMembersData, getMyTeamMembersData };
};

export default useMembers;
