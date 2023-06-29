
# Recipes mobile application app :woman_cook:

**Project developed in React Native with TypeScript**

## Features
* **API Integration**

The project implements an integration with an external REST API to obtain information related to recipes that have been further displayed on a Home screen. The URL to the API can be seen below:
```
 const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=e";
```
* **Data persistence**

To ensure data persistence and allow users to keep important information, the project uses the Cloud Firestore database. It serves as a storage for users' data and their favorite networks. For authentication the project uses built-in Firebase functionality through the *createUserWithEmailAndPassword* and *signInWithEmailAndPassword* methods. These methods allow users to create new accounts with email addresses and passwords, as well as log into the application using these credentials.

* **Navigation system**

The application includes an intuitive navigation system. For this purpose, a sidebar with *Drawer Navigation* is used, which gives users quick and easy access to the different pages or sections of the application. *StackNavigator* is also used to allow transition between components.

* **Global state management**

Redux is used to manage the global state of the application. Through Redux, data is shared and updated between components efficiently. Within the project, the functionality of retaining user preferences has been implemented in Redux, so that when a user adds a recipe to favorites, it is added as a new object to the global state using the specific reducers. This allows the state to be updated from Redux and access to updated information on both the Home page and the Favorites page.

* **Context API**

The project gives the user the opportunity to choose one of four available themes, each with a different color. This option is accessible through the Settings page. When the user selects a theme, the corresponding state is updated in the Context API, and the app will automatically change its appearance according to the selected theme. Through the Context API, the selected theme is available to all components that need to display or adjust according to the theme.

* **Share**

The user can select a recipe from their list of favorites and share it through the various communication channels available on their device (messages, social networks, mail). Recipe content, including ingredients and instructions, can be shared through channels of choice, making it easy for others to share and access the recipe.
