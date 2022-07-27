import { lookup } from "../lookupTables";
import {
  PaymentMethods,
  AccountMethods,
  SystemMethods,
  partyFunctions,
} from "../methods";
import { RecordMethods } from "../methods/Record";
import { IBank } from "../types";

export class CustomerService {
  static deposit(a: IBank, b: IBank, amount: number) {
    const record = RecordMethods.addToRecords(a, {
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
    const record = RecordMethods.addToRecords(a, {
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
    const recordA = RecordMethods.addToRecords(customerA, {
      transactionType: "Transfer",
      party: customerB.id,
      amount: amount,
    });
    const recordB = RecordMethods.addToRecords(customerB, {
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
