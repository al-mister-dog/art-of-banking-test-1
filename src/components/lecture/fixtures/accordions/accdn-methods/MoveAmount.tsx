import { useAppSelector } from "../../../../../app/hooks";
import { selectParties } from "../../../../../features/lectures/lecturesSlice";
import { selectAuxilliary } from "../../../../../features/auxilliary/auxilliarySlice";
import { useEffect, useState } from "react";
import ChooseParty from "../dialogs/ChoosePartyDialog";
import CardButton from "../../../../ui/CardButton";
import DispatchButton from "./Dispatch";
import Amount from "./Amount";
import { Box, Typography } from "@mui/material";
import { Accordions, Dispatches } from "../types";
import { IBank } from "../../../../../domain/types";
import { capitalize, deCamelize } from "../../../../../helpers/parsers";
import { colors } from "../../../../../config/colorPalette";
import useParties from "../../../../../helpers/useParties";

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
  const [selectedValueTo, setSelectedValueParty] = useState<IBank | null>(null);
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const parties = useAppSelector(selectParties);
  const { reservePercentage } = useAppSelector(selectAuxilliary);
  const [selectedParties] = useParties(parties, selected, filterMethod);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  interface Errors {
    transfer: any;
    withdraw: any;
  }
  const errors = {
    deposit(amount: number) {
      if (amount > selected.reserves) {
        setError(true);
        setErrorMessage(`You don't have enough cash`);
      } else {
        setError(false);
        setErrorMessage(``);
      }
    },
    transfer(amount: number) {
      if (
        !config.credit &&
        amount > selected.assets.customerDeposits[0].amount
      ) {
        setError(true);
        setErrorMessage(`Your bank does not allow overdrafts`);
      } else {
        setError(false);
        setErrorMessage(``);
      }
    },
    withdraw(amount: number) {
      if (config.state.system === "centralbank" && selectedValueTo) {
        console.log(12345);
        const reserves = selectedValueTo.assets.bankDeposits[0].amount;
        if (
          selectedValueTo &&
          config.constraint &&
          reserves - amount <= (reserves / 100) * reservePercentage
        ) {
          setError(true);
          setErrorMessage(`Your bank has insufficent reserve requirements`);
        } else if (selectedValueTo !== null && amount > reserves) {
          setError(true);
          setErrorMessage(`Your bank has insufficent reserves`);
        } else {
          setError(false);
          setErrorMessage(``);
        }
      } else {
        if (
          selectedValueTo &&
          config.constraint &&
          selectedValueTo.reserves - amount <=
            (selectedValueTo.reserves / 100) * reservePercentage
        ) {
          setError(true);
          setErrorMessage(`Your bank has insufficent reserve requirements`);
        } else if (
          selectedValueTo !== null &&
          amount > selectedValueTo.reserves
        ) {
          setError(true);
          setErrorMessage(`Your bank has insufficent reserves`);
        } else {
          setError(false);
          setErrorMessage(``);
        }
      }
    },
    createLoan(amount: number) {
      //if exception eg if bank can go into its own overdraft
      setError(false);
      setErrorMessage(``);
    },
    bankTransfer(amount: number) {
      //TODO
      setError(false);
      setErrorMessage(``);
    },
    openAccount(amount: number) {
      //TODO
      setError(false);
      setErrorMessage(``);
    },
  };
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let amount = parseInt(event.target.value);
    let key = dispatchMethod as keyof Errors;
    if (isNaN(amount)) {
      amount = 0;
    }
    if (amount <= 0) {
      setError(true);
      setErrorMessage(``);
    } else {
      errors[key](amount);
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
        } else if (dispatchMethod === "repayLoan") {
          selectedAmount = selectedValueTo.assets.bankLoans.find(
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
              marginBottom: "5px",
            }}
          >
            {btnText}
          </CardButton>
          <ChooseParty
            setSelectedValueParty={setSelectedValueParty}
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
            {selectedValueTo
              ? `${
                  selectedValueTo.name
                    ? `${deCamelize(selectedValueTo.name)}`
                    : `${deCamelize(selectedValueTo.id)}`
                }`
              : ` `}
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
        <DispatchButton
          selected={selected}
          selectedValueTo={selectedValueTo}
          setSelectedValueParty={setSelectedValueParty}
          selectedValueAmount={selectedValueAmount}
          setSelectedValueAmount={setSelectedValueAmount}
          accordionExpanded={accordionExpanded}
          setAccordionExpanded={setAccordionExpanded}
          dispatchMethod={dispatchMethod}
          btnText="Ok"
          variable={true}
        />
      </div>
    </Box>
  );
};

export default MoveFixedAmount;
