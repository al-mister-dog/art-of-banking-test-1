import { Box, TextField } from "@mui/material";
import { colors } from "../../../../../config/colorPalette";

const Amount: React.FunctionComponent<{
  selectedValueAmount: number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  errorMessage: string;
}> = ({ selectedValueAmount, handleChangeAmount, error, errorMessage }) => {
  return (
    <Box sx={{ display: "flex", width: "90%" }}>
      <TextField
        sx={{
          color: colors.accordionTextColor,
          // border: "1px solid white",
          
          input: { color: colors.accordionTextColor, textAlign: "right",  borderBottom: `1px solid white`,},
          label: {
            color: colors.accordionTextColor,
            width: "100%",
            textAlign: "right",
            transformOrigin: "center",
          },
          "& .MuiFilledInput-root": {
            // borderTop: "1px solid white",
            // borderBottom: "1px solid white"
          },
          "& label.Mui-focused": {
            color: colors.accordionTextColor,
          },
        }}
        error={error}
        helperText={errorMessage}
        id="standard-number"
        label="dollars"
        type="number"
        value={selectedValueAmount}
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
        onChange={handleChangeAmount}
      />
    </Box>
  );
};

export default Amount;
