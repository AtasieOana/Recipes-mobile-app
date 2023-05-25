import Home from "../../screens/Home/home";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Favorites from "../../screens/Favorites/favorites";
import React, { useState } from "react";
import { ThemeContext } from "../../utils/theme/theme.context";
import { themes } from "../../utils/theme/theme";
import Settings from "../../screens/Settings/settings";
import { signOutUser } from "../../utils/async.storage";

const Drawer = createDrawerNavigator();

export const Sidebar = () => {
  const [theme, setTheme] = useState(themes.purple);

  const chooseThemeSchema = (newTheme: any) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, chooseThemeSchema }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Sign out"
                onPress={() => {
                  signOutUser();
                  props.navigation.navigate("Login");
                }}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />
        <Drawer.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: true }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true }}
        />
      </Drawer.Navigator>
    </ThemeContext.Provider>
  );
};
