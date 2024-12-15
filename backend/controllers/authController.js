const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Earning = require("../models/Earning");

const { v4: uuidv4 } = require("uuid");
const {
  addAutopoolIncome,
  checkAutopoolIncomeEligibility,
} = require("./incomeCalculatorController");

const generateToken = (data) => {
  return jwt.sign({ data }, "thesecret", { expiresIn: "4h" });
};

const updateUser = async (data, id) => {
  try {
    if (!data || !id) {
      return false;
    }

    const updatedUser = await User.findByIdAndUpdate(id, data);
    return updatedUser ? true : false;
  } catch (error) {
    console.log("Error from authController's updateUser", error);
    return false;
  }
};

const register = async (req, res) => {
  try {
    const { name, emailAddress, mobileNumber, referralId, side, password } =
      req.body;

    if (!name || !emailAddress || !mobileNumber || !referralId || !password) {
      res.status(200).json({
        status: "incorrect-data-sent",
      });
    }

    const parentUser = await User.findOne({
      referenceId: referralId,
    }).select({
      planType: 1,
    });

    if (!parentUser) {
      return res.status(200).json({
        user: null,
        message: "Parent user not found",
      });
    }

    if (parentUser.planType === "inactive") {
      console.log("inactive parent user");
      return res.status(200).json({
        user: null,
        message: "Parent user not active",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const uid = uuidv4().substring(0, 8).toUpperCase();

    const user = await User.create({
      name,
      emailAddress,
      mobileNumber,
      referralId,
      underId: referralId,
      referenceId: uid,
      side: side,
      password: hash,
    });

    if (user) {
      const newlyCreatedEarnings = await Earning.create({
        total: 0.0,
        today: 0.0,
        direct: 0.0,
        dailyClub: 0.0,
        level: 0.0,
        boost: 0.0,
        widthdrawl: 0.0,
        autoPool: 0.0,
        reward: 0.0,
        userId: user._id,
        referenceId: user.referenceId,
      });

      if (!newlyCreatedEarnings) {
        console.log(newlyCreatedEarnings);
        console.log("failed to create earnings");
      }

      let data;

      const referringUser = await User.findOne({ referenceId: referralId });

      if (referringUser) {
        data = {
          downline: [...referringUser?.downline, user?._id],
          direct: ++referringUser.direct,
        };
        await updateUser(data, referringUser?._id);
      }

      res.status(201).json({
        user: {
          name: user.name,
          planType: null,
          userType: "user",
          referenceId: uid,
        },
        message: "user-created",
      });
    } else {
      return res.status(200).json({
        user: null,
        message: "failed",
      });
    }
  } catch (error) {
    console.log("Error from authController's register", error);
    return res.status(500).json({
      user: null,
      message: "failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { query, password } = req.body;

    if (!query || !password) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        user: null,
        token: null,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ emailAddress: query }, { referenceId: query }],
    });

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
        user: null,
        token: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      return res.status(200).json({
        status: "success",
        user: {
          id: existingUser._id,
          name: existingUser.name,
          emailAddress: existingUser?.emailAddress,
          mobileNumber: existingUser?.mobileNumber,
          planType: existingUser.planType,
          type: existingUser.type,
          balance: existingUser.balance,
          referenceId: existingUser.referenceId,
          profilePicture: existingUser.profilePicture,
          boost: existingUser.boost,
          createdAt: existingUser.createdAt,
          direct: existingUser.direct,
          isEligibleToJoinBoostBoard: existingUser?.isEligibleToJoinBoostBoard,
        },
        token: generateToken(existingUser._id),
        message: "User logged in successfully",
      });
    } else {
      return res.status(200).json({
        status: "incorrect-password",
        user: null,
        token: null,
      });
    }
  } catch (error) {
    console.log("Error from authController's login", error);
    return res.status(200).json({
      status: "internal-server-error",
      user: null,
      token: null,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, id, newPassword } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
      });
    }

    const existingUserPassword = existingUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUserPassword
    );

    if (!isPasswordCorrect) {
      return res.status(200).json({
        status: "incorrect-password",
      });
    }

    console.log(isPasswordCorrect);

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const data = {
      password: newPasswordHash,
    };

    const updatedUser = await User.findByIdAndUpdate(id, data).select({});

    if (updatedUser) {
      return res.status(200).json({
        status: "success",
      });
    }

    return res.status(200).json({
      status: "failed",
    });
  } catch (error) {
    console.log("Error from authController's changePassword", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

const changePasswordAdmin = async (req, res) => {
  try {
    const { newPassword, referenceId } = req.body;

    const existingUser = await User.findOne({
      referenceId: referenceId,
    });

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const data = {
      password: newPasswordHash,
    };

    const updatedUser = await User.findOneAndUpdate(
      {
        referenceId: referenceId,
      },
      data
    ).select({});

    if (updatedUser) {
      return res.status(200).json({
        status: "success",
      });
    }

    return res.status(200).json({
      status: "failed",
    });
  } catch (error) {
    console.log("Error from authController's changePassword", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

module.exports = { register, login, changePassword, changePasswordAdmin };
