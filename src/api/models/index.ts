export type Product = {
  id?: string;
  name: string;
  sku: string;
  serial: string;
  price: string;
  stock: string;
  created_at?: string;
  updated_at?: string;
};

export type Pagination = {
  count: number | null;
  page: number | null;
  outset: number | null;
  limit: number | null;
  offset: number | null;
  last: number | null;
  from: number | null;
  to: number | null;
  in: number | null;
  prev: number | null;
  next: number | null;
};
