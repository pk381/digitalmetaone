const InvestmentEntry = require("../models/InvestmentEntry");

const addInvestmentEntry = async (userId, underId, amount, side) => {
  try {
    if (!userId || !underId || !amount) {
      return false;
    }

    const createdInvestmentEntry = await InvestmentEntry.create({
      amount,
      underId,
      userId,
      side: side ?? "",
    });

    if (!createdInvestmentEntry) {
      console.log("Failed to create investment entry");
      return false;
    }

    return true;
  } catch (error) {
    console.log(
      "Error occured atto create investmentController's addInvestmentEntry",
      error
    );
    return false;
  }
};

const getTotalInvestment = async (req, res) => {
  try {
    const investmentEntries = await InvestmentEntry.find({}).select({
      amount: 1,
      createdAt: 1,
    });

    if (!investmentEntries) {
      return res.status(200).json({
        status: "failed",
        totalInvestment: null,
      });
    }

    let totalInvestment = 0;
    let totalInvestmentThisMonth = 0;
    let totalInvestmentToday = 0;

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const investmentEntriesThisMonth = investmentEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      entryDate.setUTCHours(0, 0, 0, 0);

      return entryDate.getMonth() === currentDate.getMonth();
    });

    const investmentEntriesToday = investmentEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= currentDate;
    });

    for (const entry of investmentEntries) {
      totalInvestment += entry.amount;
    }

    for (const entry of investmentEntriesThisMonth) {
      totalInvestmentThisMonth += entry.amount;
    }

    for (const entry of investmentEntriesToday) {
      totalInvestmentToday += entry.amount;
    }

    return res.status(200).json({
      status: "success",
      totalInvestment: totalInvestment,
      totalInvestmentThisMonth: totalInvestmentThisMonth,
      totalInvestmentToday: totalInvestmentToday,
    });
  } catch (error) {
    console.log(
      "Error occurred at investmentController's getTotalInvestment",
      error
    );
    return res.status(500).json({
      status: "failed",
      totalInvestment: null,
    });
  }
};

module.exports = {
  addInvestmentEntry,
  getTotalInvestment,
};
