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

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { colors } from "../../../config/colorPalette";
import {
  selectAuxilliary,
  setReservePercentage,
  setSingleCreditData,
} from "../../../features/auxilliary/auxilliarySlice";
import { selectParties } from "../../../features/lectures/lecturesSlice";

const ButtonAppBar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { reservePercentage, totalCreditData, singleCreditData, singleCredit, totalCredit } =
    useAppSelector(selectAuxilliary);

  function handleChangeReserveRequirement(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setReservePercentage({ percentage: newValue }));
  }

  useEffect(() => {
    dispatch(setSingleCreditData({ parties }));
  }, [parties]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ margin: 0, padding: 0 }}>
          Total System Credit: ${parseInt(singleCredit.toFixed(2))}
        </Typography>
        <LineChart
          width={450}
          height={125}
          data={singleCreditData}
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
    </Box>
  );
};

export default ButtonAppBar;
