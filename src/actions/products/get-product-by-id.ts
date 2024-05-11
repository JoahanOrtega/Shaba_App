import { shabaApi } from "../../config/api/shabaApi";
import { Product } from "../../domain/entities/product";
import { ShabaProduct } from "../../infrastructure/interfaces/products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const { data } = await shabaApi.get<ShabaProduct>(`/products/${id}`);

    return ProductMapper.shabaProducToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id: ${id}`);
  }
};
