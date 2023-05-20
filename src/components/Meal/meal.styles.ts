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
    color: "#0d2b4e",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    color: "#131313",
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
    backgroundColor: "#c3ccfa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textButton: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default styles;
