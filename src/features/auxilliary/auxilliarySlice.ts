import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IBank } from "../moduleState/program/types";

import {
  reservePercentage,
  totalCreditData,
  totalCredit,
} from "./initialState";

const initialState = {
  reservePercentage,
  totalCreditData,
  totalCredit,
};

export const auxilliarySlice = createSlice({
  name: "auxilliary",
  initialState,
  reducers: {
    setReservePercentage: (state, { payload }) => {
      state.reservePercentage = payload.percentage;
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

      const totalAssetsAndLiabilities = bankAssetsAndLiabilities.reduce(
        (a: Account, c: Account) => {
          return { amount: a.amount + c.amount };
        },
        { amount: 0 }
      );

      const totalCredit = totalAssetsAndLiabilities.amount;

      state.totalCredit = totalCredit;
      state.totalCreditData =[ ...state.totalCreditData, { name: "", credit: state.totalCredit }];
    },
    resetTotalCreditData: (state) => {
      state.totalCredit = 0;
      state.totalCreditData =[ { name: "", credit: state.totalCredit }];
    },
  },
});

export const {
  setReservePercentage,
  getTotalCreditData,
  setTotalCreditData,
  resetTotalCreditData,
} = auxilliarySlice.actions;

export const selectAuxilliary = (state: RootState) => state.auxilliary;

export default auxilliarySlice.reducer;
