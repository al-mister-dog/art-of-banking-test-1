import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import accordionList from "../../../fixtures/accordions/list";
import { colors } from "../../../../../config/colorPalette";
import { Accordions, PartyOps } from "../../../fixtures/accordions/types";

const resetAccordions = {
  deposit: false,
  transfer: false,
  bankTransfer: false,
  withdraw: false,
  openAccount: false,
  netDues: false,
  chNetDues: false,
  settleDues: false,
  receiveBankPayment: false,
  sendBankPayment: false,
  creditBankAccount: false,
  debitBankAccount: false,
  getLoan: false,
  repayLoan: false,
};

const ResponsiveAccordion = styled(Accordion)(({ theme }) => ({
  [theme.breakpoints.up("tablet")]: { width: "30rem", margin: "auto" },
  // [theme.breakpoints.down('smallTablet')]: {minWidth: "10%"}
}));

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
    selected,
    accordionExpanded,
    setAccordionExpanded,
    config
  );

  partyOperations.bank = accordionList(
    selected,
    accordionExpanded,
    setAccordionExpanded,
    config
  ).bank.filter((partyOp: { institutions: string[] }) =>
    partyOp.institutions.includes(config.state.system)
  );

  const partyAccordions = (key: keyof PartyOps) => {
    return partyOperations[key].map((party, i) => {
      return (
        <ResponsiveAccordion
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
            onClick={() => toggleAccordion(party.accordionKey as keyof Accordions)}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>
              {party.accordionTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{party.component}</AccordionDetails>
        </ResponsiveAccordion>
      );
    });
  };

  return <>{partyAccordions(selected.type)}</>;
};

export default Operations;
