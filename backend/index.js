require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const { PORT, MONGODB_URL } = require("./constants/database");

const { distributeIncome } = require("./controllers/dailyClubController");

const allowedOrigins = [
  "https://bitforce.space",
  "https://www.bitforce.space",
  "https://production.d39l3p537lng75.amplifyapp.com",
  "http://localhost:3000"
];

const app = express();
const PORT_NO = PORT || 5000;
const MONGODB_URI = MONGODB_URL;

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/tree", require("./routes/treeRoutes"));

app.use("/api/members", require("./routes/membersRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/contact-us", require("./routes/contactQueryRoutes"));

app.use("/api/files", require("./routes/fileUploadRoutes"));

app.use("/api/joining-requests", require("./routes/joinRequestsRoute"));

app.use("/api/boost-board", require("./routes/boostBoardRoutes"));

app.use("/api/investment", require("./routes/investmentRoutes"));

const job = schedule.scheduleJob("5 0 * * *", async () => {
  try {
    console.log("Task executed at 12:05 AM daily!");

    const result = await distributeIncome();

    if (result) {
      console.log("Daily club income distributed successfully.");
    } else {
      console.log("Failed to distribute daily club income.");
    }
  } catch (error) {
    console.error("Error occurred during the scheduled task:", error);
  }
});

mongoose.connect(MONGODB_URI, {}).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT_NO);
});
