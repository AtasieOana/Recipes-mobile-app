import React, { useState } from "react";
import { Text } from "react-native";
import styles from "./favorites.styles";
import { useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Meal } from "../../models/meal.model";
import MealComponent from "../../components/Meal/meal";

const Favorites = () => {
  const [favMeals, setFavMeals] = useState<Meal[]>([]);
  const favoritesReceipes = useSelector((state: any) => {
    return state.data.favoritesReceipes;
  });

  useEffect(() => {
    setFavMeals(favoritesReceipes);
  }, [favoritesReceipes]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your favorite receipes</Text>
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
