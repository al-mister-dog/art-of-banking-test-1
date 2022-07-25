import { partyFunctions } from "./instanceMethods";
import { lookup } from "./lookupTables";
import { PaymentMethods, AccountMethods } from "./methods";
import addToRecords from "./records";
import { SystemMethods } from "./systemMethods";

import { IBank } from "./types";

export class BankService {
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

export class CustomerService {
  static deposit(a: IBank, b: IBank, amount: number) {
    const record = addToRecords(a, {
      transactionType: "Deposit",
      party: b.id,
      amount: amount,
    });
    PaymentMethods.creditAccount(
      a,
      b,
      amount,
      ["customerDeposits", "customerOverdrafts"],
      record
    );
    partyFunctions(a).decreaseReserves(amount);
    partyFunctions(b).increaseReserves(amount);
  }
  static withdraw(a: IBank, b: IBank, amount: number) {
    const record = addToRecords(a, {
      transactionType: "Withdraw",
      party: b.id,
      amount: amount,
    });
    PaymentMethods.debitAccount(
      a,
      b,
      amount,
      ["customerDeposits", "customerOverdrafts"],
      record
    );
    partyFunctions(a).increaseReserves(amount);
    partyFunctions(b).decreaseReserves(amount);
  }
  private static automateTransferFromAccount(c: IBank) {
    const accountWithMostCash = c.balances.customerDeposits.sort(
      (acc1, acc2) => {
        if (acc1.amount < acc2.amount) {
          return 1;
        }

        if (acc1.amount > acc2.amount) {
          return -1;
        }

        return 0;
      }
    )[0];

    const bankId = accountWithMostCash.id.split("-")[1].toString();
    const customersBank = lookup[bankId];
    return customersBank;
  }
  private static automateTransferToAccount(c: IBank) {
    const accountWithLeastCash = c.balances.customerDeposits.sort(
      (acc1, acc2) => {
        if (acc1.amount > acc2.amount) {
          return 1;
        }

        if (acc1.amount < acc2.amount) {
          return -1;
        }
        return 0;
      }
    )[0];
    const bankId = accountWithLeastCash.id.split("-")[1].toString();
    const customersBank = lookup[bankId];
    return customersBank;
  }
  static transfer(
    customerA: IBank,
    customerB: IBank,
    amount: number,
    bank1?: IBank,
    bank2?: IBank
  ) {
    let bankA: IBank;
    let bankB: IBank;
    if (bank1) {
      bankA = bank1;
    } else {
      bankA = CustomerService.automateTransferFromAccount(customerA);
    }
    if (bank2) {
      bankB = bank2;
    } else {
      bankB = CustomerService.automateTransferToAccount(customerB);
    }
    const recordA = addToRecords(customerA, {
      transactionType: "Transfer",
      party: customerB.id,
      amount: amount,
    });
    const recordB = addToRecords(customerB, {
      transactionType: "Transfer",
      party: customerA.id,
      amount: amount,
    });
    PaymentMethods.debitAccount(
      customerA,
      bankA,
      amount,
      ["customerDeposits", "customerOverdrafts"],
      recordA
    );
    PaymentMethods.creditAccount(
      customerB,
      bankB,
      amount,
      ["customerDeposits", "customerOverdrafts"],
      recordB
    );
    if (bankA.id !== bankB.id) {
      SystemMethods.increaseDues(bankA, bankB, amount);
    }
  }
  static openAccount(customer: IBank, bankB: IBank) {
    AccountMethods.createSubordinateAccount(
      customer,
      bankB,
      0,
      "customerDeposits",
      "customerOverdrafts"
    );
  }
  static createLoan(a: IBank, b: IBank, amount: number, rate: number = 10) {
    const interest = (amount * rate) / 100;
    const amountPlusInterest = amount + interest;
    partyFunctions(a).createInstrument(
      b.id,
      "liabilities",
      "customerLoans",
      amountPlusInterest
    );
    partyFunctions(b).createInstrument(
      a.id,
      "assets",
      "customerLoans",
      amountPlusInterest
    );
    PaymentMethods.creditAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
  }
  static repayLoan(a: IBank, b: IBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    const loanAmount = b.assets.customerLoans.find((loan) => loan.id === a.id);
    if (loanAmount) {
      if (amount > loanAmount.amount) {
        amount = loanAmount.amount;
      }
      partyFunctions(a).decreaseInstrument(
        b.id,
        "liabilities",
        "customerLoans",
        amount
      );
      partyFunctions(b).decreaseInstrument(
        a.id,
        "assets",
        "customerLoans",
        amount
      );
    }
  }
  static repayLoanReserves(a: IBank, b: IBank, amount: number) {
    partyFunctions(a).decreaseReserves(amount);
    partyFunctions(b).increaseReserves(amount);
    partyFunctions(a).decreaseInstrument(
      b.id,
      "liabilities",
      "customerLoans",
      amount
    );
    partyFunctions(b).decreaseInstrument(
      a.id,
      "assets",
      "customerLoans",
      amount
    );
  }
}

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
    PaymentMethods.debitAccount(b, lookup["centralbank"], amount, [
      "bankDeposits",
      "daylightOverdrafts",
    ]);
    PaymentMethods.creditAccount(a, lookup["centralbank"], amount, [
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
