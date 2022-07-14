import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  withdraw,
  deposit,
  transfer,
  payBank,
} from "../../../../../features/moduleState/fundamentalsSlice";
import { selectAuxilliary } from "../../../../../features/auxilliary/auxilliarySlice";

import { useState } from "react";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";
import { Accordions } from "../../../../types";
import { Box, Button, Typography } from "@mui/material";
import Amount from "./buttons/Amount";

type DispatchFunctionSig = (
  selected: IBank,
  selectedValueTo: IBank,
  selectedValueAmount: number
) => void;

interface Dispatches {
  withdraw: DispatchFunctionSig;
  deposit: DispatchFunctionSig;
  transfer: DispatchFunctionSig;
  payBank: DispatchFunctionSig;
}

const MoveVariableAmount: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod: (selected: IBank, partiesArray: IBank[]) => IBank[];
  operationText: string;
  methodText: string;
  dispatchMethod: keyof Dispatches;
  config?: any;
}> = ({
  config,
  selected,
  accordionExpanded,
  setAccordionExpanded,
  filterMethod,
  operationText,
  methodText,
  dispatchMethod,
}) => {
  const { reservePercentage } = useAppSelector(selectAuxilliary);
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const dispatchMethods = {
    deposit(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        deposit({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    withdraw(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        withdraw({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    transfer(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        transfer({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    payBank(
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
      dispatchMethods[dispatchMethod](
        selected,
        selectedValueTo,
        selectedValueAmount
      );
      setSelectedValueAmount(0);
      setSelectedValuePlayer(null);
      setAccordionExpanded({ ...accordionExpanded, deposit: false });
    }
  };
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value);
    if (selectedValueTo) {
      // console.log(selectedValueTo.reserves);
    }
    if (amount <= 0) {
      setError(true);
      setErrorMessage(``);
    } else if (
      dispatchMethod === "transfer" &&
      !config.credit &&
      amount > selected.assets.customerDeposits[0].amount
    ) {
      setError(true);
      setErrorMessage(`Your bank does not allow overdrafts`);
    } else if (
      selectedValueTo &&
      dispatchMethod === "withdraw" &&
      config.constraint &&
      selectedValueTo.reserves - amount <=
        (selectedValueTo.reserves / 100) * reservePercentage
      // config.constraint &&
      // dispatchMethod === "withdraw" &&
      // selectedValueTo !== null &&
      // (selected.valueTo.reserves - amount) <= (selected.valueTo.reserves / 100 * 25)
    ) {
      setError(true);
      setErrorMessage(`Your bank has insufficent reserve requirements`);
    } else if (
      dispatchMethod === "withdraw" &&
      selectedValueTo !== null &&
      amount > selectedValueTo.reserves
    ) {
      setError(true);
      setErrorMessage(`Your bank has insufficent reserves`);
    } else {
      setError(false);
      setErrorMessage(``);
    }
    setSelectedValueAmount(amount);
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
            {methodText}
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedParties}
            methodText={methodText}
          />

          <Typography
            variant="h6"
            sx={{ color: "#f2eecb", paddingLeft: "7px" }}
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
          <Typography sx={{ margin: 0.75 }}>
            {selectedValueTo ? `${selectedValueTo.id}` : ` `}
          </Typography>

          <Amount
            selectedValueAmount={selectedValueAmount}
            handleChangeAmount={handleChangeAmount}
            error={error}
            errorMessage={errorMessage}
          />
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
          disabled={
            selectedValueAmount < 1 ||
            selectedValueTo === null ||
            error ||
            !selectedValueAmount
          }
          onClick={onClickOk}
        >
          Ok
        </Button>
      </div>
    </Box>
  );
};

export default MoveVariableAmount;
