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
import methodHelperTexts from "../../../../../helpers/methodHelperTexts";

export interface ChoosePartyProps {
  open: boolean;
  setSelectedValuePlayer: (v: any) => void;
  onClose: () => void;
  selectedBankers: any[];
  method: string;
}

export default function ChoosePlayer(props: ChoosePartyProps) {
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
          {methodHelperTexts[method].moreThanOne(selectedBankers)}
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
              <ListItemText primary={banker.name ? banker.name : banker.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
