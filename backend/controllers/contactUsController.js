const ContactQuery = require("../models/ContactQuery");

const getContactQUeries = async (req, res) => {
  try {
    const queries = await ContactQuery.find({});

    if (!queries) {
      return res.status(200).json({
        status: "failed",
        queries: null,
      });
    }

    return res.status(200).json({
      status: "success",
      queries: queries,
    });
  } catch (error) {
    console.log("Error occured at contactUsController's addContactQuery");
    return res.status(500).json({
      status: "failed",
      queries: null,
    });
  }
};

const addContactQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }
    const query = await ContactQuery.create({
      email: email,
      name: name,
      message: message,
    });
    if (!query) {
      return res.status(200).json({
        status: "failed",
      });
    }
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error occured at contactUsController's addContactQuery");
    return res.status(200).json({
      status: "failed",
    });
  }
};

module.exports = { addContactQuery, getContactQUeries };
