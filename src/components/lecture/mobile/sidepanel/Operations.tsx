import { useState } from "react";
import { Accordions, PartyOps } from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cardData from "./cardData";

const accordionColors = {
  monochromatic: "#8F1A14",
  analogous1: "#620E34",
  analogous2: "#623C0E",
  triadic1: "#0E6212",
  triadic2: "#120E62",
};

const resetAccordions = {
  deposit: false,
  transfer: false,
  withdraw: false,
  openAccount: false,
  netDues: false,
  settleDues: false,
  receiveBankPayment: false,
  sendBankPayment: false,
  creditBankAccount: false,
  debitBankAccount: false,
};

const ResponsiveAccordion = styled(Accordion)(({theme}) => ({
  background: accordionColors.analogous2, color: "#f2eecb",
  [theme.breakpoints.up('tablet')]: {width: "30rem", margin: "auto"},
  // [theme.breakpoints.down('smallTablet')]: {minWidth: "10%"}
}))

const Operations: React.FunctionComponent<{ config: any; selected: any }> = ({
  config,
  selected,
}) => {
  const [accordionExpanded, setAccordionExpanded] = useState<Accordions>({
    ...resetAccordions,
  });

  function toggleAccordion(key: keyof Accordions) {
    const bool = accordionExpanded[key];
    setAccordionExpanded({ ...resetAccordions, [key]: !bool });
  }

  let partyOperations: PartyOps = {
    customer: [
      {
        accordionKey: "deposit",
        accordionTitle: "Deposit",
        component: cardData(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).deposit,
      },
      {
        accordionKey: "withdraw",
        accordionTitle: "Withdraw",
        component: cardData(
          selected,
          accordionExpanded,
          setAccordionExpanded,
          config
        ).withdraw,
      },
      {
        accordionKey: "transfer",
        accordionTitle: "Transfer",
        component: cardData(
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
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .netDues,
      },
      {
        accordionKey: "receiveBankPayment",
        accordionTitle: "Receive Bank Payment",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .receiveBankPayment,
      },
      {
        accordionKey: "sendBankPayment",
        accordionTitle: "Send Bank Payment",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .sendBankPayment,
      },
      {
        accordionKey: "creditBankAccount",
        accordionTitle: "Credit Bank Account",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "debitBankAccount",
        accordionTitle: "Debit Bank Account",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
    ],
    clearinghouse: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
    ],
  };

  if (config.state.system === "interbank") {
    partyOperations.bank = partyOperations.bank.filter(
      (partyOp: { accordionKey: string }) =>
        partyOp.accordionKey !== "netDues" &&
        partyOp.accordionKey !== "creditBankAccount" &&
        partyOp.accordionKey !== "debitBankAccount"
    );
  }

  if (config.state.system === "interbank") {
    partyOperations.bank = partyOperations.bank.filter(
      (partyOp: { accordionKey: string }) =>
        partyOp.accordionKey !== "netDues" &&
        partyOp.accordionKey !== "creditBankAccount" &&
        partyOp.accordionKey !== "debitBankAccount"
    );
  }
  


  const partyAccordions = (key: keyof PartyOps) => {
    return partyOperations[key].map((party, i) => {
      return (
        <ResponsiveAccordion
          key={i}
          expanded={accordionExpanded[party.accordionKey as keyof Accordions]}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#f2eecb" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion(party.accordionKey)}
          >
            <Typography>{party.accordionTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>{party.component}</AccordionDetails>
        </ResponsiveAccordion>
      );
    });
  };

  return <>{partyAccordions(selected.type)}</>;
};

export default Operations;
