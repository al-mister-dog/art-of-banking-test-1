import { useAppDispatch } from "../../../../app/hooks";
import {
  reset,
} from "../../../../features/players/playersSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  Box,
  Toolbar,
  Tooltip,
} from "@mui/material";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          backgroundColor: "#F2EECB",
          // boxShadow: "0px 6px 10px -7px gray",
        }}
      >
        <Tooltip title="refresh">
          <IconButton onClick={() => dispatch(reset())}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Box>
  );
}
