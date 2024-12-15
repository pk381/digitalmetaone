import React, { useState } from "react";

import { toastError, toastSuccess } from "../Notification";
import { formatDate } from "../../constants/functions";

import useBoostBoard from "../../hooks/useBoostBoard";

import RewardBoostBoardModal from "../RewardBoostBoardModal";

const BoostBoardDetailsTable = ({
  entries,
  setLoadingStatus,
  changeEtriesStatus,
}) => {
  const { addRewardAmount } = useBoostBoard();

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRewardUser = async (amount) => {
    setLoadingStatus(true);

    const response = await addRewardAmount(selectedUser, amount);
    if (response) {
      changeEtriesStatus(selectedUser, amount / 3);
      toastSuccess("Reward added successfully");
    } else {
      toastError("Failed to add reward");
    }
    setSelectedUser(null);
    setLoadingStatus(false);
  };

  return (
    <div className="relative overflow-x-auto rounded-md">
      {entries && entries.length >= 1 ? (
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
                Reference Id
              </td>
              <td scope="col" className="px-6 py-3">
                Amount
              </td>
              <td scope="col" className="px-6 py-3">
                Side
              </td>
              <td scope="col" className="px-6 py-3">
                Actions
              </td>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {entries &&
              entries.length > 0 &&
              entries.map((entry) => {
                return (
                  <tr className="bg-white border-b border-gray-200 text-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap "
                    >
                      {entry?.name ?? "N/A"}
                    </th>
                    <td className="px-6 py-4">
                      {entry?.createdAt ? formatDate(entry?.createdAt) : "N/A"}
                    </td>
                    <td className="px-6 py-4">{entry?.referenceId ?? "N/A"}</td>
                    <td className="px-6 py-4">{entry?.amount ?? "N/A"}</td>
                    <td className="px-6 py-4">{entry?.side ?? "N/A"}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          setSelectedUser(entry?.referenceId);
                          setModalOpen(true);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p>No entries found</p>
      )}

      <RewardBoostBoardModal
        open={modalOpen}
        setOpen={setModalOpen}
        rewardUser={handleRewardUser}
      />
    </div>
  );
};

export default BoostBoardDetailsTable;
