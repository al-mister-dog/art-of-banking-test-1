import { Account, CategoryKey, IBank, InstrumentKey } from "./types";

export const partyFunctions = (bank: IBank) => ({
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