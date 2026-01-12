import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;

try {
  const envJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!envJson) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable not found');
  }
  
  serviceAccount = JSON.parse(envJson);
  
  if (!serviceAccount.project_id) {
    throw new Error('Service account object must contain a "project_id" property');
  }
} catch (error) {
  console.error('Invalid Firebase service account JSON:', error.message);
  console.error('Raw env value:', process.env.FIREBASE_SERVICE_ACCOUNT?.substring(0, 100));
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
