import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/me", verifyToken, async (req, res) => {
  try {
    const { uid, phoneNumber } = req.user;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        phoneNumber,
      });
    }

    res.status(200).json({
      message: "User saved",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
