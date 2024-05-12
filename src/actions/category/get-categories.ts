import { shabaApi } from "../../config/api/shabaApi";
import type { ShabaCategory } from "../../infrastructure/interfaces/categories.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getCategories = async () => {
  try {
    const { data } = await shabaApi.get<ShabaCategory[]>(`/categories`);
    const categories = data.map((shabaCategory) =>
      ProductMapper.shabaCategoryToEntity(shabaCategory)
    );
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting categories");
  }
};
