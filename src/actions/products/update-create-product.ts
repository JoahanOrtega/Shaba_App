import { isAxiosError } from "axios";
import { shabaApi } from "../../config/api/shabaApi";
import { Product } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.available_quantity = isNaN(Number(product.available_quantity))
    ? 0
    : Number(product.available_quantity); // Esto puede dar NaN
  product.id_category = isNaN(Number(product.id_category))
    ? 0
    : Number(product.id_category); // Esto puede dar NaN

  //   Si se manda un ID significa que se esta actualizando un producto
  //   Por ende, ya existe

  if (product.id && product.id !== -1) {
    return updateProduct(product);
  }

  console.log("(update-create-product) Entrandoa createProduct");
  return createProduct(product);
};

// TODO: revisar que estoy mandando
const updateProduct = async (product: Partial<Product>) => {
  const currentDate = new Date();
  console.log("(update-create-product)");
  console.log({ product });

  //   Aqui estoy separando lo que no voy a subir a la BD
  product.updated_at = currentDate;
  const { id, img, id_category, created_at, ...rest } = product;

  try {
    console.log("lo que mando al put");
    console.log({ ...rest });
    const { data } = await shabaApi.put(`/products/${id}`, {
      id_category: id_category,
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

const createProduct = async (product: Partial<Product>) => {
  const currentDate = new Date();
  console.log("(update-create-product)");
  console.log({ product });

  //   Aqui estoy separando lo que no voy a subir a la BD
  product.updated_at = currentDate;
  const { id, img, ...rest } = product;

  try {
    console.log("lo que mando al put");
    console.log({ ...rest });
    const { data } = await shabaApi.post(`/products`, {
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
