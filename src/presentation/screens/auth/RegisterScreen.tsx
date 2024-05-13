import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { AuthRegister } from "../../../actions/auth/auth"; // Importar la función AuthRegister

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = async () => {
    const registeredUser = await AuthRegister(user);

    if (registeredUser) {
      // Si el usuario se registró exitosamente, redirige a la pantalla de inicio de sesión
      navigation.navigate("LoginScreen");
    } else {
      // Manejo de errores o mostrar mensaje al usuario si el registro falla
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* title */}
        <Layout style={{ paddingTop: height * 0.2 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={user.first_name}
            onChangeText={(text) => setUser({ ...user, first_name: text })}
          />
          <Input
            placeholder="Apellido"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={user.last_name}
            onChangeText={(text) => setUser({ ...user, last_name: text })}
          />
          <Input
            placeholder="Dirección"
            accessoryLeft={<MyIcon name="navigation-outline" />}
            style={{ marginBottom: 10 }}
            value={user.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
          <Input
            placeholder="Teléfono"
            accessoryLeft={<MyIcon name="phone-outline" />}
            style={{ marginBottom: 10 }}
            value={user.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
          />
          <Input
            placeholder="Correo electrónico"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <Input
            placeholder="Contraseña"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            secureTextEntry
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
          <Input
            placeholder="Confirmar Contraseña"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            secureTextEntry
            value={user.password_confirmation}
            onChangeText={(text) =>
              setUser({ ...user, password_confirmation: text })
            }
          />

          {/* Button */}
          <Layout>
            <Button onPress={handleRegister}>Crear</Button>
          </Layout>

          {/* Información para crear cuenta */}
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
              Inicia sesión{" "}
            </Text>
          </Layout>
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
