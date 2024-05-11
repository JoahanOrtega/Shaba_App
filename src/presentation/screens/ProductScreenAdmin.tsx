import React, { useRef } from "react";

import { MainLayout } from "../layouts/MainLayout";
// import { FlatList, ScrollView } from "@gluestack-ui/themed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { getProductById } from "../../actions/products/get-product-by-id";
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { FlatList, ScrollView } from "react-native";
import { FadeInImage } from "../components/ui/FadeInImage";
import { Product, Size } from "../../domain/entities/product";
import { MyIcon } from "../components/ui/MyIcon";
import { Formik } from "formik";
import { updateCreateProduct } from "../../actions/products/update-create-product";

const sizes: Size[] = [Size.L, Size.M, Size.S];

interface Props
  extends StackScreenProps<RootStackParams, "ProductScreenAdmin"> {}

export const ProductScreenAdmin = ({ route }: Props) => {
  //useQuery
  //useMutation <= similar a useQuery pero esta dedicado a hacer
  //                Posteos, Actualizaciones y Eliminaciones

  // Obtener parametros
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  // const { productId } = route.params;

  const { data: product } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  //useMutation
  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      productIdRef.current = data.id; //creacion es util
      console.log("(ProductScreenAdmin) Success");
    },
  });

  if (!product) {
    return <MainLayout title="Cargando...." />;
  }
  return (
    <Formik
      initialValues={product}
      // validateeeee (aqui valida el formulario)

      // onSubmit={mutation.mutate}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {/* Renderizando el componente MainLayout dentro de Formik */}
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.name}>
          <ScrollView style={{ flex: 1 }}>
            {/* Imagen */}
            <Layout>
              <FadeInImage
                uri={values.img}
                style={{ width: "100%", height: 300 }}
              />
              {/* <FlatList
            data={product.img}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <>
                <FadeInImage
                  uri={item}
                  style={{ width: 300, height: 300, marginHorizontal: 7 }}
                />
              </>
            )}
          /> */}
            </Layout>

            {/* Formulario */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={"Name"}
                style={{ marginVertical: 5 }}
                value={values.name}
                onChangeText={handleChange("name")}
              />
              <Input
                label={"Description"}
                multiline
                value={values.description}
                onChangeText={handleChange("description")}
                numberOfLines={5}
                style={{ marginVertical: 5 }}
              />
              <Input
                label={"Color"}
                style={{ marginVertical: 5 }}
                value={values.color}
                onChangeText={handleChange("color")}
              />
            </Layout>

            <Layout
              style={{
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Input
                label={"Price"}
                style={{ flex: 1 }}
                value={values.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
              <Input
                label={"Stock"}
                style={{ flex: 1 }}
                value={values.available_quantity.toString()}
                onChangeText={handleChange("values")}
                keyboardType="numeric"
              />
            </Layout>

            {/* Selectores */}
            <ButtonGroup
              style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {sizes.map((size) => (
                <Button
                  onPress={() => {
                    setFieldValue("size", size);
                  }}
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.size.startsWith(size)
                      ? theme["color-primary-200"]
                      : undefined,
                  }}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            {/* Save button */}
            <Button
              accessoryLeft={<MyIcon name={"save-outline"} white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{ margin: 15 }}
            >
              Guardar
            </Button>

            <Text>{JSON.stringify(values, null, 2)}</Text>

            {/* Solo para hacer mas scroll */}
            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
