import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectUI,
  toggleSelectedPartyDrawer,
} from "../../../../features/ui/uiSlice";
import { Box, Button, SwipeableDrawer } from "@mui/material";
import { colors } from "../../../../config/colorPalette";
import { IBank } from "../../../../features/lectures/fundamentalsSlice.spec";
import SelectedParty from "../../../lecture/views/mobile/sidepanel/Panel";

interface BankState {
  [index: string]: IBank;
}

const Index: React.FunctionComponent<{
  config?: any;
  parties: BankState;
  selected: string;
}> = ({ config, parties, selected }) => {
  const dispatch = useAppDispatch();
  const { selectedPartyDrawerOpen } = useAppSelector(selectUI);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      
      dispatch(toggleSelectedPartyDrawer({selectedPartyDrawerOpen: open}));
    };

  return (
    <>
      <SwipeableDrawer
        PaperProps={{ sx: { backgroundColor: colors.paper } }}
        anchor="left"
        open={selectedPartyDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            minHeight: "100vh",
            padding: "5px",
          }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <Button
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: "flex-end", fontSize: 16, marginRight: 2 }}
          >
            Close
          </Button>
          <SelectedParty config={config} selected={parties[selected]} />
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Index;
