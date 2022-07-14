import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  withdraw,
  
} from "../../../../../features/moduleState/fundamentalsSlice";
import { findBankByCustomersAccounts } from "./__filters";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

import { useState } from "react";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";
import DoneIcon from "@mui/icons-material/Done";
import { Accordions } from "../../../../types";



const ImportCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  // const parties = useAppSelector(selectParties);
  // let partiesArray: IBank[] = [];
  // for (const key in parties) {
  //   partiesArray = [...partiesArray, parties[key]];
  // }
  // const bankParties = findBankByCustomersAccounts(selected, partiesArray);
  // const [selectAmount, setSelectAmount] = useState(false);
  // const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
  //   null
  // );
  // const [openTo, setOpenTo] = useState(false);
  // const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);
  // const [amountInputOpen, setAmountInputOpen] = useState(false);

  // const handleClickOpenTo = () => {
  //   setOpenTo(true);
  // };
  // const handleCloseTo = () => {
  //   setOpenTo(false);
  // };

  // const onClickWithdraw = () => {
  //   dispatch(
  //     withdraw({ p1: selected, p2: selectedValueTo, amt: selectedValueAmount })
  //   );
  //   setSelectedValueAmount(0);
  //   setSelectedValuePlayer(null);
  //   setAccordionExpanded({ ...accordionExpanded, deposit: false });
  // };

  // const [errorMessage, setErrorMessage] = useState(``);
  // const [provisionalAmount, setProvisionalAmount] = useState<number>(0);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const amount = parseInt(event.target.value);
  //   // if (selectedTrader !== null) {
  //   //   if (amount === 0) {
  //   //     setError(true);
  //   //     setErrorMessage(`number can't be zero`);
  //   //   } else if (amount < 0 || amount > selectedTrader.goods) {
  //   //     setError(true);
  //   //     setErrorMessage(
  //   //       `${selectedTrader.id} does not have that amount of goods`
  //   //     );
  //   //   } else {
  //   //     setError(false);
  //   //     setErrorMessage(
  //   //       ``
  //   //     );
  //   //   }
  //   // }

  //   setProvisionalAmount(amount);
  // };

  // function handleClick() {
  //   setSelectedValueAmount(provisionalAmount);
  //   setSelectAmount(!selectAmount);
  // }
  
  return (
    <Box>
      {/* <Button onClick={() => dispatch(settleDues())}>Settle Dues</Button> */}
      {/* <div
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
            Withdraw From
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={bankParties}
          />

          <Button
            variant="contained"
            disabled={selectedValueTo === null}
            onClick={() => setSelectAmount(!selectAmount)}
            sx={{ width: "130px" }}
          >
            Amount
          </Button>
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
          {!selectAmount ? (
            <Typography sx={{ margin: 0.75 }}>
              {isNaN(selectedValueAmount) ? `_` : `${selectedValueAmount}`}
            </Typography>
          ) : (
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{
                  color: "#f2eecb",
                  input: { color: "#f2eecb" },
                  label: { color: "#f2eecb" },
                  "& label.Mui-focused": {
                    color: "#f2eecb",
                  },
                }}
                id="standard-number"
                label="dollars"
                type="number"
                value={provisionalAmount}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleChange}
              />
              <IconButton onClick={handleClick}>
                <DoneIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          )}
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
          onClick={onClickWithdraw}
        >
          Ok
        </Button>
      </div> */}
    </Box>
  );
};

export default ImportCard;
