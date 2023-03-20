import { createStackNavigator } from "@react-navigation/stack";
import Dummy from "../pages/etc/Dumy";
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
        name="Dummy"
        component={Dummy}
        options={{
          title: "Dummy",
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
