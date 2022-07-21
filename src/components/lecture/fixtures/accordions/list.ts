import { Accordions, FeatureCall, PartyOps } from "./types";
import features from "./features"
export default function accordionList(
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
        institutions: ["none"],
        component: features(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).deposit,
      },
      {
        accordionKey: "withdraw",
        accordionTitle: "Withdraw",
        institutions: ["none"],
        component: features(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).withdraw,
      },
      {
        accordionKey: "transfer",
        accordionTitle: "Transfer",
        institutions: ["none"],
        component: features(
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
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .netDues,
      },
      {
        accordionKey: "receiveBankPayment",
        accordionTitle: "Receive Bank Payment",
        institutions: ["interbank"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .receiveBankPayment,
      },
      {
        accordionKey: "sendBankPayment",
        accordionTitle: "Send Bank Payment",
        institutions: ["interbank"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .sendBankPayment,
      },
      {
        accordionKey: "creditBankAccount",
        accordionTitle: "Credit Bank Account",
        institutions: ["correspondent"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "debitBankAccount",
        accordionTitle: "Debit Bank Account",
        institutions: ["correspondent"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "getLoan",
        accordionTitle: "Get Loan",
        institutions: ["centralbank"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .getLoan,
      },
    ],
    clearinghouse: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        institutions: ["none"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
      {
        accordionKey: "chNetDues",
        accordionTitle: "Net Dues",
        institutions: ["none"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .chNetDues,
      },
    ],
    centralbank: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        institutions: ["none"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
      {
        accordionKey: "chNetDues",
        accordionTitle: "Net Dues",
        institutions: ["none"],
        component: features(selected, accordionExpanded, setAccordionExpanded)
          .chNetDues,
      },
    ],
  };
  return partyOperations;
}
