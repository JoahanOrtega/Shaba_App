import { isAxiosError } from "axios";
import { shabaApi } from "../../config/api/shabaApi";
import { Product } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.available_quantity = isNaN(Number(product.available_quantity))
    ? 0
    : Number(product.available_quantity); // Esto puede dar NaN
  product.id_subcategory = isNaN(Number(product.id_subcategory))
    ? 0
    : Number(product.id_subcategory); // Esto puede dar NaN

  //   Si se manda un ID significa que se esta actualizando un producto
  //   Por ende, ya existe

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error("Creacion no esta implementado");
};

// TODO: revisar que estoy mandando
const updateProduct = async (product: Partial<Product>) => {
  const currentDate = new Date();
  console.log("(update-create-product)");
  console.log({ product });

  //   Aqui estoy separando lo que no voy a subir a la BD
  product.updated_at = currentDate;
  const { id, img, id_subcategory, created_at, ...rest } = product;

  try {
    console.log("lo que mando al put");
    console.log({ ...rest });
    const { data } = await shabaApi.put(`/products/${id}`, {
      id_subcategory: id_subcategory,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    throw new Error("Error al actualizar product");
  }
};
