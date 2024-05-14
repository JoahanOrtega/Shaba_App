import React, { useState } from "react";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { AuthRegister } from "../../../actions/auth/auth";

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    address?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
  }>({});

  const handleRegister = async () => {
    // Validate before submission
    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined && error !== ""
    );
    if (hasErrors) {
      return;
    }

    const registeredUser = await AuthRegister(user);

    if (registeredUser) {
      navigation.navigate("LoginScreen");
    } else {
      // Handle errors or show message to user if registration fails
    }
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "first_name":
      case "last_name":
        if (!/^[a-zA-Z\s]*$/.test(value.trim())) {
          errorMessage =
            "Este campo no puede contener números ni caracteres especiales";
        }
        break;
      case "address":
        if (!value.trim()) {
          errorMessage = "Este campo es requerido";
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
          errorMessage = "El correo electrónico no es válido";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value.trim())) {
          errorMessage =
            "El número de teléfono debe tener 10 dígitos y no debe contener letras";
        }
        break;
      case "password":
        if (value.trim().length < 8) {
          errorMessage = "La contraseña debe tener al menos 8 caracteres";
        }
        break;
      case "password_confirmation":
        if (value.trim() !== user.password.trim()) {
          errorMessage = "Las contraseñas no coinciden";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    validateField(name, value); // Validate the field on every change
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        {/* title */}
        <Layout style={{ paddingTop: 20 }}>
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
            onChangeText={(text) => handleChange("first_name", text)}
            status={errors.first_name ? "danger" : "basic"}
            caption={errors.first_name}
          />
          <Input
            placeholder="Apellido"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={user.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
            status={errors.last_name ? "danger" : "basic"}
            caption={errors.last_name}
          />
          <Input
            placeholder="Dirección"
            accessoryLeft={<MyIcon name="navigation-outline" />}
            style={{ marginBottom: 10 }}
            value={user.address}
            onChangeText={(text) => handleChange("address", text)}
            status={errors.address ? "danger" : "basic"}
            caption={errors.address}
          />
          <Input
            placeholder="Teléfono"
            accessoryLeft={<MyIcon name="phone-outline" />}
            style={{ marginBottom: 10 }}
            value={user.phone}
            onChangeText={(text) => handleChange("phone", text)}
            status={errors.phone ? "danger" : "basic"}
            caption={errors.phone}
          />
          <Input
            placeholder="Correo electrónico"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            status={errors.email ? "danger" : "basic"}
            caption={errors.email}
          />
          <Input
            placeholder="Contraseña"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            secureTextEntry
            value={user.password}
            onChangeText={(text) => handleChange("password", text)}
            status={errors.password ? "danger" : "basic"}
            caption={errors.password}
          />
          <Input
            placeholder="Confirmar Contraseña"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            secureTextEntry
            value={user.password_confirmation}
            onChangeText={(text) => handleChange("password_confirmation", text)}
            status={errors.password_confirmation ? "danger" : "basic"}
            caption={errors.password_confirmation}
          />

          {/* Button */}
          <Layout>
            <Button
              // style={{ backgroundColor: "#ffc0cb", borderColor: "#ffc0cb" }}
              status="danger"
              onPress={handleRegister}
            >
              Crear
            </Button>
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
