import React from "react";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";

export const ShabaLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        alt="Shaba Logo"
        source={require("../../assets/images/shaba.png")}
        style={styles.logo}
        resizeMode="cover" // Pasando resizeMode como una propiedad
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 150,
    height: 150,
    overflow: "hidden", // Para que el degradado no se propague fuera del contenedor
    marginBottom: 20,
    borderRadius: 75, // Hacer el contenedor redondeado
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    // resizeMode: "cover", // Ajustar la imagen al contenedor
  },
});
