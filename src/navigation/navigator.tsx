import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Authentication } from "./Authentication/authentication";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Authentication />
    </NavigationContainer>
  );
};
