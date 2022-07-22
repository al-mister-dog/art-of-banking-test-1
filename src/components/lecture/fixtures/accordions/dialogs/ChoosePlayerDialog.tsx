import {
  Dialog,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

interface Method {
  [index: string]: any;
}

const methods: Method = {
  "Receive Bank Payment": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Debtor Bank`
        : `You are not owed anything at the moment`;
    },
  },
  "Send Bank Payment": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Creditor Bank`
        : `You do not owe anyone at the moment`;
    },
  },
  "Withdraw From": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a Bank to withdraw your funds`
        : `You need to open an accuont`;
    },
  },
  "Transfer To": {
    moreThanOne(arr: any[]) {
      return arr.length > 0 ? `Find a Payee` : `There are no other customers`;
    },
  },
  "Deposit To": {
    moreThanOne(arr: any[]) {
      return arr.length > 0 ? `Make a deposit` : `You need to open an account`;
    },
  },
  "Net Dues": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a bank you do business with`
        : `You have no correspondent accounts`;
    },
  },
  "Credit Bank Account": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Credit the account of a corresponding bank`
        : `You have no correspondent accounts`;
    },
  },
  "Debit Bank Account": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Debit the account of a corresponding bank`
        : `You have no correspondent accounts`;
    },
  },
  "Get Loan": {
    moreThanOne(arr: any[]) {
      return arr.length > 0
        ? `Find a bank to lend you reserves`
        : `There are no banks with sufficient reserves`;
    },
  },
};

export interface ChoosePlayerProps {
  open: boolean;
  setSelectedValuePlayer: (v: any) => void;
  onClose: () => void;
  selectedBankers: any[];
  method: string;
}

export default function ChoosePlayer(props: ChoosePlayerProps) {
  const { onClose, setSelectedValuePlayer, open, selectedBankers, method } =
    props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: any) => {
    setSelectedValuePlayer(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          {method}
        </Typography>
        <Typography variant="subtitle1">
          {methods[method].moreThanOne(selectedBankers)}
        </Typography>
        <List sx={{ pt: 0 }}>
          {selectedBankers.map((banker, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(banker)}
              key={i}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={banker.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
