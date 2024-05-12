import { shabaApi } from "../../config/api/shabaApi";
import type { ShabaProduct } from "../../infrastructure/interfaces/products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProducts = async () => {
  try {
    const { data } = await shabaApi.get<ShabaProduct[]>(`/products`);
    const products = data.map((shabaProduct) =>
      ProductMapper.shabaProducToEntity(shabaProduct)
    );

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products");
  }
};
