const JoiningRequest = require("../models/JoinRequests");
const User = require("../models/User");

const { addInvestmentEntry } = require("../controllers/investmentController");

const {
  addDirectIncome,
  checkRewardIncomeEligibility,
} = require("../controllers/incomeCalculatorController");

const { addDailyClubEntry } = require("../controllers/dailyClubController");

const getJoiningRequests = async (req, res) => {
  try {
    const joiningRequests = await JoiningRequest.find({});

    if (!joiningRequests) {
      return res.status(200).json({
        status: "failed",
        joiningRequests: null,
      });
    }
    return res.status(200).json({
      status: "success",
      joiningRequests: joiningRequests,
    });
  } catch (error) {
    console.log(
      "Error from joiningRequestsController's getJoiningRequests:",
      error
    );
    return res.status(500).json({
      status: "failed",
      joiningRequests: null,
    });
  }
};

const addJoiningRequests = async (req, res) => {
  try {
    const { amount, usdtTrcId, name, recieptKey, referenceId } = req.body;

    console.log(req.body);

    if (!amount || !usdtTrcId || !recieptKey || !name) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        joiningRequest: null,
      });
    }

    const joiningRequest = await JoiningRequest.create({
      name: name,
      recieptKey: recieptKey,
      userReferenceId: referenceId,
      amount: amount,
      usdtTrcId: usdtTrcId,
    });

    if (!joiningRequest) {
      return res.status(200).json({
        status: "failed",
        joiningRequest: null,
      });
    }

    return res.json({
      status: "success",
      joiningRequest: joiningRequest,
    });
  } catch (error) {
    console.log(
      "Error from joiningRequestsController's addJoiningRequests:",
      error
    );
    return res.status(500).json({
      status: "failed",
      joiningRequests: null,
    });
  }
};

const acceptJoiningRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { referenceId } = req.query;

    if (!id || !referenceId) {
      return res.status(200).json({
        status: "invalid-id-sent",
      });
    }

    let parentUserReferenceId = null;
    let parentUserId = null;
    let parentUserPlan = null;
    let parentUserDownline = null;
    let parentUserDatabaseId = null;

    const acceptedJoiningRequest = await JoiningRequest.findByIdAndUpdate(
      id,
      {
        status: "accepted",
      },
      { new: true }
    ).select({
      status: 1,
    });

    if (!acceptedJoiningRequest) {
      return res.status(200).json({
        status: "invalid-id-sent",
      });
    }

    const updatedUser = await User.findOne({
      referenceId: referenceId,
    }).select({
      underId: 1,
      planType: 1,
      underId: 1,
      side: 1,
    });

    parentUserId = updatedUser.underId;
    updatedUser.planType = "starter";
    await updatedUser.save();

    if (!updatedUser) {
      return res.status(200).json({
        status: "updating-user-failed",
      });
    }

    //calculate and add direct income
    if (parentUserId) {
      await addDirectIncome(parentUserId, "starter");

      const parentUser = await User.findOne({
        referenceId: parentUserId,
      }).select({ direct: 1, planType: 1, downline: 1, referenceId: 1 });

      parentUserPlan = parentUser.planType;
      parentUserDownline = parentUser.downline;
      parentUserDatabaseId = parentUser._id;
      parentUserReferenceId = parentUser.referenceId;

      parentUser.direct += 1;
      await parentUser.save();
    }

    //add daily club entry
    const isDailyClubEntryCreated = await addDailyClubEntry(
      referenceId,
      "starter"
    );

    if (!isDailyClubEntryCreated) {
      console.log("Failed to create DailyClubEntry");
    }

    await checkRewardIncomeEligibility(updatedUser.underId, 10);

    //add investment entry
    const isInvestMentEntryMade = await addInvestmentEntry(
      referenceId,
      updatedUser.underId,
      10,
      updatedUser.side
    );

    if (!isInvestMentEntryMade) {
      console.log("Failed to create investment entry");
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(
      "Error from joiningRequestsController's acceptJoiningRequest:",
      error
    );
    return res.status(500).json({
      status: "failed",
    });
  }
};

const declineJoiningRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({
        status: "invalid-id-sent",
      });
    }

    const declinedRequest = await JoiningRequest.findByIdAndUpdate(
      id,
      {
        status: "declined",
      },
      { new: true }
    ).select({});

    if (!declinedRequest) {
      return res.status(200).json({
        status: "invalid-id-sent",
      });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(
      "Error from joiningRequestsController's declineJoiningRequest:",
      error
    );
    return res.status(500).json({
      status: "failed",
    });
  }
};

module.exports = {
  getJoiningRequests,
  addJoiningRequests,
  acceptJoiningRequest,
  declineJoiningRequest,
};
