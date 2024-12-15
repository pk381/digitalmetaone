import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, CircularProgress } from "@mui/joy";
import { toastError, toastSuccess } from "../../components/Notification";

import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/authContext";
import useFiles from "../../hooks/useFiles";

const Login = () => {
  const { viewFile } = useFiles();
  const { login } = useAuth();
  const authContext = useAuthContext();
  const { addUser } = authContext;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetValues = () => {
    setUsername("");
    setPassword("");
  };

  const loginTrigger = async () => {
    setLoading(true);
    if (username === "" || password === "") {
      toastError("Please fill the values");
      return setLoading(false);
    }

    const payload = {
      query: username,
      password,
    };

    const response = await login(payload);
    setLoading(true);
    if (response) {
      if (response?.user) {
        toastSuccess("Logged in successfully");
        resetValues();

        let url = null;

        const imageKey = response.user.profilePicture;
        if (imageKey) {
          const address = await viewFile(imageKey);
          url = address;
        }
        addUser(response.user, response.token, url);
        setLoading(false);
        return navigate("/dashboard");
      } else {
        toastError(response?.message ?? "Something went wrong");
        return setLoading(false);
      }
    } else {
      toastError("Server error, try again later");
      return setLoading(false);
    }
  };

  return (
    <div className="h-[95vh] w-full flex items-center justify-center">
      <div className="w-[480px] shadow-md p-5 rounded-md border-t-4 border-blue-700">
        <div>
          <div className="text-left mb-5">
            <h1 className="text-3xl font-bold my-2">Login</h1>
            <p className="">
              Don't have an account?
              <span
                onClick={() => {
                  navigate("/sign-up");
                }}
                className="cursor-pointer text-blue-500"
              >
                Sign up now
              </span>
            </p>
          </div>

          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your reference ID"
            className="border-1"
          />
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            placeholder="Enter your password"
            className="my-3 text-[16px]"
          />
          <div className="text-right">
            {loading ? (
              <CircularProgress />
            ) : (
              <button
                onClick={loginTrigger}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb- focus:outline-none "
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
