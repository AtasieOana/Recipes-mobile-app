import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface IconProps {
  name?: any;
  color?: string;
  size?: number;
}

export const Icon = ({ name, color, size }: IconProps) => {
  return <Ionicons name={name} color={color} size={size} />;
};
