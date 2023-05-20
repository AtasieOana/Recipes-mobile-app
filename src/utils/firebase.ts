import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNHDqmxWfRGC-9xRv-xTf211811sPAISs",
  authDomain: "reactnativeproject-53f70.firebaseapp.com",
  projectId: "reactnativeproject-53f70",
  storageBucket: "reactnativeproject-53f70.appspot.com",
  messagingSenderId: "73935489496",
  appId: "1:73935489496:web:0a2e8de0a40597e0724aad",
  measurementId: "G-18TCDZWHHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default { auth, db };
