type Theme = "purple" | "green" | "orange" | "blue";

type ThemeValues = {
  titleColor: string;
  backgroundColor: string;
  buttonColor: string;
  textButtonColor: string;
  textColor: string;
};

export const themes: { [key in Theme]: ThemeValues } = {
  purple: {
    titleColor: "#7236B1",
    backgroundColor: "#dacce9",
    buttonColor: "#c3ccfa",
    textButtonColor: "#000000",
    textColor: "#410B7A",
  },
  green: {
    titleColor: "#3A5E42",
    backgroundColor: "#81C691",
    buttonColor: "#99E4AA",
    textButtonColor: "#24472C",
    textColor: "#327040",
  },
  orange: {
    titleColor: "#D95C00",
    backgroundColor: "#F8B179",
    buttonColor: "#F4B88C",
    textButtonColor: "#B95C13",
    textColor: "#DE6301",
  },
  blue: {
    titleColor: "#033A90",
    backgroundColor: "#DCECF9",
    buttonColor: "#C9E0F4",
    textButtonColor: "#285F83",
    textColor: "#046787",
  },
};
