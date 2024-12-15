import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Input,
  Divider,
  Select,
  Option,
  CircularProgress,
  ModalDialog,
  Modal,
  DialogContent,
  DialogActions,
} from "@mui/joy";

import { toastError, toastSuccess } from "../../components/Notification";
import PostRegisterModal from "../../components/PostRegisterModal";

import useAuth from "../../hooks/useAuth";

import { IoPerson } from "react-icons/io5";

const RegisterUserModal = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [PostRegisterModalOpen, setPostRegisterationModalOpen] =
    useState(false);
  const [registeredId, setRegisteredId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumebr] = useState("");
  const [referralId, setReferralId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [side, setSide] = useState("");

  const resetValues = () => {
    setMobileNumebr("");
    setReferralId("");
    setName("");
    setEmail("");
    setSide("");
    setPassword("");
    setConfirmedPassword("");
  };
  const signUp = async () => {
    setLoading(true);
    if (
      name === "" ||
      email === "" ||
      mobileNumber === "" ||
      referralId === "" ||
      password === "" ||
      confirmedPassword === "" ||
      side === ""
    ) {
      setLoading(false);
      return toastError("Please fill the complete form");
    }
    if (password !== confirmedPassword) {
      setLoading(false);
      return toastError("Passwords do not match");
    }

    const payload = {
      name,
      mobileNumber,
      emailAddress: email,
      side,
      referralId,
      password,
    };

    const response = await register(payload);

    if (response.user) {
      setRegisteredId(response?.user.referenceId ?? "");
      toastSuccess("Registration Successful");
      setPostRegisterationModalOpen(true);
      resetValues();
    } else {
      toastError(response.message);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-4  my-1 w-[165px]"
      >
        Register
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <p className="text-left flex">
            <span className="text-2xl mr-2">
              <IoPerson />
            </span>
            Register User
          </p>
          <Divider />
          <DialogContent>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <div>
                  <CircularProgress />
                </div>
              </div>
            ) : (
              <>
                <div className=" w-full flex items-center justify-center">
                  <div className="w-[480px] p-5 ">
                    <div>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        variant="outlined"
                        className="my-3 text-[16px]"
                      />

                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        variant="outlined"
                        className="my-3 text-[16px]"
                      />

                      <Input
                        value={mobileNumber}
                        onChange={(e) => setMobileNumebr(e.target.value)}
                        placeholder="Enter your mobile number"
                        variant="outlined"
                        className="my-3 text-[16px]"
                      />

                      <Input
                        value={referralId}
                        onChange={(e) => setReferralId(e.target.value)}
                        variant="outlined"
                        placeholder="Enter referral ID"
                        className="my-3 text-[16px]"
                      />

                      <Input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Enter password"
                        className="my-3 text-[16px]"
                      />

                      <Input
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Confirm password"
                        className="my-3 text-[16px]"
                      />

                      <Select
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setSide(newValue);
                        }}
                        placeholder="Choose Side"
                        className="my-3 text-[16px]"
                      >
                        <Option value="Left">Left</Option>
                        <Option value="Right">Right</Option>
                      </Select>
                    </div>
                  </div>
                  <PostRegisterModal
                    open={PostRegisterModalOpen}
                    setOpen={setPostRegisterationModalOpen}
                    referenceId={registeredId}
                  />
                </div>
              </>
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
            <button
              onClick={signUp}
              className="text-[16px] bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Register
            </button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterUserModal;
