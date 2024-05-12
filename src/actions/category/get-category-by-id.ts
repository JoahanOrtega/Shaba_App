import { shabaApi } from "../../config/api/shabaApi";
import { Category } from "../../domain/entities/category";
import { ShabaCategory } from "../../infrastructure/interfaces/categories.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Category = {
  id: -1,
  name: "",
  updated_at: new Date(),
};

export const getCategoryById = async (id: number): Promise<Category> => {
  if (id === -1) return emptyProduct;
  try {
    const { data } = await shabaApi.get<ShabaCategory>(`/categories/${id}`);

    return ProductMapper.shabaCategoryToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting category by id: ${id}`);
  }
};
