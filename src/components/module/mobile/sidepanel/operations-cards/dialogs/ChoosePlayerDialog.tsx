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

interface Banker {
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

interface All {
  exporter: {
    action: {
      [key: string]: string;
    };
  };
  importer: {
    action: {
      [key: string]: string;
    };
  };
  banker: {
    action: {
      [key: string]: string;
    };
  };
}

interface Action {
  remitBill?: string;
  drawBill?: string;
  trade?: string;
}
interface Type {
  exporter: string;
  banker: string;
}
interface Info {
  type: keyof Type;
  action: keyof Action;
}

const text: All = {
  exporter: {
    action: {
      trade: "Find an importer willing to buy your goods",
      drawBill:
        "Draw a bill on an local exchange banker, or a merchant if they are living in the same city",
    },
  },
  importer: {
    action: {
      trade: "Find an exporter willing to ship goods",
      drawBill:
        "Draw a bill on an local exchange banker, or a merchant if they are living in the same city",
    },
  },
  banker: {
    action: {
      remitBill: "Find a banker willing to take your bill",
      drawBill:
        "Draw a bill on an local exchange banker, or a merchant if they are living in the same city",
    },
  },
};

export interface ChoosePlayerProps {
  open: boolean;
  setSelectedValuePlayer: (v: Banker) => void;
  onClose: () => void;
  selectedBankers: any[];
  info: Info;
}

export default function ChoosePlayer(props: ChoosePlayerProps) {
  const { onClose, setSelectedValuePlayer, open, selectedBankers, info } =
    props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: Banker) => {
    setSelectedValuePlayer(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Draw Bill
        </Typography>
        <Typography variant="subtitle1">
          {text[info.type].action[info.action]}
        </Typography>
        <List sx={{ pt: 0 }}>
          {selectedBankers.map((banker, i) => (
            <ListItem
              key={i}
              button
              onClick={() => handleListItemClick(banker)}
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
