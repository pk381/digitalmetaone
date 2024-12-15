import React from "react";

const MembersTable = ({ teamMembers }) => {
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
              Member Id
            </td>
            <td scope="col" className="px-6 py-3">
              Joining Date
            </td>
            <td scope="col" className="px-6 py-3">
              Plan Type
            </td>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {teamMembers &&
            teamMembers.length !== 0 &&
            teamMembers.map((member) => {
              return (
                <tr className="bg-white border-b border-gray-200 text-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {member?.name ?? "N/A"}
                  </th>
                  <td className="px-6 py-4">{member?.referenceId ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    {member?.createdAt ? formatDate(member.createdAt) : "N/A"}
                  </td>
                  <td className="px-6 py-4">{member?.planType ?? "N/A"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
