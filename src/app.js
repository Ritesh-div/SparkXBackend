const express = require("express");
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
// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ag9bxwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
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
