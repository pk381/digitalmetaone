import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { IoCopyOutline } from "react-icons/io5";

const ActivateAccountModal = ({ logout }) => {
  const [open, setOpen] = React.useState(false);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <React.Fragment>
      <span
        onClick={() => {
          setOpen(true);
        }}
        className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg cursor-pointer"
      >
        Activate Now
      </span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <MdOutlineAccountBalanceWallet />
            </span>
            Activate your account
          </p>
          <Divider />
          <DialogContent>
            {/* Scan the QR code below and make a $10 payment to activate your
            account */}
            {/* <div className="my-4 mx-2 flex items-center justify-around">
              <div>
                <img
                  src={tron}
                  alt="tron qr code"
                  height="120px"
                  width="120px"
                />
              </div>
              <div>
                <img
                  src={trc20}
                  alt="tron qr code"
                  height="120px"
                  width="120px"
                />
              </div>
            </div> */}
            <div className="my-4 mx-2 flex-col md:text-left sm:text-center">
              <p className="text-black flex">
                <span className="mr-2"> Copy TRON Address</span>
                <span className="hover:text-blue-500 cursor-pointer">
                  <IoCopyOutline
                    onClick={() => {
                      copyToClipboard("TCNmhUaPUQVZJqGBtEZA344NXramUCVXiT");
                    }}
                  />
                </span>
              </p>
              <p className="text-[15px]">TCNmhUaPUQVZJqGBtEZA344NXramUCVXiT</p>
            </div>
            <div className="my-4 mx-2 flex-col md:text-left sm:text-center">
              <p className="text-black flex">
                <span className="mr-2"> Copy USTD TRC20 Address</span>
                <span className="hover:text-blue-500 cursor-pointer">
                  <IoCopyOutline
                    onClick={() => {
                      copyToClipboard("TCNmhUaPUQVZJqGBtEZA344NXramUCVXiT");
                    }}
                  />
                </span>
              </p>
              <p className="text-[15px]">TCNmhUaPUQVZJqGBtEZA344NXramUCVXiT</p>
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
              onClick={() => {
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Done
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ActivateAccountModal;
