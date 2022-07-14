import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectTraders,
  selectBankers,
  trade,
} from "../../../../../features/players/playersSlice";
import * as React from "react";

import { Box, Button, Typography } from "@mui/material";

import ChoosePlayerDialog from "./dialogs/ChoosePlayerDialog";
import AmountDialog from "./dialogs/AmountDialog";

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
  interface Text {
    export: string;
  }
  interface Info {
    [key: string]: keyof Text;
  }
  const info: Info = {
    type: "export",
  };

  return (
    <Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
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
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ margin: 0.75, marginRight: 2, fontWeight: "bold" }}>
            {selectedValueTo ? `${selectedValueTo.id}` : ` `}
          </Typography>
          <Typography sx={{ margin: 0.75, marginRight: 2, fontWeight: "bold" }}>
            {isNaN(selectedValueAmount) ? `_` : `${selectedValueAmount}`}
          </Typography>
        </div>
      </div>
      <div
        style={{
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
      </div>
    </Box>
  );
};

export default ExportCard;
