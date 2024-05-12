import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { useState } from "react";
import { getProducts } from "../../actions/products/get-products";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../layouts/MainLayout";
import { ScreenLoader } from "../components/ui/ScreenLoader";
import { ProductList } from "../components/products/ProductList";
import { FAB } from "../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StorageAdapter } from "../../config/adapters/storage-adapter";

export const LandingScreen = () => {
  const { logout } = useAuthStore();

  const [isLogout, setIsLogout] = useState(false);

  const onLogout = async () => {
    setIsLogout(true);
    const wasSuccessful = await logout();
    setIsLogout(false);
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { isLoading, data: products = [] } = useQuery({
    // queryKey: ["products", 0],
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProducts(),
  });

  // const handleLogin = () => {
  //   navigation.navigate("LoginScreen"); // Navigate to LoginScreen
  // };
  return (
    <>
      <MainLayout
        title="Shaba - Products"
        subTitle="Todo lo que buscas en moda"
      >
        {isLoading ? <ScreenLoader /> : <ProductList products={products} />}
      </MainLayout>
      <FAB
        iconName="plus-outline"
        onPress={() =>
          navigation.navigate("ProductScreenAdmin", { productId: -1 })
        }
        style={{ position: "absolute", bottom: 100, right: 20 }}
      />
      <FAB
        iconName="log-out-outline"
        onPress={() => {
          onLogout();
          // const user = useAuthStore.getState().user;
          // console.log(user);
          // if (user) {
          //   // Navegar a UserProfileScreen y pasar el ID del usuario como parámetro
          //   console.log("voy a enviar el id de " + user.id);
          //   navigation.navigate("UserProfileScreen", { userId: user.id });
          // }
        }}
        style={{ position: "absolute", bottom: 100, left: 20 }}
      />
      <FAB
        iconName="person-outline"
        onPress={() => {
          // onLogout();
          const user = useAuthStore.getState().user;
          console.log(user);
          if (user) {
            // Navegar a UserProfileScreen y pasar el ID del usuario como parámetro
            console.log("voy a enviar el id de " + user.id);
            navigation.navigate("UserProfileScreen", { userId: user.id });
          }
        }}
        style={{ position: "absolute", bottom: 200, left: 20 }}
      />
    </>
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
