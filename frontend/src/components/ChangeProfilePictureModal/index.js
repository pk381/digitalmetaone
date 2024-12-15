import * as React from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { toastError, toastSuccess } from "../Notification";

import { IoCameraReverse } from "react-icons/io5";

import useFiles from "../../hooks/useFiles";
import useUser from "../../hooks/useUser";
import { useAuthContext } from "../../contexts/authContext";

const ChangeProfilePictureModal = ({ open, setOpen }) => {
  const { updateProfilePicture, user } = useAuthContext();
  const { uploadFile, viewFile } = useFiles();
  const { updateUser } = useUser();

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      return;
    }
    const response = await uploadFile(selectedFile, "profilePictures");

    if (!response) {
      toastError("Failed to upload picture");
    } else {
      const userProfilePictureData = {
        profilePicture: response,
      };

      console.log(user?.referenceId);
      console.log(userProfilePictureData);

      await updateUser(userProfilePictureData, user?.referenceId);

      const updatedUrl = await viewFile(response);
      updateProfilePicture(updatedUrl);
      toastSuccess("Profile picture changed successfully");
    }
    return setLoading(false);
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <IoCameraReverse />
            </span>
            Change Your Profile Picture
          </p>
          <Divider />
          <DialogContent>
            Choose an image file and click change to update your profile picture
            <div>
              <label for="file-input" className="sr-only">
                Select Profile Picture
              </label>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                }}
                type="file"
                id="file-input"
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4"
              />
            </div>
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
              disabled={!selectedFile}
              onClick={() => {
                handleUpload();
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded disabled:bg-gray-500"
            >
              Upload
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ChangeProfilePictureModal;
