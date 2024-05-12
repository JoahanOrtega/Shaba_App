import type { Product } from "../../domain/entities/product";
import type { Category } from "../../domain/entities/category";
import type { ShabaProduct } from "../interfaces/products.responses";
import { ShabaCategory } from "../interfaces/categories.responses";

export class ProductMapper {
  static shabaProducToEntity(shabaProduct: ShabaProduct): Product {
    return {
      id: shabaProduct.id,
      name: shabaProduct.name,
      description: shabaProduct.description,
      price: shabaProduct.price,
      id_category: shabaProduct.id_category,
      size: shabaProduct.size,
      color: shabaProduct.color,
      available_quantity: shabaProduct.available_quantity,
      img: shabaProduct.img,
      created_at: shabaProduct.created_at,
      updated_at: shabaProduct.updated_at,
    };
  }
  static shabaCategoryToEntity(shabaCategory: ShabaCategory): Category {
    return {
      id: shabaCategory.id,
      name: shabaCategory.name,
      updated_at: shabaCategory.updated_at,
    };
  }
}
