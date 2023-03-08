import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Icon, useColorModeValue } from "native-base";

export const ExpIconDynamic = ({ title }) => {
  const iconColor = useColorModeValue("indigo.400", "indigo.400");
  let size = 30;
  if (title === "Groceries") {
    return (
      <Icon
        name="shopping-cart"
        as={<Feather name="shopping-cart" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Medicine") {
    return (
      <Icon
        name="medkit-outline"
        as={<Ionicons name="medkit-outline" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Investment") {
    return (
      <Icon
        name="dollar"
        as={<FontAwesome name="dollar" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Shopping") {
    return (
      <Icon
        name="paperclip"
        as={<Feather name="shopping-bag" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Daily Essentials") {
    return (
      <Icon
        name="paperclip"
        as={<AntDesign name="home" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Self Care") {
    return (
      <Icon
        name="Self-Care"
        as={<Ionicons name="shield-checkmark-outline" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Stationery") {
    return (
      <Icon
        name="paperclip"
        as={<AntDesign name="paperclip" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  if (title === "Travel") {
    return (
      <Icon
        name="plane"
        as={<FontAwesome name="plane" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  if (title === "Vehicle Expense") {
    return (
      <Icon
        name="car-sport-outline"
        as={<Ionicons name="car-sport-outline" />}
        color={iconColor}
        size={size}
        textAlign="center"
      />
    );
  }
  if (title === "Utility Bills") {
    return (
      <Icon
        name="receipt-outline"
        as={<Ionicons name="receipt-outline" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  if (title === "Fee") {
    return (
      <Icon
        name="card-outline"
        as={<Ionicons name="card-outline" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  if (title === "Food") {
    return (
      <Icon
        name="Food"
        as={<Ionicons name="fast-food-outline" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  if (title === "Donation") {
    return (
      <Icon
        name="heart-outline"
        as={<Ionicons name="heart-outline" />}
        size={size}
        color={iconColor}
        textAlign="center"
      />
    );
  }
  return (
    <Icon
      name="logo-slack"
      as={<Ionicons name="logo-slack" />}
      size={size}
      color={iconColor}
      textAlign="center"
    />
  );
};
