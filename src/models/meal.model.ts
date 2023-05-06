export class Meal {
  constructor(
    public mealId: number,
    public mealName: string,
    public mealCategory: string,
    public mealArea: string,
    public preparingInstructions: string,
    public mealImage: string,
    public mealIngredients: any[]
  ) {}
}
