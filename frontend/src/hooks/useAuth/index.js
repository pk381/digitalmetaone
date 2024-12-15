import api from "../../constants/api";

const useAuth = () => {
  const verifyAuth = () => {
    try {
    } catch (error) {
      console.log("Error from useAuth's verifyAuth", error);
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const data = JSON.stringify(payload);

      const response = await api.post("/api/auth/sign-up", data);

      if (response?.data) {
        const data = response.data;

        return data.message === "user-created"
          ? { user: data.user, message: "User registeration successful" }
          : { user: null, message: data.message };
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from useAuth's register", error);
      return false;
    }
  };

  const login = async (payload) => {
    try {
      const data = JSON.stringify(payload);

      const response = await api.post("/api/auth/login", data);

      if (response?.data) {
        const data = response.data;

        return data.status === "success"
          ? { user: data.user, message: data.status, token: data.token }
          : { user: null, message: data.status, token: null };
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from useAuth's login", error);
      return false;
    }
  };

  const changePassword = async (payload) => {
    try {
      const data = JSON.stringify(payload);

      const response = await api.post("/api/auth/change-password", data);

      if (response?.data) {
        const data = response.data;

        console.log(data);

        return data.status;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error from useAuth's changePassword", error);
      return false;
    }
  };

  const changePasswordAdmin = async (payload) => {
    try {
      const data = JSON.stringify(payload);

      const response = await api.post("/api/auth/change-password/admin", data);

      if (response?.data) {
        const data = response.data;

        return data?.status;
      }

      return false;
    } catch (error) {
      console.log("Error from useAuth's changePassword", error);
      return false;
    }
  };

  return {
    login,
    register,
    verifyAuth,
    changePassword,
    changePasswordAdmin,
  };
};

export default useAuth;
