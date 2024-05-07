import { Text, View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { globalStyles } from "../theme/global.style";
import { ShabaLogo } from "../components/ShabaLogo";
import { ButtonMd } from "../components/ButtonMd";

export const LoginScreen = () => {
    return (
        <View style={globalStyles.container}>
            <LinearGradient
                colors={["#FFFFFF", "#FFC0CB"]} // Colores del degradado
                style={globalStyles.background} // Estilo para el contenedor
            ></LinearGradient>
            <ShabaLogo />

            <ButtonMd
                label={"Login"}
                bgColor={"#007bff"}
                onPress={() => {
                    console.log("hola");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
