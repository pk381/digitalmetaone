import React from "react";
import api from "../../constants/api";

const uesInvestment = () => {
  const getTotalInvestment = async () => {
    try {
      const response = await api.get("/api/investment/total-invesment");

      if (response?.data) {
        const jsonData = response.data;

        if (jsonData?.status === "success") {
          return {
            totalInvestment: jsonData?.totalInvestment,
            monthlyInvestment: jsonData?.totalInvestmentThisMonth,
            totalInvestmentToday: jsonData?.totalInvestmentToday,
          };
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useInvestment getTotalInvestment", error);
      return false;
    }
  };

  return { getTotalInvestment };
};

export default uesInvestment;
