import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LandingScreen } from "../screens/LandingScreen";
import { ProductScreen } from "../screens/ProductScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { SalesScreen } from "../screens/SalesScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

export type RootStackParams = {
  LoadingScreen: undefined;
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

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
        // cardStyleInterpolator: fadeAnimation,
      }}
    >
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LandingScreen"
        component={LandingScreen}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="SalesScreen" component={SalesScreen} />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </Stack.Navigator>
  );
};
