const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const promResponseRoutes = require("./routes/promResponseRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: `${process.env.CLIENT_URL || "http://localhost:3000"}`,
  credentials: true,
}));

console.log("mongoDB URI:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment variables");
  process.exit(1);
}


// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
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
