import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LandingScreen } from "../screens/LandingScreen";
import { ProductScreen } from "../screens/ProductScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { SalesScreen } from "../screens/SalesScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LandingScreen: undefined;
  ProductScreen: { productId: number };
  FavoriteScreen: undefined;
  SalesScreen: { userId: number };
  UserProfileScreen: { userId: number };
  // Screen: undefined;
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
        // cardStyleInterpolator: fadeAnimation,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="SalesScreen" component={SalesScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};