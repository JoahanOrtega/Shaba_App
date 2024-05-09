import "react-native-gesture-handler";

import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/routes/StackNavigator";
import { useColorScheme } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <StackNavigator />
        </GluestackUIProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

/*const Home = () => {
  return <Container />;
};


const Container = () => {
  return (
    
  );
};*/
