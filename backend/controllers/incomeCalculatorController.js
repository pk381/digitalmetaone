const Earning = require("../models/Earning");
const User = require("../models/User");

const {
  DirectIncomeRewards,
  AutopoolIncomeRewards,
  LevelIncomeRewards,
} = require("../constants/icomeRewards");
const InvestmentEntry = require("../models/InvestmentEntry");

const {
  LeftSideTargets,
  RewardAmounts,
  RightSideTargets,
} = require("../constants/rewardIncomeRewards");

const addDirectIncome = async (referenceId, planType) => {
  try {
    const amount = DirectIncomeRewards[planType];
    const earning = await Earning.findOne({
      referenceId: referenceId,
    });
    if (!earning) {
      return null;
    }
    const existingDirectIncome = earning?.direct;
    const data = {
      direct: existingDirectIncome + amount,
    };
    const response = await Earning.findOneAndUpdate(
      {
        referenceId: referenceId,
      },
      data,
      {
        new: true,
      }
    );
    if (!response) {
      return false;
    }
    const corrospongingUserId = earning?.userId;
    const corrospongingUser = await User.findById(corrospongingUserId);
    if (!corrospongingUser) {
      return false;
    }
    const updatedCorrospongingUser = await User.findByIdAndUpdate(
      corrospongingUserId,
      {
        balance: corrospongingUser?.balance + amount,
      }
    );
    if (!updatedCorrospongingUser) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Error occured at  userController's addDirectIncome", error);
    return false;
  }
};

const checkAutopoolIncomeEligibility = async (downline, currentPlan) => {
  try {
    if (currentPlan === "inactive") {
      return 0;
    }

    console.log(downline);

    let directUsers = 0;

    await Promise.all(
      downline.map(async (memberId) => {
        const user = await User.findById(memberId).select({
          planType: 1,
        });

        if (user.planType === currentPlan) {
          ++directUsers;
        }
      })
    );

    return directUsers;
  } catch (error) {
    console.log(
      "Error occured at  userController's checkAutopoolIncomeEligibility",
      error
    );
    return null;
  }
};

const addAutopoolIncome = async (userId, planType, directUsers) => {
  try {
    const rewardAmount = AutopoolIncomeRewards[planType][directUsers];

    const userEarning = await Earning.findOne({
      userId: userId,
    }).select({
      autoPool: 1,
    });

    if (!userEarning) {
      return false;
    }

    const updatedEarning = await Earning.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        autoPool: userEarning?.autoPool + rewardAmount,
      }
    );

    if (!updatedEarning) {
      return false;
    }

    const user = await User.findById(userId).select({
      balance: 1,
    });

    if (!user) {
      return false;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        balance: user.balance + rewardAmount,
      },
      { new: true }
    ).select({
      referenceId: 1,
      balance: 1,
    });

    console.log(updatedUser);

    if (!updatedUser) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error occured at  userController's addAutopoolIncome", error);
    return false;
  }
};

const findHierarchicalParents = async (userId) => {
  try {
    const depth = 10;
    let parents = [];

    if (!userId) {
      return false;
    }

    const users = await User.find({}).select({
      referenceId: 1,
      underId: 1,
    });

    const findParent = (currentUserId, currentDepth) => {
      const currentUser = users.find(
        (user) => user.referenceId === currentUserId
      );

      console.log(currentUser);

      if (currentDepth === 0 || !currentUser) {
        return;
      }

      const parentId = currentUser.underId;

      if (parentId !== null) {
        parents.push(parentId);
        findParent(parentId, currentDepth - 1);
      }
    };

    findParent(userId, depth);
    return parents;
  } catch (error) {
    console.log("Error from treeController's findHierarchicalParents", error);
    return false;
  }
};

const addLevelIncome = async (userId, planType) => {
  try {
    console.log("reached inside addlevelIncome");
    console.log(planType);

    const rewardAmount = LevelIncomeRewards[planType];
    const parents = await findHierarchicalParents(userId);

    console.log(rewardAmount);

    if (!parents) {
      return false;
    }

    await Promise.all(
      parents.map(async (parent) => {
        const user = await User.findOne({
          referenceId: parent,
        }).select({
          referenceId: 1,
          balance: 1,
        });

        if (!user) {
          return false;
        }

        const userEarning = await Earning.findOne({
          referenceId: user.referenceId,
        }).select({
          level: 1,
        });

        if (!userEarning) {
          return false;
        }

        await Earning.findOneAndUpdate(
          {
            referenceId: user.referenceId,
          },
          {
            level: userEarning.level + rewardAmount,
          }
        ).select({});

        await User.findOneAndUpdate(
          {
            referenceId: user.referenceId,
          },
          {
            balance: user.balance + rewardAmount,
          }
        ).select({});
      })
    );
    return true;
  } catch (error) {
    console.log("Error occured at  incomeCalculator's addLevelIncome", error);
    return false;
  }
};

