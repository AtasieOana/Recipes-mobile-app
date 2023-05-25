import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5fc",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    textAlign: "center",
  },
  preparingInstructions: {
    fontSize: 14,
    textAlign: "justify",
  },
  button: {
    width: "50%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default styles;
