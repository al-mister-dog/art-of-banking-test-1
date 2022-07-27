import { IBank } from "../types";

export class StatusMethods {
  static inOverdraft(bank: IBank) {
    const potentialOverdrafts = Object.entries(bank.liabilities).map(
      ([liabilityKey, liabilities]) => {
        return liabilities.find((liability) => liability.amount > 0);
      }
    );
    const overdrafts = potentialOverdrafts.filter((o) => o !== undefined);
    return overdrafts.length > 0 ? true : false;
  }
  static isConstantDebtor(bank: IBank, timesIndebted: number) {
    let num = 0;
    for (
      let i = bank.records.length - 1;
      i > bank.records.length - (timesIndebted + 1);
      i--
    ) {
      bank.records[i].credit ? num++ : num--;
    }
    return num === -timesIndebted ? true : false;
  }
  static isGeneralDebtor(bank: IBank) {
    const creditTransactions = bank.records.filter(
      (record: any) => record.credit === true
    );
    const debtTransactions = bank.records.filter(
      (record: any) => record.credit === false
    );
    return debtTransactions.length > creditTransactions.length;
  }
  static creditStatus(bank: IBank) {
    const creditTransactions = bank.records.filter(
      (record: any) => record.credit === true
    );
    const totalTransactions = bank.records.length;
    const timesInCredit = creditTransactions.length;
    return Math.round((timesInCredit / totalTransactions) * 100);
  }
}