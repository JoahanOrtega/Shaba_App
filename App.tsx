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

export default function App() {
  //identificar el tema
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  console.log(colorScheme === "light");
  const backGroundColor =
    colorScheme === "dark"
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
