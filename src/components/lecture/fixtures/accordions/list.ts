import { Accordions, PartyOps } from "./types";

export default function accordionList(
  dropDownFeatures: any,
  selected: any,
  accordionExpanded: Accordions,
  setAccordionExpanded: any,
  config: any
): PartyOps {
  let partyOperations: PartyOps = {
    customer: [
      {
        accordionKey: "deposit",
        accordionTitle: "Deposit",
        component: dropDownFeatures(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).deposit,
      },
      {
        accordionKey: "withdraw",
        accordionTitle: "Withdraw",
        component: dropDownFeatures(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).withdraw,
      },
      {
        accordionKey: "transfer",
        accordionTitle: "Transfer",
        component: dropDownFeatures(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).transfer,
      },
    ],
    bank: [
      {
        accordionKey: "netDues",
        accordionTitle: "Net Dues",
        institutions: ["correspondent"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .netDues,
      },
      {
        accordionKey: "receiveBankPayment",
        accordionTitle: "Receive Bank Payment",
        institutions: ["interbank"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .receiveBankPayment,
      },
      {
        accordionKey: "sendBankPayment",
        accordionTitle: "Send Bank Payment",
        institutions: ["interbank"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .sendBankPayment,
      },
      {
        accordionKey: "creditBankAccount",
        accordionTitle: "Credit Bank Account",
        institutions: ["correspondent"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "debitBankAccount",
        accordionTitle: "Debit Bank Account",
        institutions: ["correspondent"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "getLoan",
        accordionTitle: "Get Loan",
        institutions: ["centralbank"],
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .getLoan,
      },
    ],
    clearinghouse: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
      {
        accordionKey: "chNetDues",
        accordionTitle: "Net Dues",
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .chNetDues,
      },
    ],
    centralbank: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
      {
        accordionKey: "chNetDues",
        accordionTitle: "Net Dues",
        component: dropDownFeatures(selected, accordionExpanded, setAccordionExpanded)
          .chNetDues,
      },
    ],
  };
  return partyOperations;
}
