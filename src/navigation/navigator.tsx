import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Authentication } from "./Authentication/authentication";
import Home from "../screens/Home/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigator.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  // const { user } = useAuthentication();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
