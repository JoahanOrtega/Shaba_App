import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { ScrollView, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { getUser,updateUser,deleteUser } from "../../actionsUser/user";

interface Props extends StackScreenProps<RootStackParams, "UserProfileScreen"> {}

export const UserProfileScreen = ({ route }: Props) => {
  const userId = route.params.userId;
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
      console.log("Datos del usuario cargados:", user);
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

  const handleSubmit = async () => {
    try {
      console.log("Enviando datos de usuario para actualizar:", formData);
      const updatedUser = await updateUser(userId, formData);
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
  
  

  const handleDeleteAccount = () => {
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
              // Eliminar la cuenta del usuario
              await deleteUser(userId);
              Alert.alert("Éxito", "La cuenta del usuario se eliminó correctamente");
              // Navegar a la pantalla de inicio de sesión u otra pantalla apropiada
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
        <br></br>
        <Button onPress={handleDeleteAccount} status="danger">
          Eliminar Cuenta
        </Button>
      </ScrollView>
    </Layout>
  );
};
