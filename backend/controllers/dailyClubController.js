const DailyClubEntry = require("../models/DailyClubEntry");
const Earninng = require("../models/Earning");
const User = require("../models/User");

const {
  DailyClubDeposit,
  RewardDistribution,
  ActiveUsersRequirement,
} = require("../constants/dailyClub");
const Earning = require("../models/Earning");

const addDailyClubEntry = async (userId, planType) => {
  try {
    if (!userId || !planType) {
      return false;
    }

    const depositAmount = DailyClubDeposit[planType];

    const entry = await DailyClubEntry.create({
      amount: depositAmount ?? 0,
      userReferenceId: userId,
      upgradedPlantype: planType,
    });

    if (!entry) {
      return false;
    }

    return entry;
  } catch (error) {
    console.log(
      "Error occured at dailyClubController's addDailyClubEntry",
      error
    );
    return false;
  }
};

const updateEarning = async (dailyClubIncome, plantype, referenceId) => {
  try {
    const earning = await Earning.findOne({
      referenceId: referenceId,
    });

    if (!earning) {
      console.log("No earnings found for user: ", referenceId);
      return;
    }

    if (plantype === "starter") {
      earning.dailyClubStarter += dailyClubIncome;
    }
    if (plantype === "basic") {
      earning.dailyClubBasic += dailyClubIncome;
    }
    if (plantype === "star") {
      earning.dailyClubStar += dailyClubIncome;
    }

    if (plantype === "superstar") {
      earning.dailyClubSuperstar += dailyClubIncome;
    }
    if (plantype === "prime") {
      earning.dailyClubPrime += dailyClubIncome;
    }
    if (plantype === "royal") {
      earning.dailyClubRoyal += dailyClubIncome;
    }

    earning.dailyClub += dailyClubIncome;
    await earning.save();
  } catch (error) {
    return false;
  }
};

const distributeUsersIncome = async (
  users,
  amount,
  plantype,
  totalUsersCount
) => {
  if (users.length === 0 || amount === 0 || totalUsersCount === 0) {
    return false;
  }
  try {
    for (const user of users) {
      const eachUser = amount / totalUsersCount;

      if (!user) {
        console.log("Failed to fetch existingUser for user: ", user);
        continue;
      }

      if (user.directUsersActive < ActiveUsersRequirement[plantype]) {
        console.log("distributeIncomeNotEligibke");
        continue;
      }

      await updateEarning(eachUser, plantype, user.referenceId);

      user.balance += eachUser;
      await user.save();
    }

    return true;
  } catch (error) {
    console.log(
      "Error occurred at dailyClubController's distributeStarterIncome",
      error
    );
    return false;
  }
};

