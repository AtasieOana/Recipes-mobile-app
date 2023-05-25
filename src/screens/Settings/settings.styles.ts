import { StyleSheet } from "react-native";
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    margin: 10,
    marginBottom: 30,
  },
  button: {
    width: "70%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 15,
    height: 100,
  },
  selectedButton: {
    width: "80%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000000",
  },
});
export default styles;
