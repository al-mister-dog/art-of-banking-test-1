import { styled } from "@mui/material";
import BalanceSheet from "../../ui/mobile/BalanceSheet";

const BoardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  
  [theme.breakpoints.up("mobile")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("tablet")]: {
    flexDirection: "row",
  },
  // [theme.breakpoints.up("laptop")]: {
  //   width: "40%",
  // },
  // [theme.breakpoints.up("desktop")]: {
  //   width: "35%",
  // },
}));

const BalanceSheetList = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("mobile")]: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  [theme.breakpoints.up("tablet")]: {
    flexDirection: "column",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  // [theme.breakpoints.up("laptop")]: {
  //   width: "40%",
  // },
  // [theme.breakpoints.up("desktop")]: {
  //   width: "35%",
  // },
}));

const Board: React.FunctionComponent<{
  config?: any;
  partiesRowOne: any;
  partiesRowTwo: any;
  selectParty: (a: any) => void;
}> = ({ config, partiesRowOne,
  partiesRowTwo, selectParty }) => {
  return (
    <>
      <BoardContainer
      >
        <BalanceSheetList
        >
          {partiesRowTwo.map((player: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              bank={player}
              selectParty={selectParty}
            />
          ))}
        </BalanceSheetList>
        <BalanceSheetList
        >
          {partiesRowOne.map((player: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              bank={player}
              selectParty={selectParty}
            />
          ))}
        </BalanceSheetList>
      </BoardContainer>
    </>
  );
};

export default Board;
