const User = require("../models/User");

const getMembersData = async (req, res) => {
  try {
    let totalMembers = 0;
    let activeMembers = 0;
    let inactiveMembers = 0;
    let notActiveInMonth = 0;
    let activeInMonth = 0;

    const membersData = await User.find({}).select({
      isActive: 1,
      createdAt: 1,
      planType: 1,
      referenceId: 1,
      name: 1,
      directUsersActive: 1,
    });

    totalMembers = membersData.length;

    membersData.forEach((member) => {
      let date = new Date();
      date = new Date(`${date.getFullYear()}/${date.getMonth()}/01`);

      if (member.planType === "inactive" || member.planType === "") {
        if (member.createdAt >= date && member.createdAt <= new Date()) {
          notActiveInMonth++;
        }
        inactiveMembers++;
      } else {
        if (member.createdAt >= date && member.createdAt <= new Date()) {
          activeInMonth++;
        }
        activeMembers++;
      }
    });

    res.status(200).json({
      message: "success",
      members: membersData,
      totalMembers: totalMembers,
      activeMembers: activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      activeInMonth: activeInMonth,
      notActiveInMonth: notActiveInMonth,
    });
  } catch (error) {
    console.log(
      "Error occured at membersController's getMembersCount: ",
      error
    );
    res.status(500).json({
      message: "failed",
      members: null,
      activeMembers: 0,
      inactiveMembers: 0,
      activeInMonth: 0,
      notActiveInMonth: 0,
    });
  }
};

const getMyTeamMembersData = async (req, res) => {
  try {
    const { id } = req.params;

    let totalMembers = 0;
    let activeMembers = 0;
    let inactiveMembers = 0;
    let notActiveInMonth = 0;
    let activeInMonth = 0;

    const membersData = await User.find({
      underId: id,
    }).select({
      isActive: 1,
      createdAt: 1,
      planType: 1,
      referenceId: 1,
      name: 1,
    });

    totalMembers = membersData.length;

    membersData.forEach((member) => {
      let date = new Date();
      date = new Date(`${date.getFullYear()}/${date.getMonth()}/01`);

      if (member.planType === "inactive" || member.planType === "") {
        if (member.createdAt >= date && member.createdAt <= new Date()) {
          notActiveInMonth++;
        }
        inactiveMembers++;
      } else {
        if (member.createdAt >= date && member.createdAt <= new Date()) {
          activeInMonth++;
        }
        activeMembers++;
      }
    });

    res.status(200).json({
      message: "success",
      members: membersData,
      totalMembers: totalMembers,
      activeMembers: activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      activeInMonth: activeInMonth,
      notActiveInMonth: notActiveInMonth,
    });
  } catch (error) {
    console.log(
      "Error occured at membersController's getMembersCount: ",
      error
    );
    res.status(500).json({
      message: "failed",
      members: null,
      activeMembers: 0,
      inactiveMembers: 0,
      activeInMonth: 0,
      notActiveInMonth: 0,
    });
  }
};

module.exports = { getMembersData, getMyTeamMembersData };
