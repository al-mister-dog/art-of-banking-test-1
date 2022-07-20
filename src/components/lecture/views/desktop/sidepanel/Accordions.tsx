import { useState } from "react";
import { Accordions, PartyOps } from "../../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import accordionFeatures from "../../../fixtures/accordions/features";
import accordionList from "../../../fixtures/accordions/list"
import { colors } from "../../../../../config/colorPalette";

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
  getLoan: false,
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

  const partyOperations = accordionList(
    accordionFeatures,
    selected,
    accordionExpanded,
    setAccordionExpanded,
    config
  );

  partyOperations.bank = accordionList(
    accordionFeatures,
    selected,
    accordionExpanded,
    setAccordionExpanded,
    config
  ).bank.filter((partyOp: { institutions: string | any[] }) =>
    partyOp.institutions.includes(config.state.system)
  );

  const partyAccordions = (key: keyof PartyOps) => {
    return partyOperations[key].map((party, i) => {
      return (
        <Accordion
          key={i}
          expanded={accordionExpanded[party.accordionKey as keyof Accordions]}
          sx={{ background: colors.main, color: colors.accordionTextColor }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: colors.accordionTextColor }} />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion(party.accordionKey)}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>
              {party.accordionTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{party.component}</AccordionDetails>
        </Accordion>
      );
    });
  };

  return <>{partyAccordions(selected.type)}</>;
};

export default Operations;
