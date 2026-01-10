import express from 'express';
import admin from '../config/firebaseAdmin.js';
import { verifyToken } from '../middleware/authMiddleware.js';

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
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Verify OTP and get ID token
    res.json({
      message: 'OTP verified successfully',
      idToken: 'id-token-here',
      refreshToken: 'refresh-token-here',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user (protected route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    res.json({
      message: 'User data retrieved',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
