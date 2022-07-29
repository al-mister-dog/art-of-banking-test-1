import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IBank } from "../../domain/types";
import { total } from "../../components/lecture/helpers/total";
import {
  fedFundsRate,
  reservePercentage,
  totalCreditData,
  centralbankCreditData,
  totalCredit,
  centralbankCredit,
} from "./initialState";

const initialState = {
  fedFundsRate,
  reservePercentage,
  totalCreditData,
  centralbankCreditData,
  totalCredit,
  centralbankCredit,
};

export const auxilliarySlice = createSlice({
  name: "auxilliary",
  initialState,
  reducers: {
    setReservePercentage: (state, { payload }) => {
      state.reservePercentage = payload.percentage;
    },
    setFedFundsRate: (state, { payload }) => {
      state.fedFundsRate = payload.rate;
    },
    getTotalCreditData: (state, { payload }) => {
      let partiesArray: IBank[] = [];
      interface Obj {
        [index: string]: any;
      }
      interface Account {
        [index: string]: any;
      }

      for (const key in payload.parties) {
        partiesArray = [...partiesArray, payload.parties[key]];
      }

      const allBanks = partiesArray.filter((party) =>
        party.id.includes("bank")
      );

      let bankAssetsAndLiabilities: Obj[] = [];

      allBanks.forEach((bank) => {
        for (const key in bank) {
          if (key === "liabilities" || key === "assets") {
            for (const k in bank[key]) {
              bankAssetsAndLiabilities = [
                ...bankAssetsAndLiabilities,
                ...bank[key][k],
              ];
            }
          }
        }
      });

      const totalAssetsAndLiabilities = bankAssetsAndLiabilities.reduce(
        (a: Account, c: Account) => {
          return { amount: a.amount + c.amount };
        },
        { amount: 0 }
      );

      const totalCredit = totalAssetsAndLiabilities.amount;

      state.totalCredit = totalCredit;
    },
    setTotalCreditData: (state, { payload }) => {
      let partiesArray: IBank[] = [];
      interface Obj {
        [index: string]: any;
      }
      interface Account {
        [index: string]: any;
      }

      for (const key in payload.parties) {
        partiesArray = [...partiesArray, payload.parties[key]];
      }

      const allBanks = partiesArray.filter((party) =>
        party.id.includes("bank")
      );

      let bankAssetsAndLiabilities: Obj[] = [];

      allBanks.forEach((bank) => {
        for (const key in bank) {
          if (key === "liabilities" || key === "assets") {
            for (const k in bank[key]) {
              bankAssetsAndLiabilities = [
                ...bankAssetsAndLiabilities,
                ...bank[key][k],
              ];
            }
          }
        }
      });

      const totalReserves = allBanks.reduce(
        (a, c) => {
          return { reserves: a.reserves + c.reserves };
        },
        { reserves: 0 }
      ).reserves;

      const totalAssetsAndLiabilities = bankAssetsAndLiabilities.reduce(
        (a: Account, c: Account) => {
          return { amount: a.amount + c.amount };
        },
        { amount: 0 }
      );

      const totalCredit = totalAssetsAndLiabilities.amount;

      state.totalCredit = totalCredit;
      state.totalCreditData = [
        ...state.totalCreditData,
        { name: "", credit: state.totalCredit, reserves: totalReserves },
      ];
    },
    setcentralbankCreditData: (state, { payload }) => {
      let partiesArray: IBank[] = [];
      interface Obj {
        [index: string]: any;
      }
      interface Account {
        [index: string]: any;
      }

      for (const key in payload.parties) {
        partiesArray = [...partiesArray, payload.parties[key]];
      }

      const centralBank = partiesArray.filter(
        (party) => party.type === "centralbank"
      );
      const otherBanks = partiesArray.filter((party) => party.type === "bank");

      let totalCentralBankCredit = 0;
      let reserves = 0;
      if (centralBank.length > 0) {
        const totalOverdrafts = total(
          centralBank[0].assets.daylightOverdrafts
        ).amount;
        const totalBankDeposits = total(
          centralBank[0].liabilities.bankDeposits
        ).amount;
        totalCentralBankCredit = totalOverdrafts + totalBankDeposits;
        reserves = totalBankDeposits;
      }

      let otherBanksTotal = 0;
      otherBanks.forEach((bank) => {
        for (const key in bank) {
          if (key === "liabilities" || key === "assets") {
            for (const k in bank[key]) {
              if (
                (k === "bankDeposits" ||
                  k === "bankLoans" ||
                  k === "daylightOverdrafts") &&
                bank[key][k].length > 0
              ) {
                otherBanksTotal += total(bank[key][k]).amount;
              }
            }
          }
        }
      });

      state.centralbankCredit = totalCentralBankCredit;
      state.centralbankCreditData = [
        ...state.centralbankCreditData,
        {
          name: "",
          credit: state.centralbankCredit,
          reserves: reserves,
          privateCredit: otherBanksTotal,
        },
      ];
    },
    resetTotalCreditData: (state) => {
      state.totalCredit = 0;
      state.totalCreditData = [
        { name: "", credit: state.totalCredit, reserves: 0 },
      ];
    },
    resetCentralbankCreditData: (state) => {
      state.totalCredit = 0;
      state.totalCreditData = [
        { name: "", credit: state.totalCredit, reserves: 0 },
      ];
    },
  },
});

export const {
  setFedFundsRate,
  setReservePercentage,
  getTotalCreditData,
  setTotalCreditData,
  setcentralbankCreditData,
  resetTotalCreditData,
} = auxilliarySlice.actions;

export const selectAuxilliary = (state: RootState) => state.auxilliary;

export default auxilliarySlice.reducer;
