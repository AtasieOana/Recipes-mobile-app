import { combineReducers } from "redux";
import favoritesReceipesReducer from "./favorite.reducer";

const rootReducer = () => {
  return combineReducers({
    data: favoritesReceipesReducer,
  });
};

export default rootReducer;
