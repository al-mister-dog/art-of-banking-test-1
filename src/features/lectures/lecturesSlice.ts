import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { lookup } from "../../domain/lookupTables";
import { IBank } from "../../domain/types";
import { setupState } from "./initialState";
import { createBankingSystem } from "./helpers";
import { CentralBankService, CustomerService } from "../../domain/services";
import { BankService } from "../../domain/services";
import { PaymentMethods } from "../../domain/methods";

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
      lecturesSlice.caseReducers.update(state);
    },
    withdraw: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.withdraw(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.update(state);
    },
    transfer: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.transfer(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.update(state);
    },
    creditBankAccount: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      BankService.creditAccount(lookup[p1.id], lookup[p2.id], amt);
      PaymentMethods.clearDues(lookup[p1.id], lookup[p2.id]);
      PaymentMethods.clearDues(lookup[p2.id], lookup[p1.id]);
      lecturesSlice.caseReducers.update(state);
    },
    debitBankAccount: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      BankService.debitAccount(lookup[p1.id], lookup[p2.id], amt);
      PaymentMethods.clearDues(lookup[p1.id], lookup[p2.id]);
      PaymentMethods.clearDues(lookup[p2.id], lookup[p1.id]);
      lecturesSlice.caseReducers.update(state);
    },
    payBank: (state, { payload }) => {
      const { p1, p2 } = payload;
      BankService.payBank(lookup[p1.id], lookup[p2.id]);
      lecturesSlice.caseReducers.update(state);
    },
    createLoan: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CentralBankService.createLoan(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.update(state);
    },
    repayLoan: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CentralBankService.repayLoan(lookup[p1.id], lookup[p2.id], amt);
      lecturesSlice.caseReducers.update(state);
    },
    netDues: (state, { payload }) => {
      const { p1 } = payload;
      BankService.netDues(lookup[p1.id]);
      lecturesSlice.caseReducers.update(state);
    },
    netCorrespondingDues: (state, { payload }) => {
      const { p1, p2 } = payload;
      BankService.netDues(lookup[p1.id]);
      BankService.netDues(lookup[p2.id]);
      lecturesSlice.caseReducers.update(state);
    },
    chNetDues: (state) => {
      for (const key in lookup) {
        if (key.includes("bank")) {
          BankService.netDues(lookup[key]);
        }
      }
      lecturesSlice.caseReducers.update(state);
    },
    settleDues: (state) => {
      PaymentMethods.settleDues();
      lecturesSlice.caseReducers.update(state);
    },
    setState: (state, { payload }) => {
      lecturesSlice.caseReducers.clearLookup();
      createBankingSystem(payload.setup);
      for (const key in lookup) {
        state[key] = JSON.parse(JSON.stringify(lookup[key]));
      }
    },
    update: (state) => {
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
  repayLoan,
  netDues,
  netCorrespondingDues,
  settleDues,
  chNetDues,
  setState,
} = lecturesSlice.actions;

export const selectParties = (state: RootState) => state.partiesLectures;

export default lecturesSlice.reducer;
