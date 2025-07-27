

export type TTransaction = {
  paymentDetails: {
    email: string;
    payId: string;
    currency: string;
  };
  _id: string;
  subscriptionId: {
    _id: string;
    name: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    profile_image: string;
  };
  userEmail: string;
  amount: number;
  transactionId: string;
  paymentStatus: string;
  createdAt: string; 
  updatedAt: string; 
};

export type TTransactionDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    email: string;
    plan: string;
    paymentStatus: string;
    amount: number;
    createdAt: string; 
}