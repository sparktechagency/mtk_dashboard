

export type TJob = {
  _id: string;
  authId: string;
  userId: string;
  title: string;
  category: {
    category: string;
  };
  status: string;
  vacancies: number;
  application_dateline: string; 
  createdAt: string;
};


export type TJobDataSource = {
    key: number;
    serial: number;
    _id: string;
    title: string;
    vacancies: number;
    category: string;
    createdAt: string;
    application_dateline: string;
    status: string;
}
