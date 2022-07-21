import { IBank } from "../../../../features/lectures/program/types";
import { findExcessReserveBanks, findAllCustomers, findBankByCustomersAccounts, findOwedBanks, findOweingBanks } from "../../helpers/filters";
import ChNetDuesCard from "./accdn-methods/ChNetDuesCard";
import MoveFixedAmount from "./accdn-methods/MoveFixedAmount";
import MoveVariableAmount from "./accdn-methods/MoveVariableAmount";
import NetDuesCard from "./accdn-methods/NetDuesCard";
import OpenAccountCard from "./accdn-methods/OpenAccountCard";
import SettleDuesCard from "./accdn-methods/SettleDuesCard";
import { Accordions, FeatureObjects } from "./types";

const features = (
  selected: IBank,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void,
  config?: any
): FeatureObjects => {
  return {
    deposit: (
      <MoveVariableAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        operationText="Deposit To"
        methodText="Deposit To"
        dispatchMethod="deposit"
        config={config}
      />
    ),
    transfer: (
      <MoveVariableAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findAllCustomers}
        operationText="Transfer To"
        methodText="Transfer To"
        dispatchMethod="transfer"
        config={config}
      />
    ),
    withdraw: (
      <MoveVariableAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        operationText="Withdraw From"
        methodText="Withdraw From"
        dispatchMethod="withdraw"
        config={config}
      />
    ),
    openAccount: (
      <OpenAccountCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    netDues: (
      <NetDuesCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    chNetDues: (
      <ChNetDuesCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    settleDues: (
      <SettleDuesCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    receiveBankPayment: (
      <MoveFixedAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOweingBanks}
        operationText="Receive Bank Payment"
        methodText="Find Bank"
        config={config}
      />
    ),
    sendBankPayment: (
      <MoveFixedAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        operationText="Send Bank Payment"
        methodText="Find Bank"
        config={config}
      />
    ),
    creditBankAccount: (
      <MoveFixedAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        operationText="Credit Bank Account"
        methodText="Find Bank"
        config={config}
      />
    ),
    debitBankAccount: (
      <MoveFixedAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        operationText="Debit Bank Account"
        methodText="Find Bank"
        config={config}
      />
    ),
    getLoan: (
      <MoveVariableAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findExcessReserveBanks}
        operationText="Get Loan"
        methodText="Get Loan"
        dispatchMethod="createLoan"
        config={config}
      />
    ),
  };
};

export default features;
