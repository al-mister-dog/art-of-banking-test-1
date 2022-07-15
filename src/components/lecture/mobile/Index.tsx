import { useAppSelector } from "../../../app/hooks";
import {
  selectParties,
  // createNewCustomer,
} from "../../../features/lectures/lecturesSlice";
import Introduction from "../ui/Introduction";

import { Box } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
// import Refresh from "./toolbars/RefreshToolbar";
// import { useState } from "react";

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
        
        <Box>
          <Board
            config={config}
            customerParties={customerParties}
            bankParties={bankParties}
            selectParty={selectParty}
          />
        </Box>
        <Box>
          <Player config={config} selected={parties[selected]} />
        </Box>
      </Box>
    </>
  );
};

export default Index;
