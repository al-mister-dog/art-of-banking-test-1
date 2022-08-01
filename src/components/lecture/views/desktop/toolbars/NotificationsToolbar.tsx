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
import CentralBankCredit from "../../../../ui/charts/CentralBankCredit";
import FedFundsRateSlider from "../../../../ui/charts/FedFundsRateSlider";
import ReserveRequirementSlider from "../../../../ui/charts/ReserveRequirementSlider";
import TotalCreditChart from "../../../../ui/charts/TotalCredit";
import CreateCustomer from "../../../../ui/CreateCustomer";

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
        justifyContent: "space-around",
        alignItems: "flex-start",
        padding: "20px",
        
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
      {config.playground && (<CreateCustomer />)}
    </Box>
  );
};

export default ButtonAppBar;
