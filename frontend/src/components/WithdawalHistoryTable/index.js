import React from "react";
import { formatDate } from "../../constants/functions";

const WithdrawalHistoryTable = ({ withdrawals }) => {
  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full backdrop:text-left rtl:text-right text-gray-100 ">
        <thead className="text-sm text-white uppercase bg-blue-600 rounded-md">
          <tr>
            <td scope="col" className="px-6 py-3">
              Name
            </td>
            <td scope="col" className="px-6 py-3">
              Crypto ID
            </td>
            <td scope="col" className="px-6 py-3">
              Amount
            </td>
            <td scope="col" className="px-6 py-3">
              Date
            </td>
            <td scope="col" className="px-6 py-3">
              Status
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
                  <td className="px-6 py-4">{withdrawal?.cryptoId ?? "N/A"}</td>
                  <td className="px-6 py-4">{withdrawal?.amount ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    {withdrawal?.createdAt
                      ? formatDate(withdrawal.createdAt)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{withdrawal?.status ?? "N/A"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalHistoryTable;
