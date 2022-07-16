import { styled, Typography } from "@mui/material";

import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { colors } from "../../../config/colorPalette";

const TitleText = styled(Typography)(({ theme }) => ({
  letterSpacing: "2px",
  textAlign: "justify",
  marginBottom: "25px",
  color: colors.darkMain,
  [theme.breakpoints.down("laptop")]: {
    fontSize: "1.7rem",
    // fontWeight: "bold",
    textAlign: "center",
  },
}));

export default function Title(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <TitleText
      variant="h3"
      // sx={{ letterSpacing: "1px", textAlign: "justify", marginBottom: "10px" }}
    >
      {props.children}
    </TitleText>
  );
}
