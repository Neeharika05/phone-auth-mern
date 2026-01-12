import express from 'express';
import admin from '../config/firebaseAdmin.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Send OTP to phone number
router.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Firebase will handle OTP sending
    res.json({
      message: 'OTP sent successfully',
      phoneNumber,
      sessionInfo: 'session-info-here',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP and sign in
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp, uid } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Verify OTP and get ID token
    // In production, integrate with Firebase phone auth
    
    // Save user to MongoDB
    let user = await User.findOne({ uid: uid || phoneNumber });
    
    if (!user) {
      user = new User({
        uid: uid || phoneNumber,
        phoneNumber,
      });
      await user.save();
      console.log('✅ New user created in MongoDB:', user);
    } else {
      console.log('ℹ️ User already exists in MongoDB:', user);
    }

    res.json({
      message: 'OTP verified successfully',
      idToken: 'id-token-here',
      refreshToken: 'refresh-token-here',
      user: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user (protected route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User data retrieved',
      user: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
