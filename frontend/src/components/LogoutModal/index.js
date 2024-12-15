import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { useAuthContext } from "../../contexts/authContext";

import { TbLogout2 } from "react-icons/tb";

const LogoutModal = () => {
  const { logout } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-1 w-[165px]"
      >
        Logout
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <TbLogout2 />
            </span>
            Log out from application ?
          </p>
          <Divider />
          <DialogContent>
            Are you sure you want logout from the application ?
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
                logout();
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default LogoutModal;
