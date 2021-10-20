export interface PutProductDto {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images?: string[];
  brand: string;
  price: number;
  discount: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
}
