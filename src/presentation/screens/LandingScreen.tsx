import { StackScreenProps } from "@react-navigation/stack";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { useState } from "react";
import { getProducts } from "../../actions/products/get-products";

interface Props extends StackScreenProps<RootStackParams, "LandingScreen"> {}

export const LandingScreen = ({ navigation }: Props) => {
  const { logout } = useAuthStore();
  const [isLogout, setIsLogout] = useState(false);

  getProducts();

  const onLogout = async () => {
    setIsLogout(true);
    const wasSuccessful = await logout();
    setIsLogout(false);

    console.log(wasSuccessful);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LandingScreen</Text>
      <Button
        disabled={isLogout}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={onLogout}
      >
        Cerrar Sesion
      </Button>
    </Layout>
  );
};
