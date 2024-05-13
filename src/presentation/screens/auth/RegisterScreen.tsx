import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, StyleSheet, useWindowDimensions } from "react-native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { height } = useWindowDimensions();

  const onRegister = async () => {
    if (
      form.firstName.length === 0 ||
      form.lastName.length === 0 ||
      form.address.length === 0 ||
      form.phone.length === 0 ||
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.password_confirmation.length === 0
    ) {
      Alert.alert("Error", "Ingrese datos al formulario");
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await register(
      form.firstName,
      form.lastName,
      form.address,
      form.phone,
      form.email,
      form.password,
      form.password_confirmation
    );
    setIsPosting(false);

    console.log(wasSuccessful);
    if (wasSuccessful) {
      const user = useAuthStore.getState().user;
      console.log("(RegisterScreen) Register was succesful");
      navigation.navigate("LoginScreen");
    }

    Alert.alert("Error", "Usuario o contraseña incorrectos");
  };

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
            keyboardType="default"
            value={form.firstName}
            onChangeText={(firstName) => setForm({ ...form, firstName })}
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Last name"
            keyboardType="default"
            value={form.lastName}
            onChangeText={(lastName) => setForm({ ...form, lastName })}
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Address"
            value={form.address}
            onChangeText={(address) => setForm({ ...form, address })}
            accessoryLeft={<MyIcon name="navigation-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChangeText={(phone) => setForm({ ...form, phone })}
            accessoryLeft={<MyIcon name="phone-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Confirm password"
            autoCapitalize="none"
            secureTextEntry
            value={form.password_confirmation}
            onChangeText={(password_confirmation) =>
              setForm({ ...form, password_confirmation })
            }
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* visualize what inputs i have */}
        <Text> {JSON.stringify(form, null, 2)}</Text>

        {/* Space */}
        <Layout style={{ height: 10 }} />

        {/* Button */}
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="log-in-outline" white />}
            onPress={onRegister}
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
        {/* Solo para hacer mas scroll */}
        <Layout style={{ height: 150 }} />
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
