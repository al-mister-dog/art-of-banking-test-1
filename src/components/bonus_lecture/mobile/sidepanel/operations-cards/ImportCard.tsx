import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectTraders,
  trade
} from "../../../../../features/players/playersSlice";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useState } from "react";
import AmountDialog from "./dialogs/AmountDialog"
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";

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

const ImportCard: React.FunctionComponent<{ selected: any, accordionExpanded: Accordions, setAccordionExpanded: (v: Accordions) => void }> = ({
  selected, accordionExpanded, setAccordionExpanded
}) => {
  const dispatch = useAppDispatch();
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const tradersArray = [me, salviati, federigo, piero];
  const selectedTraders = tradersArray.filter(
    (t) =>
      selected.id !== t.id && selected.city !== t.city && t.type === "exporter"
  );

  const [selectedValueTo, setSelectedValuePlayer] = useState<Trader | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedValueAmount, setSelectedValueAmount] =
    useState<number>(0);
  const [openAmount, setOpenAmount] = useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };


  const onClickTrade = () => {
    dispatch(trade({ importer: selected, exporter: selectedValueTo, amount: selectedValueAmount }));
    setSelectedValueAmount(0)
    setSelectedValuePlayer(null)
    setAccordionExpanded({...accordionExpanded, import: false})
  }

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
            Import From
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedTraders}
            info={{type: selected.type, action: "trade"}}
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
          <Typography sx={{ margin: 0.75 }}>
            {selectedValueTo ? `${selectedValueTo.id}` : ` `}
          </Typography>
          <Typography sx={{ margin: 0.75 }}>{isNaN(selectedValueAmount) ? `_` : `${selectedValueAmount}`}</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained"
        disabled={isNaN(selectedValueAmount) || selectedValueAmount <= 0}
        onClick={onClickTrade}
        >Ok</Button>
      </div>
    </Box>
  );
};

export default ImportCard;
