export type TAdmin = {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
};

export type TAdminDataSource = {
  key: number;
  serial: number;
  _id: string;
  name: string;
  email: string;
  phone_number: string;
};


export type TAuthAdmin = {
  _id: string;
  name: string;
  email: string;
  profile_image: string;
  phone_number: string;
  contact: string;
};