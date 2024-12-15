import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import { useAuthContext } from "../contexts/authContext";
import Pricing from "../pages/Pricing";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import AdminDashboard from "../pages/AdminDashboard";
import CompanyTree from "../pages/CompanyTree";
import MyTeam from "../pages/MyTeam";
import MyWallet from "../pages/MyWallet";
import UserPage from "../pages/UserPage";
import SearchUser from "../pages/SearchUser";
import WithdrawalHistory from "../pages/WIthdrawalHistory.js";
import LandingPage from "../pages/LandingPage/index.js";
import BoostBoardDetails from "../pages/BoostBoardDetails/index.js";

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const authContext = useAuthContext();
  const { verifyAuth, user } = authContext;

  useEffect(() => {
    const fetchAuth = () => {
      const auth = verifyAuth();
      setAuth(auth ? true : false);
      setLoading(false);
    };
    fetchAuth();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    <BrowserRouter>
      {user && <Header />}
      <div className="m-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/pricing-details"
            element={user ? <Pricing /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact-us"
            element={user ? <ContactUs /> : <Navigate to="/login" />}
          />
          <Route
            path="/about-us"
            element={user ? <AboutUs /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-dashboard"
            element={user ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/team-tree"
            element={user ? <CompanyTree /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-team"
            element={user ? <MyTeam /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-wallet"
            element={user ? <MyWallet /> : <Navigate to="/login" />}
          />
          <Route
            path="/user"
            element={user ? <UserPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search-user"
            element={user ? <SearchUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/boost-board"
            element={user ? <BoostBoardDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/withdrawal-history/:id"
            element={user ? <WithdrawalHistory /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <ToastContainer />
      {user && <Footer />}
    </BrowserRouter>
  );
};

export default AppRoutes;
