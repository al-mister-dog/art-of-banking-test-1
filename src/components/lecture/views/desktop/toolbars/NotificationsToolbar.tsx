//TODO
//credit expansion graph
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { selectParties } from "../../../../../features/lectures/lecturesSlice";
import {
  selectAuxilliary,
  setReservePercentage,
  setTotalCreditData,
} from "../../../../../features/auxilliary/auxilliarySlice";
import { Box, Slider, Typography } from "@mui/material";

import { useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
} from "recharts";
import { colors } from "../../../../../config/colorPalette";
import CentralBankCredit from "../../../../shared_ui/charts/CentralBankCredit";
import FedFundsRateSlider from "../../../../shared_ui/charts/FedFundsRateSlider";
import ReserveRequirementSlider from "../../../../shared_ui/charts/ReserveRequirementSlider";
import TotalCreditChart from "../../../../shared_ui/charts/TotalCredit";

const ButtonAppBar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { reservePercentage, totalCreditData, totalCredit } =
    useAppSelector(selectAuxilliary);

  function handleChangeReserveRequirement(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setReservePercentage({ percentage: newValue }));
  }

  useEffect(() => {
    dispatch(setTotalCreditData({ parties }));
  }, [parties]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {config.constraint && <ReserveRequirementSlider />}
      {config.parties.includes("centralbank") && (
        <>
          <CentralBankCredit />
          <FedFundsRateSlider />
        </>
      )}

      {config.credit && !config.parties.includes("centralbank") && (
        <TotalCreditChart />
      )}
    </Box>
  );
};

export default ButtonAppBar;
