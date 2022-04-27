import { User } from "firebase/auth";

export const isNewUser = (user: User) => {
  return user.metadata.creationTime === user.metadata.lastSignInTime;
};

export const FirebaseErrorMessages: { [code: string]: string } = {
  "auth/email-already-in-use":
    "This Email is already in use by another account.",
  "auth/requires-recent-login": "This action requires recent login.",
  "auth/invalid-phone-number": "The phone number you entered is incorrect.",
  "auth/invalid-verification-code": "The OTP you entered is incorrect."

};
