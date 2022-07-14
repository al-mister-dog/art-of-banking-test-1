import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectTraders,
  selectBankers,
  drawBill,
} from "../../../../../features/players/playersSlice";
import * as React from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useState } from "react";
import ToDialog from "./dialogs/ChoosePlayerDialog";
import DrawBillDialog from "./dialogs/BillDialog"

interface Banker {
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

const DrawBillCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);

  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [selectedValuePlayer, setSelectedValuePlayer] = useState<Banker | null>(null);
  const [openPlayer, setOpenPlayer] = useState(false);

  const handleClickOpenPlayer = () => {
    setOpenPlayer(true);
  };
  const handleCloseTo = () => {
    setOpenPlayer(false);
  };

  const [openAmount, setOpenAmount] = useState(false);
  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };

  const bankersArray = [you, tomasso, salviati, me, federigo, piero];
  const selectedBankers = bankersArray.filter((t) => {
    if (selectedBill) {
      return (
        (selected.id !== t.id &&
          selected.city === t.city &&
          selectedBill.dueFrom === t.id) ||
        (selected.id !== t.id &&
          selected.city === t.city &&
          t.type === "banker")
      );
    } else {
      return (
        selected.id !== t.id && selected.city === t.city && t.type === "banker"
      );
    }
  });

  const onClickDrawBill = () => {
    dispatch(
      drawBill({
        payee: selected,
        drawee: selectedValuePlayer,
        bill: selectedBill,
      })
    );
    setSelectedValuePlayer(null);
    setSelectedBill(null);
    setAccordionExpanded({ ...accordionExpanded, drawBill: false });
  };

  return (
    <Box>
      {selected.assets.length > 0 ? (
        <>
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
                // disabled={selectedValuePlayer === null}
                variant="contained"
                onClick={handleClickOpenAmount}
                sx={{ width: "150px", marginBottom: "5px" }}
              >
                Bill To Redeem
              </Button>
              <DrawBillDialog
                selected={selected}
                setSelectedBill={setSelectedBill}
                open={openAmount}
                onClose={handleCloseAmount}
              />
              <Button
              variant="contained"
                disabled={!selectedBill}
                onClick={handleClickOpenPlayer}
                sx={{ width: "150px" }}
              >
                Draw Bill On
              </Button>
              <ToDialog
                onClose={handleCloseTo}
                setSelectedValuePlayer={setSelectedValuePlayer}
                open={openPlayer}
                selectedBankers={selectedBankers}
                info={{type: selected.type, action: "drawBill"}}
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
                {selectedBill
                  ? `${selectedBill.dueFrom}: ${selectedBill.amount}`
                  : ` `}
              </Typography>
              <Typography sx={{ margin: 0.75 }}>
                {selectedValuePlayer ? `${selectedValuePlayer.id}` : `_`}
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
              disabled={!selectedValuePlayer || !selectedBill}
              onClick={onClickDrawBill}
            >
              Ok
            </Button>
          </div>
        </>
      ) : (
        <Typography>There are no bills to draw</Typography>
      )}
    </Box>
  );
};


export default DrawBillCard;
