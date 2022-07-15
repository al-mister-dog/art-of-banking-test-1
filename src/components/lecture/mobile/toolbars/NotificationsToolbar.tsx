//TODO
//credit expansion graph
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectParties,
} from "../../../../features/lectures/lecturesSlice";
import {
  selectAuxilliary,
  setReservePercentage,
  setTotalCreditData,
} from "../../../../features/auxilliary/auxilliarySlice";
import { Box, Slider, Typography } from "@mui/material";

import { useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

const ButtonAppBar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { reservePercentage, totalCreditData, totalCredit } = useAppSelector(selectAuxilliary);

  useEffect(() => {
    dispatch(setTotalCreditData({parties}))
  }, [parties]);


  function handleChangeReserveRequirement(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setReservePercentage({ percentage: newValue }));
  }
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    }}
  >
    {config.constraint && (
      <Box sx={{width: "250px"}}>
        <Typography variant="caption">Reserve Requirement: %{reservePercentage}</Typography>
        <Slider
          defaultValue={25}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChangeReserveRequirement}
        />
      </Box>
    )}
    {config.credit && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" style={{ margin: 0, padding: 0 }}>
          Total System Credit: ${totalCredit}
        </Typography>
        <LineChart
          width={250}
          height={100}
          data={totalCreditData}
          margin={{ bottom: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis style={{fontSize: "0.5rem"}}/>
          <Tooltip />
          <Line type="monotone" dataKey="credit" stroke="#8884d8" />
        </LineChart>
      </Box>
    )}
  </Box>
);
};

export default ButtonAppBar;
