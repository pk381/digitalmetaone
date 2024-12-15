import React, { useState } from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { GrUpgrade } from "react-icons/gr";

const UpgradePlanModal = ({
  upgradePlan,
  upgradedPlan,
  amount,
  isEligible,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="my-1 bg-transparent hover:bg-blue-500 text-[16px] text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded w-[200px]"
      >
        Upgrade Plan
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <GrUpgrade />
            </span>
            Upgrade Your Current Plan
          </p>
          <Divider />
          <DialogContent>
            {!isEligible
              ? `Minimum balance requied to upgrade to ${upgradedPlan} is $ ${amount}`
              : ` Are you sure you want to upgrade your current plan to
             ${upgradedPlan.toUpperCase()} for  $ ${amount}`}
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
                onClick={() => {
                  setOpen(false);
                  upgradePlan();
                }}
                className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Upgrade
              </button>
            )}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default UpgradePlanModal;
