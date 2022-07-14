import { IBank } from "./program/types";
import {
  commercialAssets,
  commercialLiabilities,
  commercialBalances,
  customerAssets,
  customerLiabilities,
  customerBalances,
} from "./program/fixtures";
import { lookup } from "./program/lookupTables";
import { defaultSetup } from "./setupConfig"
import { CustomerService } from "./program/services";
import { System } from "./program/systemMethods";

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

interface StateObject {
  [index: string]: IBank;
}
const state: StateObject = {};

function createBankingSystem(config: { system: any; parties: any }) {
  System.setSystem(config.system);
  config.parties.forEach((bank: BankConfig) => {
    const newBank = createBank(bank.bank, bank.reserves);
    // lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
    lookup[newBank.id] = newBank;
    state[newBank.id] = newBank;
    bank.customers?.forEach((customer) => {
      const newCustomer = createCustomer(customer.customer, customer.reserves);
      // lookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
      lookup[newCustomer.id] = newCustomer;
      state[newCustomer.id] = newCustomer;
      CustomerService.openAccount(newCustomer, newBank);
      customer.initialDeposit &&
        CustomerService.deposit(newCustomer, newBank, customer.initialDeposit);
    });
  });
  // if (config.system === "correspondent") {
  //   for (let i = 0; i < Object.keys(lookup).length - 1; i++) {
  //     for (let j = i + 1; j < Object.keys(lookup).length; j++) {
  //       BankService.openAccount(
  //         lookup[`${Object.keys(lookup)[i]}`],
  //         lookup[`${Object.keys(lookup)[j]}`]
  //       );
  //       BankService.openAccount(
  //         lookup[`${Object.keys(lookup)[j]}`],
  //         lookup[`${Object.keys(lookup)[i]}`]
  //       );
  //     }
  //   }
  // }
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

createBankingSystem(defaultSetup)
const setupState = JSON.parse(JSON.stringify(state))
export { setupState, defaultSetup };
