import "react-native-gesture-handler";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";
import { AuthProviders } from "./src/presentation/providers/AuthProviders";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  //identificar el tema
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  console.log("(App.tsx) It is lightMode? " + (colorScheme === "light"));
  const backGroundColor =
    colorScheme === "dark"
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <IconRegistry icons={EvaIconsPack} />
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
            <AuthProviders>
              <StackNavigator />
            </AuthProviders>
          </NavigationContainer>
        </ApplicationProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
