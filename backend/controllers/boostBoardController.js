const User = require("../models/User");
const Earning = require("../models/Earning");

const {
  BoostBoardRewards,
  JoiningRequirements,
} = require("../constants/boostBoard");
const BoostBoardMember = require("../models/BoostBoardMember");

const getBoostBoardSide = async () => {
  try {
    const lastChild = await BoostBoardMember.findOne()
      .sort({ createdAt: -1 })
      .select({ side: 1 });

    let resultSide = "";

    if (!lastChild) {
      resultSide = "Left";
      return resultSide;
    }

    if (lastChild.side === "Left") {
      resultSide = "Right";
    } else {
      resultSide = "Left";
    }
    return resultSide;
  } catch (error) {
    console.log("Error from boostBoardControllers' getBoostBoardSide", error);
  }
};

const joinBoostBoard = async (req, res) => {
  try {
    const { amount, referenceId, name } = req.body;

    if (!amount || !referenceId || !name) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }

    let side = await getBoostBoardSide();

    const boostBoardEntry = await BoostBoardMember.create({
      amount,
      referenceId,
      side,
      name,
    });

    if (!boostBoardEntry) {
      return res.status(200).json({
        status: "failed",
      });
    }

    const existingUser = await User.findOne({
      referenceId: referenceId,
    }).select({
      isEligibleToJoinBoostBoard: 1,
      balance: 1,
    });

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
      });
    }

    existingUser.isEligibleToJoinBoostBoard = false;
    existingUser.balance -= parseInt(amount, 10);
    await existingUser.save();

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error from boostBoardControllers' joinBoostBoard", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

const getBoostBoardEntries = async (req, res) => {
  try {
    const boostBoardEntries = await BoostBoardMember.find({});
    if (!boostBoardEntries) {
      return res.status(200).json({
        status: "failed",
        entries: null,
      });
    }

    return res.status(200).json({
      status: "success",
      entries: boostBoardEntries,
    });
  } catch (error) {
    console.log(
      "Error from boostBoardControllers' getBoostBoardEntries",
      error
    );
    return res.status(500).json({
      status: "failed",
      entries: null,
    });
  }
};

const rewardBoostBoardAmount = async (req, res) => {
  try {
    const { amount, referenceId } = req.body;

    if (!amount || !referenceId) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }

    const updatedEarning = await Earning.findOne({
      referenceId: referenceId,
    }).select({
      boost: 1,
    });

    const existingUser = await User.findOne({
      referenceId: referenceId,
    }).select({
      isEligibleToJoinBoostBoard: 1,
      balance: 1,
    });

    if (!updatedEarning || !existingUser) {
      return res.status(200).json({
        status: "user-not-found",
      });
    }

    updatedEarning.boost = updatedEarning.boost + parseInt(amount, 10);

    existingUser.balance = existingUser.balance + parseInt(amount, 10);
    existingUser.isEligibleToJoinBoostBoard = true;

    await existingUser.save();
    await updatedEarning.save();

    await BoostBoardMember.findOneAndDelete({
      referenceId: referenceId,
    });

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(
      "Error from boostBoardControllers' rewardBoostBoardAmount",
      error
    );
    return res.status(500).json({
      status: "failed",
      entries: null,
    });
  }
};

module.exports = {
  joinBoostBoard,
  getBoostBoardEntries,
  rewardBoostBoardAmount,
};
