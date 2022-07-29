import { Box, Typography, Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setReservePercentage,
  selectAuxilliary,
} from "../../../features/auxilliary/auxilliarySlice";

const ReserveRequirementSlider = () => {
  const dispatch = useAppDispatch();
  const { reservePercentage } = useAppSelector(selectAuxilliary);

  function handleChangeReserveRequirement(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setReservePercentage({ percentage: newValue }));
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
        Reserve Requirement: %{reservePercentage}
      </Typography>
      <Slider
        defaultValue={25}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChangeReserveRequirement}
      />
    </Box>
  );
};

export default ReserveRequirementSlider;
