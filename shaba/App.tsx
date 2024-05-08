import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/routes/StackNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <GluestackUIProvider config={config}>
                {/* <LandingScreen /> */}
                {/*<Product/>*/}
                {/* <Login/>  */}
                {/* <Register/> */}
                {/* <Catalogo/> */}
                {/* <Prueba/>  */}
                {/* {<Profile/>} */}
                {/* <Inicio/> */}
                <StackNavigator />
            </GluestackUIProvider>
        </NavigationContainer>
    );
}

/*const Home = () => {
  return <Container />;
};


const Container = () => {
  return (
    
  );
};*/
