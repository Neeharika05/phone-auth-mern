import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js";

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const handleSendOtp = async () => {
    setupRecaptcha();
    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    setConfirmation(result);
    console.log("OTP SENT");
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await confirmation.confirm(otp);
      const token = await res.user.getIdToken();
      const uid = res.user.uid;

      // 🔥 Save user in backend
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber,
          otp,
          uid,
        }),
      });

      const data = await response.json();
      console.log("✅ User saved in DB:", data.user);
      console.log("🔥 UID:", uid);
      console.log("🔥 TOKEN:", token);
    } catch (error) {
      console.error("❌ Error verifying OTP:", error);
    }
  };

  return (
    <>
      <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+91XXXXXXXXXX" />
      <button onClick={handleSendOtp}>Send OTP</button>

      <input onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
      <button onClick={handleVerifyOtp}>Verify</button>

      <div id="recaptcha-container"></div>
    </>
  );
}
