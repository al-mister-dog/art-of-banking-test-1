import { lookup } from "../lookupTables";
import { PaymentMethods, AccountMethods, partyFunctions } from "../methods";
import { IBank } from "../types";

export class CentralBankService {
  static settleDues() {
    for (const bank in lookup) {
      lookup[bank].liabilities.dues.forEach((due: any) => {
        const centralbankOwesBank =
          due.amount > 0 &&
          lookup[bank].id === "centralbank" &&
          due.id !== "centralbank";
        const bankOwesCentralBank =
          due.amount > 0 &&
          lookup[bank].id !== "centralbank" &&
          due.id === "centralbank";
        if (centralbankOwesBank) {
          PaymentMethods.creditAccount(
            lookup[due.id],
            lookup[bank],
            due.amount,
            ["bankDeposits", "daylightOverdrafts"]
          );
        } else if (bankOwesCentralBank) {
          PaymentMethods.debitAccount(
            lookup[bank],
            lookup[due.id],
            due.amount,
            ["bankDeposits", "daylightOverdrafts"]
          );
        }
        PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
      });
    }
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
    PaymentMethods.creditAccount(a, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
    PaymentMethods.debitAccount(b, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
  }

  static repayLoan(a: IBank, b: IBank, amount: number) {
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
    PaymentMethods.debitAccount(b, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
    PaymentMethods.creditAccount(a, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
  }
  static openAccount(bankA: IBank, bankB: IBank, amount: number = 0) {
    AccountMethods.createSubordinateAccount(
      bankA,
      bankB,
      amount,
      "bankDeposits",
      "daylightOverdrafts"
    );
    partyFunctions(bankB).increaseReserves(amount);
  }
}
