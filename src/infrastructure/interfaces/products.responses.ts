export interface ShabaProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  id_category: number;
  size: Size;
  color: string;
  available_quantity: number;
  img: string;
  created_at?: Date;
  updated_at?: Date;
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
}
