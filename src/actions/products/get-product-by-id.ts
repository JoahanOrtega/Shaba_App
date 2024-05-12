import { shabaApi } from "../../config/api/shabaApi";
import { Product, Size } from "../../domain/entities/product";
import { ShabaProduct } from "../../infrastructure/interfaces/products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Product = {
  id: -1,
  available_quantity: 0,
  color: "",
  description: "",
  id_category: 1,
  img: "",
  name: "",
  price: "",
  size: Size["S"],
  created_at: new Date(),
  updated_at: new Date(),
};

export const getProductById = async (id: number): Promise<Product> => {
  if (id === -1) return emptyProduct;
  try {
    const { data } = await shabaApi.get<ShabaProduct>(`/products/${id}`);

    return ProductMapper.shabaProducToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id: ${id}`);
  }
};
