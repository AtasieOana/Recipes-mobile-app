import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

// add favorite receipe in database
export const addFavoriteReceipeInDatabase = async (
  idReceipe: any,
  emailUser: any
) => {
  try {
    // create new favorite entry
    await setDoc(doc(db, "favorites", emailUser + idReceipe), {
      idReceipe: idReceipe,
      emailUser: emailUser,
    });

    return emailUser + idReceipe;
  } catch (error) {
    console.log(error);
  }
};

// check if a receipe is user favorite
export const checkIfReceipeIsUserFavorite = async (
  idReceipe: any,
  emailUser: any
) => {
  const docRef = doc(db, "favorites", emailUser + idReceipe);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

// delete a favorite receipe for user
export const deleteFavoriteReceiveForUser = async (
  idReceipe: any,
  emailUser: any
) => {
  await deleteDoc(doc(db, "favorites", emailUser + idReceipe));
  return true;
};

// get all favorites
export const getAllFavoritesForUser = async (emailUser: any) => {
  const q = query(
    collection(db, "favorites"),
    where("emailUser", "==", emailUser)
  );
  const querySnapshot = await getDocs(q);

  let favorites = <any>[];
  querySnapshot.forEach((docum) => {
    favorites.push(docum.data().idReceipe);
  });
  return favorites;
};
