import { StackScreenProps } from "@react-navigation/stack";
import { Layout, Text } from "@ui-kitten/components";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { useState } from "react";
import { getProducts } from "../../actions/products/get-products";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "@gluestack-ui/themed";

interface Props extends StackScreenProps<RootStackParams, "LandingScreen"> {}

export const LandingScreen = ({ navigation }: Props) => {
  const { logout } = useAuthStore();
  const [isLogout, setIsLogout] = useState(false);

  const { isLoading, data: products = [] } = useQuery({
    // queryKey: ["products", 0],
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProducts(),
  });

  const onLogout = async () => {
    setIsLogout(true);
    const wasSuccessful = await logout();
    setIsLogout(false);

    console.log(wasSuccessful);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        <Text>{JSON.stringify(products, null, 2)}</Text>
      </ScrollView>
    </Layout>
  );
};

/**
 * <Button
        disabled={isLogout}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={onLogout}
      >
        Cerrar Sesion
      </Button>
 */
