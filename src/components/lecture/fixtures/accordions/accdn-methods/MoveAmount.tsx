import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  payBank,
  creditBankAccount,
  debitBankAccount,
  withdraw,
  deposit,
  transfer,
  createLoan,
  repayLoan,
} from "../../../../../features/lectures/lecturesSlice";
import { selectAuxilliary } from "../../../../../features/auxilliary/auxilliarySlice";
import { useEffect, useState } from "react";
import ChoosePlayer from "../dialogs/ChoosePartyDialog";
import CardButton from "../../../ui/CardButton";
import Amount from "./Amount";
import { Box, Typography } from "@mui/material";
import { Accordions, Dispatches, PayloadArguments } from "../types";
import { IBank } from "../../../../../domain/types";
import { capitalize } from "../../../helpers/parsers";
import { colors } from "../../../../../config/colorPalette";
import useParties from "../../../helpers/useParties";

const MoveFixedAmount: React.FunctionComponent<{
  variable?: boolean;
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod: (selected: IBank, partiesArray: IBank[]) => IBank[];
  method: string;
  btnText: string;
  dispatchMethod: keyof Dispatches;
  config?: any;
}> = ({
  variable,
  config,
  selected,
  accordionExpanded,
  setAccordionExpanded,
  filterMethod,
  method,
  btnText,
  dispatchMethod,
}) => {
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const dispatchMethods = {
    deposit(payloadArgs: PayloadArguments) {
      dispatch(deposit(payloadArgs));
    },
    withdraw(payloadArgs: PayloadArguments) {
      dispatch(withdraw(payloadArgs));
    },
    transfer(payloadArgs: PayloadArguments) {
      dispatch(transfer(payloadArgs));
    },
    payBank(payloadArgs: PayloadArguments) {
      dispatch(payBank(payloadArgs));
    },
    createLoan(payloadArgs: PayloadArguments) {
      dispatch(createLoan(payloadArgs));
    },
    repayLoan(payloadArgs: PayloadArguments) {
      dispatch(repayLoan(payloadArgs));
    },
    sendBankPayment(payloadArgs: PayloadArguments) {
      dispatch(payBank(payloadArgs));
    },
    receiveBankPayment(payloadArgs: PayloadArguments) {
      dispatch(payBank(payloadArgs));
    },
    creditBankAccount(payloadArgs: PayloadArguments) {
      dispatch(creditBankAccount(payloadArgs));
    },
    debitBankAccount(payloadArgs: PayloadArguments) {
      dispatch(debitBankAccount(payloadArgs));
    },
  };

  const parties = useAppSelector(selectParties);
  const { reservePercentage } = useAppSelector(selectAuxilliary);
  const [selectedParties] = useParties(parties, selected, filterMethod);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const onClickOk = () => {
    if (selectedValueTo !== null) {
      dispatchMethods[dispatchMethod]({
        p1: selected,
        p2: selectedValueTo,
        amt: selectedValueAmount,
      });
      setSelectedValueAmount(0);
      setSelectedValuePlayer(null);
      setAccordionExpanded({ ...accordionExpanded, [dispatchMethod as keyof Accordions]: false });
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

  useEffect(() => {
    if (!variable) {
      if (selectedValueTo) {
        let selectedAmount;
        if (dispatchMethod === "receiveBankPayment") {
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
            sx={{ 
              // width: "130px",
               marginBottom: "5px" }}
          >
            {btnText}
          </CardButton>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedParties}
            method={method}
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
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h6" sx={{ margin: 0.75 }}>
            {selectedValueTo ? `${capitalize(selectedValueTo.id)}` : ` `}
          </Typography>
          {variable ? (
            <Amount
              selectedValueAmount={selectedValueAmount}
              handleChangeAmount={handleChangeAmount}
              error={error}
              errorMessage={errorMessage}
            />
          ) : (
            <Typography variant="h6" sx={{ margin: 0.75 }}>
              ${selectedValueAmount ? `${selectedValueAmount}` : `0`}
            </Typography>
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
        <CardButton
          variant="contained"
          disabled={
            selectedValueAmount < 1 ||
            selectedValueTo === null ||
            !selectedValueAmount
          }
          sx={{ marginTop: "10px" }}
          onClick={onClickOk}
        >
          Ok
        </CardButton>
      </div>
    </Box>
  );
};

export default MoveFixedAmount;
