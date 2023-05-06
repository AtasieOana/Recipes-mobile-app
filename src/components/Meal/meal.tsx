import React from "react";
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

interface MealProps {
  meal?: Meal;
}

const MealComponent = ({ meal }: MealProps) => {
  let imageUri = meal?.mealImage;

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
        <Button>Add To Favourites</Button>
      </Card.Actions>
    </Card>
  );
};

export default MealComponent;
