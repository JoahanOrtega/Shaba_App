import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { ScrollView, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { updateUser, deleteUser } from "../../actionsUser/user"; // Importa las funciones updateUser y deleteUser

interface Props extends StackScreenProps<RootStackParams, "UserProfileScreen"> {}

export const UserProfileScreen = ({ route }: Props) => {
  const userId = route.params.userId; // Obtener el ID del usuario de los parámetros de navegación
  const { user, token } = useAuthStore(); // Obtener el usuario y el token del estado global
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
        first_name: user.first_name || "",
        last_name: user.last_name || "",
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

  const handleSubmit = async () => {
    try {
      console.log("Enviando datos de usuario para actualizar:", formData);
      const updatedUser = await updateUser(userId, formData, token); // Pasa el token a updateUser
      console.log("Respuesta del servidor después de la actualización:", updatedUser);
      if (updatedUser) {
        Alert.alert("Éxito", "Los datos del usuario se actualizaron correctamente");
      } else {
        throw new Error("No se pudo actualizar los datos del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
      Alert.alert("Error", "No se pudo actualizar los datos del usuario");
    }
  };

  const handleDeleteAccount = async () => {
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
              await deleteUser(userId, token); // Pasa el token a deleteUser
              Alert.alert("Éxito", "La cuenta del usuario se eliminó correctamente");
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
          value={formData.first_name}
          onChangeText={(value) => handleChange("first_name", value)}
        />
        <Input
          label="Apellido"
          value={formData.last_name}
          onChangeText={(value) => handleChange("last_name", value)}
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
