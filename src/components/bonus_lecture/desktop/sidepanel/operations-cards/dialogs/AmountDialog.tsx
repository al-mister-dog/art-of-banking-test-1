import { Dialog, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

interface Trader {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
}



export interface AmountDialogProps {
  open: boolean;
  selectedValueAmount: number;
  setSelectedValueAmount: (v: number) => void;
  onClose: () => void;
  selectedTrader: Trader | null;
}

export default function AmountDialog(props: AmountDialogProps) {
  const {
    onClose,
    setSelectedValueAmount,
    open,
    selectedTrader,
  } = props;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const handleClose = () => {
    onClose();
  };
  const [provisionalAmount, setProvisionalAmount] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value);
    if (selectedTrader !== null) {
      if (amount === 0) {
        setError(true);
        setErrorMessage(`number can't be zero`);
      } else if (amount < 0 || amount > selectedTrader.goods) {
        setError(true);
        setErrorMessage(
          `${selectedTrader.id} does not have that amount of goods`
        );
      } else {
        setError(false);
        setErrorMessage(
          ``
        );
      }
    }

    setProvisionalAmount(amount);
  };

  function handleClick() {
    setSelectedValueAmount(provisionalAmount)
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Amount of Goods
        </Typography>
        <Typography variant="subtitle1">
          Goods are expressed in units of account (marcs), eg. '1' = 1 gold marc worth of goods.
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            error={error ? true : false}
            helperText={errorMessage}
            sx={{ padding: 1 }}
            id="standard-number"
            label="marcs"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChange}
          />
          <Button
            disabled={
              error || provisionalAmount <= 0 || isNaN(provisionalAmount)
            }
            onClick={handleClick}
          >
            Ok
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}