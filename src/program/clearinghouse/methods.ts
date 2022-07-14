import { Bank } from "./instances";
import { SystemMethods } from "./systems";
import { InstrumentKey } from "./types";

export class PaymentMethods {
  static creditAccount(
    a: Bank,
    b: Bank,
    amount: number,
    instruments: InstrumentKey[]
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      a.increaseInstrument(id, "balances", creditInstrument, amount);
      b.increaseInstrument(id, "balances", creditInstrument, amount);

      PaymentMethods.mapBalance(
        a,
        b,
        creditInstrument,
        debtInstrument,
        account.amount
      );
      createRecord(a, b, creditInstrument, amount, account.amount, true);
    }
  }

  static debitAccount(
    a: Bank,
    b: Bank,
    amount: number,
    instruments: InstrumentKey[]
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      a.decreaseInstrument(id, "balances", creditInstrument, amount);
      b.decreaseInstrument(id, "balances", creditInstrument, amount);
      PaymentMethods.mapBalance(
        a,
        b,
        creditInstrument,
        debtInstrument,
        account.amount
      );
      createRecord(a, b, creditInstrument, amount, account.amount, false);
    }
  }

  static mapBalance(
    a: Bank,
    b: Bank,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey,
    balance: number
  ) {
    if (balance > 0) {
      a.setAccount(b.id, "assets", creditInstrument, balance);
      b.setAccount(a.id, "liabilities", creditInstrument, balance);
      a.setAccount(b.id, "liabilities", debtInstrument, 0);
      b.setAccount(a.id, "assets", debtInstrument, 0);
    } else if (balance < 0) {
      a.setAccount(b.id, "liabilities", debtInstrument, -balance);
      b.setAccount(a.id, "assets", debtInstrument, -balance);
      a.setAccount(b.id, "assets", creditInstrument, 0);
      b.setAccount(a.id, "liabilities", creditInstrument, 0);
    } else if (balance === 0) {
      a.setAccount(b.id, "liabilities", debtInstrument, 0);
      b.setAccount(a.id, "assets", debtInstrument, 0);
      a.setAccount(b.id, "assets", creditInstrument, 0);
      b.setAccount(a.id, "liabilities", creditInstrument, 0);
    }
  }

  static settleDues() {
    SystemMethods.settleDues();
  }

  static clearDues(a: Bank, b: Bank) {
    a.setAccount(b.id, "assets", "dues", 0);
    a.setAccount(b.id, "liabilities", "dues", 0);
  }
}

export class AccountMethods {
  static createBalance(
    a: Bank,
    b: Bank,
    amount: number = 0,
    creditInstrument: InstrumentKey
  ) {
    const id = `${a.id}-${b.id}`;
    a.createInstrument(id, "balances", creditInstrument, amount);
    b.createInstrument(id, "balances", creditInstrument, amount);
  }

  static createSubordinateAccount(
    a: Bank,
    b: Bank,
    amount: number,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey
  ) {
    a.createInstrument(b.id, "assets", creditInstrument, amount);
    a.createInstrument(b.id, "liabilities", debtInstrument, 0);
    b.createInstrument(a.id, "assets", debtInstrument, 0);
    b.createInstrument(a.id, "liabilities", creditInstrument, amount);
    AccountMethods.createBalance(a, b, amount, creditInstrument);
  }
}

export class StatusMethods {
  static inOverdraft(bank: Bank) {
    const potentialOverdrafts = Object.entries(bank.liabilities).map(
      ([liabilityKey, liabilities]) => {
        return liabilities.find((liability) => liability.amount > 0);
      }
    );
    const overdrafts = potentialOverdrafts.filter((o) => o !== undefined);
    return overdrafts.length > 0 ? true : false;
  }
  static isConstantDebtor(bank: Bank, timesIndebted: number) {
    let num = 0;
    for (
      let i = bank.records.length - 1;
      i > bank.records.length - (timesIndebted + 1);
      i--
    ) {
      console.log(bank.records[i].credit);
      bank.records[i].credit ? num++ : num--;
    }
    return num === -timesIndebted ? true : false;
  }
  static isGeneralDebtor(bank: Bank) {
    const creditTransactions = bank.records.filter(
      (record) => record.credit === true
    );
    const debtTransactions = bank.records.filter(
      (record) => record.credit === false
    );
    return debtTransactions.length > creditTransactions.length;
  }
  static creditStatus(bank: Bank) {
    const creditTransactions = bank.records.filter(
      (record) => record.credit === true
    );
    const totalTransactions = bank.records.length;
    const timesInCredit = creditTransactions.length;
    return Math.round((timesInCredit / totalTransactions) * 100);
  }
}

function createRecord(
  a: Bank,
  b: Bank,
  creditInstrument: InstrumentKey,
  transactionAmount: number,
  balance: number,
  credit: boolean
) {
  const record = {
    id: `${a.id}`,
    accountId: `${a.id}-${b.id}`,
    accountType: creditInstrument,
    transactionAmount,
    balance,
    credit,
  };
  a.records.push(record);
}
