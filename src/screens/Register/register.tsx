import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import styles from "./register.styles";
import {
  //deleteTablesInDB,
  getUserByEmailFromDB,
  insertUserInDB,
} from "../../utils/database";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";
import { storeUserLogin } from "../../utils/async.storage";

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
    try {
      if (validateEmailAndPassword()) {
        const user = await getUserByEmailFromDB(email);
        if (user.email === "" && user.password === "") {
          setValidRegister(true);
          await insertUserInDB(email, password);
          toast.show("Register Succesfull!");
          storeUserLogin(email);
          navigation.navigate("Home");
          //deleteTablesInDB(); // clean database
        } else {
          setValidRegister(false);
        }
      }
    } catch (error) {
      console.log("Error on register ", error);
      toast.show("Register Failed, try again!");
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
      <Pressable style={styles.registerBtn}>
        <Text style={styles.textBtn} onPress={handleUserRegister}>
          REGISTER
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
