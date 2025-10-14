
export type TProductStatus = "visible" | "hidden";
export type TStockStatus = "In Stock" | "Out of Stock" | "Limited Stock";

export type IProduct = {
  _id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
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
  quantity: number;
  ratings: number;
  //totalReview: number;
  image: string;
  status: TProductStatus,
  stockStatus: TStockStatus;
}

export type ISingleProduct = {
  _id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  currentPrice: number;
  originalPrice: number;
  quantity: number;
  discount: string;
  ratings: number;
  totalReview: number;
  images: string[];
  colors: {
    _id: string;
    name: string;
    hexCode: string;
  }[];
  sizes: {
    _id: string;
    size: string;
  }[];
  introduction: string;
  description: string;
  status: "visible" | "hidden";
  stockStatus: "in_stock" | "out_of_stock";
};
