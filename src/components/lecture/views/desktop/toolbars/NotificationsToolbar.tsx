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
      {config.credit && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={{ margin: 0, padding: 0 }}>
            Total System Credit: ${totalCredit}
          </Typography>
          <LineChart
            width={450}
            height={125}
            data={totalCreditData}
            margin={{ top: 5, right: 30, left: 20, bottom: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis style={{ fontSize: "0.6rem" }} />
            <Tooltip />
            <Line
              type="monotone"
              name="+ credit"
              dataKey="credit"
              stroke={colors.balanceSheetsColor}
            />
            <Line type="monotone" dataKey="reserves" stroke={colors.darkMain} />
            <Legend iconType="line" />
          </LineChart>
        </Box>
      )}
      {config.constraint && (
        <Box width={300}>
          <Typography>Reserve Requirement: %{reservePercentage}</Typography>
          <Slider
            defaultValue={25}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChangeReserveRequirement}
          />
        </Box>
      )}
    </Box>
  );
};

export default ButtonAppBar;
