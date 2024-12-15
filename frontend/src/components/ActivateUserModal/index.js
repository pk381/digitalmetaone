import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { FaUserCheck } from "react-icons/fa";

const ActivateUserModal = ({ activateUser, open, setOpen }) => {

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <FaUserCheck />
            </span>
            Activate the user ?
          </p>
          <Divider />
          <DialogContent>
            Are you sure that you want to activate the selected user ?
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
              onClick={() => {
                activateUser();
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Confirm
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ActivateUserModal;
