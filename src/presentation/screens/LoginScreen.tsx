import { View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { globalStyles } from "../theme/theme";
import { ShabaLogo } from "../components/ShabaLogo";
import { ButtonMd } from "../components/ButtonMd";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

export const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* title */}
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            onPress={() => {}}
            // appearance="ghost"
          >
            Ingresar
          </Button>
        </Layout>

        {/* Informacion para crear cuenta */}
        <Layout style={{ height: 50 }} />
        <Layout
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>¿No tienes cuenta?</Text>
          <Text status="primary" category="s1" onPress={() => {}}>
            {" "}
            crea una{" "}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({});

// <View style={globalStyles.container}>
//   <LinearGradient
//     colors={["#FFFFFF", "#FFC0CB"]} // Colores del degradado
//     style={globalStyles.background} // Estilo para el contenedor
//   ></LinearGradient>
//   <ShabaLogo />

//   <ButtonMd
//     label="Login"
//     onPress={() => {
//       navigation.navigate("Landing" as never);
//     }}
//   />
//   <br></br>
//   <ButtonMd
//     label="Register"
//     onPress={() => {
//       navigation.navigate("Register" as never);
//     }}
//   />
// </View>
