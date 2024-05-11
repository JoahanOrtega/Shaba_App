import axios from "axios";
import { Data } from "../infrastructure/interfaces/auth.responses";
import { shabaApi } from "../config/api/shabaApi";

// Obtener un usuario por su ID
export const getUser = async (userId: number): Promise<Data | null> => {
  try {
    const response = await shabaApi.get<Data>(`/users/${userId}`);
    console.log("Respuesta del servidor al obtener usuario:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
};

// Actualizar los datos de un usuario
export const updateUser = async (
  userId: number,
  userData: Partial<Data>
): Promise<Data | null> => {
  try {
    const response = await shabaApi.put<Data>(`/users/${userId}`, userData);
    console.log(
      "Respuesta del servidor después de actualizar usuario:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar datos del usuario:", error);
    return null;
  }
};

// Eliminar un usuario por su ID
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await shabaApi.delete(`/users/${userId}`);
    console.log("Usuario eliminado correctamente");
    // No es necesario manejar el éxito aquí, puede manejar la lógica después de llamar a esta función
  } catch (error) {
    console.error("Error al eliminar la cuenta del usuario:", error);
    throw error; // Propagar el error para manejarlo donde sea necesario
  }
};
