import { shabaApi } from "../../config/api/shabaApi";
import type { ShabaProduct } from "../../infrastructure/interfaces/products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProducts = async () => {
  try {
    const { data } = await shabaApi.get<ShabaProduct[]>(`/products`);
    const products = data.map((shabaProduct) =>
      ProductMapper.shabaProducToEntity(shabaProduct)
    );
    console.log("(get-products.ts)");
    console.log(products[1]);
    console.log("(/get-products.ts)");

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products");
  }
};
