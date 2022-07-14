import counterReducer, { reset } from "./fundamentalsSlice";
export interface Account {
  id: string;
  type: string;
  amount: number;
}

export type Instrument = Account[];

export interface Category {
  [key: string]: Instrument;
}

export interface CategoryTypes {
  assets: Instrument;
  liabilities: Instrument;
  balances: object[];
}

export interface InstrumentTypes {
  bankDeposits: Account[];
  bankOverdrafts: Account[];
  bankLoans: Account[];
  customerOverdrafts: Account[];
  customerDeposits: Account[];
  dues: Account[];
  chCertificates: Account[];
  chOverdrafts: Account[];
  customerLoans: Account[];
}
export interface IBank {
  id: string;
  type: string;
  assets: Category;
  liabilities: Category;
  balances: Category;
  reserves: number;
  records: any;
}
export type CategoryKey = keyof CategoryTypes;
export type InstrumentKey = keyof InstrumentTypes;

export interface IBankLookup {
  [key: string]: IBank;
}
export interface ICustomerLookup {
  [key: string]: IBank;
}

export interface IRecord {
  id: string;
  accountId: string;
  accountType: InstrumentKey;
  transactionAmount: number;
  balance: number;
  credit: boolean;
}

//FIXTURES
export let bankLookup: IBankLookup = {};
export let customerLookup: ICustomerLookup = {};

export const commercialAssets = {
  bankDeposits: [],
  bankOverdrafts: [],
  bankLoans: [],
  customerOverdrafts: [],
  chCertificates: [],
  chOverdrafts: [],
  customerLoans: [],
  dues: [],
};

export const commercialLiabilities = {
  bankDeposits: [],
  bankOverdrafts: [],
  bankLoans: [],
  customerDeposits: [],
  chCertificates: [],
  chOverdrafts: [],
  customerLoans: [],
  dues: [],
};

export const commercialBalances = {
  bankDeposits: [],
  customerDeposits: [],
  chCertificates: [],
};

export const customerAssets = { customerDeposits: [] };

export const customerLiabilities = {
  customerOverdrafts: [],
  customerLoans: [],
};

export const customerBalances = { customerDeposits: [] };

export const clearinghouseAssets = {
  chOverdrafts: [],
  dues: [],
};

export const clearinghouseLiabilities = {
  chCertificates: [],
  dues: [],
};

export const clearinghouseBalances = {
  chCertificates: [],
};

//MAIN METHODS
const partyFunctions = (bank: IBank) => ({
  setAccount(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number
  ) {
    const index = this.findAccountIndex(id, category, instrument);
    if (index !== -1) {
      bank[category][instrument][index].amount = amount;
    }
  },

  isAccount(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey
  ): boolean {
    let account = bank[category][instrument].find(
      (acc: Account) => acc.id === id
    );
    return account ? true : false;
  },

  createInstrument(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number = 0
  ): void {
    bank[category][instrument] = [
      ...bank[category][instrument],
      { id, type: instrument, amount },
    ];
  },

  findAccountIndex(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey
  ) {
    const index = bank[category][instrument].findIndex((acc: Account) => {
      return acc.id === id;
    });
    return index;
  },

  increaseInstrument(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number
  ) {
    if (!this.isAccount(id, category, instrument)) {
      this.createInstrument(id, category, instrument, amount);
    } else {
      const index = this.findAccountIndex(id, category, instrument);
      bank[category][instrument][index].amount += amount;
    }
  },

  decreaseInstrument(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number
  ) {
    if (!this.isAccount(id, category, instrument)) {
      this.createInstrument(id, category, instrument, amount);
    } else {
      const index = this.findAccountIndex(id, category, instrument);
      bank[category][instrument][index].amount -= amount;
    }
  },

  increaseReserves(amount: number) {
    bank.reserves += amount;
  },

  decreaseReserves(amount: number) {
    bank.reserves -= amount;
  },
});

