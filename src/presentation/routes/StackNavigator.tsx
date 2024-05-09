import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../screens/LandingScreen";
import { LoginScreen } from "../screens/LoginScreen";

import { UserProfileScreen } from "../screens/UserProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProductScreen } from "../screens/ProductScreen";
import { SalesScreen } from "../screens/SalesScreen";

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LandingScreen: undefined;
  ProductScreen: { productId: string };
  UserProfileScreen: { userId: string };
  SalesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="SalesScreen" component={SalesScreen} />
    </Stack.Navigator>
  );
};
