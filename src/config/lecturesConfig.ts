import { fundamentals, clearinghouse, centralbank } from "./texts";
import {fundamentalsState, clearinghouseState, theFedState} from "./initial-state"

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
    title: "fundamentals",
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
        state: fundamentalsState.defaultSetup,
      } as Step,
      3: {
        title: "step3",
        overdraft: false,
        credit: false,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step3,
        state: fundamentalsState.defaultSetup,
      } as Step,
      4: {
        title: "step4",
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step4,
        state: fundamentalsState.overdraft,
      } as Step,
      5: {
        title: "step5",
        overdraft: true,
        credit: true,
        constraint: true,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step5,
        state: fundamentalsState.creditSetup,
      } as Step,
    },
    nextStep: "clearinghouse"
  },
  clearinghouse: {
    title: "clearinghouse",
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
        state: clearinghouseState.oneBigBank,
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
        state: clearinghouseState.multipleBanks,
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
        state: clearinghouseState.correspondentBanking,
      },
      5: {
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
          "clearinghouse"
        ],
        balanceSheetDisplay: [
          "customerDeposits",
          "customerOverdrafts",
          "dues",
          "chCertificates",
          "chOverdrafts",
          "chLoans"
        ],
        text: clearinghouse.step5,
        state: clearinghouseState.clearinghouse,
      },
      6: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: [
          "customer1",
          "customer2",
          "customer3",
          "customer4",
          "customer5",
          "customer6",
          "customer7",
          "customer8",
          "bank1",
          "bank2",
          "bank3",
          "bank4",
          "clearinghouse"
        ],
        balanceSheetDisplay: [
          "customerDeposits",
          "customerOverdrafts",
          "dues",
          "chCertificates",
          // "chOverdrafts",
          "chLoans",
        ],
        text: clearinghouse.step6,
        state: clearinghouseState.clearinghouseLoans,
      },
    },
    nextStep: "the-fed"
  },




  centralbank: {
    title: "centralbank",
    steps: {
      1: {
        title: "step1",
        text: centralbank.step1,
      },
      2: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["bank1", "bank2", "bank3", "centralbank"],
        balanceSheetDisplay: ["bankDeposits", "daylightOverdrafts", "bankLoans", "customerDeposits", "customerOverdrafts"],
        text: centralbank.step2,
        state: theFedState.daylightOverdraft,
      },
      3: {
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["bank1", "bank2", "bank3","centralbank", "customer1", "customer2", "customer3"],
        balanceSheetDisplay: ["bankDeposits", "daylightOverdrafts", "bankLoans", "customerDeposits"],
        text: centralbank.step3,
        state: theFedState.fedFundsMarket,
      },
      
    },
    nextStep: "medici"
  },
};
