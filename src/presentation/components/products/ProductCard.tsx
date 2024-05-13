import React from "react";
import { Product } from "../../../domain/entities/product";
import { Image } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";
// import { Text } from "@ui-kitten/components";
// import { Image } from "@gluestack-ui/themed";
interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { user } = useAuthStore();

  return (
    <Card
      style={{ flex: 1, margin: 3 }}
      onPress={() => {
        {
          user?.id !== undefined && user.id === 1
            ? navigation.navigate("ProductScreenAdmin", {
                productId: product.id,
              })
            : navigation.navigate("ProductScreen", { productId: product.id });
        }
        // call ProductScreen with the params of the id
      }}
    >
      {!product.img ? (
        <Image
          source={require("../../../assets/no-product-image.png")}
          style={{ width: "100%", height: 200 }}
        />
      ) : (
        <FadeInImage
          uri={product.img}
          style={{ flex: 1, height: 200, width: "100%" }}
        />
      )}
      <Text numberOfLines={2} style={{ textAlign: "center" }}>
        {product.name}
      </Text>
    </Card>
  );
};
