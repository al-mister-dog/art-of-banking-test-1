import { IBank } from "../../../../domain/types";

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

type DispatchFunctionSig = (
  selected: IBank,
  selectedValueTo: IBank,
  selectedValueAmount: number
) => void;

export interface Dispatches {
  withdraw: DispatchFunctionSig;
  deposit: DispatchFunctionSig;
  transfer: DispatchFunctionSig;
  payBank: DispatchFunctionSig;
  createLoan: DispatchFunctionSig;
  receiveBankPayment: DispatchFunctionSig;
  sendBankPayment: DispatchFunctionSig;
  creditBankAccount: DispatchFunctionSig;
  debitBankAccount: DispatchFunctionSig;
}

export interface DuesDispatches {
  settleDues: () => void;
  netClearinghouseDues: () => void;
  netCorrespondingDues: () => void;
}

export interface PayloadArguments {
  p1: IBank;
  p2: IBank;
  amt: number;
}
