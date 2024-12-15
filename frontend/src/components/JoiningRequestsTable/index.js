import React, { useState } from "react";
import useFiles from "../../hooks/useFiles";
import { toastError, toastSuccess } from "../Notification";
import CircularProgress from "@mui/joy/CircularProgress";
import DeclineRequestModal from "../DeclineRequestModal";
import ActivateUserModal from "../ActivateUserModal";

import useJoiningRequests from "../../hooks/useJoiningRequests";

const JoiningReqestsTable = ({
  joiningRequests,
  acceptJoiningRequest,
  updateJoiningRequests,
  updateDeclinedJoiningRequest,
}) => {
  const { viewFile } = useFiles();

  const { declineJoiningRequest } = useJoiningRequests();

  const [loadingViewFile, setLoadingViewFile] = useState(false);
  const [loadingActivateUser, setLoadingActivateUser] = useState(false);
  const [deactivateUserModalOpen, setDeactivateUserModalOpen] = useState(false);
  const [activateUserModalOpen, setActivateUserModalOpen] = useState(false);
  const [declineRequestModalOpen, setDeclineRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB");
  };

  const viewReciept = async (key) => {
    setLoadingViewFile(true);
    const url = await viewFile(key);
    if (!url) {
      setLoadingViewFile(false);
      return toastError("Can not load file");
    }
    setLoadingViewFile(false);
    window.open(url, "_blank");
  };

  const activateUser = async () => {
    setLoadingActivateUser(true);

    const response = await acceptJoiningRequest(
      selectedRequest?._id,
      selectedRequest?.userReferenceId
    );

    if (response) {
      updateJoiningRequests(selectedRequest?._id);
      toastSuccess("User activated successfully");
      return setLoadingActivateUser(false);
    }
    toastError("Failed to activate user");
    return setLoadingActivateUser(false);
  };

  const handleDeclineRequest = async () => {
    const response = await declineJoiningRequest(selectedRequest?._id);
    if (response) {
      updateDeclinedJoiningRequest(selectedRequest?._id);
      toastSuccess("Request Declined Successfully");
      return setLoadingActivateUser(false);
    }
    toastError("Failed to decline request");
    return setLoadingActivateUser(false);
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
              Member ID
            </td>
            <td scope="col" className="px-6 py-3">
              USDT TRC Address
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
          {joiningRequests &&
            joiningRequests.length > 0 &&
            joiningRequests.map((request) => {
              return (
                <tr className="bg-white border-b border-gray-200 text-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {request?.name ?? "N/A"}
                  </th>

                  <td className="px-6 py-4">
                    {request?.createdAt ? formatDate(request.createdAt) : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {request?.userReferenceId ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">{request?.usdtTrcId ?? "N/A"}</td>
                  <td className="px-6 py-4">{request?.status ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    {loadingViewFile ? (
                      <div className="mt-12 inline">
                        <CircularProgress size="sm" />
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          await viewReciept(request?.recieptKey);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full text-[13px] mx-1"
                      >
                        View Reciept
                      </button>
                    )}
                    {loadingActivateUser ? (
                      <div className="mt-12 inline">
                        <CircularProgress size="sm" />
                      </div>
                    ) : (
                      request?.status !== "accepted" && (
                        <button
                          onClick={async () => {
                            setSelectedRequest(request);
                            setActivateUserModalOpen(true);
                          }}
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                        >
                          Activate User
                        </button>
                      )
                    )}

                    {request?.status === "initiated" && (
                      <button
                        onClick={async () => {
                          setSelectedRequest(request);
                          setDeclineRequestModalOpen(true);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                      >
                        Decline
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <DeclineRequestModal
        declineRequest={handleDeclineRequest}
        open={declineRequestModalOpen}
        setOpen={setDeclineRequestModalOpen}
      />

      <ActivateUserModal
        activateUser={activateUser}
        open={activateUserModalOpen}
        setOpen={setActivateUserModalOpen}
      />
    </div>
  );
};

export default JoiningReqestsTable;
