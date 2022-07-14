import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectTraders,
  trade,
} from "../../../../../features/players/playersSlice";
import * as React from "react";

import { Box, Button, Typography } from "@mui/material";

import ChoosePlayerDialog from "./dialogs/ChoosePlayerDialog";
import AmountDialog from "./dialogs/AmountDialog";

const textColor = "#f2eecb";

interface Trader {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
}

interface Accordions {
  export: boolean;
  import: boolean;
  drawBill: boolean;
  remitBill: boolean;
}

const ExportCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const tradersArray = [me, salviati, federigo, piero];
  const selectedTraders = tradersArray.filter(
    (t) =>
      selected.id !== t.id && selected.city !== t.city && t.type === "importer"
  );

  const [selectedValueTo, setSelectedValuePlayer] =
    React.useState<Trader | null>(null);
  const [openTo, setOpenTo] = React.useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedValueAmount, setSelectedValueAmount] =
    React.useState<number>(0);
  const [openAmount, setOpenAmount] = React.useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };

  const onClickTrade = () => {
    dispatch(
      trade({
        importer: selectedValueTo,
        exporter: selected,
        amount: selectedValueAmount,
      })
    );
    setSelectedValuePlayer(null);
    setSelectedValueAmount(0);
    setAccordionExpanded({ ...accordionExpanded, export: false });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClickOpenTo}
            sx={{ width: "130px", marginBottom: "5px" }}
          >
            Export To
          </Button>
          <ChoosePlayerDialog
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedTraders}
            info={{ type: selected.type, action: "trade" }}
          />

          <Button
            variant="contained"
            disabled={selectedValueTo === null}
            onClick={handleClickOpenAmount}
            sx={{ width: "130px" }}
          >
            Amount
          </Button>
          <AmountDialog
            selectedValueAmount={selectedValueAmount}
            setSelectedValueAmount={setSelectedValueAmount}
            open={openAmount}
            onClose={handleCloseAmount}
            selectedTrader={selectedValueTo}
          />
        </Box>
        <Box
          sx={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ margin: 0.75 }}>
            {selectedValueTo ? `${selectedValueTo.id}` : ` `}
          </Typography>
          <Typography sx={{ margin: 0.75 }}>
            {isNaN(selectedValueAmount) ? `_` : `${selectedValueAmount}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          disabled={isNaN(selectedValueAmount) || selectedValueAmount <= 0}
          onClick={onClickTrade}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

export default ExportCard;
