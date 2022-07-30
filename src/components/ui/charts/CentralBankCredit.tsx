import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectParties } from "../../../features/lectures/lecturesSlice";
import {
  selectAuxilliary,
  setcentralbankCreditData,
} from "../../../features/auxilliary/auxilliarySlice";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../../config/colorPalette";

const ButtonAppBar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { centralbankCreditData } = useAppSelector(selectAuxilliary);

  useEffect(() => {
    dispatch(setcentralbankCreditData({ parties }));
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
        Credit Expansion
      </Typography>
      <ResponsiveContainer width={350} height="100%">
        <LineChart
          data={centralbankCreditData}
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
            stroke="#20d6df"
          />
          <Line type="monotone" dataKey="reserves" stroke="#cf3095" />
          <Line type="monotone" dataKey="privateCredit" stroke="#615404" />
          <Legend
            iconType="line"
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: "10px",
              // paddingLeft: "30px",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ButtonAppBar;
