//EXPERIMENTAL
import { useAppSelector } from "../../../../app/hooks";
import {
  selectParties,
  // createNewCustomer,
} from "../../../../features/lectures/lecturesSlice";
import Introduction from "../../ui/Introduction";

import { Box } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import * as React from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = <></>;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

const Index: React.FunctionComponent<{
  config?: any;
  texts: any;
  customerParties: any;
  bankParties: any;
  selected: string;
  selectParty: (v: any) => void;
}> = ({
  config,
  texts,
  customerParties,
  bankParties,
  selected,
  selectParty,
}) => {
  const parties = useAppSelector(selectParties);
  const [open, setOpen] = React.useState(false);
  // const container =
    // window !== undefined ? () => window().document.body : undefined;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <Introduction texts={texts} />
      <Notifications config={config} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // margin: "1px",
          // border: "1px solid #BDBDBD",
          borderRadius: "5px",
        }}
      >
        {/* <Box>
          <Board
            config={config}
            customerParties={customerParties}
            bankParties={bankParties}
            selectParty={selectParty}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box> */}
        <Box>
          <Drawer
            // container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Player config={config} selected={parties[selected]} />
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Index;
