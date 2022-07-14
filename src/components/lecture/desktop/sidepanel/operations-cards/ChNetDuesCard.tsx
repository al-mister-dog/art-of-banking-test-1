import { useAppDispatch } from "../../../../../app/hooks";
import {
  chNetDues,
} from "../../../../../features/lectures/lecturesSlice";
import { Box, Button, Typography } from "@mui/material";
import { Accordions } from "../../../../types";

const ChNetDuesCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  
  const dispatch = useAppDispatch()

  function handleChNetDues() {
    dispatch(chNetDues())
    // setAccordionExpanded({ ...accordionExpanded, deposit: false });
  }
  return (
    <Box sx={{display: "flex", justifyContent: "space-around"}}>
      <Button variant="contained" onClick={handleChNetDues}>
        Net Dues
      </Button>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <Typography>Due Froms</Typography>
          {selected.assets.dues.map((due: any, index: number) => {
            return due.amount > 0 && (
              <Typography variant="caption" key={index}>
                {due.id}: ${due.amount}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "5px" }}>
          <Typography>Due Tos</Typography>
          {selected.liabilities.dues.map((due: any, index: number) => {
            return due.amount > 0 && (
              <Typography variant="caption" key={index}>
                {due.id}: ${due.amount}
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ChNetDuesCard;

