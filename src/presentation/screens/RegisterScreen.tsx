import { View } from "@gluestack-ui/themed";
import React from "react";
import { ButtonMd } from "../components/ButtonMd";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ShabaLogo } from "../components/ShabaLogo";
import { globalStyles } from "../theme/theme";

export const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFC0CB"]} // Colores del degradado
        style={globalStyles.background} // Estilo para el contenedor
      ></LinearGradient>
      <ShabaLogo />

      <ButtonMd
        label="Registrarse"
        onPress={() => {
          navigation.navigate("Login" as never);
        }}
      />
    </View>
  );
};
