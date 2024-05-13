// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { LandingScreen } from "../screens/LandingScreen";
// import { FavoriteScreen } from "../screens/FavoriteScreen";
// import { UserProfileScreen } from "../screens/UserProfileScreen";

// export type RootBottomParams = {
//   LandingScreen: undefined;
//   FavoriteScreen: undefined;
//   UserProfile: { userId: number };
// };

// const Tab = createBottomTabNavigator<RootBottomParams>();

// export const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="UserProfile" component={UserProfileScreen} />
//     </Tab.Navigator>
//   );
// };
// BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigator } from "./StackNavigator";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { SalesScreen } from "../screens/SalesScreen";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Favorites":
              iconName = "heart";
              break;
            case "Sales":
              iconName = "sale";
              break;
            case "Profile": // Nuevo caso para el perfil de usuario
              iconName = "account";
              break;
            default:
              iconName = "home";
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Sales" component={SalesScreen} />
     
    </Tab.Navigator>
  );
};