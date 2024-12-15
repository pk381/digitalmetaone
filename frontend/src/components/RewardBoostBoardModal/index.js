import * as React from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { GiCash } from "react-icons/gi";

const RewardBoostBoardModal = ({ open, setOpen, rewardUser }) => {

  
  const [amount, setAmount] = React.useState(0);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <GiCash />
            </span>
            Reward User
          </p>
          <Divider />
          <DialogContent>
            <div className="my-4 mx-2 text-left w-[360px]">
              <label htmlFor="amount">Income Amount</label>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                step="0.01"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder="Enter User Id of your friend"
                required
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
              disabled={!amount}
              onClick={() => {
                rewardUser(amount);
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded disabled:bg-grey-600"
            >
              Confirm
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default RewardBoostBoardModal;
