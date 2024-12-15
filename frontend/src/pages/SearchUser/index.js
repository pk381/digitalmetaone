import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/joy";

import useUser from "../../hooks/useUser";
import { useAuthContext } from "../../contexts/authContext";

import { toastError, toastSuccess } from "../../components/Notification";
import UserAccordion from "../../components/UserAccordion";
import ActivateUserModal from "../../components/ActivateUserModal";
import DeactivateUserModal from "../../components/DeactivateUserModal";
import EditUserModal from "../../components/EditUserModal";

import { APPLICATION_URL } from "../../constants/application";
import { Amount } from "../../constants/plans";

const SearchUser = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { searchUsers, updateUser, upgradePlan, activateUserId } = useUser();

  const [loading, setLoading] = useState(false);
  const [activateUserModalOpen, setActivateUserModalOpen] = useState(false);
  const [deactivateUserModalOpen, setDeactivateUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [query, setQuery] = useState("");

  const searchUser = async () => {
    const response = await searchUsers(query);
    if (!response) {
      return toastError("No results found");
    }

    if (response.length === 0) {
      return toastError("No results found");
    }
    setUsers(response);
  };

  const handleEditUser = async (updatedUserData) => {
    const isPlanChanged =
      selectedUserData?.planType !== updatedUserData?.planType;

    if (isPlanChanged && updatedUserData?.planType) {
      const amount = Amount[updatedUserData?.planType?.toUpperCase()];

      if (!amount) {
        return;
      }

      await upgradePlan(
        selectedUserData._id,
        selectedUserData.planType,
        updatedUserData.planType,
        amount,
        "manual"
      );
    }

    delete updatedUserData?.planType;
    if (!updatedUserData?.type) {
      delete updatedUserData?.type;
    }

    const upatedUser = await updateUser(
      updatedUserData,
      updatedUserData?.referenceId
    );

    if (upatedUser) {
      updateSelectedUser(updatedUserData?.referenceId, updatedUserData);
      setEditUserModalOpen(false);
      toastSuccess("User updated Successfully");
    } else {
      toastError("Failed to update selected user");
    }
    return;
  };

  //locally
  const updateSelectedUser = (id, dataToUpdate) => {
    const selectedUsers = [...users];

    const indexToUpdate = selectedUsers.findIndex(
      (user) => user.referenceId === id
    );

    if (indexToUpdate !== -1) {
      const updatedObject = {
        ...selectedUsers[indexToUpdate],
        ...dataToUpdate,
      };

      selectedUsers[indexToUpdate] = updatedObject;

      setUsers(selectedUsers);
      return true;
    }
    return toastError("Failed to update selected user");
  };

  const handleActivateUser = async () => {
    if (!selectedUser) {
      return;
    }
    setLoading(true);
    const data = {
      planType: "starter",
      isActive: true,
    };

    const response = await activateUserId(selectedUser);
    if (response === "success") {
      toastSuccess("User Activated Successfully");
    } else {
      toastError("Failed to Activate User");
    }
    return setLoading(false);
  };

  const handleDeactivateUser = async () => {
    if (!selectedUser) {
      return;
    }
    console.log(selectedUser);
    setLoading(true);
    const data = {
      planType: "inactive",
      isActive: false,
    };
    const response = await updateUser(data, selectedUser);
    if (response) {
      updateSelectedUser(selectedUser, data);
      toastSuccess("User Deactivated Successfully");
    } else {
      toastError("Failed to Deactivate user");
    }
    setLoading(false);
  };

  const openWithdrawalHistoryPage = (userId) => {
    if (!userId) {
      return;
    }

    window.open(`${APPLICATION_URL}/withdrawal-history/${userId}`, "_blank");
  };

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <CircularProgress />
      </div>
    </div>
  ) : user.type === "admin" ? (
    <div className="md:p-10 sm:py-6 sm:px-2">
      <div className="flex justify-center">
        <div className="md:w-[40%] sm:w-[98%]">
          <input
            className="bg-white appearance-none border-2 border-gray-200 w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-full"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Name, Email Address, Reference Id"
          />
        </div>

        <div>
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-4 px-6 rounded-full mx-4 flex disabled:bg-gray-500 text-[16px]"
            type="button"
            disabled={query.length === 0}
            onClick={searchUser}
          >
            <span>Search</span>
          </button>
        </div>
      </div>

      {users && (
        <div className="my-6">
          {users.map((user, index) => {
            return (
              <UserAccordion
                user={user}
                key={index}
                setActivateUserModalOpen={setActivateUserModalOpen}
                setDeactivateUserModalOpen={setDeactivateUserModalOpen}
                setEditUserModalOpen={setEditUserModalOpen}
                setSelectedUser={setSelectedUser}
                setSelectedUserData={setSelectedUserData}
                getWithdrawalHistory={openWithdrawalHistoryPage}
              />
            );
          })}
        </div>
      )}

      <ActivateUserModal
        userId={selectedUser}
        activateUser={handleActivateUser}
        open={activateUserModalOpen}
        setOpen={setActivateUserModalOpen}
      />

      <DeactivateUserModal
        open={deactivateUserModalOpen}
        setOpen={setDeactivateUserModalOpen}
        deactivateUser={handleDeactivateUser}
      />

      <EditUserModal
        open={editUserModalOpen}
        setOpen={setEditUserModalOpen}
        setUpdateUserData={setUpdatedUserData}
        updateUser={handleEditUser}
        userData={selectedUserData}
        setLoading={setLoading}
      />
    </div>
  ) : (
    <div className="text-center">
      <p>You are not authorized to access this page</p>
    </div>
  );
};

export default SearchUser;
