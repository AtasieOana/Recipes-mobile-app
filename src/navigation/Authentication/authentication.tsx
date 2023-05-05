import React from "react";
import Login from "../../screens/Login/login";
import Register from "../../screens/Register/register";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import styles from "./authentication.styles";

const Tab = createBottomTabNavigator();

export const Authentication = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: () => {
            return <Text style={styles.tabText}>LOGIN</Text>;
          },
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={28} color="#7277cc" />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: () => {
            return <Text style={styles.tabText}>REGISTER</Text>;
          },
          tabBarIcon: () => (
            <Ionicons name="person-add-outline" size={28} color="#7277cc" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
