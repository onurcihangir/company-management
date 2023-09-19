import { Company } from "../company/Companies.types";

export type Product = {
  _id: number;
  name: string;
  category: string;
  amount: number;
  amountUnit: string;
  company: Company;
};

export type ProductRequestResponse = {
  page: number;
  pageSize: number;
  total: number;
  products: Product[];
};
