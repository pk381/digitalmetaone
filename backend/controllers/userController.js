const User = require("../models/User");
const Earning = require("../models/Earning");

const { addInvestmentEntry } = require("../controllers/investmentController");

const {
  addDirectIncome,
  addLevelIncome,
  checkRewardIncomeEligibility,
} = require("../controllers/incomeCalculatorController");

const { addDailyClubEntry } = require("../controllers/dailyClubController");
const InvestmentEntry = require("../models/InvestmentEntry");

const activateId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        modifiedUser: null,
      });
    }

    const existingUser = await User.findOne({
      referenceId: id,
    }).select({ underId: 1, side: 1 });

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
        modifiedUser: null,
      });
    }

    const modifiedUser = await User.findOneAndUpdate(
      {
        referenceId: id,
      },
      {
        isActive: true,
        planType: "starter",
      },
      { new: true }
    );

    if (!modifiedUser) {
      return res.status(200).json({
        status: "failed",
        modifiedUser: null,
      });
    }

    const parentUser = await User.findOne({
      referenceId: existingUser.underId,
    }).select({ balance: 1, referenceId: 1, direct: 1, directUsersActive: 1 });

    if (parentUser) {
      await addDirectIncome(parentUser.referenceId, "starter");

      parentUser.direct += 1;
      parentUser.directUsersActive += 1;
      await parentUser.save();

      const levelIncomeAdded = await addLevelIncome(
        existingUser?.underId,
        "starter"
      );

      if (!levelIncomeAdded) {
        return res.status(200).json({
          status: "failed-to-update-level-income",
          updatedUser: null,
        });
      }

      //add daily club entry
      const isDailyClubEntryCreated = await addDailyClubEntry(id, "starter");

      if (!isDailyClubEntryCreated) {
        console.log("Failed to create DailyClubEntry");
      }
    }

    // await checkRewardIncomeEligibility(existingUser.underId, 10);

    //add investment entry
    const isInvestMentEntryMade = await addInvestmentEntry(
      id,
      existingUser.underId,
      10,
      existingUser.side
    );

    if (!isInvestMentEntryMade) {
      console.log("Failed to create investment entry");
    }

    return res.status(200).json({
      status: "success",
      modifiedUser: modifiedUser,
    });
  } catch (error) {
    console.log("Error occured at  userController's activateId", error);
    return res.status(500).json({
      status: "failed",
      modifiedUser: null,
    });
  }
};

const fetchEarnings = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).json({
        status: "incorrect-data-sent",
        earnings: null,
      });
    }

    const earnings = await Earning.find({
      referenceId: id,
    });

    if (!earnings) {
      return res.status(200).json({
        status: "failed",
        earnings: null,
      });
    }

    return res.status(200).json({
      status: "success",
      earnings: earnings,
    });
  } catch (error) {
    console.log("Error occured at  userController's activateId", error);
    return res.status(500).json({
      status: "failed",
      earnings: null,
    });
  }
};

const fetchUsersJoinedThisMonth = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(200).json({
        status: "failed",
        members: null,
      });
    }

    let thisMonth = [];

    let date = new Date();

    date = new Date(`${date.getFullYear()}/${date.getMonth() + 1}/01`);

    users.forEach((user) => {
      if (user.createdAt >= date && user.createdAt <= new Date()) {
        thisMonth.push(user);
      }
    });

    return res.status(200).json({
      status: "success",
      members: thisMonth,
    });
  } catch (error) {
    console.log(
      "Error occurred at userController's fetchUsersJoinedThisMonth",
      error
    );
    return res.status(500).json({
      status: "failed",
      members: null,
    });
  }
};

