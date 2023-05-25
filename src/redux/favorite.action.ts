export const addFavorite = (favoritesReceipe: any) => {
  return {
    type: "ADD_FAVORITE",
    payload: favoritesReceipe,
  };
};

export const deleteFavorite = (id: any) => {
  return {
    type: "DELETE_FAVORITE",
    payload: id,
  };
};

export const setFavorites = (data: any) => {
  return {
    type: "SET_FAVORITES",
    payload: data,
  };
};
