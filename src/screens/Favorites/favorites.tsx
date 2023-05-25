import React, { useContext, useState } from "react";
import { Text } from "react-native";
import styles from "./favorites.styles";
import { useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Meal } from "../../models/meal.model";
import MealComponent from "../../components/Meal/meal";
import { ThemeContext } from "../../utils/theme/theme.context";
import { StyleSheet } from "react-native";

const Favorites = () => {
  const [favMeals, setFavMeals] = useState<Meal[]>([]);
  const favoritesReceipes = useSelector((state: any) => {
    return state.data.favoritesReceipes;
  });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setFavMeals(favoritesReceipes);
  }, [favoritesReceipes]);

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
  });

  return (
    <SafeAreaView style={pageStyles.container}>
      <Text style={pageStyles.title}>Your favorite receipes</Text>
      <ScrollView>
        {favMeals.map((meal: Meal) => {
          return (
            <MealComponent key={meal.mealId} meal={meal} parent={"favorites"} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Favorites;
