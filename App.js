import * as React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Text, View } from "react-native";
import { InitDb } from "./services/database";
import AppNavigation from "./services/AppNavigation";
import { globalTheme, nativeBaseTheme } from "./services/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";

const theme = extendTheme(nativeBaseTheme);

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
  });

  React.useEffect(() => {
    async function bootstrap() {
      await InitDb();
      setIsReady(true);
    }
    bootstrap();
  }, []);

  if (!isReady || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: globalTheme.dark.secondary,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
