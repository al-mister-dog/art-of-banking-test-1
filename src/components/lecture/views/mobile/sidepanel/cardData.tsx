import { Accordions } from "../../../../types";
import MoveVariableAmount from "./operations-cards/MoveVariableAmount";
import MoveFixedAmount from "./operations-cards/MoveFixedAmount";
import NetDuesCard from "./operations-cards/NetDuesCard";
import OpenAccountCard from "./operations-cards/OpenAccountCard";
import SettleDuesCard from "./operations-cards/SettleDuesCard"
import ChNetDuesCard from "./operations-cards/ChNetDuesCard";
import {
  findBankByCustomersAccounts,
  findAllCustomers,
  findOweingBanks,
  findOwedBanks,
} from "./operations-cards/__filters";


const cardData = (
  selected: any,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void,
  config?: any
) => {
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
  };
};

export default cardData;
