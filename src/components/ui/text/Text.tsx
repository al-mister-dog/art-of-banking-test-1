import { Typography } from "@mui/material";
import { colors } from "../../../config/colorPalette";

export default function Text({
  children,
  bold,
}: {
  children: string;
  bold?: boolean;
}) {
  return (
    <Typography
      variant="body1"
      sx={{
        letterSpacing: "1px",
        fontSize: "1.2rem",
        textAlign: "justify",
        marginBottom: "10px",
        fontWeight: bold ? "bold" : "",
        color: colors.darkMain
      }}
    >
      {children}
    </Typography>
  );
}
