import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* title */}
        <Layout style={{ paddingTop: height * 0.2 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="First name"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Last name"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Address"
            accessoryLeft={<MyIcon name="navigation-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Phone"
            accessoryLeft={<MyIcon name="phone-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Email"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Confirm password"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 10 }} />

        {/* Button */}
        <Layout>
          <Button
            // accessoryRight={<MyIcon name="arrow-forward-outline" white/>}
            // accessoryRight={<MyIcon name="arrow-forward-outline" />}
            onPress={() => {}}
            // appearance="ghost"
          >
            Crear
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
          <Text>¿Ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => {
              navigation.goBack();
            }}
          >
            {" "}
            Inicia sesion{" "}
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
