import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { BiMoneyWithdraw } from "react-icons/bi";

const WithdrawModal = ({ withdrawAmount, isEligible }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [usdtAddress, setUsdtAddress] = useState("");

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="my-1 bg-transparent hover:bg-blue-500 text-[16px] text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded w-[200px]"
      >
        Withdraw Now
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <BiMoneyWithdraw />
            </span>
            Withdraw from your account
          </p>
          <Divider />
          <DialogContent>
            {isEligible ? (
              <div>
                <div className="my-4 mx-2 text-left w-[360px]">
                  <label htmlFor="amount">USDT Address</label>
                  <input
                    type="text"
                    value={usdtAddress}
                    onChange={(e) => {
                      setUsdtAddress(e.target.value);
                    }}
                    step="0.01"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Enter Your USDT TRC Address"
                    required
                  />
                </div>
                <div className="my-2 mx-2 text-left w-[360px]">
                  <label htmlFor="amount">Enter Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    step="0.01"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Enter Amount"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                You should have minumum $ 10 balance and 2 direct members to be
                able to withdraw
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
                disabled={amount === 0 || usdtAddress === ""}
                onClick={() => {
                  setOpen(false);
                  withdrawAmount(amount, usdtAddress);
                  setAmount(0);
                  setUsdtAddress("");
                }}
                className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Withdraw
              </button>
            )}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default WithdrawModal;
