import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import helpers from "./helpers";
import { Quotes, Rates, Currencies } from "../../types";
import {
  certaintyQuotes,
  exchangeRates,
  currencies,
  me,
  salviati,
  federigo,
  piero,
  you,
  tomasso,
} from "./initialState";

interface Trader {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
  records: any;
}
interface Banker {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
  records: any;
}
export interface PlayersState {
  conditions: {
    certaintyQuotes: Quotes;
    exchangeRates: Rates;
    currencies: Currencies;
  };
  traders: {
    me: Trader;
    salviati: Trader;
    federigo: Trader;
    piero: Trader;
  };
  bankers: {
    you: Banker;
    tomasso: Banker;
  };
  records: string[];
}

const initialState: PlayersState = {
  conditions: {
    certaintyQuotes,
    exchangeRates,
    currencies,
  },
  traders: {
    me,
    salviati,
    federigo,
    piero,
  },
  bankers: {
    you,
    tomasso,
  },
  records: [],
};
type TradersObjectKey = keyof typeof initialState.traders;
type BankersObjectKey = keyof typeof initialState.bankers;

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    trade: (state, { payload }) => {
      const { importer, exporter, amount } = payload;
      const importerId = importer.id as TradersObjectKey;
      const exporterId = exporter.id as TradersObjectKey;
      const bill = {
        id: new Date().toISOString(),
        dueTo: exporter.id,
        dueFrom: importer.id,
        city: importer.city,
        amount: amount,
        paid: false,
      };
      state.traders[importerId].goods += payload.amount;
      state.traders[exporterId].goods -= payload.amount;
      state.traders[importerId].liabilities = [
        ...payload.importer.liabilities,
        bill,
      ];
      state.traders[exporterId].assets = [...payload.exporter.assets, bill];

      const importRecord = `imported ${amount} ${
        amount > 1 ? "marcs" : "marc"
      } worth of goods from ${exporterId}`;
      const exportRecord = `exported ${amount} ${
        amount > 1 ? "marcs" : "marc"
      } worth of goods to ${importerId}`;
      state.traders[importerId].records = [
        ...state.traders[importerId].records,
        importRecord,
      ];
      state.traders[exporterId].records = [
        ...state.traders[exporterId].records,
        exportRecord,
      ];
      state.records = [
        ...state.records,
        `${importerId} imports ${amount} ${
          amount > 1 ? "marcs" : "marc"
        } worth of goods from ${exporterId}`,
      ];
    },
    drawBill: (state, { payload }) => {
      const { payee, drawee, bill } = payload;
      let payeeCopy = JSON.parse(JSON.stringify(payee));
      let draweeCopy = JSON.parse(JSON.stringify(drawee));

      drawee.id === bill.dueFrom
        ? helpers.finaliseBill(payeeCopy, draweeCopy, bill)
        : helpers.exchangeBill(payeeCopy, draweeCopy, bill);
      helpers.exchangeMoney(payeeCopy, draweeCopy, bill);
      let payeeId;
      let draweeId;
      if (payee.type === "banker") {
        payeeId = payee.id as BankersObjectKey;
        draweeId = drawee.id as TradersObjectKey;
        state.bankers[payeeId] = payeeCopy;
        state.traders[draweeId] = draweeCopy;
        state.bankers[payeeId].records = [
          ...state.bankers[payeeId].records,
          `received ${bill.amount} from ${draweeId}`,
        ];
        state.traders[draweeId].records = [
          ...state.traders[draweeId].records,
          `payed ${bill.amount} to ${payeeId}`,
        ];
        state.records = [
          ...state.records,
          `${payeeId} draws bill on ${draweeId} for ${bill.amount}`,
        ];
      } else {
        payeeId = payee.id as TradersObjectKey;
        draweeId = drawee.id as BankersObjectKey;
        state.traders[payeeId] = payeeCopy;
        state.bankers[draweeId] = draweeCopy;
        state.traders[payeeId].records = [
          ...state.traders[payeeId].records,
          `received ${bill.amount} from ${draweeId}`,
        ];
        state.bankers[draweeId].records = [
          ...state.bankers[draweeId].records,
          `payed ${bill.amount} to ${payeeId}`,
        ];
        state.records = [
          ...state.records,
          `${payeeId} draws bill on ${draweeId} for ${bill.amount} marc${
            bill.amount > 1 ? "s" : ""
          }`,
        ];
      }
    },
    remitBill: (state, { payload }) => {
      const { presenter, presentee, bill } = payload;
      const presenterId = presenter.id as BankersObjectKey;
      const presenteeId = presentee.id as BankersObjectKey;
      let presenterCopy = JSON.parse(JSON.stringify(presenter));
      let presenteeCopy = JSON.parse(JSON.stringify(presentee));
      presenterCopy.assets = presenterCopy.assets.filter(
        (b: { id: any }) => b.id !== bill.id
      );
      presenteeCopy.assets = [...presenteeCopy.assets, bill];
      state.bankers[presenterId] = presenterCopy;
      state.bankers[presenteeId] = presenteeCopy;
      state.bankers[presenterId].records = [
        ...state.bankers[presenterId].records,
        `presented remitance bill to ${presenteeId}`,
      ];
      state.bankers[presenteeId].records = [
        ...state.bankers[presenteeId].records,
        `received remitance bill from ${presenterId}`,
      ];
      state.records = [
        ...state.records,
        `${presenterId} remits bill to ${presenteeId}`,
      ];
    },
    reset: (state) => {
      state.conditions.certaintyQuotes = certaintyQuotes;
      state.conditions.exchangeRates = exchangeRates;
      state.conditions.currencies = currencies;

      state.traders.me = me;
      state.traders.salviati = salviati;
      state.traders.federigo = federigo;
      state.traders.piero = piero;

      state.bankers.you = you;
      state.bankers.tomasso = tomasso;

      state.records = [];
    },
  },
});

export const {
  trade,
  drawBill,
  remitBill,
  reset,
} = playersSlice.actions;

export const selectTraders = (state: RootState) => state.players.traders;
export const selectBankers = (state: RootState) => state.players.bankers;
export const selectState = (state: RootState) => state.players;
export const selectRecords = (state: RootState) => state.players.records;
export const selectConditions = (state: RootState) => state.players.conditions;

export default playersSlice.reducer;
