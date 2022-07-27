import { Bank, CommercialBank, Customer } from "./instances";
import { SystemMethods } from "./systems";
import { PaymentMethods, AccountMethods } from "./methods";
import { bankLookup } from "./lookupTables";

interface SystemLookup {
  [key: string]: boolean;
}

export const bankingSystem: SystemLookup = {
  correspondent: false,
  clearinghouse: false,
  centralbank: false,
};

export class BankService {
  static deposit(a: CommercialBank, b: CommercialBank, amount: number) {
    PaymentMethods.creditAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    a.decreaseReserves(amount);
    b.increaseReserves(amount);
  }
  static withdraw(a: CommercialBank, b: CommercialBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
    a.increaseReserves(amount);
    b.decreaseReserves(amount);
  }
  static openAccount(c: Bank, b: Bank) {
    AccountMethods.createSubordinateAccount(
      c,
      b,
      0,
      "bankDeposits",
      "bankOverdrafts"
    );
  }
  static netDues(bank: Bank) {
    SystemMethods.netDues(bank);
  }
  static settleDues() {
    SystemMethods.settleDues();
  }
  //if you only want services to be publically available
  static creditAccount(bankA: Bank, bankB: Bank, amount: number) {
    PaymentMethods.creditAccount(bankA, bankB, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
  }
  static debitAccount(bankA: Bank, bankB: Bank, amount: number) {
    PaymentMethods.debitAccount(bankA, bankB, amount, [
      "bankDeposits",
      "bankOverdrafts",
    ]);
  }
}

export class CustomerService {
  static deposit(a: Customer, b: CommercialBank, amount: number) {
    PaymentMethods.creditAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    a.decreaseReserves(amount);
    b.increaseReserves(amount);
  }
  static withdraw(a: Customer, b: CommercialBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    a.increaseReserves(amount);
    b.decreaseReserves(amount);
  }
  private static automateTransferFromAccount(c: Customer) {
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
    const customersBank = bankLookup[bankId];
    return customersBank;
  }
  private static automateTransferToAccount(c: Customer) {
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
    let customersBank = bankLookup[bankId];
    return customersBank;
  }
  static transfer(
    customerA: Customer,
    customerB: Customer,
    amount: number,
    bank1?: Bank,
    bank2?: Bank
  ) {
    let bankA: Bank;
    let bankB: Bank;
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

    PaymentMethods.debitAccount(customerA, bankA, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    PaymentMethods.creditAccount(customerB, bankB, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    if (bankA.id !== bankB.id) {
      SystemMethods.increaseDues(bankA, bankB, amount);
    }
  }
  static openAccount(customer: Customer, bankB: Bank) {
    AccountMethods.createSubordinateAccount(
      customer,
      bankB,
      0,
      "customerDeposits",
      "customerOverdrafts"
    );
  }
  static createLoan(
    a: Customer,
    b: CommercialBank,
    amount: number,
    rate: number = 10
  ) {
    const interest = (amount * rate) / 100;
    const amountPlusInterest = amount + interest;
    a.createInstrument(
      b.id,
      "liabilities",
      "customerLoans",
      amountPlusInterest
    );
    b.createInstrument(a.id, "assets", "customerLoans", amountPlusInterest);
    PaymentMethods.creditAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
  }
  static repayLoan(a: Customer, b: CommercialBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    const loanAmount = b.assets.customerLoans.find((loan) => loan.id === a.id);
    if (loanAmount) {
      if (amount > loanAmount.amount) {
        amount = loanAmount.amount;
      }
      a.decreaseInstrument(b.id, "liabilities", "customerLoans", amount);
      b.decreaseInstrument(a.id, "assets", "customerLoans", amount);
    }
  }
  static repayLoanReserves(a: Customer, b: CommercialBank, amount: number) {
    a.decreaseReserves(amount);
    b.increaseReserves(amount);
    a.decreaseInstrument(b.id, "liabilities", "customerLoans", amount);
    b.decreaseInstrument(a.id, "assets", "customerLoans", amount);
  }
}

export class ClearingHouseService {
  static settleDues() {
    for (const bank in bankLookup) {
      bankLookup[bank].liabilities.dues.forEach((due) => {
        const clearinghouseOwesBank =
          due.amount > 0 &&
          bankLookup[bank].id === "clearinghouse" &&
          due.id !== "clearinghouse";
        const bankOwesClearinghouse =
          due.amount > 0 &&
          bankLookup[bank].id !== "clearinghouse" &&
          due.id === "clearinghouse";
        if (clearinghouseOwesBank) {
          PaymentMethods.creditAccount(
            bankLookup[due.id],
            bankLookup[bank],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        } else if (bankOwesClearinghouse) {
          PaymentMethods.debitAccount(
            bankLookup[bank],
            bankLookup[due.id],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        }
        PaymentMethods.clearDues(bankLookup[bank], bankLookup[due.id]);
      });
    }
  }
  static openAccount(bankA: Bank, bankB: Bank, amount: number = 0) {
    AccountMethods.createSubordinateAccount(
      bankA,
      bankB,
      amount,
      "chCertificates",
      "chOverdrafts"
    );
    bankB.increaseReserves(amount);
  }
}

class StatusCheckService {
  static overdraft(b: Bank) {
    return b.assets;
  }
}
