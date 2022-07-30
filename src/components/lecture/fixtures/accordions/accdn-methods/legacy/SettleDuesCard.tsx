import { useAppDispatch } from "../../../../../../app/hooks";
import {
  settleDues,
} from "../../../../../../features/lectures/lecturesSlice";
import { Box, Typography } from "@mui/material";
import { Accordions } from "../../types";
import CardButton from "../../../../../ui/CardButton";


const SettleDues: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();

  function handlesettleDues() {
    dispatch(settleDues())
    // setAccordionExpanded({ ...accordionExpanded, deposit: false });
  }
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end", padding: 0}}>
      
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
        <Typography variant="h6">Due Froms</Typography>
          {selected.assets.dues.map((due: any, index: number) => {
            return due.amount > 0 && (
              <Typography variant="body1" sx={{fontFamily: "Roboto", fontWeight: "bold"}} key={index}>
                {due.id}: ${due.amount}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
        <Typography variant="h6">Due Tos</Typography>
          {selected.liabilities.dues.map((due: any, index: number) => {
            return due.amount > 0 && (
              <Typography variant="body1" sx={{fontFamily: "Roboto", fontWeight: "bold"}} key={index}>
                {due.id}: ${due.amount}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <CardButton variant="contained" onClick={handlesettleDues}>
        Settle Dues
      </CardButton>
    </Box>
  );
};

export default SettleDues;
