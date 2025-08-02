
export type TPaymentStatus = "paid" | "unpaid" | "failled";
export type TDeliveryStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type IOrder = {
  _id: string;
  token: string;
  fullName: string;
  email: string;
  phone: string;
  status: TDeliveryStatus; 
  paymentStatus: TPaymentStatus; 
  createdAt: string; 
};



export type TOrderDataSource = {
  key: number;
  serial: number;
 _id: string;
  token: string;
  fullName: string;
  email: string;
  phone: string;
  status: TDeliveryStatus; 
  paymentStatus: TPaymentStatus; 
  createdAt: string; 
}