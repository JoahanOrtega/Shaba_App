import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import Gradient from "./assets/Icons/Gradient";
import DocumentData from "./assets/Icons/DocumentData";
import LightBulbPerson from "./assets/Icons/LightbulbPerson";
import Rocket from "./assets/Icons/Rocket";
import Logo from "./assets/Icons/Logo";
//import Login from './components/Login';
//import Register from './components/Register';
import { LandingScreen } from "./presentation/screens/LandingScreen";
//import Profile from './components/Profile';
import Profile from "./presentation/screens/Profile";
import { LoginScreen } from "./presentation/screens/LoginScreen";
export default function App() {
    return (
        <GluestackUIProvider config={config}>
            {/* <LandingScreen /> */}
            {/*<Product/>*/}
            {/* <Login/>  */}
            {/* <Register/> */}
            {/* <Catalogo/> */}
            {/* <Prueba/>  */}
            {/* {<Profile/>} */}
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
