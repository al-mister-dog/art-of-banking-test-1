import {Typography} from "@mui/material"
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

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
    <Typography variant="h4" sx={{ letterSpacing: "1px", textAlign: "justify" }}>
      {props.children}
    </Typography>
  );
}