import { styled } from "@mui/material";

export const BalanceSheetList = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("mobile")]: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  [theme.breakpoints.up("tablet")]: {
    flexDirection: "column",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  [theme.breakpoints.up("laptop")]: {
    overflowX: "hidden",
  },
}));
