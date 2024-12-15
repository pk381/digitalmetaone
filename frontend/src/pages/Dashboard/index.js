import React, { useState, useEffect } from "react";

import { CircularProgress } from "@mui/joy";

import IncomeSection from "../../components/IncomeSection";
import ActivateSection from "../../components/ActivateSection";

import { useAuthContext } from "../../contexts/authContext";
import useUser from "../../hooks/useUser";
import { toastError } from "../../components/Notification";

const Dashboard = () => {
  const authContext = useAuthContext();
  const { user, userEarnings, setEarnings } = authContext;
  const { fetchEarnings, getInvestmentsUnderUser } = useUser();
  const planType = user.planType || "";

  const [loading, setLoading] = useState(true);
  const [investmentsUnderUser, setInvestmentsUnderUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (userEarnings) {
        setLoading(false);
        return;
      }
      const response = await fetchEarnings(user?.referenceId);

      if (response) {
        setEarnings(response[0]);
        return setLoading(false);
      } else {
        toastError("Can not fetch earnings");
      }

      return;
    };

    const fetchInvestments = async () => {
      if (investmentsUnderUser) {
        return setLoading(false);
      }
      const response = await getInvestmentsUnderUser(user?.referenceId);

      if (response) {
        setInvestmentsUnderUser(response);
      } else {
        toastError("Can not fetch invetments");
      }

      return setLoading(false);
    };

    fetch();
    fetchInvestments();
  }, []);

  return loading ? (
    <div className="w-full h-[76.5vh] flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div>
      <div className="m-4 mt-1">
        <div className="w-full text-right px-8">
          <p className="text-xl">{`Welcome, ${user?.name ?? ""} ${
            user?.referenceId ?? ""
          }`}</p>
        </div>
        <IncomeSection
          earnings={userEarnings}
          investments={investmentsUnderUser}
        />
        {planType !== "royal" && <ActivateSection setLoading={setLoading} />}
      </div>
    </div>
  );
};

export default Dashboard;
