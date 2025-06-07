const express = require("express");
const mongoose = require("mongoose");
const promResponseRoutes = require("./routes/promResponseRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/SparkX", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/prompt-response", promResponseRoutes);

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
