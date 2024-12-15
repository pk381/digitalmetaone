import * as React from "react";
import Divider from "@mui/joy/Divider";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import { IoPerson } from "react-icons/io5";

const EditUserModal = ({
  updateUser,
  open,
  setOpen,
  userData,
  setLoading,
  setUpdateUserData,
}) => {
  const [name, setName] = React.useState(userData?.name ?? "");
  const [planType, setPlanType] = React.useState(userData?.planType ?? "");
  const [balance, setBalance] = React.useState(userData?.balance);
  const [referenceId, setReferenceId] = React.useState(
    userData?.referenceId ?? ""
  );
  const [mobileNumber, setMobileNumber] = React.useState(
    userData?.mobileNumber
  );
  const [emailAddress, setEmailAddress] = React.useState(
    userData?.emailAddress ?? ""
  );
  const [type, setType] = React.useState(userData?.type ?? "");

  React.useEffect(() => {
    setName(userData?.name ?? "");
    setPlanType(userData?.planType ?? "");
    setBalance(userData?.balance);
    setReferenceId(userData?.referenceId ?? "");
    setMobileNumber(userData?.mobileNumber);
    setEmailAddress(userData?.emailAddress ?? "");
    setType(userData?.type ?? "");
  }, [userData]);

  //   React.useEffect(() => {
  //     setName(userData?.name ?? "");
  //     setPlanType(userData?.planType ?? "");
  //     setBalance(userData?.balance);
  //     setReferenceId(userData?.referenceId ?? "");
  //     setMobileNumber(userData?.mobileNumber);
  //     setEmailAddress(userData?.emailAddress ?? "");
  //     setType(userData?.type ?? "");
  //   }, []);

  const handleUpdateUser = async () => {
    setLoading(true);

    const updatedData = {
      name: name,
      emailAddress: emailAddress,
      referenceId: referenceId,
      mobileNumber: mobileNumber,
      type: type,
      planType: planType,
      balance: balance,
    };

    setUpdateUserData(updatedData);
    await updateUser(updatedData);
    setLoading(false);
  };

  return (
    userData && (
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <p className="text-left flex">
              <span className="text-2xl mr-2">
                <IoPerson />
              </span>
              Update the selected user ?
            </p>
            <Divider />
            <DialogContent>
              <div className="p-10 overflow-y-scroll h-[360px] ">
                <div className="md:flex mb-4">
                  <div className="text-left mx-2">
                    <label htmlFor="name">Name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter new name"
                      className="border-1 my-2 text-[16px]"
                    />
                  </div>
                  <div className="text-left mx-2">
                    <label htmlFor="emailAddress">Email Address</label>
                    <Input
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      variant="outlined"
                      placeholder="Enter new email address"
                      className="my-2 text-[16px] "
                    />
                  </div>
                </div>
                <div className="md:flex my-4">
                  <div className="text-left mx-2">
                    <label htmlFor="referenceId">Reference Id</label>
                    <Input
                      disabled
                      value={referenceId}
                      onChange={(e) => setReferenceId(e.target.value)}
                      placeholder="Enter new reference Id"
                      className="border-1 my-2 text-[16px]"
                    />
                  </div>
                  <div className="text-left mx-2">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <Input
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      variant="outlined"
                      placeholder="Enter new mobile Number"
                      className="my-2 text-[16px] "
                    />
                  </div>
                </div>

                <div className="md:flex my-4">
                  <div className="text-left mx-2 w-[50%]">
                    <label htmlFor="type">User Type</label>

                    <Select
                      onChange={(e, newValue) => {
                        console.log(newValue);
                        setType(newValue);
                      }}
                      defaultValue={type}
                      placeholder="Choose user Type"
                      className="my-3 text-[16px]"
                    >
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </div>
                  <div className="text-left mx-2 w-[50%]">
                    <label htmlFor="plantype">Plan Type</label>

                    <Select
                      onChange={(e, newValue) => {
                        setPlanType(newValue);
                      }}
                      defaultValue={planType}
                      placeholder="Choose user Type"
                      className="my-3 text-[16px]"
                    >
                      <Option value="inactive">Inactive</Option>
                      <Option value="starter">Starter</Option>
                      <Option value="basic">Basic</Option>
                      <Option value="star">Star</Option>
                      <Option value="superstar">Superstar</Option>
                      <Option value="prime">Prime</Option>
                      <Option value="royal">Royal</Option>
                    </Select>
                  </div>
                </div>
                <div className="text-left mx-2">
                  <label htmlFor="balance">Total Balance</label>
                  <Input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    variant="outlined"
                    placeholder="Enter updated balance"
                    className="my-2 text-[16px] "
                  />
                </div>
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
                  handleUpdateUser();
                }}
                className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Update
              </button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    )
  );
};

export default EditUserModal;
