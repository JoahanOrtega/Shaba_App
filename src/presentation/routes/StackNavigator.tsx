import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../screens/LandingScreen";
import { LoginScreen } from "../screens/LoginScreen";

import UserProfileScreen from "../screens/UserProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import ProductScreen from "../screens/ProductScreen";
import { SalesScreen } from "../screens/SalesScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Profile" component={UserProfileScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
    </Stack.Navigator>
  );
};
