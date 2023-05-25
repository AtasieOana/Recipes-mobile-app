import React, { useContext } from "react";
import { Text } from "react-native";
import styles from "./home.styles";
import { useEffect, useState } from "react";
import { Meal } from "../../models/meal.model";
import MealComponent from "../../components/Meal/meal";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { getUserLogin } from "../../utils/async.storage";
import { getAllFavoritesForUser } from "../../utils/favorites.service";
import { useDispatch } from "react-redux";
import { setFavorites } from "../../redux/favorite.action";
import { ThemeContext } from "../../utils/theme/theme.context";
import { StyleSheet } from "react-native";

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=e";
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => convertMealsJsonToModelObjects(data.meals))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const convertMealsJsonToModelObjects = async (mealsJson: any) => {
    let newMeals: Meal[] = [];
    mealsJson.forEach((meal: any) => {
      const newMeal = convertMealDataToMealObject(meal);
      newMeals.push(newMeal);
    });
    // check with are favorites
    const loggedUserEmail = await getUserLogin();
    const isReceipeUserFavorite = await getAllFavoritesForUser(loggedUserEmail);
    const userFavs = newMeals.filter((meal: any) =>
      isReceipeUserFavorite.includes(meal.mealId)
    );
    dispatch(setFavorites(userFavs));
    setMeals(newMeals);
  };

  const convertMealDataToMealObject = (mealData: any) => {
    const mealId = Math.floor(mealData.idMeal);
    const mealName = mealData.strMeal;
    const mealCategory = mealData.strCategory;
    const mealArea = mealData.strArea;
    const preparingInstructions = mealData.strInstructions;
    const mealImage = mealData.strMealThumb;
    const mealIngredients: any[] = [];

    Object.entries(mealData).forEach(([key, value]) => {
      if (key.startsWith("strIngredient") && value) {
        const measureKey = `strMeasure${key.replace("strIngredient", "")}`;
        const measureValue = mealData[measureKey] || "";
        mealIngredients.push([value, measureValue]);
      }
    });
    return new Meal(
      mealId,
      mealName,
      mealCategory,
      mealArea,
      preparingInstructions,
      mealImage,
      mealIngredients
    );
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
  });

  return (
    <SafeAreaView style={pageStyles.container}>
      <Text style={pageStyles.title}>Meals ideas</Text>
      {loading ? (
        <Text>Wait a second till data is loaded...</Text>
      ) : (
        <ScrollView>
          {meals.map((meal: Meal) => {
            return <MealComponent key={meal.mealId} meal={meal} />;
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
