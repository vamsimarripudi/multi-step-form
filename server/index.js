const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// -----------------------------
// DB Connection
// -----------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

// -----------------------------
// Schema (fix: use new Schema())
// -----------------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  plan: { type: String },
  addOns: [String],
  uniqueId: {
    type: String,
    unique: true,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

// -----------------------------
// Routes
// -----------------------------

// POST - Save form data
app.post("/formdata", async (req, res) => {
  
  try {
    const { name, email, phone, plan, addOns, uniqueId } = req.body;

    // basic validation
    if (!name || !email || !phone || !uniqueId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = new User({
      name,
      email,
      phoneNumber: phone,
      plan,
      addOns,
      uniqueId
    });

    await user.save();

    res.status(201).json({
      message: "User data saved successfully",
      uniqueId
    });

  } catch (err) {
    // handle duplicate uniqueId
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Health check
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

//-----------------------------
// Get the Registered Users List
//-----------------------------

app.get("/users",async(req,res)=> {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({ message: "Server error" });
    }
})

// -----------------------------
// Start server AFTER DB connect
// -----------------------------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});