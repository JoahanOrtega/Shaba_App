import { shabaApi } from "../config/api/shabaApi";
import {
  AuthLogoutResponse,
  Data,
} from "../infrastructure/interfaces/auth.responses";

const returnDeleteSuccess = (data: AuthLogoutResponse) => {
  return data.status === "200";
};

// updateUser en user.ts
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

// deleteUser en user.ts
export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    console.log("Intentando eliminar usuario con ID:", userId);
    const { data } = await shabaApi.delete(`/users/${userId}`);
    console.log("Al intentar eliminar el usuario se obtu como respuesta =");
    console.log(data);
    return returnDeleteSuccess(data);
  } catch (error) {
    console.error("Error al eliminar la cuenta del usuario:", error);
    throw error;
  }
};
