import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import Gradient from "./assets/Icons/Gradient";
import DocumentData from "./assets/Icons/DocumentData";
import LightBulbPerson from "./assets/Icons/LightbulbPerson";
import Rocket from "./assets/Icons/Rocket";
import Logo from "./assets/Icons/Logo";
import Home from "./presentation/screens/HomeScreen";
import ProductScreen from "./presentation/screens/ProductScreen";
import { LoginScreen } from "./presentation/screens/LoginScreen";

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            {/*<Home />*/}
            {/* {<ProductScreen />} */}
            <LoginScreen />
            {/* <Register/> */}
            {/* <Catalogo/> */}
            {/* <Prueba/>  */}
            {/* <Profile/> */}
            {/* <Inicio/> */}
        </GluestackUIProvider>
    );
}

/*const Home = () => {
  return <Container />;
};


const Container = () => {
  return (
    
  );
};*/
