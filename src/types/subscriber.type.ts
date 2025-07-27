

export type TSubscriber = {
  _id: string;
  name: string;
  email: string;
  profile_image: string;
  company: {
    name: string;
  };
  //socialMedia: TSocialMedia;
  duration_time: string;
  subscription_status: "Active" | "Inactive" | "None" | string;
};


export type TSubscriberDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  email: string;
  profile_image: string | null;
  companyName: string;
  duration_time: string;
  subscription_status: "None" | "Expired" | "Expired" | string;
}