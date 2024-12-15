import * as React from "react";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { Divider } from "@mui/joy";
import { formatDate } from "../../constants/functions";

const UserAccordion = ({
  user,
  setActivateUserModalOpen,
  setDeactivateUserModalOpen,
  setEditUserModalOpen,
  setSelectedUser,
  setSelectedUserData,
  getWithdrawalHistory,
}) => {
  return (
    <div className="shadow-md ">
      <AccordionGroup disableDivider>
        <Accordion>
          <AccordionSummary sx={{ fontSize: "20px" }}>
            {user?.name ?? "N/A"}
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <div className="text-black md:flex sm:flex-row justify-between p-6">
              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{user?.emailAddress}</span>
              </div>

              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{user?.mobileNumber}</span>
              </div>

              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{formatDate(user?.createdAt)}</span>
              </div>

              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{user?.referenceId}</span>
              </div>
              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{user?.planType?.toUpperCase() ?? "N/A"}</span>
              </div>

              <div className="bg-gray-100 rounded-full px-4 py-4 mb-2">
                <span>{`$ ${user?.balance}`}</span>
              </div>
            </div>
            <div className="flex justify-end">
              {user?.planType !== "inactive" ? (
                <div className="text-end">
                  <button
                    onClick={() => {
                      setSelectedUser(user?.referenceId);
                      setDeactivateUserModalOpen(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                  >
                    Deactivate User
                  </button>
                </div>
              ) : (
                <div className="text-end">
                  <button
                    onClick={() => {
                      setSelectedUser(user?.referenceId);
                      setActivateUserModalOpen(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                  >
                    Activate User
                  </button>
                </div>
              )}

              <div className="text-end">
                <button
                  onClick={() => {
                    setSelectedUserData(user);
                    setEditUserModalOpen(true);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                >
                  Edit User
                </button>
              </div>

              <div className="text-end">
                <button
                  onClick={() => {
                    getWithdrawalHistory(user?._id ?? false);
                  }}
                  className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded-full text-[13px]  mx-1"
                >
                  Withdrawal History
                </button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

export default UserAccordion;
