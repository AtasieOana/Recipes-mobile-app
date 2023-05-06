import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import styles from "./login.styles";
import { getUserByEmailFromDB } from "../../utils/database";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";
import { storeUserLogin } from "../../utils/async.storage";

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
      if (user.email !== "" && user.password !== "") {
        if (user.password === password) {
          toast.show("User login succesfull!");
          console.log("Log user ", user);
          setValidLogin(true);
          storeUserLogin(email);
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

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back to Appetify!</Text>
      <Text style={styles.subtitle} onPress={goToRegister}>
        Don't have an account? Create one here!
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your email..."
          placeholderTextColor="#dddddd"
          onChangeText={(emailChange) => setEmail(emailChange)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textClass}
          placeholder="Enter your password..."
          placeholderTextColor="#dddddd"
          secureTextEntry={true}
          onChangeText={(passwordChange) => setPassword(passwordChange)}
        />
      </View>
      {!validLogin && <Text style={styles.errorText}>{errorLogin}</Text>}
      <Pressable style={styles.registerBtn}>
        <Text style={styles.textBtn} onPress={handleUserLogin}>
          LOGIN
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
