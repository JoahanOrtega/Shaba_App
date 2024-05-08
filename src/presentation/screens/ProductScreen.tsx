import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importar LinearGradient desde expo-linear-gradient
import {
  View,
  StarIcon,
  Box,
  Card,
  Image,
  Heading,
  Text,
  Icon,
  FavouriteIcon,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { globalStyles } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { ButtonMd } from "../components/ButtonMd";
const ProductScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["pink", "white"]} // Colores del degradado
      style={globalStyles.container} // Estilo para el contenedor
    >
      <View style={globalStyles.contentContainer}>
        {/* Contenido de tu componente */}
        <Image
          style={styles.image}
          source={{
            uri: "https://th.bing.com/th/id/OIP.rFVs_R5SMm40tO3LI8VUrgHaJ3?rs=1&pid=ImgDetMain",
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>Blusa</Text>
          <Icon
            style={styles.favoriteIcon}
            as={FavouriteIcon}
            m="$2"
            w="$4"
            h="$4"
          />
          <Text style={styles.productPrice}>$250.00</Text>
          <Text style={styles.productDescription}>
            Blusa de mujer roja, etc, etc
          </Text>
        </View>
        <ButtonMd
          label="Pagar"
          onPress={() => {
            navigation.navigate("Landing" as never);
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  favoriteIcon: {
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "pink",
  },
});

export default ProductScreen;
