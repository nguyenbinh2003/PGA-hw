export interface IProduct {
  id: number;
  status: string | null;
  currency: string | null;
  fundingMethod: string | null;
  total: number;
  order: string | null;
  client: string | null;
  invoice: string | null;
  createdBy: number | null;
  createdAt: string | null;
  updatedAt: string;
}
