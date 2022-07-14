export interface Accordions {
  deposit: boolean;
  transfer: boolean;
  withdraw: boolean;
  openAccount: boolean;
  netDues: boolean;
  settleDues: boolean;
}

export interface PartyOps {
  customer: any[];
  bank: any[];
  clearinghouse: any[];
}