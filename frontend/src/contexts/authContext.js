import React, { createContext, useState, useContext } from "react";

import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEarnings, setUserEarnings] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const expirationTimeInHours = 4;
  const expirationDate = new Date(
    new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
  );

  const verifyAuth = () => {
    if (!profilePicture) {
      const profilePicture = Cookies.get("profilePicture");
      setProfilePicture(profilePicture);
    }
    if (user) {
      return true;
    }
    const storedUser = Cookies.get("user");
    if (!storedUser) {
      return false;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    return storedUser ? true : false;
  };

  const addUser = (userData, token, profilePicture) => {
    Cookies.remove("profilePicture");
    Cookies.set("profilePicture", profilePicture);
    setProfilePicture(profilePicture);
    const user = JSON.stringify(userData);
    Cookies.set("token", token, { expires: expirationDate });
    Cookies.set("user", user);
    setUser(userData);
  };

  const updateAddedUser = (newUser) => {
    const newUserJson = JSON.stringify(newUser);
    const existingExpiryDate = Cookies.get("user", { raw: true });
    Cookies.set("user", newUserJson, { expires: new Date(existingExpiryDate) });
    const updatedCookie = Cookies.get("user");
    const user = JSON.parse(updatedCookie);
    setUser(user);
  };

  const updateProfilePicture = (url) => {
    const expirationTimeInHours = 10;
    const expirationDate = new Date(
      new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
    );
    Cookies.remove("profilePicture");
    Cookies.set("profilePicture", url, { expires: expirationDate });
    setProfilePicture(url);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("profilePicture");
    Cookies.remove("user", { expires: expirationDate });
    setUser(null);
    setUserEarnings(null);
    setProfilePicture(null);
  };

  const setEarnings = async (earnings) => {
    setUserEarnings(earnings);
  };

  const contextValue = {
    user,
    userEarnings,
    profilePicture,
    addUser,
    updateAddedUser,
    logout,
    verifyAuth,
    setEarnings,
    updateProfilePicture,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
