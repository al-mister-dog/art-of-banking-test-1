import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectBankers,
  remitBill,
} from "../../../../../features/players/playersSlice";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import DrawBillDialog from "./dialogs/BillDialog";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { useState } from "react";

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

const ExportCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const { you, tomasso } = useAppSelector(selectBankers);
  const bankersArray = [you, tomasso];
  const selectedBankers = bankersArray.filter(
    (t) => selected.id !== t.id && t.type === "banker"
  );

  const [selectedValueTo, setSelectedValuePlayer] = useState<Banker | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [openAmount, setOpenAmount] = useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };

  const onClickremitBill = () => {
    dispatch(
      remitBill({
        presenter: selected,
        presentee: selectedValueTo,
        bill: selectedBill,
      })
    );
    setSelectedValuePlayer(null);
    setSelectedBill(null);
    setAccordionExpanded({ ...accordionExpanded, remitBill: false });
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
                variant="contained"
                onClick={handleClickOpenAmount}
                sx={{ width: "150px", marginBottom: "5px" }}
              >
                Bill To Remit
              </Button>
              <DrawBillDialog
                selected={selected}
                setSelectedBill={setSelectedBill}
                open={openAmount}
                onClose={handleCloseAmount}
              />
              <Button
                onClick={handleClickOpenTo}
                sx={{ width: "150px" }}
              >
                Remit Bill To
              </Button>
              <ChoosePlayer
                onClose={handleCloseTo}
                setSelectedValuePlayer={setSelectedValuePlayer}
                open={openTo}
                selectedBankers={selectedBankers}
                info={{type: selected.type, action: "remitBill"}}
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
                {selectedValueTo ? `${selectedValueTo.id}` : `_`}
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
              disabled={!selectedValueTo || !selectedBill}
              onClick={onClickremitBill}
            >
              Ok
            </Button>
          </div>
        </>
      ) : (
        <Typography>There are no bills to remit</Typography>
      )}
    </Box>
  );
};

export default ExportCard;
