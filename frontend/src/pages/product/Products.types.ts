export type Product = {
  _id: number;
  name: string;
  category: string;
  amount: number;
  amountUnit: string;
  company: {
    id: number;
    name: string;
  };
};

export type ProductRequestResponse = {
  page: number;
  pageSize: number;
  total: number;
  products: Product[];
};
