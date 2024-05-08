import { Text, View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ShabaLogo } from "../components/ShabaLogo";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../theme/theme";

export const SalesScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <LinearGradient
        colors={["#FFFFFF", "#FFC0CB"]} // Colores del degradado
        style={globalStyles.background} // Estilo para el contenedor
      ></LinearGradient>
      <ShabaLogo />
      <Text>
        Y aqui el listado de las ventas (si se puede filtrar por usuario)
      </Text>
    </View>
  );
};
