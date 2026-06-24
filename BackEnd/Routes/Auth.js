const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");



const router = express.Router();

router.get(
  "/profile",
  auth,
  (req, res) => {
    res.json({
      message: "Protected route",
      user: req.user,
    });
  }
);

router.get("/", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.post("/register", async (req, res) => {
      console.log(req.body);
  try {
    const hashedPassword =
      await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const validPassword =
      await bcrypt.compare(
        req.body.password,
        admin.password
      );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;