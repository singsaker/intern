import { ProductType } from './product';
import { ShopType } from './shop';
import { MemberProps } from './user';

export interface SaleType {
  id: number;
  member: MemberProps;
  shop: ShopType;
  product: ProductType;
  quantity: number;
  price: number;
  date: string;
}
