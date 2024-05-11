import React from "react";

import { MainLayout } from "../layouts/MainLayout";
import { ScrollView, Text } from "@gluestack-ui/themed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { getProductById } from "../../actions/products/get-product-by-id";
import { Layout } from "@ui-kitten/components";
import { FlatList } from "react-native";
import { FadeInImage } from "../components/ui/FadeInImage";
import { Product } from "../../domain/entities/product";
import { updateCreateProduct } from "../../actions/products/update-create-product";

interface Props extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({ route }: Props) => {
  //useQuery
  //useMutation <= similar a useQuery pero esta dedicado a hacer
  //                Posteos, Actualizaciones y Eliminaciones

  // Obtener parametros
  const { productId } = route.params;

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  //useMutation

  if (!product) {
    return <MainLayout title="Cargando...." />;
  }
  return (
    <MainLayout title={product.name}>
      <ScrollView style={{ flex: 1 }}>
        {/* Imagen */}
        <Layout>
          <FlatList
            data={product.img}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 300, height: 300, marginHorizontal: 7 }}
              />
            )}
          />
        </Layout>
      </ScrollView>
    </MainLayout>
  );
};
