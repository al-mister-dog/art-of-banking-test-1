import { IBank } from "../../../../features/lectures/program/types";

export interface Accordions {
  deposit: boolean;
  transfer: boolean;
  withdraw: boolean;
  openAccount: boolean;
  netDues: boolean;
  chNetDues: boolean;
  settleDues: boolean;
  receiveBankPayment: boolean;
  sendBankPayment: boolean;
  creditBankAccount: boolean;
  debitBankAccount: boolean;
  getLoan: boolean;
}

export interface PartyOp {
  accordionKey: keyof Accordions;
  accordionTitle: string;
  institutions: string[];
  component: JSX.Element;
}

export interface PartyOps {
  customer: PartyOp[];
  bank: PartyOp[];
  clearinghouse: PartyOp[];
  centralbank: PartyOp[];
}

export interface FeatureObjects {
  [index: string]: JSX.Element;
}

export type FeatureCall = (
  selected: IBank,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void,
  config?: any
) => FeatureObjects;
