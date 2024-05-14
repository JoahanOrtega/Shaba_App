import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";
import { updateUser, deleteUser } from "../../actionsUser/user";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Props extends StackScreenProps<RootStackParams, "UserProfileScreen"> {}

export const UserProfileScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const userId = route.params.userId;
  console.log("Estoy dentro de UserProfileScreen con id " + userId);
  const { user, logout } = useAuthStore();
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

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    address?: string;
    email?: string;
    currentPassword?: string;
  }>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value); // Validate the field on every change
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "first_name":
      case "last_name":
        if (!/^[a-zA-Z\s]*$/.test(value.trim())) {
          errorMessage = "Este campo no puede contener números ni caracteres especiales";
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
      case "currentPassword":
        if (!value.trim()) {
          errorMessage = "Este campo es requerido";
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

  const handleSubmit = async () => {
    // Validation before submission
    const hasErrors = Object.values(errors).some((error) => error !== undefined && error !== "");
    if (hasErrors) {
      return;
    }

    try {
      console.log("Enviando datos de usuario para actualizar:", formData);
      const updatedUser = await updateUser(userId, formData);
      console.log("Respuesta del servidor después de la actualización:", updatedUser);
      if (updatedUser) {
        navigation.navigate("LandingScreen");
      } else {
        throw new Error("No se pudo actualizar los datos del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
    }
  };

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error al eliminar la cuenta del usuario:", error);
    }
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
          status={errors.first_name ? "danger" : "basic"}
          caption={errors.first_name}
        />
        <Input
          label="Apellido"
          value={formData.last_name}
          onChangeText={(value) => handleChange("last_name", value)}
          status={errors.last_name ? "danger" : "basic"}
          caption={errors.last_name}
        />
        <Input
          label="Dirección"
          value={formData.address}
          onChangeText={(value) => handleChange("address", value)}
          status={errors.address ? "danger" : "basic"}
          caption={errors.address}
        />
        <Input
          label="Correo Electrónico"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          status={errors.email ? "danger" : "basic"}
          caption={errors.email}
        />
        {/* Campos de contraseña */}
        <Text category="h6">Cambiar Contraseña</Text>
        <Input
          label="Contraseña Actual"
          secureTextEntry
          value={formData.currentPassword}
          onChangeText={(value) => handleChange("currentPassword", value)}
          status={errors.currentPassword ? "danger" : "basic"}
          caption={errors.currentPassword}
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
        {/* Mensaje de éxito si se eliminó la cuenta */}
        {deleteSuccess && (
          <Text style={{ color: "white", marginTop: 10 }}>
            La cuenta del usuario se eliminó correctamente
          </Text>
        )}
      </ScrollView>
    </Layout>
  );
};
