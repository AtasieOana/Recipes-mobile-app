const initialState = {
  favoritesReceipes: [],
};

const favoritesReceipesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favoritesReceipes: [...state.favoritesReceipes, action.payload],
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favoritesReceipes: state.favoritesReceipes.filter(
          (meal: any) => meal.mealId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoritesReceipesReducer;
