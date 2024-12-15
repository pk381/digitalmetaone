import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo_dashboard.jpeg";

import { useAuthContext } from "../../contexts/authContext";

import Features from "../../components/Features";
import LandingPageInfo from "../../components/LandingPageInfo";

const LandingPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div classNameName="p-10">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={logo}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Digital Meta One
            </h1>
            <p className="mb-8 leading-relaxed">
              Welcome to Digital Meta One, start your journey with us, which
              will help you reach your destination.
            </p>
            <div className="flex justify-center">
              {user ? (
                <div>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Features />
      <LandingPageInfo />
    </div>
  );
};

export default LandingPage;
