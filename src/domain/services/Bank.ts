import {
  PaymentMethods,
  AccountMethods,
  SystemMethods,
  partyFunctions,
} from "../methods";
import { lookup } from "../lookupTables";
import { IBank } from "../types";

export class BankService {
  static transfer(a: IBank, b: IBank, amount: number) {
    PaymentMethods.creditAccount(a, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
    PaymentMethods.debitAccount(b, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
  }
  static payBank(a: IBank, b: IBank) {
    const amountDue = b.liabilities.dues.find(
      (account: { id: string }) => account.id === a.id
    );
    let amount: number;
    if (amountDue) {
      amount = amountDue.amount;
      partyFunctions(a).increaseReserves(amount);
      partyFunctions(b).decreaseReserves(amount);
      PaymentMethods.clearDue(a, b);
    }
  }
  static deposit(a: IBank, b: IBank, amount: number) {
    PaymentMethods.creditAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    partyFunctions(a).decreaseReserves(amount);
    partyFunctions(b).increaseReserves(amount);
  }
  static withdraw(a: IBank, b: IBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    partyFunctions(a).increaseReserves(amount);
    partyFunctions(b).decreaseReserves(amount);
  }
  static openAccount(c: IBank, b: IBank, amount: number = 0) {
    AccountMethods.createSubordinateAccount(
      c,
      b,
      amount,
      "bankDeposits",
      "bankOverdrafts"
    );
  }
  static netDues(bank: IBank) {
    SystemMethods.netDues(bank);
  }
  static settleDues() {
    SystemMethods.settleDues();
  }

  static creditAccount(bankA: IBank, bankB: IBank, amount: number) {
    PaymentMethods.creditAccount(bankA, bankB, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
  }
  static debitAccount(bankA: IBank, bankB: IBank, amount: number) {
    PaymentMethods.debitAccount(bankA, bankB, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
  }
  static createLoan(a: IBank, b: IBank, amount: number, rate: number = 10) {
    const interest = (amount * rate) / 100;
    const amountPlusInterest = amount + interest;
    partyFunctions(a).createInstrument(
      b.id,
      "liabilities",
      "bankLoans",
      amountPlusInterest
    );
    partyFunctions(b).createInstrument(
      a.id,
      "assets",
      "bankLoans",
      amountPlusInterest
    );
    PaymentMethods.creditAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
  }
  static repayLoan(a: IBank, b: IBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    const loanAmount = b.assets.bankLoans.find((loan) => loan.id === a.id);
    if (loanAmount) {
      if (amount > loanAmount.amount) {
        amount = loanAmount.amount;
      }
      partyFunctions(a).decreaseInstrument(
        b.id,
        "liabilities",
        "bankLoans",
        amount
      );
      partyFunctions(b).decreaseInstrument(a.id, "assets", "bankLoans", amount);
    }
  }
  static repayLoanReserves(a: IBank, b: IBank, amount: number) {
    partyFunctions(a).decreaseReserves(amount);
    partyFunctions(b).increaseReserves(amount);
    partyFunctions(a).decreaseInstrument(
      b.id,
      "liabilities",
      "bankLoans",
      amount
    );
    partyFunctions(b).decreaseInstrument(a.id, "assets", "bankLoans", amount);
  }
}
