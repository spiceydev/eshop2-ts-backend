export interface PutOrderDto {
  orderItems: string[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: string;
  date: Date;
}
