import React, { useState } from "react";

import { useAuthContext } from "../../contexts/authContext";

import LogoutModal from "../../components/LogoutModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import ChangeProfilePictureModal from "../../components/ChangeProfilePictureModal";
import RegisterUserIdModal from "../../components/RegisterUserIdModal";

import { formatDate } from "../../constants/functions";

import { Avatar } from "@mui/joy";

import { FaCamera } from "react-icons/fa";

const UserPage = () => {
  const { user, profilePicture } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className=" p-0 md:p-10 md:shadow-lg sm:flex-row md:flex ">
        <div className="md:border-r md:border-gray-400  flex sm:w-[95%]  md:w-[25%]">
          <Avatar
            size="lg"
            sx={{ width: "95px", height: "95px" }}
            src={profilePicture}
          />
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="ml-[-28px] z-10 text-white rounded-full p-[8px] bg-gray-600 h-8 cursor-pointer"
          >
            <FaCamera />
          </div>
          <div className="text-left">
            <p className="mx-6 text-3xl">{user?.name ?? ""}</p>
            <p className="mx-6 text-sm text-gray-400">
              {user?.emailAddress ?? "N/A"}
            </p>
            <p className="mx-6 text-sm text-gray-400">
              {user?.mobileNumber ?? "N/A"}
            </p>
          </div>
        </div>
        <div className="w-[100%] md:w-[80%] sm:flex-row md:flex ">
          <div className="text-left md:border-r md:border-gray-400 md:pr-10 mx-4 my-5 md:my-0">
            <p className="text-xl font-bold">Joined On</p>
            <p className="text-lg text-gray-600">
              {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
            </p>
          </div>
          <div className="text-left mx-4 md:border-r md:border-gray-400 pr-10 my-5 md:my-0">
            <p className="text-xl font-bold">Current Plan</p>
            <p className="text-lg text-gray-600">
              {user?.planType?.toUpperCase() ?? "N/A"}
            </p>
          </div>

          <div className="text-left mx-4 pr-10 md:border-r md:border-gray-400 my-5 md:my-0">
            <p className="text-xl font-bold">My Referencd ID</p>
            <p className="text-2xl text-gray-600">{user?.referenceId}</p>
          </div>

          <div className="  flex md:flex-col items-center">
            <LogoutModal />
            <ChangePasswordModal />
            <RegisterUserIdModal />
          </div>
        </div>
      </div>
      <ChangeProfilePictureModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default UserPage;
