import React, { useEffect, useState } from "react";
import styles from "./meal.styles";
import {
  Card,
  Button,
  Title,
  Paragraph,
  Subheading,
  List,
} from "react-native-paper";
import { Meal } from "../../models/meal.model";
import { getUserLogin } from "../../utils/async.storage";
import {
  addFavoriteReceipeInDatabase,
  checkIfReceipeIsUserFavorite,
  deleteFavoriteReceiveForUser,
} from "../../utils/favorites.service";
import { useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/favorite.action";
import { Share } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Animated, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface MealProps {
  meal?: Meal;
  parent?: string;
}

const MealComponent = ({ meal, parent }: MealProps) => {
  let imageUri = meal?.mealImage;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toast = useToast();

  const dispatch = useDispatch();

  useEffect(() => {
    if (parent !== "favorites") {
      checkIfFavorite();
    }
  }, []);

  const handleButtonPress = () => {
    if (isFavorite) {
      deleteFromFavorites();
    } else {
      addToFavorites();
    }
  };

  const animateAddDeleteButton = () => {
    // the button is getting bigger
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // it returns to the initial position of the button
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        delay: 600,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedStyles = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1], // the animation appears when the value changes from 0 to 1
          outputRange: [1, 1.2], // scale will increase from 1 to 1.3
        }),
      },
    ],
  };

  const addToFavorites = async () => {
    const loggedUserEmail = await getUserLogin();
    const addToFavoritesBool = await addFavoriteReceipeInDatabase(
      meal?.mealId,
      loggedUserEmail
    );
    if (addToFavoritesBool) {
      setIsFavorite(true);
      dispatch(addFavorite(meal));
      animateAddDeleteButton();
    }
  };

  const checkIfFavorite = async () => {
    setIsChecking(true);
    const loggedUserEmail = await getUserLogin();
    const isReceipeUserFavorite = await checkIfReceipeIsUserFavorite(
      meal?.mealId,
      loggedUserEmail
    );
    setIsChecking(false);
    setIsFavorite(isReceipeUserFavorite);
    if (isReceipeUserFavorite) {
      dispatch(addFavorite(meal));
    }
  };

  const deleteFromFavorites = async () => {
    const loggedUserEmail = await getUserLogin();
    const deletedFavorite = await deleteFavoriteReceiveForUser(
      meal?.mealId,
      loggedUserEmail
    );
    setIsFavorite(!deletedFavorite);
    dispatch(deleteFavorite(meal?.mealId));
    animateAddDeleteButton();
  };

  const shareReceipe = async () => {
    try {
      await Share.share({
        message: `Check this receipe \n Name: ${meal?.mealName}\n Category: ${meal?.mealCategory} \n Steps: ${meal?.preparingInstructions}`,
      });
    } catch (error: any) {
      toast.show("The receipe failed to be shared!");
    }
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Title style={styles.title}>{meal?.mealName}</Title>
        <Subheading style={styles.subheading}>
          From {meal?.mealCategory} category and {meal?.mealArea} area
        </Subheading>
      </Card.Content>
      <Card.Cover source={{ uri: imageUri }} />
      <Card.Content>
        <List.Accordion
          title="Ingredients"
          left={(props) => <List.Icon {...props} icon="food" />}
        >
          {meal?.mealIngredients.map(([ingredient, measure], index) => (
            <List.Item
              key={index}
              title={`${ingredient} - ${measure}`}
              left={(props) => <List.Icon {...props} icon="circle" />}
            />
          ))}
        </List.Accordion>
      </Card.Content>
      <Card.Content>
        <Paragraph style={styles.preparingInstructions}>
          {meal?.preparingInstructions}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        {parent !== "favorites" && (
          <Animated.View style={[styles.button, animatedStyles]}>
            <TouchableOpacity onPress={handleButtonPress} disabled={isChecking}>
              <Text style={styles.textButton}>
                {isFavorite ? "Delete from Favourites" : "Add To Favourites"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {parent === "favorites" && (
          <Button onPress={shareReceipe}>Share this receipe</Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default MealComponent;