const distributeIncome = async () => {
  try {
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // To execute at today's time
    // const yesterdayStart = new Date();
    // yesterdayStart.setDate(yesterdayStart.getDate());
    // yesterdayStart.setHours(0, 0, 0, 0);

    // const yesterdayEnd = new Date();
    // yesterdayEnd.setDate(yesterdayEnd.getDate());
    // yesterdayEnd.setHours(23, 59, 59, 999);

    const validDailyClubEntries = await DailyClubEntry.find({
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    });

    const allUsers = await User.find({}).select({
      referenceId: 1,
      directUsersActive: 1,
      balance: 1,
      planType: 1,
    });

    let totalBeforeSorting = 0;

    if (!validDailyClubEntries) {
      return false;
    }

    for (const entry of validDailyClubEntries) {
      const collectedAmount = entry.amount;
      totalBeforeSorting += collectedAmount;
    }

    const total = totalBeforeSorting * 0.4;

    // console.log("validDailyClubEntries");
    // console.log(validDailyClubEntries);

    // console.log("totalBeforeSorting");
    // console.log(totalBeforeSorting);

    // console.log("total");
    // console.log(total);

    const starterAmount = (total * RewardDistribution.starter) / 100;
    const basicAmount = (total * RewardDistribution.basic) / 100;
    const starAmount = (total * RewardDistribution.star) / 100;
    const superStarAmount = (total * RewardDistribution.superstar) / 100;
    const primeAmount = (total * RewardDistribution.prime) / 100;
    const royalAmount = (total * RewardDistribution.royal) / 100;

    const starterUsers = [];
    const basicUsers = [];
    const starUsers = [];
    const superStarUsers = [];
    const primeUsers = [];
    const royalUsers = [];
    const totalUsers = [];

    //currently not being used
    for (const currentUser of allUsers) {
      if (
        currentUser.directUsersActive >= 2 &&
        currentUser.planType !== "inactive"
      ) {
        starterUsers.push(currentUser);
      }

      if (
        currentUser.directUsersActive >= 4 &&
        currentUser.planType !== "inactive" &&
        currentUser.planType !== "starter"
      ) {
        basicUsers.push(currentUser);
      }

      if (
        currentUser.directUsersActive >= 6 &&
        currentUser.planType !== "inactive" &&
        currentUser.planType !== "starter" &&
        currentUser.planType !== "basic"
      ) {
        starUsers.push(currentUser);
      }

      if (
        currentUser.directUsersActive >= 8 &&
        currentUser.planType !== "inactive" &&
        currentUser.planType !== "starter" &&
        currentUser.planType !== "basic" &&
        currentUser.planType !== "star"
      ) {
        superStarUsers.push(currentUser);
      }

      if (
        currentUser.directUsersActive >= 10 &&
        currentUser.planType !== "inactive" &&
        currentUser.planType !== "starter" &&
        currentUser.planType !== "basic" &&
        currentUser.planType !== "star" &&
        currentUser.planType !== "superstar"
      ) {
        primeUsers.push(currentUser);
      }

      if (
        currentUser.directUsersActive >= 12 &&
        currentUser.planType !== "inactive" &&
        currentUser.planType !== "starter" &&
        currentUser.planType !== "basic" &&
        currentUser.planType !== "star" &&
        currentUser.planType !== "superstar" &&
        currentUser.planType !== "prime"
      ) {
        royalUsers.push(currentUser);
      }
    }

    // console.log("royalUsers");
    // console.log(royalUsers);

    //all users getting eigible for dailyCLubEntries
    for (const user of allUsers) {
      totalUsers.push(user);
    }

    const isStarterUsersIncomeDistributed = await distributeUsersIncome(
      starterUsers,
      starterAmount,
      "starter",
      starterUsers.length
    );

    if (!isStarterUsersIncomeDistributed) {
      console.log("False from isStarterUsersIncomeDistributed");
    }

    const isBasicUsersIncomeDistributed = await distributeUsersIncome(
      basicUsers,
      basicAmount,
      "basic",
      basicUsers.length
    );

    if (!isBasicUsersIncomeDistributed) {
      console.log("False from isBasicUsersIncomeDistributed");
    }

    const isStarUsersIncomeDistributed = await distributeUsersIncome(
      starUsers,
      starAmount,
      "star",
      starUsers.length
    );

    if (!isStarUsersIncomeDistributed) {
      console.log("False from isStarUsersIncomeDistributed");
    }

    const isSuperStarUsersIncomeDistributed = await distributeUsersIncome(
      superStarUsers,
      superStarAmount,
      "superstar",
      superStarUsers.length
    );

    if (!isSuperStarUsersIncomeDistributed) {
      console.log("False from isSuperStarUsersIncomeDistributed");
    }

    const isPrimeUsersIncomeDistributed = await distributeUsersIncome(
      primeUsers,
      primeAmount,
      "prime",
      primeUsers.length
    );

    if (!isPrimeUsersIncomeDistributed) {
      console.log("False from isPrimeUsersIncomeDistributed");
    }

    const isRoyalUsersIncomeDistributed = await distributeUsersIncome(
      royalUsers,
      royalAmount,
      "royal",
      royalUsers.length
    );

    if (!isRoyalUsersIncomeDistributed) {
      console.log("False from isRoyalUsersIncomeDistributed");
    }
  } catch (error) {
    console.log(
      "Error occured at dailyClubController's distributeIncome",
      error
    );
    return false;
  }
};

module.exports = { addDailyClubEntry, distributeIncome };
