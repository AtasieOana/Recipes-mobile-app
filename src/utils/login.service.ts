import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// sign up with email and password and save user data in Firestore
export const signUpWithEmailAndPasswordAndSaveUserData = async (
  email: any,
  password: any
) => {
  try {
    // check if user is already registered
    const userRef = doc(db, "users", email);
    const userDocs = await getDoc(userRef);

    if (userDocs.exists()) {
      // user with this email already exists
      return null;
    }

    // create new user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = { email: user.email, uid: user.uid };
    await setDoc(userRef, userData);

    return userCredential;
  } catch (error) {
    console.log(error);
  }
};

// sign in with email and password
export const signInUserWithEmailAndPassword = async (
  email: any,
  password: any
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
