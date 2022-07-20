export interface Accordions {
  deposit: boolean;
  transfer: boolean;
  withdraw: boolean;
  openAccount: boolean;
  netDues: boolean;
  settleDues: boolean;
  getLoan: boolean;
}

export interface PartyOps {
  customer: any[];
  bank: any[];
  clearinghouse: any[];
  centralbank: any[];
}