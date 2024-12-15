import * as React from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import CircularProgress from "@mui/joy/CircularProgress";

import { MdSecurity } from "react-icons/md";

import { toastError, toastSuccess } from "../Notification";

import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/authContext";

const ChangePasswordModal = () => {
  const { user } = useAuthContext();
  const { changePassword } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = React.useState("");

  const resetValues = () => {
    console.log("Inside reset values");
    setOldPassword("");
    setNewPassword("");
    setConfirmedNewPassword("");
  };

  const handleChangePassword = async () => {
    if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmedNewPassword === ""
    ) {
      return toastError("All values are required");
    }

    if (confirmedNewPassword !== newPassword) {
      return toastError("Passwords do not match");
    }

    resetValues();
    setLoading(true);

    const data = {
      id: user?.id,
      password: oldPassword,
      newPassword: newPassword,
    };

    const response = await changePassword(data);

    if (response === "incorrect-password") {
      setLoading(false);
      return toastError("Incorrect password");
    } else if (response === "failed") {
      setLoading(false);
      return toastError("Failed to change password");
    }

    setLoading(false);
    return toastSuccess("Password changed successfully");
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-4  my-1 w-[165px]"
      >
        Change Password
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <MdSecurity />
            </span>
            Change Your Password
          </p>
          <Divider />
          <DialogContent>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <div>
                  <CircularProgress />
                </div>
              </div>
            ) : (
              <>
                <div className="my-4 mx-2 text-left w-[360px]">
                  <label htmlFor="amount">Old Password</label>
                  <input
                    type="text"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    step="0.01"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Enter your old password"
                    required
                  />
                </div>
                <div className="my-4 mx-2 text-left w-[360px]">
                  <label htmlFor="amount">New Password</label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    step="0.01"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="my-4 mx-2 text-left w-[360px]">
                  <label htmlFor="amount">Confirm New Password</label>
                  <input
                    type="text"
                    value={confirmedNewPassword}
                    onChange={(e) => {
                      setConfirmedNewPassword(e.target.value);
                    }}
                    step="0.01"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 border border-gray-400 rounded shadow"
            >
              Cancel
            </button>
            <button
              onClick={handleChangePassword}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Change Password
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePasswordModal;
