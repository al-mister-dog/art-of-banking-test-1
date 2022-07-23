//TODOS: UPDATERESTOFSTATE FUNCTION
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { lookup } from "./program/lookupTables";
import { IBank } from "./program/types";
import { setupState } from "./initialState";
import { createBankingSystem } from "./helpers";
import { CentralBankService, CustomerService } from "./program/services";
import { BankService } from "./program/services";
import { PaymentMethods } from "./program/methods";

interface BankState {
  [index: string]: IBank;
}

const initialState: BankState = {
  ...setupState,
};

export const lecturesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    deposit: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.deposit(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    withdraw: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.withdraw(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    transfer: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.transfer(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    creditBankAccount: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      BankService.creditAccount(lookup[p1.id], lookup[p2.id], amt);
      PaymentMethods.clearDues(lookup[p1.id], lookup[p2.id]);
      PaymentMethods.clearDues(lookup[p2.id], lookup[p1.id]);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    debitBankAccount: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      BankService.debitAccount(lookup[p1.id], lookup[p2.id], amt);
      PaymentMethods.clearDues(lookup[p1.id], lookup[p2.id]);
      PaymentMethods.clearDues(lookup[p2.id], lookup[p1.id]);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    payBank: (state, { payload }) => {
      const { p1, p2 } = payload;
      BankService.payBank(lookup[p1.id], lookup[p2.id]);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    createLoan: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CentralBankService.createLoan(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    // getLoan: () => {},
    // extendLoan: () => {},
    netDues: (state, { payload }) => {
      const { p1 } = payload;
      BankService.netDues(lookup[p1.id]);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    netCorrespondingDues: (state, { payload }) => {
      const { p1, p2 } = payload;
      BankService.netDues(lookup[p1.id]);
      BankService.netDues(lookup[p2.id]);
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    chNetDues: (state) => {
      for (const key in lookup) {
        if (key.includes("bank")) {
          BankService.netDues(lookup[key]);
        }
      }
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    settleDues: (state) => {
      PaymentMethods.settleDues();
      lecturesSlice.caseReducers.updateState(state);
      lecturesSlice.caseReducers.updateLookup(state);
    },
    updateState: (state) => {
      for (const key in lookup) {
        state[key] = JSON.parse(JSON.stringify(lookup[key]));
      }
    },
    updateLookup: (state) => {
      lecturesSlice.caseReducers.clearLookup();
      for (const key in state) {
        lookup[key] = JSON.parse(JSON.stringify(state[key]));
      }
    },
    clearLookup: () => {
      for (const key in lookup) {
        delete lookup[key];
      }
    },
    setupModule: (state, { payload }) => {
      for (const key in lookup) {
        delete lookup[key];
      }
      createBankingSystem(payload.setup);
      for (const key in lookup) {
        state[key] = JSON.parse(JSON.stringify(lookup[key]));
      }
      console.log(Object.keys(lookup))
    },
  },
});

export const {
  deposit,
  withdraw,
  transfer,
  creditBankAccount,
  debitBankAccount,
  payBank,
  createLoan,
  netDues,
  netCorrespondingDues,
  settleDues,
  chNetDues,
  setupModule,
} = lecturesSlice.actions;

export const selectParties = (state: RootState) => state.partiesLectures;

export default lecturesSlice.reducer;
