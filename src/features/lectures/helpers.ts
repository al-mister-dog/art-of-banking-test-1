import {
  commercialAssets,
  commercialBalances,
  commercialLiabilities,
  customerAssets,
  customerBalances,
  customerLiabilities,
  clearinghouseAssets,
  clearinghouseBalances,
  clearinghouseLiabilities,
  centralBankAssets,
  centralBankBalances,
  centralBankLiabilities,
} from "../../domain/fixtures";
import { lookup } from "../../domain/lookupTables";
import {
  CustomerService,
  BankService,
  ClearingHouseService,
  CentralBankService,
} from "../../domain/services";
import { System } from "../../domain/methods";
import { IBank } from "../../domain/types";

type BankConfig = {
  bank: string;
  customers: CustomerConfig[];
  initialDeposit: number;
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
  lookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
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
  lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

function createClearinghouse(id: string = "clearinghouse", reserves = 0) {
  const newBank: IBank = {
    id,
    type: "clearinghouse",
    assets: { ...clearinghouseAssets },
    liabilities: { ...clearinghouseLiabilities },
    balances: { ...clearinghouseBalances },
    reserves,
    records: [],
  };
  lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

function createCentralBank(id: string = "centralbank", reserves = 1000) {
  const newBank: IBank = {
    id,
    type: "centralbank",
    assets: { ...centralBankAssets },
    liabilities: { ...centralBankLiabilities },
    balances: { ...centralBankBalances },
    reserves,
    records: [],
  };
  lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

export function createBankingSystem(config: { system: any; parties: any }) {
  System.setSystem(config.system);

  config.parties.forEach((bank: BankConfig) => {
    const newBank = createBank(bank.bank, bank.reserves);
    lookup[newBank.id] = newBank;
    bank.customers?.forEach((customer) => {
      const newCustomer = createCustomer(customer.customer, customer.reserves);
      lookup[newCustomer.id] = newCustomer;
      CustomerService.openAccount(newCustomer, newBank);
      customer.initialDeposit &&
        CustomerService.deposit(newCustomer, newBank, customer.initialDeposit);
    });
  });

  if (config.system === "centralbank") {
    const centralbank = createCentralBank();
    lookup[centralbank.id] = centralbank;
    config.parties.forEach((bank: BankConfig) => {
      CentralBankService.openAccount(
        lookup[bank.bank],
        centralbank,
        bank.initialDeposit
      );
    });
  }

  if (config.system === "clearinghouse") {
    const clearinghouse = createClearinghouse();
    lookup[clearinghouse.id] = clearinghouse;
    const bankKeys = Object.keys(lookup).filter((key) => key.includes("bank"));
    for (let i = 0; i < bankKeys.length; i++) {
      const amount = config.parties[i].initialDeposit || 1000;
      ClearingHouseService.openAccount(
        lookup[`${bankKeys[i]}`],
        clearinghouse,
        amount
      );
    }
  }

  if (config.system === "correspondent") {
    const bankKeys = Object.keys(lookup).filter((key) => key.includes("bank"));
    for (let i = 0; i < Object.keys(lookup).length - 1; i++) {
      for (let j = i + 1; j < bankKeys.length; j++) {
        BankService.openAccount(
          lookup[`${bankKeys[i]}`],
          lookup[`${bankKeys[j]}`],
          200
        );
        BankService.openAccount(
          lookup[`${bankKeys[j]}`],
          lookup[`${bankKeys[i]}`],
          200
        );
      }
    }
  }

  config.parties.forEach((bank: BankConfig) => {
    bank.customers.forEach((customer) => {
      customer.transfers?.forEach((transfer) => {
        const thisCustomer = lookup[customer.customer];
        const payee = lookup[transfer.customer];
        const amount = transfer.amount;
        CustomerService.transfer(thisCustomer, payee, amount);
      });
    });
  });
}
