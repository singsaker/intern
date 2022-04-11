import { ShopType } from './shop';

export interface ProductType {
  id: number;
  name: string;
  description?: string;
  quantity?: number;
  price?: number;
  shop: ShopType;
  productCategories: ProductCategoryType[];
}

export interface ProductCategoryType {
  id: number;
  name: string;
  description?: string;
  shop: ShopType;
}
