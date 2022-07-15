import { styled, Typography } from "@mui/material";

import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

const TitleText = styled(Typography)(({ theme }) => ({
  letterSpacing: "1px",
  textAlign: "justify",
  marginBottom: "10px",
  color: "#134749",
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
      variant="h4"
      // sx={{ letterSpacing: "1px", textAlign: "justify", marginBottom: "10px" }}
    >
      {props.children}
    </TitleText>
  );
}
