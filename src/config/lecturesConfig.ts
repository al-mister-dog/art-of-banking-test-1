import { fundamentals, clearinghouse } from "./texts";
import {  module1, module2 } from "./initialStateConfig";

export interface Text {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export interface IntroStep {
  title: string;
  text: Text;
}

export interface Step {
  title: string;
  overdraft: boolean;
  credit: boolean;
  constraint: boolean;
  parties: string[];
  balanceSheetDisplay: string[];
  text: Text;
}

export interface Steps {
  [key: number]: IntroStep | Step;
}

export const lectures = {
  fundamentals: {
    name: "fundamentals",
    steps: {
      1: {
        title: "step1",
        text: fundamentals.step1,
      } as IntroStep,
      2: {
        title: "step2",
        overdraft: false,
        credit: false,
        constraint: false,
        parties: ["customer1", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step2,
        state: module1.defaultSetup,
      } as Step,
      3: {
        title: "step3",
        overdraft: false,
        credit: false,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step3,
        state: module1.defaultSetup
      } as Step,
      4: {
        title: "step4",
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step4,
        state: module1.overdraft,
      } as Step,
      5: {
        title: "step5",
        overdraft: true,
        credit: true,
        constraint: true,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step5,
        state: module1.creditSetup
      } as Step,
    },
  },
  clearinghouse: {
    name: "clearinghouse",
    steps: {
      1: {
        title: "step1",
        text: clearinghouse.step1,
      },
      2: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["customer1", "customer2", "customer3", "customer4", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: clearinghouse.step2,
        state: module2.oneBigBank,
      },
      3: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: [
          "customer1",
          "customer2",
          "customer3",
          "customer4",
          "bank1",
          "bank2",
        ],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts", "dues"],
        text: clearinghouse.step3,
        state: module2.multipleBanks,
      },
      4: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: [
          "customer1",
          "customer2",
          "customer3",
          "customer4",
          "bank1",
          "bank2",
        ],
        balanceSheetDisplay: [
          "customerDeposits",
          "customerOverdrafts",
          "bankDeposits",
          "bankOverdrafts",
          "dues",
        ],
        text: clearinghouse.step4,
        state: module2.correspondentBanking,
      },
    },
  },
};
