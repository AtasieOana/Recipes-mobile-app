import Home from "../../screens/Home/home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Favorites from "../../screens/Favorites/favorites";
import React from "react";

const Drawer = createDrawerNavigator();

export const Sidebar = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
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
    </Drawer.Navigator>
  );
};
