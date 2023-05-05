import { View } from "react-native";
import React, { useEffect } from "react";
import Login from "./src/screens/Login/login";
import { StyleSheet } from "react-native";
import { createTablesInDB } from "./src/utils/database";
import { ToastProvider } from "react-native-toast-notifications";
import { Navigator } from "./src/navigation/navigator";

export default function App() {
  useEffect(() => {
    createTablesInDB(); // at the first render create the tables in db
  }, []);

  return (
    <ToastProvider>
      <Navigator />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
