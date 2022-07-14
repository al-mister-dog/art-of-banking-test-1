import {
  commercialAssets,
  commercialLiabilities,
  commercialBalances,
  clearinghouseAssets,
  clearinghouseLiabilities,
  clearinghouseBalances,
  customerLiabilities,
  customerAssets,
  customerBalances,
} from "./fixtures";
import { bankLookup, customerLookup } from "./lookupTables";

import {
  IBank,
  IRecord,
  Category,
  CategoryKey,
  InstrumentKey,
  Account,
} from "./types";

export class Bank implements IBank {
  constructor(
    public id: string,
    public assets: Category,
    public liabilities: Category,
    public balances: Category,
    public reserves: number,
    public records: IRecord[] = []
  ) {}

  setAccount(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number
  ) {
    const index = this.findAccountIndex(id, category, instrument);
    if (index !== -1) {
      this[category][instrument][index].amount = amount;
    }
  }

  isAccount(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey
  ): boolean {
    let account = this[category][instrument].find(
      (acc: Account) => acc.id === id
    );
    return account ? true : false;
  }

  createInstrument(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey,
    amount: number = 0
  ): void {
    this[category][instrument] = [
      ...this[category][instrument],
      { id, type: instrument, amount },
    ];
  }

  findAccountIndex(
    id: string,
    category: CategoryKey,
    instrument: InstrumentKey
  ) {
    const index = this[category][instrument].findIndex((acc: Account) => {
      return acc.id === id;
    });
    return index;
  }

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
      this[category][instrument][index].amount += amount;
    }
  }

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
      this[category][instrument][index].amount -= amount;
    }
  }

  increaseReserves(amount: number) {
    this.reserves += amount;
  }

  decreaseReserves(amount: number) {
    this.reserves -= amount;
  }
}

export class CommercialBank extends Bank {
  constructor(
    public id: string,
    public assets: Category = { ...commercialAssets },
    public liabilities: Category = { ...commercialLiabilities },
    public balances: Category = { ...commercialBalances },
    public reserves: number = 0,
    public records: IRecord[] = []
  ) {
    super(id, assets, liabilities, balances, reserves, records);
    bankLookup[id] = this;
  }
}

export class Customer extends Bank {
  constructor(
    public id: string,
    public assets: Category = { ...customerAssets },
    public liabilities: Category = {
      ...customerLiabilities,
    },
    public balances: Category = { ...customerBalances },
    public reserves: number = 100,
    public records: IRecord[] = []
  ) {
    super(id, assets, liabilities, balances, reserves, records);
    customerLookup[id] = this;
  }
}

export class ClearingHouse extends Bank {
  constructor(
    public id: string = "clearinghouse",
    public assets: Category = { ...clearinghouseAssets },
    public liabilities: Category = { ...clearinghouseLiabilities },
    public balances: Category = { ...clearinghouseBalances },
    public reserves: number = 0,
    public records: IRecord[] = []
  ) {
    super(id, assets, liabilities, balances, reserves, records);
    bankLookup[id] = this;
  }
}
