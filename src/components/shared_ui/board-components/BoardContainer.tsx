import { styled } from "@mui/material";

export const BoardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",

  [theme.breakpoints.up("mobile")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("tablet")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.up("laptop")]: {
    flexDirection: "row",
    height: "60vh"
  },
}));