import { IBank } from "../../../../domain/types";
import {
  findExcessReserveBanks,
  findAllCustomers,
  findBankByCustomersAccounts,
  findOwedBanks,
  findOweingBanks,
  findOwedandOweingBanks,
  findBankToRepayLoan,
  findAllBanks,
} from "../../../../helpers/filters";
import MoveAmount from "./accdn-methods/MoveAmount";
import Dues from "./accdn-methods/Dues";
import OpenAccountCard from "./accdn-methods/OpenAccountCard";
import { Accordions, FeatureObjects } from "./types";

const features = (
  selected: IBank,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void,
  config?: any
): FeatureObjects => {
  return {
    deposit: (
      <MoveAmount
        variable
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        method="Deposit To"
        btnText="To..."
        dispatchMethod="deposit"
        config={config}
      />
    ),
    transfer: (
      <MoveAmount
        variable
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findAllCustomers}
        method="Transfer To"
        btnText="To..."
        dispatchMethod="transfer"
        config={config}
      />
    ),
    bankTransfer: (
      <MoveAmount
        variable
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findAllBanks}
        method="Transfer To"
        btnText="To..."
        dispatchMethod="bankTransfer"
        config={config}
      />
    ),
    withdraw: (
      <MoveAmount
        variable
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        method="Withdraw From"
        btnText="From..."
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
      <Dues
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedandOweingBanks}
        dispatchMethod="netCorrespondingDues"
        method="Net Dues"
        btnText="Find Bank"
      />
    ),
    chNetDues: (
      <Dues
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        dispatchMethod="netClearinghouseDues"
        method="Net Dues"
        btnText="Net..."
      />
    ),
    settleDues: (
      <Dues
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        dispatchMethod="settleDues"
        method="Settle Dues"
        btnText="Settle..."
      />
    ),
    receiveBankPayment: (
      <MoveAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOweingBanks}
        dispatchMethod="receiveBankPayment"
        method="Receive Bank Payment"
        btnText="Find Bank"
        config={config}
      />
    ),
    sendBankPayment: (
      <MoveAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        dispatchMethod="sendBankPayment"
        method="Send Bank Payment"
        btnText="Find Bank"
        config={config}
      />
    ),
    creditBankAccount: (
      <MoveAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        dispatchMethod="creditBankAccount"
        method="Credit Bank Account"
        btnText="Find Bank"
        config={config}
      />
    ),
    debitBankAccount: (
      <MoveAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findOwedBanks}
        dispatchMethod="debitBankAccount"
        method="Debit Bank Account"
        btnText="Find Bank"
        config={config}
      />
    ),
    getLoan: (
      <MoveAmount
        variable
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findExcessReserveBanks}
        dispatchMethod="createLoan"
        method="Get Loan"
        btnText="Find Bank"
        config={config}
      />
    ),
    repayLoan: (
      <MoveAmount
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankToRepayLoan}
        dispatchMethod="repayLoan"
        method="Repay Loan"
        btnText="Find Bank"
        config={config}
      />
    ),
  };
};

export default features;
