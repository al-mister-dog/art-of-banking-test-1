import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { selectParties, netCorrespondingDues } from "../../../../../features/lectures/lecturesSlice";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";


import { Accordions } from "../../../../types";
import { IBank } from "../../../../../features/lectures/program/types";
import ChoosePlayer from "../dialogs/ChoosePlayerDialog";
import CardButton from "../../../ui/CardButton";
import { findOwedandOweingBanks } from "../../../helpers/filters";
import { deCamelize } from "../../../helpers/parsers";
import { colors } from "../../../../../config/colorPalette";


const NetDuesCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const operationText = "Net Dues";
  const parties = useAppSelector(selectParties);
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  const selectedParties = findOwedandOweingBanks(selected, partiesArray);
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<string>("");
  

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  function onClickNetDues() {
    dispatch(netCorrespondingDues({ p1: selected, p2: selectedValueTo }));
  }
  
  useEffect(() => {
    if (selectedValueTo) {
      let selectedAmount;

      const whatYouOwe = selected.liabilities.dues.find(
        (account: { id: string }) => account.id === selectedValueTo.id
      );
      const whatOtherBankOwes = selected.assets.dues.find(
        (account: { id: string }) => account.id === selectedValueTo.id
      );
      if (whatYouOwe && whatOtherBankOwes) {
        if (whatYouOwe.amount > whatOtherBankOwes.amount) {
          selectedAmount = `${deCamelize(selectedValueTo.id)} owed: $${
            whatYouOwe.amount - whatOtherBankOwes.amount
          }`;
          setSelectedValueAmount(selectedAmount);
        } else if (whatOtherBankOwes.amount > whatYouOwe.amount) {
          selectedAmount = `${deCamelize(selected.id)} owed: $${
            whatOtherBankOwes.amount - whatYouOwe.amount
          }`;
          setSelectedValueAmount(selectedAmount);
        }
      }
    }
  }, [selectedValueTo]);
  return (
    <Box>
      <ChoosePlayer
        setSelectedValuePlayer={setSelectedValuePlayer}
        open={openTo}
        onClose={handleCloseTo}
        selectedBankers={selectedParties}
        methodText={operationText}
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
          {/* <CardButton onClick={onClickNetDues}>Net Dues</CardButton> */}
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
  );
};

export default NetDuesCard;
