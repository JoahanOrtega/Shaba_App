import { Button, Layout, List, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Product } from "../../../domain/entities/product";
import { ProductCard } from "./ProductCard";
import { RefreshControl } from "@gluestack-ui/themed";
// import { RefreshControl } from "react-native";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface Props {
  products: Product[];
  // TODO: fetch nextPag
}

export const ProductList = ({ products }: Props) => {
  // Invalidar el cache al hacer un pullToRequest
  const QueryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    //Sleep 2
    await new Promise((resolve) => setTimeout(resolve, 200));
    // Invalidar el query del (LandingScreen)
    QueryClient.invalidateQueries({ queryKey: ["products", "infinite"] });

    setIsRefreshing(false);
  };

  return (
    //similar to flatList
    <>
      <List
        data={products}
        numColumns={2}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListFooterComponent={() => <Layout style={{ height: 150 }} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onPullToRefresh}
          />
        }
      />
      <Button>Hola desde productList</Button>
    </>
  );
};
