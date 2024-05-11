import { Layout, List, Text } from "@ui-kitten/components";
import React from "react";
import { Product } from "../../../domain/entities/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  // TODO: fetch nextPag
}

export const ProductList = ({ products }: Props) => {
  return (
    //similar to flatList
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
    />
  );
};
