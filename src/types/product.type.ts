

export type IProduct = {
  _id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  ratings: number;
  totalReview: number;
  images: string[];
  status: "visible" | "hidden";
  stockStatus: "in_stock" | "out_of_stock";
};


export type TProductDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  discount: string;
  ratings: number;
  totalReview: number;
  image: string;
  status: "visible" | "hidden";
  stockStatus: "in_stock" | "out_of_stock";
}