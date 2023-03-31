import { createStackNavigator } from "@react-navigation/stack";
import AboutMe from "../pages/settings/AboutMe";
import Settings from "../pages/settings/Settings";
import Terms from "../pages/settings/Terms";

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings_stack"
        component={Settings}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="aboutme"
        component={AboutMe}
        options={{
          title: "About Me",
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          title: "Terms of Serives",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
