import React, { useState } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { MyIcon } from "../../components/ui/MyIcon";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { height } = useWindowDimensions();

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return;
    }
    // Validación de formato de correo electrónico
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return "El correo electrónico no es válido";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return;
    }
    if (password.trim().length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    return undefined;
  };

  const onLogin = async () => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (emailError || passwordError) {
      Alert.alert("Error", emailError || passwordError);
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) {
      const user = useAuthStore.getState().user;
      if (user) {
        await StorageAdapter.setItem("userId", user.id.toString());
        const storedToken = await StorageAdapter.getItem("userId");
      }
      console.log("(LoginScreen) Login was successful");
      return;
    }

    Alert.alert("Error", "Usuario o contraseña incorrectos");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingresa para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            status={validateEmail(form.email) ? "danger" : "basic"}
            caption={validateEmail(form.email)}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            status={validatePassword(form.password) ? "danger" : "basic"}
            caption={validatePassword(form.password)}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 10 }} />

        {/* Button */}
        <Layout>
          <Button
            disabled={isPosting}
            // style={{ backgroundColor: "#ffc0cb", borderColor: "#ffc0cb" }}
            accessoryRight={<MyIcon name="log-in-outline" white />}
            onPress={onLogin}
            status="danger"
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
          <Text
            status="primary"
            category="s1"
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            {" "}
            crea una{" "}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

{
  /* <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Layout style={{ paddingTop: height * 35 }}>
          <Text category="h1">Ingresar</Text>
          <Text>Por favor, ingrese para continuar</Text>
        </Layout>
      </ScrollView>
    </Layout> */
}
