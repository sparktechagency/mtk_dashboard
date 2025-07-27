

export type IAuthUser = {
  id: string;
  iat: number;
  email: string;
  role: "USER" | "EMPLOYER" | "ADMIN" | "SUPER_ADMIN";
};

export interface IParam {
  name: string;
  value: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}


export interface IApiError {
  error: {
    status: number;
    data: {
      message: string;
    }
  }
}
  