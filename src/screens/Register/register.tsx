import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./register.styles";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";
import { storeUserLogin } from "../../utils/async.storage";
import { signUpWithEmailAndPasswordAndSaveUserData } from "../../utils/login.service";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Button } from "react-native-paper";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validRegister, setValidRegister] = useState(true);

  const errorEmail = "The entered email is not valid";
  const errorPassword = "The password needs to be at least 5 characters long";
  const errorRegister =
    "An account with this email already exist. Try to login";

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUserRegister = async () => {
    console.log(email, password);
    if (validateEmailAndPassword()) {
      try {
        const userCredential = await signUpWithEmailAndPasswordAndSaveUserData(
          email,
          password
        );
        if (!userCredential) {
          // User with this email already exists
          setValidRegister(false);
          toast.show("Register Failed, try again!");
        } else {
          setValidRegister(true);
          const user = userCredential.user;
          const userData = { email: user.email, uid: user.uid };
          const userDocRef = doc(collection(db, "users"), user.uid);
          await setDoc(userDocRef, userData);
          toast.show("Register Succesfull!");
          storeUserLogin(email);
          navigation.navigate("Sidebar");
        }
      } catch (error) {
        console.log("Error on register ", error);
        toast.show("Register Failed, try again!");
      }
    }
  };

  const validateEmailAndPassword = () => {
    const re = /\S+@\S+\.\S+/;
    let isValid = true;
    if (!re.test(email)) {
      setValidEmail(false);
      isValid = false;
    } else {
      setValidEmail(true);
    }
    if (password.length < 5) {
      setValidPassword(false);
      isValid = false;
    } else {
      setValidPassword(true);
    }
    return isValid;
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Appetify!</Text>
      <Text style={styles.subtitle} onPress={goToLogin}>
        Already have an account? Login here!
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your email..."
          placeholderTextColor="#dddddd"
          onChangeText={(emailChange) => setEmail(emailChange)}
        />
      </View>
      {!validEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your password..."
          placeholderTextColor="#dddddd"
          secureTextEntry={true}
          onChangeText={(passwordChange) => setPassword(passwordChange)}
        />
      </View>
      {!validPassword && <Text style={styles.errorText}>{errorPassword}</Text>}
      {!validRegister && <Text style={styles.errorText}>{errorRegister}</Text>}
      <Button style={styles.registerBtn} onPress={handleUserRegister}>
        <Text style={styles.textBtn}>REGISTER</Text>
      </Button>
    </View>
  );
};

export default Register;
