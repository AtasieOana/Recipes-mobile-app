import React from "react";
import { Text } from "react-native";
import styles from "./home.styles";
import { useEffect, useState } from "react";
import { Meal } from "../../models/meal.model";
import MealComponent from "../../components/Meal/meal";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { signOutUser } from "../../utils/async.storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=e";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => convertMealsJsonToModelObjects(data.meals))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const convertMealsJsonToModelObjects = (mealsJson: any) => {
    let newMeals: Meal[] = [];
    mealsJson.forEach((meal: any) => {
      const newMeal = convertMealDataToMealObject(meal);
      newMeals.push(newMeal);
    });
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

  const onSignOutUser = () => {
    signOutUser();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meals ideas</Text>
      <Text onPress={onSignOutUser}>Sign out</Text>
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
