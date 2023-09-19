export type Company = {
  _id: string;
  name: string;
  legalNumber: number;
  incorporationCountry: string;
  website: string;
};

export type CompanyRequestResponse = {
  page: number;
  pageSize: number;
  total: number;
  companies: Company[];
};
