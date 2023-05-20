import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dacce9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#4e1786",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  subtitle: {
    color: "#4e1786",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 40,
    textAlign: "center",
    fontStyle: "italic",
    marginRight: 5,
    marginLeft: 5,
    textDecorationLine: "underline",
    textDecorationColor: "#4e1786",
    textDecorationStyle: "solid",
  },
  inputView: {
    backgroundColor: "#8b46d4",
    borderRadius: 20,
    color: "#fff",
    width: "70%",
    height: 50,
    marginTop: 20,
    alignItems: "center",
  },
  registerBtn: {
    width: "80%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#4e1786",
    borderRadius: 20,
  },
  textClass: {
    height: 50,
    textAlign: "center",
  },
  textBtn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "#e53333",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
    marginTop: 30,
  },
});
export default styles;
