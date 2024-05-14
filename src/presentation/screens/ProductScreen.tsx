import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { MainLayout } from "../layouts/MainLayout";
import { getProductById } from "../../actions/products/get-product-by-id";
import { FadeInImage } from "../components/ui/FadeInImage";
import { Product, Size } from "../../domain/entities/product";
import { MyIcon } from "../components/ui/MyIcon";
import { updateCreateProduct } from "../../actions/products/update-create-product";
import { Formik } from "formik";
import {
  Button,
  ButtonGroup,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../actions/category/get-categories";

const sizes: Size[] = [Size.L, Size.M, Size.S];

interface Props extends StackScreenProps<RootStackParams, "ProductScreen"> {}

export const ProductScreen = ({ route }: Props) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const { data: categories } = useQuery({
    queryKey: ["categories"], // Clave para identificar la consulta
    queryFn: getCategories, // Función que realiza la consulta
  });

  const categoryName = () => {
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryIndex.row + 1
    );

    console.log(selectedCategory?.name);
    return selectedCategory ? selectedCategory.name : "";
  };

  //useQuery
  //useMutation <= similar a useQuery pero esta dedicado a hacer
  //                Posteos, Actualizaciones y Eliminaciones

  // Obtener parametros
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  /** Revalidar cuando se haga un cmabio */
  const QueryClient = useQueryClient();
  // const { productId } = route.params;

  const { data: product } = useQuery({
    queryKey: ["product", productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  //useMutation
  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product, values: any) {
      productIdRef.current = data.id; //creacion es util
      Alert.alert(
        "Purchase",
        "We will send your product to your house " + values.address + ""
      ); // Cuando haga la invalidacion se va a volver a cargar la data
      // al hacer cambios a la bd invalidar lo que se esta mostrando en (LandingScreen)
      // Cuando haga la invalidacion se va a volver a cargar la data
      QueryClient.invalidateQueries({ queryKey: ["products", "infinite"] });

      // Los mismo pero con el useQuery de esta Screen (ProductScreenAdmin)
      QueryClient.invalidateQueries({ queryKey: ["product", data.id] });
    },
  });

  useEffect(() => {
    if (product && product.id_category) {
      const categoryIndex = categories.findIndex(
        (category) => category.id === product.id_category
      );
      setSelectedCategoryIndex(new IndexPath(categoryIndex));
    }
  }, [product, categories]);

  if (!product) {
    return <MainLayout title="Cargando...." />;
  }
  return (
    <Formik
      initialValues={{ ...product, address: "" }}
      // validateeeee (aqui valida el formulario)

      // onSubmit={mutation.mutate}

      onSubmit={(values) => {
        if (values.available_quantity > 0) {
          const updatedValues = {
            ...values,
            available_quantity: values.available_quantity - 1,
          };
          mutation.mutate(updatedValues);
        } else {
          // Mostrar una alerta indicando que el producto no está disponible
          Alert.alert(
            "Product Not Available",
            "This product is not available for purchase."
          );
        }
      }}
    >
      {/* Renderizando el componente MainLayout dentro de Formik */}
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.name}>
          <ScrollView style={{ flex: 1 }}>
            {/* Imagen */}
            <Layout>
              {values.img === "" || values.img === null ? (
                <Image
                  source={require("../../assets/no-product-image.png")}
                  style={{
                    width: "100%",
                    height: 300,
                  }}
                />
              ) : (
                <FadeInImage
                  uri={values.img}
                  style={{ width: "100%", height: 300 }}
                />
              )}
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
                disabled
                label={"Name"}
                style={{ marginVertical: 5 }}
                value={values.name}
                onChangeText={handleChange("name")}
              />
              <Input
                disabled
                label={"Description"}
                multiline
                value={values.description}
                onChangeText={handleChange("description")}
                numberOfLines={5}
                style={{ marginVertical: 5 }}
              />
              <Input
                disabled
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
                disabled
                label={"Price"}
                style={{ flex: 1 }}
                value={values.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
              <Input
                disabled
                label={"Stock"}
                style={{ flex: 1 }}
                value={values.available_quantity.toString()}
                onChangeText={handleChange("available_quantity")}
                keyboardType="numeric"
              />
            </Layout>

            {/* Select de categorías */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                disabled
                label={"Category"}
                style={{ marginVertical: 5 }}
                value={categoryName()}
                onChangeText={handleChange("id_category")}
              />
              {/* <Select
                disabled
                selectedIndex={selectedCategoryIndex}
                onSelect={(index) => {
                  setSelectedCategoryIndex(index);
                  const selectedCategory = categories[index.row];
                  setFieldValue("id_category", selectedCategory.id);
                }}
              >
                {categories.map((category) => (
                  <SelectItem key={category.id} title={category.name} />
                ))}
              </Select> */}
            </Layout>

            {/* Selectores */}
            <ButtonGroup
              style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {sizes.map((size) => (
                <Button
                  disabled
                  onPress={() => {
                    setFieldValue("size", size);
                  }}
                  key={size}
                  style={{
                    flex: 1,
                    borderColor:
                      size === values.size
                        ? "#ffc0cb"
                        : theme["color-basic-400"], // Cambiar el color del borde según si el tamaño está seleccionado o no
                    backgroundColor:
                      size === values.size
                        ? "#ffc0cb"
                        : theme["color-basic-100"], // Cambiar el color de fondo según si el tamaño está seleccionado o no
                  }}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            {/* Save button */}
            <Button
              accessoryLeft={<MyIcon name={"shopping-bag-outline"} white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{
                margin: 15,
                backgroundColor: "#ffc0cb",
                borderColor: "#ffc0cb",
              }} // Cambiar el color del botón a rosa
            >
              Comprar
            </Button>

            {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}

            {/* Solo para hacer mas scroll */}
            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
