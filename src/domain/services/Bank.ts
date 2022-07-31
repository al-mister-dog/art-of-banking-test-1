import {
  PaymentMethods,
  AccountMethods,
  SystemMethods,
  partyFunctions,
  RecordMethods,
} from "../methods";
import { lookup } from "../lookupTables";
import { IBank } from "../types";

export class BankService {
  static transfer(a: IBank, b: IBank, amount: number) {
    const recordA = RecordMethods.addToRecords(a, {
      transactionType: "Transfer",
      party: b.id,
      amount: amount,
    });
    const recordB = RecordMethods.addToRecords(b, {
      transactionType: "Transfer",
      party: a.id,
      amount: amount,
    });
    PaymentMethods.creditAccount(
      a,
      lookup["centralbank"],
      amount,
      ["bankDeposits", "daylightOverdrafts"],
      recordA
    );
    PaymentMethods.debitAccount(
      b,
      lookup["centralbank"],
      amount,
      ["bankDeposits", "daylightOverdrafts"],
      recordB
    );
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
      RecordMethods.createCorrespondingRecords(a, b, "Payment", amount)
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
    RecordMethods.createCorrespondingRecords(bankA, bankB, "credit", amount)
  }
  static debitAccount(bankA: IBank, bankB: IBank, amount: number) {
    PaymentMethods.debitAccount(bankA, bankB, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    RecordMethods.createCorrespondingRecords(bankA, bankB, "debit", amount)
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
    RecordMethods.createCorrespondingRecords(a, b, "bankLoans", amount)
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
      RecordMethods.createCorrespondingRecords(a, b, "repayLoan", amount)
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
    RecordMethods.createCorrespondingRecords(a, b, "repayLoan", amount)
  }
}
