import { styled, Typography } from "@mui/material";
import { colors } from "../../../config/colorPalette";

const TitleText = styled(Typography)(({ theme }) => ({
  letterSpacing: "2px",
  textAlign: "justify",
  marginBottom: "25px",
  color: colors.darkMain,
  [theme.breakpoints.down("laptop")]: {
    fontSize: "1.7rem",
    textAlign: "center",
  },
}));

export default function Title({ children }: { children: string }) {
  return <TitleText variant="h3">{children}</TitleText>;
}
