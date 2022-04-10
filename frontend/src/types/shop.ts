import { ProductCategoryType, ProductType } from './product';

export interface ShopType {
  id: number;
  name: string;
  slug: string;
  description?: string;
  products?: ProductType[];
  productCategories: ProductCategoryType[];
}