const upgradePlan = async (req, res) => {
  try {
    const { userId, existingPlan, amount, upgradedPlan, mode } = req.body;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
        updatedUser: null,
      });
    }

    if (existingUser?.planType !== existingPlan && mode !== "manual") {
      return res.status(200).json({
        status: "incorrect-plan-data",
        updatedUser: null,
      });
    }

    if (existingUser?.balance < amount && mode === "auto") {
      return res.status(200).json({
        status: "insufficient-balance",
        updatedUser: null,
      });
    }

    const referenceIdOfUser = existingUser?.underId;
    const directIncomeAmount = await addDirectIncome(
      referenceIdOfUser,
      upgradedPlan
    );

    if (!directIncomeAmount) {
      console.log("No direct income amount found");
    }

    console.log("reached addlevelIncome");

    const levelIncomeAdded = await addLevelIncome(
      existingUser?.underId,
      upgradedPlan
    );

    if (!levelIncomeAdded) {
      return res.status(200).json({
        status: "failed-to-update-level-income",
        updatedUser: null,
      });
    }

    const isDailyClubEntryCreated = await addDailyClubEntry(
      existingUser?.referenceId,
      upgradedPlan
    );

    if (!isDailyClubEntryCreated) {
      console.log("Failed to create DailyClubEntry");
    }

    //check for the reward income
    // await checkRewardIncomeEligibility(existingUser.underId, amount);

    // //add investment entry
    const isInvestMentEntryMade = await addInvestmentEntry(
      existingUser.referenceId,
      existingUser.underId,
      amount,
      existingUser.side
    );

    if (!isInvestMentEntryMade) {
      console.log("Failed to create investment entry");
    }

    const data = {
      balance:
        mode === "manual"
          ? existingUser?.balance
          : existingUser?.balance - amount,
      planType: upgradedPlan,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(200).json({
        status: "failed",
        updatedUser: null,
      });
    }

    return res.status(200).json({
      status: "success",
      updatedUser: {
        id: updatedUser?._id,
        name: updatedUser?.name,
        planType: updatedUser?.planType,
        type: updatedUser?.type,
        balance: updatedUser?.balance,
      },
    });
  } catch (error) {
    console.log("Error from userController's upgradePlan", error);
    return res.status(500).json({
      status: "failed",
      updatedUser: null,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(200).json({
        status: "invalid-query",
        users: null,
      });
    }

    const usersByRefId = await User.find({
      referenceId: query,
    }).select({
      emailAddress: 1,
      referenceId: 1,
      createdAt: 1,
      planType: 1,
      downline: 1,
      balance: 1,
      name: 1,
      mobileNumber: 1,
      type: 1,
    });

    if (usersByRefId.length !== 0) {
      return res.status(200).json({
        status: "success",
        users: usersByRefId,
      });
    }

    const usersByName = await User.find({
      name: query,
    }).select({
      emailAddress: 1,
      referenceId: 1,
      createdAt: 1,
      planType: 1,
      downline: 1,
      balance: 1,
      name: 1,
      mobileNumber: 1,
      type: 1,
    });

    if (usersByName.length !== 0) {
      return res.status(200).json({
        status: "success",
        users: usersByName,
      });
    }

    const usersByEmail = await User.find({
      emailAddress: query,
    }).select({
      emailAddress: 1,
      referenceId: 1,
      createdAt: 1,
      planType: 1,
      downline: 1,
      balance: 1,
      name: 1,
      mobileNumber: 1,
      type: 1,
    });

    if (usersByEmail.length !== 0) {
      return res.status(200).json({
        status: "success",
        users: usersByEmail,
      });
    }

    return res.status(200).json({
      status: "no-results-found",
      users: [],
    });
  } catch (error) {
    console.log("Error from userController's searchUsers", error);
    return res.status(500).json({
      status: "failed",
      users: [],
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        referenceId: id,
      },
      data
    ).select({
      profilePicture: 1,
    });

    if (!updatedUser) {
      return res.status(200).json({
        status: "failed",
      });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error from userController's updateUser", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

const fetchInvestmentMadeUnderUser = async (req, res) => {
  try {
    const { id } = req.params;

    const investments = await InvestmentEntry.find({
      underId: id,
    });

    if (!investments) {
      return res.status(200).json({
        status: "failed",
        investment: null,
      });
    }

    let rightBusiness = 0;
    let leftBusiness = 0;

    for (const entry of investments) {
      if (entry.side === "Left") {
        leftBusiness += entry.amount;
      } else {
        rightBusiness += entry.amount;
      }
    }

    return res.status(200).json({
      status: "success",
      investment: {
        left: leftBusiness,
        right: rightBusiness,
      },
    });
  } catch (error) {
    console.log("Error from userController's updateUser", error);
    return res.status(500).json({
      status: "failed",
      investment: null,
    });
  }
};

module.exports = {
  activateId,
  fetchEarnings,
  fetchUsersJoinedThisMonth,
  upgradePlan,
  searchUsers,
  updateUser,
  fetchInvestmentMadeUnderUser,
};
