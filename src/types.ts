export type Rates = {
  [index: string]: number;
};
export type Quotes = {
  [index: string]: boolean;
};
export type Currency = "ecus" | "marcs";
export type Currencies = {
  [index: string]: Currency;
};
export type Bill = {
  id: string;
  dueTo: string;
  dueFrom: string;
  city: string;
  amount: number;
  status: boolean;
};