import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./login.styles";
import { getUserByEmailFromDB } from "../../utils/database";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [validLogin, setValidLogin] = useState(true);
  const errorLogin = "The inserted information is not valid";
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUserLogin = async () => {
    try {
      const user = await getUserByEmailFromDB(email);
      console.log(user);
      if (user.email !== "" && user.password !== "") {
        if (user.password === password) {
          toast.show("User login succesfull!");
          console.log("Log user ", user);
          setValidLogin(true);
          navigation.navigate("Home");
        }
      } else {
        setValidLogin(false);
      }
    } catch (error) {
      console.log("Log user error ", error);
      toast.show("User login failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back to DOPTI!</Text>
      <Text style={styles.subtitle}>Sign in to be able to adopt animals</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your email..."
          placeholderTextColor="#dddddd"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your password..."
          placeholderTextColor="#dddddd"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {!validLogin && <Text style={styles.errorText}>{errorLogin}</Text>}
      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.textBtn} onPress={handleUserLogin}>
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