const addRewardIncome = async (referenceId, amount) => {
  try {
    if (!referenceId || !amount) {
      throw new Error("Invalid input parameters");
    }
    const updatedEarning = await Earning.findOneAndUpdate(
      { referenceId: referenceId },
      { $inc: { reward: amount } },
      { new: true }
    );

    if (!updatedEarning) {
      throw new Error("Earning record not found");
    }

    const updatedUser = await User.findOneAndUpdate(
      { referenceId: referenceId },
      { $inc: { balance: amount } },
      { new: true }
    ).select({
      balance: 1,
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return true;
  } catch (error) {
    console.log(
      "Error occurred at incomeCalculator's addRewardIncome",
      error.message
    );
    return false;
  }
};

const checkLeftSideEligibility = (leftInvestment, currentAmount) => {
  let rewardAmount = 0;

  if (
    leftInvestment > LeftSideTargets[0] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[0]
  ) {
    rewardAmount += RewardAmounts[0];
  } else if (
    leftInvestment > LeftSideTargets[1] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[1]
  ) {
    rewardAmount += RewardAmounts[1];
  } else if (
    leftInvestment > LeftSideTargets[2] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[2]
  ) {
    rewardAmount += RewardAmounts[2];
  } else if (
    leftInvestment > LeftSideTargets[3] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[3]
  ) {
    rewardAmount += RewardAmounts[3];
  } else if (
    leftInvestment > LeftSideTargets[4] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[4]
  ) {
    rewardAmount += RewardAmounts[4];
  } else if (
    leftInvestment > LeftSideTargets[5] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[5]
  ) {
    rewardAmount += RewardAmounts[5];
  } else if (
    leftInvestment > LeftSideTargets[6] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[6]
  ) {
    rewardAmount += RewardAmounts[6];
  } else if (
    leftInvestment > LeftSideTargets[7] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[7]
  ) {
    rewardAmount += RewardAmounts[7];
  } else if (
    leftInvestment > LeftSideTargets[8] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[8]
  ) {
    rewardAmount += RewardAmounts[8];
  } else if (
    leftInvestment > LeftSideTargets[9] &&
    (leftInvestment + currentAmount ?? 0) >= LeftSideTargets[9]
  ) {
    rewardAmount += RewardAmounts[9];
  }

  return rewardAmount;
};
const checkRightSideEligibility = (rightInvestment, currentAmount) => {
  let rewardAmount = 0;

  if (
    rightInvestment > RightSideTargets[0] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[0]
  ) {
    rewardAmount += RewardAmounts[0];
  } else if (
    rightInvestment > RightSideTargets[1] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[1]
  ) {
    rewardAmount += RewardAmounts[1];
  } else if (
    rightInvestment > RightSideTargets[2] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[2]
  ) {
    rewardAmount += RewardAmounts[2];
  } else if (
    rightInvestment > RightSideTargets[3] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[3]
  ) {
    rewardAmount += RewardAmounts[3];
  } else if (
    rightInvestment > RightSideTargets[4] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[4]
  ) {
    rewardAmount += RewardAmounts[4];
  } else if (
    rightInvestment > RightSideTargets[5] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[5]
  ) {
    rewardAmount += RewardAmounts[5];
  } else if (
    rightInvestment > RightSideTargets[6] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[6]
  ) {
    rewardAmount += RewardAmounts[6];
  } else if (
    rightInvestment > RightSideTargets[7] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[7]
  ) {
    rewardAmount += RewardAmounts[7];
  } else if (
    rightInvestment > RightSideTargets[8] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[8]
  ) {
    rewardAmount += RewardAmounts[8];
  } else if (
    rightInvestment > RightSideTargets[9] &&
    (rightInvestment + currentAmount ?? 0) >= RightSideTargets[9]
  ) {
    rewardAmount += RewardAmounts[9];
  }

  return rewardAmount;
};

const checkRewardIncomeEligibility = async (referenceId, currentAmount) => {
  try {
    if (!referenceId || !currentAmount) {
      return console.log("referenceId || currentAmount missing");
    }

    const eligibleInvestmentEntries = await InvestmentEntry.find({
      underId: referenceId,
    });

    if (!eligibleInvestmentEntries || eligibleInvestmentEntries.length === 0) {
      return console.log("no eligibleInvestmentEntries found");
    }

    let rightInvestment = 0;
    let leftInvestment = 0;

    for (const entry of eligibleInvestmentEntries) {
      if (entry.side === "Left") {
        leftInvestment += entry.amount;
      } else if (entry.side === "Right") {
        rightInvestment += entry.amount;
      }
    }

    // If left or right income is above the given threshold, return the amount that needs to be rewarded to the user
    const leftRewardAmount = checkLeftSideEligibility(
      leftInvestment,
      currentAmount
    );
    const rightRewardAmount = checkRightSideEligibility(
      rightInvestment,
      currentAmount
    );

    console.log("rightRewardAmount");
    console.log(rightRewardAmount);

    console.log("leftInvestment");
    console.log(leftInvestment);

    // If there's a reward amount for the left side, add earnings to the referenceId user left
    if (leftRewardAmount) {
      console.log("leftRewardAmount exists");
      console.log(leftRewardAmount);
      await addRewardIncome(referenceId, leftRewardAmount);
    }

    if (rightRewardAmount) {
      console.log("rightRewardAmount exists");
      console.log(rightRewardAmount);
      await addRewardIncome(referenceId, rightRewardAmount);
    }

    return true;
  } catch (error) {
    console.log(
      "Error occurred at incomeCalculator's checkRewardIncomeEligibility",
      error
    );
    return false;
  }
};

module.exports = {
  addDirectIncome,
  addAutopoolIncome,
  checkAutopoolIncomeEligibility,
  addLevelIncome,
  checkRewardIncomeEligibility,
  addRewardIncome,
};
