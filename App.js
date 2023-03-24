import * as React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { View } from "react-native";
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
import { Image } from "expo-image";

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
      try {
        await InitDb();
        setIsReady(true);
      } catch (error) {
        console.log(error);
      }
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
        <Image
          source={require("./assets/logo.png")}
          alt="Loading..."
          style={{
            width: 200,
            height: 40,
            borderColor: "pink",
            borderWidth: 0,
          }}
        />
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
