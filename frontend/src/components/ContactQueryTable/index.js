import React, { useState } from "react";

const ContctQueryTable = ({ contactQueries }) => {
   
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
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
              Email
            </td>
            <td scope="col" className="px-6 py-3">
              Message
            </td>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {contactQueries &&
            contactQueries.length > 0 &&
            contactQueries.map((query) => {
              return (
                <tr className="bg-white border-b border-gray-200 text-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {query?.name ?? "N/A"}
                  </th>

                  <td className="px-6 py-4">
                    {query?.createdAt ? formatDate(query.createdAt) : "N/A"}
                  </td>
                  <td className="px-6 py-4">{query?.email ?? "N/A"}</td>
                  <td className="px-6 py-4">{query?.message ?? "N/A"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ContctQueryTable;
