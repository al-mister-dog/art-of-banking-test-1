import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { Typography } from "@mui/material";

export default function Text(props: {
  bold?: boolean;
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
    <Typography
      variant="body1"
      sx={{
        fontSize: ".9rem",
        textAlign: "justify",
        marginBottom: "10px",
        fontWeight: props.bold ? "bold" : "",
      }}
    >
      {props.children}
    </Typography>
  );
}