import { shabaApi } from "../../config/api/shabaApi";

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    await shabaApi.delete(`/products/${id}`);
    console.log("Product elminated correctly");
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el producto ");
  }
};
