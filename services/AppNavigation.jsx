import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Expense from "../pages/expense/Expense";
import AddExpense from "../pages/expense/AddExpense";
import { globalTheme, navThemeDark, navThemeLight } from "./theme";
import { Box, useColorModeValue } from "native-base";
import { Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import AreaChartComp from "../pages/stats/Real";
import { useStore } from "../store/Store";
import SettingStack from "./StackNavigation";

const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { darkMode } = useStore((state) => state);
  const tintActiveColor = useColorModeValue("#27272a", "white");
  const tintInactiveColor = useColorModeValue("#a1a1aa", "#71717a");

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(
        darkMode ? globalTheme.dark.primary : globalTheme.light.primary
      );
    }
    console.log("DARK MODE >>>", darkMode);
  }, [darkMode]);

  return (
    <Box flex={1}>
      <NavigationContainer theme={darkMode ? navThemeDark : navThemeLight}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: tintActiveColor,
            tabBarInactiveTintColor: tintInactiveColor,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Expense}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="AddExpense"
            component={AddExpense}
            options={{
              title: "New Expense",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="add-to-list" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={AreaChartComp}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="chatbubbles-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="setting" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      {Platform.OS === "ios" && (
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      )}
    </Box>
  );
};

export default AppNavigation;
