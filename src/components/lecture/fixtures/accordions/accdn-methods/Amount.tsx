import { Box, TextField } from "@mui/material";
import { colors } from "../../../../../config/colorPalette";


const Amount: React.FunctionComponent<{
  selectedValueAmount: number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error:  boolean
  errorMessage: string
}> = ({ selectedValueAmount, handleChangeAmount, error, errorMessage }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        sx={{
          color: colors.accordionTextColor,
          input: { color: colors.accordionTextColor },
          label: { color: colors.accordionTextColor },
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
        variant="standard"
        onChange={handleChangeAmount}
      />
    </Box>
  );
};

export default Amount;
