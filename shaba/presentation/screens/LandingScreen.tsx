import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#FFFFFF", "#FFC0CB"]}
                style={styles.background}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#fff", // Blanco
    },
});
