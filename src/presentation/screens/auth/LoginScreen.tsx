import { StackScreenProps } from "@react-navigation/stack";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParams } from "../../navigation/StackNavigator";
import { MyIcon } from "../../components/ui/MyIcon";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { height } = useWindowDimensions();

  const onLogin = async () => {
    console.log("entre al metodo onlogin");
    if (form.email.length === 0 || form.password.length === 0) {
      console.log("esta vacio el formulario nmms");
      return;
    }
    const wasSuccessful = await login(form.email, form.password);

    console.log(wasSuccessful);
    if (wasSuccessful) return;
    console.log("termino la validacion");
    Alert.alert("Error", "Usuario o contraseña incorrectos");
  };

  // //show env variables
  // const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  // console.log(apiUrl);

  console.log(height);
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
        </Layout>

        {/* visualize what inputs i have */}
        <Text> {JSON.stringify(form, null, 2)}</Text>

        {/* Space */}
        <Layout style={{ height: 10 }} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLogin}
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
