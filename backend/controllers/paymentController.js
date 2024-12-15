const WithdrawalRequest = require("../models/WithdrawalRequest");
const User = require("../models/User");

const createWithdrawalRequest = async (req, res) => {
  try {
    const { amount, address, name, userId } = req.body;

    if (!amount || !address) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        withdrawalRequest: null,
      });
    }

    const withdrawalReq = await WithdrawalRequest.create({
      amount: amount,
      cryptoId: address,
      name: name,
      userId: userId,
    });

    if (!withdrawalReq) {
      return res.status(200).json({
        status: "failed",
        withdrawalRequest: null,
      });
    }

    const updatedEarning = await User.findByIdAndUpdate(userId, {
      $inc: { balance: -amount, withdrawals: amount },
    });

    if (!updatedEarning) {
      conosle.log("Unable to update user balance");
    }

    return res.status(200).json({
      status: "success",
      withdrawalRequest: withdrawalReq,
    });
  } catch (error) {
    console.log(
      "Error occured at paymentController's createWithdrawalRequest:",
      error
    );
    return res.status(500).json({
      status: "failed",
      withdrawalRequest: null,
    });
  }
};

const getAllWithdrawals = async (req, res) => {
  try {
    const withDrawalRequests = await WithdrawalRequest.find({});

    if (!withDrawalRequests) {
      return res.status(200).json({
        status: "failed",
        withdrawalRequests: null,
      });
    }

    return res.status(200).json({
      status: "success",
      withdrawalRequests: withDrawalRequests,
    });
  } catch (error) {
    console.log(
      "Error occured at paymentController's getAllWithdrawals:",
      error
    );
    return res.status(500).json({
      status: "failed",
      withdrawalRequests: null,
    });
  }
};

const getUserWiseWithdrawals = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({
        status: "useidnotfound",
        withdrawalRequests: null,
      });
    }

    const withDrawalRequests = await WithdrawalRequest.find({
      userId: id,
    });

    if (!withDrawalRequests) {
      return res.status(200).json({
        status: "failed",
        withdrawalRequests: null,
      });
    }

    return res.status(200).json({
      status: "success",
      withdrawalRequests: withDrawalRequests,
    });
  } catch (error) {
    console.log(
      "Error occured at paymentController's getUserWiseWithdrawals:",
      error
    );
    return res.status(500).json({
      status: "failed",
      withdrawalRequests: null,
    });
  }
};

const getTotalWithdrawals = async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalRequest.find({}).select({
      amount: 1,
      createdAt: 1,
    });

    if (!withdrawalRequests) {
      return res.status(200).json({
        status: "failed",
        totalWithdrawals: null,
      });
    }

    let totalWithdrawals = 0;
    let totalWithdrawalsThisMonth = 0;
    let totalWithdrawalsToday = 0;

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const withdrawalRequestsThisMonth = withdrawalRequests.filter((request) => {
      const requestDate = new Date(request.createdAt);
      return (
        requestDate >= currentDate &&
        requestDate.getMonth() === currentDate.getMonth()
      );
    });

    const withdrawalRequestsToday = withdrawalRequests.filter((request) => {
      const requestDate = new Date(request.createdAt);
      return requestDate >= currentDate;
    });

    for (const request of withdrawalRequests) {
      totalWithdrawals += request.amount;
    }

    for (const request of withdrawalRequestsThisMonth) {
      totalWithdrawalsThisMonth += request.amount;
    }

    for (const request of withdrawalRequestsToday) {
      totalWithdrawalsToday += request.amount;
    }

    return res.status(200).json({
      status: "success",
      totalWithdrawals: totalWithdrawals,
      totalWithdrawalsThisMonth: totalWithdrawalsThisMonth,
      totalWithdrawalsToday: totalWithdrawalsToday,
    });
  } catch (error) {
    console.log(
      "Error occurred at withdrawalController's getTotalWithdrawals",
      error
    );
    return res.status(500).json({
      status: "failed",
      totalWithdrawals: null,
    });
  }
};

const markWithdrawalComplete = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const updatedRequest = await WithdrawalRequest.findByIdAndUpdate(
      id,
      {
        status: "completed",
      },
      { new: true }
    ).select({
      status: 1,
    });

    if (!updatedRequest) {
      return res.status(200).json({
        status: "failed",
      });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
    });
  }
};

module.exports = {
  createWithdrawalRequest,
  getUserWiseWithdrawals,
  getAllWithdrawals,
  markWithdrawalComplete,
  getTotalWithdrawals
};
