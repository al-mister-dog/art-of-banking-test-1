import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  selectParties,
  settleDues,
  netCorrespondingDues,
  chNetDues,
} from "../../../../../features/lectures/lecturesSlice";
import { Box, Typography } from "@mui/material";
import CardButton from "../../../ui/CardButton";
import { Accordions, DuesDispatches } from "../types";
import { IBank } from "../../../../../features/lectures/program/types";
import { useEffect, useState } from "react";
import { netAmount } from "../../../helpers/utils";
import ChoosePlayer from "../dialogs/ChoosePlayerDialog";
import { colors } from "../../../../../config/colorPalette";
import { deCamelize } from "../../../helpers/parsers";
import useParties from "../../../helpers/useParties";

const Dues: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod?: (selected: IBank, partiesArray: IBank[]) => IBank[];
  dispatchMethod: keyof DuesDispatches;
  method: string;
  btnText: string;
}> = ({
  selected,
  accordionExpanded,
  setAccordionExpanded,
  filterMethod,
  dispatchMethod,
  method,
  btnText,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const [selectedParties] = useParties(parties, selected, filterMethod)
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [selectedValueAmount, setSelectedValueAmount] = useState<string>("");

  const [openTo, setOpenTo] = useState(false);

  const dispatchMethods = {
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

  function handleDispatch() {
    if (dispatchMethod === "settleDues") {
      dispatchMethods.settleDues();
    } else if (dispatchMethod === "netClearinghouseDues") {
      dispatchMethods.netClearinghouseDues();
    }
    setAccordionExpanded({ ...accordionExpanded, [dispatchMethod as keyof Accordions]: false });
  }

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const onClickNetDues = () => {
    dispatchMethods.netCorrespondingDues();
    setAccordionExpanded({ ...accordionExpanded, [dispatchMethod as keyof Accordions]: false });
  };

  useEffect(() => {
    if (selectedValueTo) {
      const selectedAmount = netAmount(selectedValueTo, selected);
      if (selectedAmount) {
        setSelectedValueAmount(selectedAmount);
      }
    }
  }, [selectedValueTo]);

  return filterMethod ? (
    <Box>
      <ChoosePlayer
        setSelectedValuePlayer={setSelectedValuePlayer}
        open={openTo}
        onClose={handleCloseTo}
        selectedBankers={selectedParties}
        method={method}
      />
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
            Net Dues Of
          </CardButton>
          <Typography
            variant="h6"
            sx={{ color: colors.accordionTextColor, paddingLeft: "7px" }}
          >
            Dues After Net:
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
            {selectedValueTo ? `${deCamelize(selectedValueTo.id)}` : ` `}
          </Typography>
          <Typography sx={{ margin: 0.75 }}>
            {selectedValueAmount ? `${selectedValueAmount}` : `...`}
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
          disabled={!selectedValueTo}
          onClick={onClickNetDues}
        >
          Ok
        </CardButton>
      </div>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <Typography variant="h6">Due Froms</Typography>
          {selected.assets.dues.map((due: any, index: number) => {
            return (
              due.amount > 0 && (
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
                  key={index}
                >
                  {due.id}: ${due.amount}
                </Typography>
              )
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <Typography variant="h6">Due Tos</Typography>
          {selected.liabilities.dues.map((due: any, index: number) => {
            return (
              due.amount > 0 && (
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
                  key={index}
                >
                  {due.id}: ${due.amount}
                </Typography>
              )
            );
          })}
        </Box>
      </Box>
      <CardButton variant="contained" onClick={handleDispatch}>
        {btnText}
      </CardButton>
    </Box>
  );
};

export default Dues;
