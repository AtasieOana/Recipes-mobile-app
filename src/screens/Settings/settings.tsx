import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ThemeContext } from "../../utils/theme/theme.context";
import { themes } from "../../utils/theme/theme";
import styles from "./settings.styles";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Settings = () => {
  const { theme, chooseThemeSchema } = useContext(ThemeContext);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    handleButtonPress("purple");
  }, []);

  const handleButtonPress = (buttonText: any) => {
    setSelectedButton(buttonText);
    if (buttonText === "purple") {
      handleThemeChange(themes.purple);
    }
    if (buttonText === "green") {
      handleThemeChange(themes.green);
    }
    if (buttonText === "orange") {
      handleThemeChange(themes.orange);
    }
    if (buttonText === "blue") {
      handleThemeChange(themes.blue);
    }
  };

  const isButtonSelected = (buttonText: any) => {
    return selectedButton === buttonText;
  };

  const handleThemeChange = (newTheme: any) => {
    chooseThemeSchema(newTheme);
  };

  const pageStyles = StyleSheet.create({
    container: {
      ...styles.container,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      ...styles.title,
      color: theme.titleColor,
      textDecorationColor: theme.titleColor,
    },
    button: {
      ...styles.button,
      backgroundColor: theme.buttonColor,
    },
    textButton: {
      ...styles.textButton,
      color: theme.textButtonColor,
    },
  });

  return (
    <SafeAreaView style={pageStyles.container}>
      <Text style={pageStyles.title}>Choose your theme</Text>
      <Button
        style={[
          pageStyles.button,
          { backgroundColor: "#c3ccfa" },
          isButtonSelected("purple") && styles.selectedButton,
        ]}
      >
        <Text style={pageStyles.textButton}>Purple Theme</Text>
      </Button>
      <Button
        style={[
          pageStyles.button,
          { backgroundColor: "#99E4AA" },
          isButtonSelected("green") && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress("green")}
      >
        <Text style={pageStyles.textButton}>Green Theme</Text>
      </Button>
      <Button
        style={[
          pageStyles.button,
          { backgroundColor: "#F4B88C" },
          isButtonSelected("orange") && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress("orange")}
      >
        <Text style={pageStyles.textButton}>Orange Theme</Text>
      </Button>
      <Button
        style={[
          pageStyles.button,
          { backgroundColor: "#C9E0F4" },
          isButtonSelected("blue") && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress("blue")}
      >
        <Text style={pageStyles.textButton}>Blue Theme</Text>
      </Button>
    </SafeAreaView>
  );
};
export default Settings;
