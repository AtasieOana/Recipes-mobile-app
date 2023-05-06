import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserLogin = async (email: string) => {
  try {
    await AsyncStorage.setItem("loged_user", email);
  } catch (e) {
    console.log("Error on store user: ", e);
  }
};

export const getUserLogin = async () => {
  try {
    let value = await AsyncStorage.getItem("loged_user");
    return value;
  } catch (e) {
    console.log("Error on reading user: ", e);
  }
};

export const signOutUser = async () => {
  try {
    await AsyncStorage.removeItem("loged_user");
    return true;
  } catch (e) {
    return false;
  }
};
