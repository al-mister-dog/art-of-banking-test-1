import { useState } from "react";
import { Accordions, PartyOps } from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cardData from "./cardData";
import { colors } from "../../../../config/colorPalette";

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
        institutions: ["correspondent"],
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .netDues,
      },
      {
        accordionKey: "receiveBankPayment",
        accordionTitle: "Receive Bank Payment",
        institutions: ["interbank"],
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .receiveBankPayment,
      },
      {
        accordionKey: "sendBankPayment",
        accordionTitle: "Send Bank Payment",
        institutions: ["interbank"],
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .sendBankPayment,
      },
      {
        accordionKey: "creditBankAccount",
        accordionTitle: "Credit Bank Account",
        institutions: ["correspondent"],
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .debitBankAccount,
      },
      {
        accordionKey: "debitBankAccount",
        accordionTitle: "Debit Bank Account",
        institutions: ["correspondent"],
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
      {
        accordionKey: "chNetDues",
        accordionTitle: "Net Dues",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .chNetDues,
      },
    ],
  };

  partyOperations.bank = partyOperations.bank.filter((partyOp) =>
    partyOp.institutions.includes(config.state.system)
  );

  const accordionColors = {
    monochromatic: "#8F1A14",
    analogous1: "#620E34",
    analogous2: "#623C0E",
    triadic1: "#0E6212",
    triadic2: "#120E62",
  };

  const partyAccordions = (key: keyof PartyOps) => {
    return partyOperations[key].map((party, i) => {
      return (
        <Accordion
          key={i}
          expanded={accordionExpanded[party.accordionKey as keyof Accordions]}
          sx={{ background: colors.rustyRed, color: colors.paper }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: colors.paper }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion(party.accordionKey)}
          >
            <Typography sx={{fontSize: "1.3rem"}}>{party.accordionTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>{party.component}</AccordionDetails>
        </Accordion>
      );
    });
  };

  return <>{partyAccordions(selected.type)}</>;
};

export default Operations;
