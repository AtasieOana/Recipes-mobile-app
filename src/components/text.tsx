import { Text, TextStyle } from "react-native";
import React from "react";

interface TextProps {
  text?: string;
  sx?: TextStyle;
}

export const TextComponent = ({ text, sx }: TextProps) => {
  return <Text style={sx}>{text}</Text>;
};
