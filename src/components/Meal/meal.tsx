import React, { useEffect } from "react";
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

interface MealProps {
  meal?: Meal;
  parent?: string;
}

const MealComponent = ({ meal, parent }: MealProps) => {
  let imageUri = meal?.mealImage;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);

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

  const addToFavorites = async () => {
    const loggedUserEmail = await getUserLogin();
    const addToFavoritesBool = await addFavoriteReceipeInDatabase(
      meal?.mealId,
      loggedUserEmail
    );
    if (addToFavoritesBool) {
      setIsFavorite(true);
      dispatch(addFavorite(meal));
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
          <Button onPress={handleButtonPress} disabled={isChecking}>
            {isFavorite ? "Delete from Favourites" : "Add To Favourites"}
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default MealComponent;
