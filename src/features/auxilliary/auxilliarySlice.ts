import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IBank, Account } from "../../domain/types";
import { total } from "../../components/lecture/helpers/total";
import {
  fedFundsRate,
  reservePercentage,
  totalCreditData,
  centralbankCreditData,
  totalCredit,
  centralbankCredit,
} from "./initialState";
import getPartiesArray from "../../components/lecture/helpers/getPartiesArray";

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
      const allBanks = getPartiesArray(payload.parties, "bank");

      let bankAssetsAndLiabilities: Account[] = [];

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

      const totalCredit = total(bankAssetsAndLiabilities, "amount")
      state.totalCredit = totalCredit;
    },
    setTotalCreditData: (state, { payload }) => {
      const allBanks = getPartiesArray(payload.parties, "bank");

      let bankAssetsAndLiabilities: Account[] = [];

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

      const totalReserves = total(allBanks, "reserves");
      
      const totalAssetsAndLiabilities = total(
        bankAssetsAndLiabilities,
        "amount"
      );

      const totalCredit = totalAssetsAndLiabilities;
      
      state.totalCredit = totalCredit;
      
      state.totalCreditData = [
        ...state.totalCreditData,
        { name: "", credit: state.totalCredit, reserves: totalReserves },
      ];
    },
    setcentralbankCreditData: (state, { payload }) => {
      let partiesArray: IBank[] = [];

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
          centralBank[0].assets.daylightOverdrafts,
          "amount"
        );
        const totalBankDeposits = total(
          centralBank[0].liabilities.bankDeposits,
          "amount"
        );
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
                otherBanksTotal += total(bank[key][k], "amount");
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
