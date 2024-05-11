import type { Product } from "../../domain/entities/product";
import type { ShabaProduct } from "../interfaces/products.responses";

export class ProductMapper {
  static shabaProducToEntity(shabaProduct: ShabaProduct): Product {
    return {
      id: shabaProduct.id,
      name: shabaProduct.name,
      description: shabaProduct.description,
      price: shabaProduct.price,
      id_subcategory: shabaProduct.id_subcategory,
      size: shabaProduct.size,
      color: shabaProduct.color,
      available_quantity: shabaProduct.available_quantity,
      img: shabaProduct.img,
      created_at: shabaProduct.created_at,
      updated_at: shabaProduct.updated_at,
    };
  }
}
