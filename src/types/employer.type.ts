export type StatusType = 'Active' | 'Reported' | 'Block';

export interface IEmployer {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  serialNo: string;
  companyName: string;
  category: string;
  location: string;
  status: StatusType;
  subscription_status: "Active" | "None" | "Expired";
}

export type TEmployer = {
  _id: string;
  name: string;
  email: string;
  profile_image: string | null;
  authId: {
    is_block: boolean
  }
  // phone_number: string;
  // years_of_establishment: number | null;
  // details: string | null;
  // address: string | null;
  subscription_status: "None" | "Expired" | "Expired" | string;
  //status: "active" | "inactive" | string;
  // createdAt: string;
  // updatedAt: string;
  company: {
    // _id: string;
    // company_logo: string;
    name: string;
    // employer_position: string;
    // locations: string;
    // details: string;
    // website_link: string | null;
  };
};


export type TEmployerDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  email: string;
  profile_image: string | null;
  companyName: string;
  subscription_status: "None" | "Expired" | "Expired" | string;
  is_block: boolean
}
