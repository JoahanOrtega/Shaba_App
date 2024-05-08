import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../screens/LandingScreen";
import { LoginScreen } from "../screens/LoginScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Profile" component={UserProfileScreen} />
        </Stack.Navigator>
    );
};
