import { useAppSelector } from "../../../app/hooks";
import {
  selectParties,
  // createNewCustomer,
} from "../../../features/moduleState/fundamentalsSlice";
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
      <Box
        sx={{ paddingLeft: "75px", paddingRight: "75px", marginTop: "50px" }}
      >
        <Introduction texts={texts} />
      </Box>
      <Notifications config={config} />

      <Box
        style={{
          display: "flex",
          height: "60vh",
          margin: "5px",
          border: "1px solid #BDBDBD",
          borderRadius: "5px",
        }}
      >
        
          <Board
            config={config}
            customerParties={customerParties}
            bankParties={bankParties}
            selectParty={selectParty}
          />
        
        <Box sx={{ width: "40%", margin: "auto" }}>
          <Player config={config} selected={parties[selected]} />
        </Box>
      </Box>
      {/* <Button onClick={() => dispatch(createNewCustomer())}>
        Create Customer
      </Button> */}
    </>
  );
};

export default Index;
