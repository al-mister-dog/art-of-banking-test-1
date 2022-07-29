import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectParties } from "../../../features/lectures/lecturesSlice";
import {
  selectAuxilliary,
  setTotalCreditData,
} from "../../../features/auxilliary/auxilliarySlice";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../../config/colorPalette";

const TotalCreditChart: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { totalCreditData, totalCredit } = useAppSelector(selectAuxilliary);

  useEffect(() => {
    dispatch(setTotalCreditData({ parties }));
  }, [parties]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "22vh",
      }}
    >
      <Typography
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Roboto",
          fontWeight: "bold",
          color: colors.darkMain,
        }}
      >
        Total System Credit: ${parseInt(totalCredit.toFixed(2))}
      </Typography>
      <ResponsiveContainer width={300} height="100%">
        <LineChart
          data={totalCreditData}
          margin={{ top: 10, right: 15, left: -35, bottom: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis style={{ fontSize: "0.5rem" }} />
          <Tooltip />
          <Line
            type="monotone"
            name="+ credit"
            dataKey="credit"
            stroke={colors.balanceSheetsColor}
          />
          <Line type="monotone" dataKey="reserves" stroke={colors.darkMain} />
          <Legend
            iconType="line"
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: "10px",
              paddingLeft: "30px",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TotalCreditChart;
