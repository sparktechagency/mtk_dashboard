
export type TProductStatus = "visible" | "hidden";
export type TStockStatus = 'in_stock' | 'stock_out' | 'up_coming';

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
  status: TProductStatus;
  stockStatus: TStockStatus;
};


export type TProductDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
 // categoryId: string;
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  //discount: string;
  ratings: number;
  //totalReview: number;
  image: string;
  status: TProductStatus,
  stockStatus: TStockStatus;
}