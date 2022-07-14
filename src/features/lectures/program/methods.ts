import { partyFunctions } from "./instanceMethods";
import { SystemMethods } from "./systemMethods";
import { IBank, InstrumentKey } from "./types";

export class PaymentMethods {
  static creditAccount(
    a: IBank,
    b: IBank,
    amount: number,
    instruments: InstrumentKey[]
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      partyFunctions(a).increaseInstrument(id, "balances", creditInstrument, amount);
      partyFunctions(b).increaseInstrument(id, "balances", creditInstrument, amount);

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
    a: IBank,
    b: IBank,
    amount: number,
    instruments: InstrumentKey[]
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      partyFunctions(a).decreaseInstrument(id, "balances", creditInstrument, amount);
      partyFunctions(b).decreaseInstrument(id, "balances", creditInstrument, amount);
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
    a: IBank,
    b: IBank,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey,
    balance: number
  ) {
    if (balance > 0) {
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, balance);
      partyFunctions(b).setAccount(
        a.id,
        "liabilities",
        creditInstrument,
        balance
      );
      partyFunctions(a).setAccount(b.id, "liabilities", debtInstrument, 0);
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, 0);
    } else if (balance < 0) {
      partyFunctions(a).setAccount(
        b.id,
        "liabilities",
        debtInstrument,
        -balance
      );
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, -balance);
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, 0);
      partyFunctions(b).setAccount(a.id, "liabilities", creditInstrument, 0);
    } else if (balance === 0) {
      partyFunctions(a).setAccount(b.id, "liabilities", debtInstrument, 0);
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, 0);
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, 0);
      partyFunctions(b).setAccount(a.id, "liabilities", creditInstrument, 0);
    }
  }

  static settleDues() {
    SystemMethods.settleDues();
  }

  static clearDues(a: IBank, b: IBank) {
    partyFunctions(a).setAccount(b.id, "assets", "dues", 0);
    partyFunctions(a).setAccount(b.id, "liabilities", "dues", 0);
  }
  static clearDue(a: IBank, b: IBank) {
    partyFunctions(a).setAccount(b.id, "assets", "dues", 0);
    partyFunctions(b).setAccount(a.id, "liabilities", "dues", 0);
  }
}

export class AccountMethods {
  static createBalance(
    a: IBank,
    b: IBank,
    amount: number = 0,
    creditInstrument: InstrumentKey
  ) {
    const id = `${a.id}-${b.id}`;
    partyFunctions(a).createInstrument(
      id,
      "balances",
      creditInstrument,
      amount
    );
    partyFunctions(b).createInstrument(
      id,
      "balances",
      creditInstrument,
      amount
    );
  }

  static createSubordinateAccount(
    a: IBank,
    b: IBank,
    amount: number,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey
  ) {
    partyFunctions(a).createInstrument(
      b.id,
      "assets",
      creditInstrument,
      amount
    );
    partyFunctions(a).createInstrument(b.id, "liabilities", debtInstrument, 0);
    partyFunctions(b).createInstrument(a.id, "assets", debtInstrument, 0);
    partyFunctions(b).createInstrument(
      a.id,
      "liabilities",
      creditInstrument,
      amount
    );
    AccountMethods.createBalance(a, b, amount, creditInstrument);
  }
}

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
      console.log(bank.records[i].credit);
      bank.records[i].credit ? num++ : num--;
    }
    return num === -timesIndebted ? true : false;
  }
  static isGeneralDebtor(bank: IBank) {
    const creditTransactions = bank.records.filter(
      (record:any) => record.credit === true
    );
    const debtTransactions = bank.records.filter(
      (record:any) => record.credit === false
    );
    return debtTransactions.length > creditTransactions.length;
  }
  static creditStatus(bank: IBank) {
    const creditTransactions = bank.records.filter(
      (record:any) => record.credit === true
    );
    const totalTransactions = bank.records.length;
    const timesInCredit = creditTransactions.length;
    return Math.round((timesInCredit / totalTransactions) * 100);
  }
}

function createRecord(
  a: IBank,
  b: IBank,
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
