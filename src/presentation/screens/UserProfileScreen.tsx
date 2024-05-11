import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { ScrollView, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import axios from "axios";

interface Props extends StackScreenProps<RootStackParams, "UserProfileScreen"> {}

const UserProfileScreen = ({ route }: Props) => {
  const userId = route.params.userId; // Obtener el ID del usuario de los parámetros de navegación
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    if (user) {
      // Si el usuario está autenticado, establece los datos del usuario en el formulario
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        address: user.address || "",
        email: user.email || "",
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
      });
    }
  }, [user]);

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Aquí puedes enviar formData al servidor para actualizar los datos del usuario
    console.log(formData);
  };

  const handleDeleteAccount = () => {
    // Confirmar si el usuario realmente desea eliminar su cuenta
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Lógica para eliminar la cuenta del usuario utilizando Axios
              const response = await axios.delete(`http://localhost:8000/api/users/${userId}`);
              console.log(response.data); // Puedes manejar la respuesta según lo necesites
              // También puedes agregar una navegación aquí después de eliminar la cuenta
              // navigation.navigate("LoginScreen");
            } catch (error) {
              console.error("Error al eliminar la cuenta del usuario:", error);
              Alert.alert("Error", "No se pudo eliminar la cuenta del usuario");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text category="h1">Perfil de Usuario</Text>

        {/* Campos del perfil */}
        <Input
          label="Nombre"
          value={formData.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
        />
        <Input
          label="Apellido"
          value={formData.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
        />
        <Input
          label="Dirección"
          value={formData.address}
          onChangeText={(value) => handleChange("address", value)}
        />
        <Input
          label="Correo Electrónico"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />

        {/* Campos de contraseña */}
        <Text category="h6">Cambiar Contraseña</Text>
        <Input
          label="Contraseña Actual"
          secureTextEntry
          value={formData.currentPassword}
          onChangeText={(value) => handleChange("currentPassword", value)}
        />
        <Input
          label="Nueva Contraseña"
          secureTextEntry
          value={formData.newPassword}
          onChangeText={(value) => handleChange("newPassword", value)}
        />
        <Input
          label="Confirmar Nueva Contraseña"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />

        {/* Botones de guardar y eliminar */}
        <Button onPress={handleSubmit}>Guardar Cambios</Button>
        <Button onPress={handleDeleteAccount} status="danger">
          Eliminar Cuenta
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default UserProfileScreen;
