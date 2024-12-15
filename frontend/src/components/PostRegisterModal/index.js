import * as React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { FaCheckCircle } from "react-icons/fa";

const PostRegisterModal = ({ open, setOpen, referenceId }) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <FaCheckCircle />
            </span>
            Registeration Successful
          </p>
          <Divider />
          <DialogContent>
            Your reference ID is <span className="text-3xl">{referenceId}</span>
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
                navigate("/login");
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Go To Login
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default PostRegisterModal;
