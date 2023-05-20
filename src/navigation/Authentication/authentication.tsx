import Login from "../../screens/Login/login";
import Register from "../../screens/Register/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../navigator.types";
import Home from "../../screens/Home/home";
import { getUserLogin } from "../../utils/async.storage";
import { Sidebar } from "../Sidebar/sidebar";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Authentication = () => {
  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParamList>("Login");
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(() => {
    checkUserLogged();
  }, []);

  const checkUserLogged = async () => {
    const loggedUserEmail = await getUserLogin();
    setInitialRouteName(loggedUserEmail !== null ? "Sidebar" : "Login");
    setLoaded(true);
  };

  if (!isLoaded) return null;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Sidebar" component={Sidebar} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
