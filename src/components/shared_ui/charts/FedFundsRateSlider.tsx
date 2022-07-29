import { Box, Typography, Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setFedFundsRate,
  selectAuxilliary,
} from "../../../features/auxilliary/auxilliarySlice";

const FedFundsSlider = () => {
  const dispatch = useAppDispatch();
  const { fedFundsRate } = useAppSelector(selectAuxilliary);

  function handleChangeFedFundsRate(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setFedFundsRate({ rate: newValue }));
  }
  return (
    <Box
      sx={{
        width: "250px",
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
      >
        Fed Funds Rate: %{fedFundsRate}
      </Typography>
      <Slider
        defaultValue={1}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChangeFedFundsRate}
      />
    </Box>
  );
};

export default FedFundsSlider;
