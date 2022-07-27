import { lookup } from "../lookupTables";
import { PaymentMethods, AccountMethods, partyFunctions } from "../methods";
import { IBank } from "../types";

export class ClearingHouseService {
  static settleDues() {
    for (const bank in lookup) {
      lookup[bank].liabilities.dues.forEach((due: any) => {
        const clearinghouseOwesBank =
          due.amount > 0 &&
          lookup[bank].id === "clearinghouse" &&
          due.id !== "clearinghouse";
        const bankOwesClearinghouse =
          due.amount > 0 &&
          lookup[bank].id !== "clearinghouse" &&
          due.id === "clearinghouse";
        if (clearinghouseOwesBank) {
          PaymentMethods.creditAccount(
            lookup[due.id],
            lookup[bank],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        } else if (bankOwesClearinghouse) {
          PaymentMethods.debitAccount(
            lookup[bank],
            lookup[due.id],
            due.amount,
            ["chCertificates", "chOverdrafts"]
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
      "chLoans",
      amountPlusInterest
    );
    partyFunctions(b).createInstrument(
      a.id,
      "assets",
      "chLoans",
      amountPlusInterest
    );
    // PaymentMethods.debitAccount(b, lookup["clearinghouse"], amount, [
    //   "chCertificates",
    //   "chOverdrafts",
    // ]);
    PaymentMethods.creditAccount(a, lookup["clearinghouse"], amount, [
      "chCertificates",
      "chOverdrafts",
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

  static handleOveraft() {
    const debtorBanks = lookup["clearinghouse"].assets.chOverdrafts
      .filter((account) => account.amount > 0)
      .map((account) => lookup[account.id]);
    const creditorBanks = lookup["clearinghouse"].assets.chOverdrafts
      .filter((account) => account.amount === 0)
      .map((account) => lookup[account.id]);

    if (debtorBanks.length > 0) {
      const debtAmount = debtorBanks
        .map((bank) => {
          return bank.liabilities.chOverdrafts[0].amount;
        })
        .reduce((a, c) => a + c);

      const allocatedDebtAmount = debtAmount / debtorBanks.length;
      const allocatedCreditAmount = debtAmount / creditorBanks.length;

      debtorBanks.forEach((bank) => {
        ClearingHouseService.createLoan(
          bank,
          lookup["clearinghouse"],
          parseInt(allocatedDebtAmount.toFixed(2)),
          6
        );
      });
      creditorBanks.forEach((bank) => {
        ClearingHouseService.createLoan(
          lookup["clearinghouse"],
          bank,
          parseInt(allocatedCreditAmount.toFixed(2)),
          6
        );
        bank.assets.chCertificates[0].amount -= parseInt(
          allocatedCreditAmount.toFixed(2)
        );
      });
    }
  }

  static openAccount(bankA: IBank, bankB: IBank, amount: number = 0) {
    AccountMethods.createSubordinateAccount(
      bankA,
      bankB,
      amount,
      "chCertificates",
      "chOverdrafts"
    );
    partyFunctions(bankB).increaseReserves(amount);
  }
}
