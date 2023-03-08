import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

export const ExpIconDynamic = ({ title }) => {
  console.log(title);
  let size = 32;
  if (title === "groceries") {
    return <Feather name="shopping-cart" color="white"/>;
  }
  if (title === "medicine") {
    return <Ionicons name="medkit-outline" />;
  }
  if (title === "investment") {
    return <Ionicons name="dollar" />;
  }
  if (title === "stationery") {
    return <AntDesign name="paperclip" />;
  }
  if (title === "travel") {
    return <FontAwesome name="plane" />;
  }
  if (title === "vehicle expense") {
    return <Ionicons name="car-sport-outline" />;
  }
  if (title === "utility bills") {
    return <Ionicons name="receipt-outline" />;
  }
  if (title === "fee") {
    return <Ionicons name="card-outline" />;
  }
  if (title === "donation") {
    return <Ionicons name="heart-outline" />;
  }
  return <Ionicons name="logo-slack" />;
};
