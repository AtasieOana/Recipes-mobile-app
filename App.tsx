import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { Navigator } from "./src/navigation/navigator";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Navigator />
      </ToastProvider>
    </Provider>
  );
}
