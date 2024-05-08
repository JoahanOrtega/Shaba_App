import { Text, View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { globalStyles } from "../theme/theme";
import { ShabaLogo } from "../components/ShabaLogo";
import { ButtonMd } from "../components/ButtonMd";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFC0CB"]} // Colores del degradado
        style={globalStyles.background} // Estilo para el contenedor
      ></LinearGradient>
      <ShabaLogo />

      <ButtonMd
        label="Login"
        onPress={() => {
          navigation.navigate("Landing" as never);
        }}
      />
      <ButtonMd
        label="Register"
        onPress={() => {
          navigation.navigate("Register" as never);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
