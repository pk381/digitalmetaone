import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { MdDriveFolderUpload } from "react-icons/md";

const UploadReoieptModal = ({ uploadReciept }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [usdtTrcId, setUsdtTrcId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
      >
        Upload Reciept
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <MdDriveFolderUpload />
            </span>
            Upload Your Payment Reciept
          </p>
          <Divider />
          <DialogContent>
            <div className=" my-1 text-left sm:w-[360px] md:w-[480px]">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                step="0.01"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="text-left sm:w-[360px] md:w-[480px] my-1">
              <label htmlFor="amount">Amount you paid</label>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                step="0.01"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="text-left sm:w-[360px] md:w-[480px]  my-1">
              <label htmlFor="usdtTrcId">USDT TRC Address</label>
              <input
                type="text"
                value={usdtTrcId}
                onChange={(e) => {
                  setUsdtTrcId(e.target.value);
                }}
                step="0.01"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder="Enter USDT TRC Address"
                required
              />
            </div>
            <div className="sm:w-[360px] md:w-[480px] my-1">
              <div>
                <label for="file-input" className="sr-only">
                  Upload Reciept
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
            </div>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => {
                setSelectedFile(null);
                setOpen(false);
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 border border-gray-400 rounded shadow"
            >
              Cancel
            </button>

            <button
              disabled={!selectedFile}
              onClick={() => {
                
                uploadReciept(selectedFile, name, amount, usdtTrcId);
                setOpen(false);
              }}
              className="text-[16px] bg-red-500 disabled:hover:bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded disabled:opacity-50 "
            >
              Upload
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default UploadReoieptModal;
