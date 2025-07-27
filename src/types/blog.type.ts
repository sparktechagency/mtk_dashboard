

export type TBlog = {
  _id: string;
  title: string;
  category: string; 
  descriptions: string;
  image: string[]; 
  createdAt: string; 
};



export type TBlogDataSource = {
  key: number;
  serial: number;
  _id: string;
  title: string;
  category: string; 
  descriptions: string;
  image: string; 
  createdAt: string; 
};
