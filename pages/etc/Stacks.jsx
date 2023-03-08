import { createStackNavigator } from "@react-navigation/stack";
import Dummy from "./Dumy";
import FlexPage from "./FlexPage";
import Random from "./Random";
const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Random" component={Random} />
      <Stack.Screen name="Flex" component={FlexPage} />
      <Stack.Screen name="Dummy" component={Dummy} />
    </Stack.Navigator>
  );
};

export default Stacks;
