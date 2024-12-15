import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Button, Select, Option, CircularProgress } from "@mui/joy";

import { toastError, toastSuccess } from "../../components/Notification";
import PostRegisterModal from "../../components/PostRegisterModal";

import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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

  const generateUniqueId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase()
      .replace("X", "");
    const uniqueId = timestamp + randomString;
    return uniqueId.slice(0, 10);
  };

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
      type: "admin",
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

  return loading ? (
    <div className="w-[98vw] h-[90vh] flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="h-[95vh] w-full flex items-center justify-center">
      <div className="w-[480px] shadow-md p-5 rounded-md border-t-4 border-blue-700">
        <div>
          <div className="text-left mb-5">
            <h1 className="text-3xl font-bold my-2">Register with us</h1>
            <p className="">
              Already have an account ?
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="cursor-pointer text-blue-500"
              >
                Login now
              </span>
            </p>
          </div>

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

          <div className="text-right">
            <button
              onClick={signUp}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb- focus:outline-none "
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <PostRegisterModal
        open={PostRegisterModalOpen}
        setOpen={setPostRegisterationModalOpen}
        referenceId={registeredId}
      />
    </div>
  );
};

export default SignUp;
