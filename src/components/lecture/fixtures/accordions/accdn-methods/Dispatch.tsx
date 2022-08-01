import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  payBank,
  creditBankAccount,
  debitBankAccount,
  withdraw,
  deposit,
  transfer,
  bankTransfer,
  createLoan,
  repayLoan,
  settleDues,
  chNetDues,
  netCorrespondingDues,
} from "../../../../../features/lectures/lecturesSlice";
import { selectAuxilliary } from "../../../../../features/auxilliary/auxilliarySlice";
import CardButton from "../../../../ui/CardButton";
import { Accordions, Dispatches, PayloadArguments } from "../types";
import { IBank } from "../../../../../domain/types";

const DispatchButton: React.FunctionComponent<{
  selected: any;
  selectedValueTo: IBank | null;
  setSelectedValueParty: (v: IBank | null) => void;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  dispatchMethod: keyof Dispatches;
  selectedValueAmount: number;
  setSelectedValueAmount: (v: number) => void;
  btnText?: string;
  variable?: boolean;
}> = ({
  selected,
  selectedValueTo,
  setSelectedValueParty,
  accordionExpanded,
  setAccordionExpanded,
  dispatchMethod,
  selectedValueAmount,
  setSelectedValueAmount,
  btnText,
}) => {
  const dispatch = useAppDispatch();
  //additional payload args
  const { fedFundsRate } = useAppSelector(selectAuxilliary);

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
    bankTransfer(payloadArgs: PayloadArguments) {
      dispatch(bankTransfer(payloadArgs));
    },
    payBank(payloadArgs: PayloadArguments) {
      dispatch(payBank(payloadArgs));
    },
    createLoan(payloadArgs: PayloadArguments) {
      dispatch(createLoan({ ...payloadArgs, fedFundsRate }));
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
    //dues
    settleDues() {
      dispatch(settleDues());
    },
    netClearinghouseDues() {
      dispatch(chNetDues());
    },
    netCorrespondingDues() {
      dispatch(netCorrespondingDues({ p1: selected, p2: selectedValueTo }));
    },
  };

  const onClickOk = () => {
    if (setSelectedValueAmount && selectedValueAmount) {
      if (selectedValueTo !== null) {
        dispatchMethods[dispatchMethod]({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        });
        setSelectedValueAmount(0);
        setSelectedValueParty(null);
        setAccordionExpanded({
          ...accordionExpanded,
          [dispatchMethod as keyof Accordions]: false,
        });
      }
    } else {
      if (dispatchMethod === "settleDues") {
        dispatchMethods.settleDues();
      } else if (dispatchMethod === "netClearinghouseDues") {
        dispatchMethods.netClearinghouseDues();
      } else {
        dispatchMethods.netCorrespondingDues();
      }
    }
  };

  return (
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
      {btnText}
    </CardButton>
  );
};

export default DispatchButton;