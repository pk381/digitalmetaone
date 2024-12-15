import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/joy";

import usePayments from "../../hooks/usePayments";
import { useAuthContext } from "../../contexts/authContext";

import { toastError } from "../../components/Notification";
import WithdrawalHistoryTable from "../../components/WithdawalHistoryTable";
import { TbRuler } from "react-icons/tb";



const WithdrawalHistory = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { getUserWithdrawals } = usePayments();

  const [loading, setLoading] = useState(TbRuler);
  const [withdrawals, setWithdrawals] = useState(false);

  useEffect(() => {
    if (!id) {
      return toastError("User not found");
    }

    const fetch = async () => {
      const response = await getUserWithdrawals(id);
      setWithdrawals("response");
        setWithdrawals(response);
      if (response) {
        

        setLoading(false);
      } else {
        return toastError("Withdrawal history not found");
      }
    };
    fetch();
  }, []);

  return user?.type !== "admin" ? (
    <div className="min-h-full text-center">
      <p>You are not authorized to view this page</p>
    </div>
  ) : loading ? (
    <div className="w-full h-full flex justify-center items-center min-h-full">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <div className="p-10 text-left font-bold">
      <div className="mb-6">
        <h1 className="text-3xl">Withdrawal History</h1>
      </div>
      <div>
        {withdrawals && withdrawals.length === 0 ? (
          <div>
            <p>This user has not made any withdrawals yet</p>
          </div>
        ) : (
          <WithdrawalHistoryTable withdrawals={withdrawals} />
        )}
      </div>
    </div>
  );
};

export default WithdrawalHistory;
