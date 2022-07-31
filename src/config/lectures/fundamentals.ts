import { fundamentalsState } from "../state";
import { fundamentalsText } from "../texts";
import { IntroStep, Step } from "./types";

export const fundamentals = {
  title: "fundamentals",
  steps: {
    1: {
      title: "step1",
      text: fundamentalsText.step1,
    } as IntroStep,
    2: {
      title: "step2",
      overdraft: false,
      credit: false,
      constraint: false,
      parties: ["customer1", "bank1"],
      balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      text: fundamentalsText.step2,
      state: fundamentalsState.defaultSetup,
    } as Step,
    3: {
      title: "step3",
      overdraft: false,
      credit: false,
      constraint: false,
      parties: ["customer1", "customer2", "bank1"],
      balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      text: fundamentalsText.step3,
      state: fundamentalsState.defaultSetup,
    } as Step,
    4: {
      title: "step4",
      overdraft: true,
      credit: true,
      constraint: false,
      parties: ["customer1", "customer2", "bank1"],
      balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      text: fundamentalsText.step4,
      state: fundamentalsState.overdraft,
    } as Step,
    5: {
      title: "step5",
      overdraft: true,
      credit: true,
      constraint: true,
      parties: ["customer1", "customer2", "bank1"],
      balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      text: fundamentalsText.step5,
      state: fundamentalsState.creditSetup,
    } as Step,
  },
  nextStep: "clearinghouse",
};