//SERVICES
export class BankService {
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
  static openAccount(c: IBank, b: IBank) {
    AccountMethods.createSubordinateAccount(
      c,
      b,
      0,
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
  //if you only want services to be publically available
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
}

export class CustomerService {
  static deposit(a: IBank, b: IBank, amount: number) {
    PaymentMethods.creditAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
    partyFunctions(a).decreaseReserves(amount);
    partyFunctions(b).increaseReserves(amount);
  }
  static withdraw(a: IBank, b: IBank, amount: number) {
    PaymentMethods.debitAccount(a, b, amount, [
      "customerDeposits",
      "customerOverdrafts",
    ]);
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
    const customersBank = bankLookup[bankId];
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
    let customersBank = bankLookup[bankId];
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
    for (const bank in bankLookup) {
      // eslint-disable-next-line no-loop-func
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
      partyFunctions(a).increaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
      partyFunctions(b).increaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );

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
      partyFunctions(a).decreaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
      partyFunctions(b).decreaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
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

type SystemType = {
  increaseDues(bankA: IBank, bankB: IBank, amount: number): void;
  netDues(bank: IBank): void;
  settleDues(): void;
};

export let SystemMethods: SystemType;
export let systemCheck = "";

export class System {
  static setSystem(sys?: string) {
    if (!sys) {
      SystemMethods = new DefaultSystem();
      systemCheck = "default";
    } else if (sys === "correspondent") {
      SystemMethods = new CorrespondentSystem();
      systemCheck = "correspondent";
    } else if (sys === "clearinghouse") {
      SystemMethods = new ClearingHouseSystem();
      systemCheck = "clearinghouse";
    }
  }
}

abstract class AbstractSystem {
  abstract increaseDues(bankA: IBank, bankB: IBank, amount: number): void;
  abstract netDues(bank: IBank): void;
  abstract settleDues(): void;
}
class CorrespondentSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      bankB.id,
      "liabilities",
      "dues",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      bankA.id,
      "assets",
      "dues",
      amount
    );
  }
  netDues(bank: IBank): void {
    bank.assets.dues.forEach((thisDue) => {
      let dueFrom = thisDue;
      let dueTo = bank.liabilities.dues.find((due) => (due.id = thisDue.id));
      if (!dueTo) {
        return;
      }
      if (dueFrom.amount > dueTo.amount) {
        dueFrom.amount = dueFrom.amount - dueTo.amount;
        dueTo.amount = 0;
      }
      if (dueTo.amount > dueFrom.amount) {
        dueTo.amount = dueTo.amount - dueFrom.amount;
        dueFrom.amount = 0;
      }
      if (dueTo.amount === dueFrom.amount) {
        dueTo.amount = 0;
        dueFrom.amount = 0;
      }
    });
  }
  settleDues(): void {
    for (const bank in bankLookup) {
      // eslint-disable-next-line no-loop-func
      bankLookup[bank].liabilities.dues.forEach((due) => {
        PaymentMethods.creditAccount(
          bankLookup[due.id],
          bankLookup[bank],
          due.amount,
          ["bankDeposits", "bankOverdrafts"]
        );
        PaymentMethods.clearDues(bankLookup[bank], bankLookup[due.id]);
      });
    }
  }
}

class ClearingHouseSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      bankLookup["clearinghouse"].id,
      "liabilities",
      "dues",
      amount
    );
    partyFunctions(bankLookup["clearinghouse"]).increaseInstrument(
      bankA.id,
      "assets",
      "dues",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      bankLookup["clearinghouse"].id,
      "assets",
      "dues",
      amount
    );
    partyFunctions(bankLookup["clearinghouse"]).increaseInstrument(
      bankB.id,
      "liabilities",
      "dues",
      amount
    );
  }

  netDues(bank: IBank): void {
    bank.assets.dues.forEach((thisDue) => {
      let dueFrom = thisDue;
      let dueTo = bank.liabilities.dues.find((due) => (due.id = thisDue.id));
      if (!dueTo) {
        return;
      }
      if (dueFrom.amount > dueTo.amount) {
        dueFrom.amount = dueFrom.amount - dueTo.amount;
        dueTo.amount = 0;
      }
      if (dueTo.amount > dueFrom.amount) {
        dueTo.amount = dueTo.amount - dueFrom.amount;
        dueFrom.amount = 0;
      }
      if (dueTo.amount === dueFrom.amount) {
        dueTo.amount = 0;
        dueFrom.amount = 0;
      }
    });

    let bankDueFrom = bank.assets.dues.find(
      (due) => due.id === bankLookup["clearinghouse"].id
    );
    let clearinghouseDueFrom = bankLookup[
      "clearinghouse"
    ].liabilities.dues.find((due) => due.id === bank.id);

    if (clearinghouseDueFrom && bankDueFrom) {
      clearinghouseDueFrom.amount = bankDueFrom.amount;
    }
    let bankDueTo = bank.liabilities.dues.find(
      (due) => due.id === bankLookup["clearinghouse"].id
    );
    let clearinghouseDueTo = bankLookup["clearinghouse"].assets.dues.find(
      (due) => due.id === bank.id
    );
    if (clearinghouseDueTo && bankDueTo) {
      clearinghouseDueTo.amount = bankDueTo.amount;
    }
  }

  settleDues(): void {
    for (const bank in bankLookup) {
      // eslint-disable-next-line no-loop-func
      bankLookup[bank].liabilities.dues.forEach((due) => {
        if (due.amount > 0 && bankLookup[bank].id === "clearinghouse") {
          PaymentMethods.creditAccount(
            bankLookup[due.id],
            bankLookup[bank],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        } else if (due.amount > 0 && bankLookup[bank].id !== "clearinghouse") {
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
}

class DefaultSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number): void {}
  netDues(bank: IBank): void {}
  settleDues(): void {}
}

type BankConfig = {
  bank: string;
  customers: CustomerConfig[];
  reserves: number;
};
type CustomerConfig = {
  customer: string;
  reserves: number;
  initialDeposit: number;
  transfers: TransferConfig[];
};
type TransferConfig = { customer: string; amount: number };

function createCustomer(id: string, reserves = 0) {
  const newCustomer: IBank = {
    id,
    type: "customer",
    assets: { ...customerAssets },
    liabilities: { ...customerLiabilities },
    balances: { ...customerBalances },
    reserves,
    records: [],
  };
  customerLookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
  return newCustomer;
}

function createBank(id: string, reserves = 0) {
  const newBank: IBank = {
    id,
    type: "bank",
    assets: { ...commercialAssets },
    liabilities: { ...commercialLiabilities },
    balances: { ...commercialBalances },
    reserves,
    records: [],
  };
  bankLookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

function createBankingSystem(config: { system: any; parties: any }) {
  System.setSystem(config.system);
  config.parties.forEach((bank: BankConfig) => {
    const newBank = createBank(bank.bank, bank.reserves);
    bankLookup[newBank.id] = newBank;
    bank.customers.forEach((customer) => {
      const newCustomer = createCustomer(customer.customer, customer.reserves);
      customerLookup[newCustomer.id] = newCustomer;
      CustomerService.openAccount(newCustomer, newBank);
      CustomerService.deposit(newCustomer, newBank, customer.initialDeposit);
    });
  });
  // if (config.system === "correspondent") {
  //   for (let i = 0; i < Object.keys(bankLookup).length - 1; i++) {
  //     for (let j = i + 1; j < Object.keys(bankLookup).length; j++) {
  //       BankService.openAccount(
  //         bankLookup[`${Object.keys(bankLookup)[i]}`],
  //         bankLookup[`${Object.keys(bankLookup)[j]}`]
  //       );
  //       BankService.openAccount(
  //         bankLookup[`${Object.keys(bankLookup)[j]}`],
  //         bankLookup[`${Object.keys(bankLookup)[i]}`]
  //       );
  //     }
  //   }
  // }
  config.parties.forEach((bank: BankConfig) => {
    bank.customers.forEach((customer) => {
      customer.transfers.forEach((transfer) => {
        const thisCustomer = customerLookup[customer.customer];
        const payee = customerLookup[transfer.customer];
        const amount = transfer.amount;
        CustomerService.transfer(thisCustomer, payee, amount);
      });
    });
  });
}

beforeAll(() => {
  customerLookup = {};
  bankLookup = {};
});

describe("setup tests", () => {
  it("should do Something!", () => {
    const setup = {
      system: "correspondent",
      parties: [
        {
          bank: "bank1",
          customers: [
            {
              customer: "customer1",
              reserves: 100,
              initialDeposit: 50,
              transfers: [{ customer: "customer2", amount: 40 }],
            },
            {
              customer: "customer2",
              reserves: 100,
              initialDeposit: 50,
              transfers: [{ customer: "customer1", amount: 20 }],
            },
          ],
          reserves: 500,
        },
        {
          bank: "bank2",
          customers: [
            {
              customer: "customer3",
              reserves: 100,
              initialDeposit: 50,
              transfers: [{ customer: "customer4", amount: 40 }],
            },
            {
              customer: "customer4",
              reserves: 100,
              initialDeposit: 50,
              transfers: [
                { customer: "customer3", amount: 50 },
                { customer: "customer2", amount: 50 },
              ],
            },
          ],
          reserves: 500,
        },
      ],
    };
    createBankingSystem(setup);
    expect(customerLookup.customer1.assets.customerDeposits[0].amount).toEqual(30)
    expect(customerLookup.customer2.assets.customerDeposits[0].amount).toEqual(120)
    expect(customerLookup.customer3.assets.customerDeposits[0].amount).toEqual(60)
    expect(customerLookup.customer4.assets.customerDeposits[0].amount).toEqual(0)
    expect(customerLookup.customer4.liabilities.customerOverdrafts[0].amount).toEqual(10)
    expect(bankLookup.bank1.liabilities.customerDeposits[0].amount).toEqual(30)
    expect(bankLookup.bank1.liabilities.customerDeposits[1].amount).toEqual(120)
    expect(bankLookup.bank2.liabilities.customerDeposits[0].amount).toEqual(60)
    expect(bankLookup.bank2.liabilities.customerDeposits[1].amount).toEqual(0)
    expect(bankLookup.bank2.assets.customerOverdrafts[1].amount).toEqual(10)
    expect(bankLookup.bank1.assets.dues[0].amount).toBe(50)
    expect(bankLookup.bank2.liabilities.dues[0].amount).toBe(50)
  });
});

// describe('counter reducer', () => {
//   const initialState: CounterState = {
//     value: 3,
//     status: 'idle',
//   };
//   it('should handle initial state', () => {
//     expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
//       value: 0,
//       status: 'idle',
//     });
//   });

//   it('should handle increment', () => {
//     const actual = counterReducer(initialState, increment());
//     expect(actual.value).toEqual(4);
//   });

//   it('should handle decrement', () => {
//     const actual = counterReducer(initialState, decrement());
//     expect(actual.value).toEqual(2);
//   });

//   it('should handle incrementByAmount', () => {
//     const actual = counterReducer(initialState, incrementByAmount(2));
//     expect(actual.value).toEqual(5);
//   });
// });
it("asas", () => {
  expect(1).toBe(1);
});
