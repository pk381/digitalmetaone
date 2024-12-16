import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { RiProfileLine } from "react-icons/ri";
import { toastError } from "../Notification";

const ActivateFriendsIdModal = ({ activateId, isEligible }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-transparent hover:bg-blue-500 text-[16px] text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded w-[200px]"
      >
        Activate ID
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <RiProfileLine />
            </span>
            Activate your Friend's ID
          </p>
          <Divider />
          <DialogContent>
            {isEligible ? (
              <div className="my-4 mx-2 text-left w-[360px]">
                <label htmlFor="amount">User Id</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  step="0.01"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  placeholder="Enter User Id of your friend"
                  required
                />
              </div>
            ) : (
              <div>
                You should have minimum $ 10 in account to activate other ID
              </div>
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
            {isEligible && (
              <button
                disabled={id === ""}
                onClick={() => {
                  if (id === "") {
                    return toastError("ID is required to update");
                  }
                  setOpen(false);
                  activateId(id);
                  setId("");
                }}
                className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Activate
              </button>
            )}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ActivateFriendsIdModal;
