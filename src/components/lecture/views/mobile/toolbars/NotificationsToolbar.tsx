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
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../../../../config/colorPalette";
import { ContentType } from "recharts/types/component/DefaultLegendContent";

const ButtonAppBar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { reservePercentage, totalCreditData, totalCredit } =
    useAppSelector(selectAuxilliary);

  useEffect(() => {
    dispatch(setTotalCreditData({ parties }));
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {config.constraint && (
        <Box
          sx={{
            width: "250px",
          }}
        >
          <Typography variant="caption" sx={{fontFamily: "Roboto", fontWeight: "bold"}}>
            Reserve Requirement: %{reservePercentage}
          </Typography>
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
            height: "22vh",
          }}
        >
          <Typography variant="caption" style={{ margin: 0, padding: 0, fontFamily: "Roboto", fontWeight: "bold" }}>
            Total System Credit: ${totalCredit}
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
              <Line
                type="monotone"
                dataKey="reserves"
                stroke={colors.darkMain}
              />
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
      )}
    </Box>
  );
};

export default ButtonAppBar;
