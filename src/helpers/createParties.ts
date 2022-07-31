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
} from "../domain/fixtures";
import { lookup } from "../domain/lookupTables";
import {
  CustomerService,
  BankService,
  ClearingHouseService,
  CentralBankService,
} from "../domain/services";
import { System } from "../domain/methods";
import { IBank } from "../domain/types";

type BankConfig = {
  id: string;
  customers: CustomerConfig[];
  initialDeposit: number;
  reserves: number;
};
type CustomerConfig = {
  id: string;
  reserves: number;
  initialDeposit: number;
  transfers: TransferConfig[];
  mortgages?: number;
};
type TransferConfig = { id: string; amount: number };

function createBank(bank: any) {
  const newBank: IBank = {
    id: bank.id,
    type: "bank",
    name: bank.name || "",
    assets: { ...commercialAssets },
    liabilities: { ...commercialLiabilities },
    balances: { ...commercialBalances },
    reserves: bank.reserves || 0,
    records: [],
  };
  lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

function createCustomer(customer: any) {
  const newCustomer: IBank = {
    id: customer.id,
    type: "customer",
    name: customer.name || "",
    assets: { ...customerAssets },
    liabilities: { ...customerLiabilities },
    balances: { ...customerBalances },
    reserves: customer.reserves || 0,
    records: [],
  };
  lookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
  return newCustomer;
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
    name: "",
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
    const newBank = createBank(bank);
    lookup[newBank.id] = newBank;
    bank.customers?.forEach((customer) => {
      const newCustomer = createCustomer(customer);
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
        lookup[bank.id],
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
    if (bank.customers) {
      bank.customers.forEach((customer) => {
        customer.transfers?.forEach((transfer) => {
          const thisCustomer = lookup[customer.id];
          const payee = lookup[transfer.id];
          const amount = transfer.amount;
          CustomerService.transfer(thisCustomer, payee, amount);
        });
        if (customer.mortgages) {
          CustomerService.createMortgage(lookup[customer.id], lookup[bank.id], customer.mortgages)
        }
      });
    }
  });
}
