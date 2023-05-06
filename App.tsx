import React, { useEffect } from "react";
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
