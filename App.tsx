import "react-native-gesture-handler";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
// import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/routes/StackNavigator";
import { useColorScheme } from "react-native";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;
  const backGroundColor =
    colorScheme === "dark"
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <>
      {/* <IconRegistry icons={EvaIconsPack} /> */}
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === "dark",
            colors: {
              primary: theme["color-primary-500"],
              background: backGroundColor,
              card: theme["color-basic-100"],
              text: theme["text-basic-color"],
              border: theme["color-basic-900"],
              notification: theme["color-primary-500"],
            },
          }}
        >
          <GluestackUIProvider config={config}>
            <StackNavigator />
          </GluestackUIProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

/*const Home = () => {
  return <Container />;
};


const Container = () => {
  return (
    
  );
};*/
