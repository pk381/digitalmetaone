import React, { useState } from "react";

import WithDrawalCompleteModal from "../WithdrawalCompleteModal";
import { toastError, toastSuccess } from "../Notification";
import { formatDate } from "../../constants/functions";

import usePayments from "../../hooks/usePayments";

const WithdrawalTable = ({
  withdrawals,
  setLoadingStatus,
  changeWithdrawalStatus,
}) => {
  const { markWithdrawalComplete } = usePayments();

  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCompleteWithdrawal = async () => {
    setLoadingStatus(true);

    const response = await markWithdrawalComplete(selectedWithdrawal);
    if (response) {
      changeWithdrawalStatus(selectedWithdrawal);
      toastSuccess("Withdrawal marked successfully");
    } else {
      toastError("Failed to mark withdrawal");
    }
    setSelectedWithdrawal(null);
    setLoadingStatus(false);
  };

  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full backdrop:text-left rtl:text-right text-gray-100 ">
        <thead className="text-sm text-white uppercase bg-blue-600 rounded-md">
          <tr>
            <td scope="col" className="px-6 py-3">
              Name
            </td>
            <td scope="col" className="px-6 py-3">
              Date
            </td>
            <td scope="col" className="px-6 py-3">
              Crypto ID
            </td>
            <td scope="col" className="px-6 py-3">
              Amount
            </td>
            <td scope="col" className="px-6 py-3">
              Status
            </td>
            <td scope="col" className="px-6 py-3">
              Actions
            </td>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {withdrawals &&
            withdrawals.length > 0 &&
            withdrawals.map((withdrawal) => {
              return (
                <tr className="bg-white border-b border-gray-200 text-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {withdrawal?.name ?? "N/A"}
                  </th>
                  <td className="px-6 py-4">
                    {withdrawal?.createdAt
                      ? formatDate(withdrawal?.createdAt)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{withdrawal?.cryptoId ?? "N/A"}</td>
                  <td className="px-6 py-4">{withdrawal?.amount ?? "N/A"}</td>
                  <td className="px-6 py-4">{withdrawal?.status ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    {withdrawal?.status !== "completed" && (
                      <button
                        onClick={async () => {
                          setSelectedWithdrawal(withdrawal?._id);
                          setModalOpen(true);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                      >
                        Mark Completed
                      </button>
                    )}
                    -
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <WithDrawalCompleteModal
        open={modalOpen}
        setOpen={setModalOpen}
        markWithdrawalComplete={handleCompleteWithdrawal}
      />
    </div>
  );
};

export default WithdrawalTable;
