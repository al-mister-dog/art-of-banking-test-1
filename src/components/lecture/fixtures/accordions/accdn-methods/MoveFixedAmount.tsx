import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  payBank,
  creditBankAccount,
  debitBankAccount,
} from "../../../../../features/lectures/lecturesSlice";

import { useEffect, useState } from "react";
import ChoosePlayer from "../dialogs/ChoosePlayerDialog";

import { Accordions } from "../../../../types";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../../../config/colorPalette";
import { capitalize } from "../../../helpers/parsers";
import CardButton from "../../../ui/CardButton";
import { IBank } from "../../../../../features/lectures/program/types";


type DispatchFunctionSig = (
  selected: IBank,
  selectedValueTo: IBank,
  selectedValueAmount: number
) => void;

interface Dispatches {
  "Receive Bank Payment": DispatchFunctionSig;
  "Send Bank Payment": DispatchFunctionSig;
  "Credit Bank Account": DispatchFunctionSig;
  "Debit Bank Account": DispatchFunctionSig;
}

const MoveFixedAmount: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod: (selected: IBank, partiesArray: IBank[]) => IBank[];
  operationText: keyof Dispatches;
  methodText: string;
  // dispatchMethod: keyof Dispatches;
  config?: any;
}> = ({
  config,
  selected,
  accordionExpanded,
  setAccordionExpanded,
  filterMethod,
  operationText,
  methodText,
  // dispatchMethod,
}) => {
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const dispatchMethods = {
    "Send Bank Payment"(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        payBank({
          p1: selectedValueTo,
          p2: selected,
          amt: selectedValueAmount,
        })
      );
    },
    "Receive Bank Payment"(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        payBank({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    "Credit Bank Account"(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        creditBankAccount({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    "Debit Bank Account"(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        debitBankAccount({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
  };

  const parties = useAppSelector(selectParties);
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  const selectedParties = filterMethod(selected, partiesArray);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const onClickOk = () => {
    if (selectedValueTo !== null) {
      dispatchMethods[operationText](
        selected,
        selectedValueTo,
        selectedValueAmount
      );
      setSelectedValueAmount(0);
      setSelectedValuePlayer(null);
      setAccordionExpanded({ ...accordionExpanded, deposit: false });
    }
  };

  useEffect(() => {
    if (selectedValueTo) {
      let selectedAmount;
      if (operationText === "Receive Bank Payment") {
        selectedAmount = selectedValueTo.liabilities.dues.find(
          (account) => account.id === selected.id
        );
      } else {
        selectedAmount = selected.liabilities.dues.find(
          (account: { id: string }) => account.id === selectedValueTo.id
        );
      }
      if (selectedAmount) {
        setSelectedValueAmount(selectedAmount.amount);
      }
    }
  }, [selectedValueTo]);

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
          <CardButton
            variant="contained"
            onClick={handleClickOpenTo}
            sx={{ width: "130px", marginBottom: "5px" }}
          >
            {methodText}
          </CardButton>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedParties}
            methodText={operationText}
          />

          <Typography
            variant="h6"
            sx={{ color: colors.accordionTextColor, paddingLeft: "7px" }}
          >
            Amount
          </Typography>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ margin: 0.75 }}>
            {selectedValueTo ? `${capitalize(selectedValueTo.id)}` : ` `}
          </Typography>
          <Typography variant="h6" sx={{ margin: 0.75 }}>
            ${selectedValueAmount ? `${selectedValueAmount}` : `0`}
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
        <CardButton
          variant="contained"
          disabled={
            selectedValueAmount < 1 ||
            selectedValueTo === null ||
            !selectedValueAmount
          }
          sx={{marginTop: "10px"}}
          onClick={onClickOk}
        >
          Ok
        </CardButton>
      </div>
    </Box>
  );
};

export default MoveFixedAmount;
