import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase with your Firebase config (replace this with your actual config)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  // Add other config options as needed
};

firebase.initializeApp(firebaseConfig);

export async function verifyPhoneNumber(req: Request, res: Response) {
  try {
    const phoneNumber: string = req.body.phoneNumber;
    const verificationCode: string = req.body.verificationCode;

    let user: IUser | null;

    // Check if the user exists in the database based on the phone number
    user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      // New user, send OTP for registration

      // Generate a verification code
      const code = Math.floor(100000 + Math.random() * 900000);

      // Send the verification code via Firebase OTP to the user's phone number
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); // Replace with your recaptcha container ID
      const phoneNumberWithCountryCode = `+1${phoneNumber}`; // Replace with your country code if needed

      await firebase.auth().signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier);

      // Save the verification code in the user document in the database
      const newUser: IUser = {
        phoneNumber,
        verificationCode: code,
      };

      user = await UserModel.create(newUser);

      return res.status(201).json(user);
    } else {
      // Existing user, verify OTP for authentication

      // Verify the OTP entered by the user
      const verificationId = user.verificationCode; // Get the verification code from the user document in the database
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);

      // Sign in with the phone number credential
      const userCredential = await firebase.auth().signInWithCredential(credential);

      if (!userCredential || !userCredential.user) {
        return res.status(401).json({ error: 'Invalid verification code' });
      }

      // You can generate an access token or session here and send it in the response
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error verifying phone number:', error);
    return res.status(500).json({ error: 'Failed to verify phone number' });
  }
}
