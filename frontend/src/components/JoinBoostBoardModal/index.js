import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import ModalDialog from "@mui/joy/ModalDialog";
import { FaHandshake } from "react-icons/fa";
import { toastError } from "../Notification";

const JoinBoostBoardModal = ({ joinBoostBoard, isEligible, balance }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(5);

  const handleConfirm = () => {
    if (balance < amount) {
      return toastError("Insufficient balance");
    }
    joinBoostBoard(amount);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="my-1 bg-transparent hover:bg-blue-500 text-[16px] text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded w-[200px]"
      >
        Boost Income
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <FaHandshake />
            </span>
            Join Boost Board
          </p>
          <Divider />
          <DialogContent>
            <div className="md:w-[480px]"></div>
            <>
              <div className="text-left mx-2 ">
                <label htmlFor="type">Select Amount</label>

                <Select
                  onChange={(e, newValue) => {
                    setAmount(newValue);
                  }}
                  defaultValue={5}
                  placeholder="Choose amount"
                  className="my-3 text-[16px]"
                >
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={50}>50</Option>
                  <Option value={100}>100</Option>
                  <Option value={200}>200</Option>
                  <Option value={500}>500</Option>
                </Select>
              </div>
            </>
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
                handleConfirm();
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded disabled:bg-gray-500"
            >
              Confirm
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default JoinBoostBoardModal;
