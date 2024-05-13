import { shabaApi } from "../config/api/shabaApi";
import { Data } from "../infrastructure/interfaces/auth.responses";

// updateUser en user.ts
export const updateUser = async (userId: number,userData: Partial<Data>
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

// deleteUser en user.ts
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    console.log("Intentando eliminar usuario con ID:", userId);
    await shabaApi.delete(`/users/${userId}`);
    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar la cuenta del usuario:", error);
    throw error;
  }
};
