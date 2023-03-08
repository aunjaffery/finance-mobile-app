import { Platform, StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useColorModeValue } from "native-base";
import { globalTheme } from "./theme";

export function FocusBar(props) {
  const isFocused = useIsFocused();
  const defaultColor = useColorModeValue(
    globalTheme.light.primary,
    globalTheme.dark.primary
  );

  return Platform.OS === "android" ? (
    isFocused ? (
      <StatusBar
        backgroundColor={props.topColor ? props.topColor : defaultColor}
      />
    ) : null
  ) : null;
}
