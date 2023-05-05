import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./register.styles";
import {
  deleteTablesInDB,
  getUserByEmailFromDB,
  insertUserInDB,
} from "../../utils/database";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const errorEmail = "The entered email is not valid";
  const errorPassword = "The password needs to be at least 5 characters long";
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUserRegister = async () => {
    console.log(email, password);
    try {
      if (validateEmailAndPassword()) {
        await insertUserInDB(email, password);
        toast.show("Register Succesfull!");
        const user = await getUserByEmailFromDB(email);
        console.log("Registered user ", user);
        navigation.navigate("Home");
        //deleteTablesInDB(); // clean database
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DOPTI!</Text>
      <Text style={styles.subtitle}>
        Create an account to be able to adopt animals
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your email..."
          placeholderTextColor="#dddddd"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      {!validEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your password..."
          placeholderTextColor="#dddddd"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {!validPassword && <Text style={styles.errorText}>{errorPassword}</Text>}
      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.textBtn} onPress={handleUserRegister}>
          REGISTER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
