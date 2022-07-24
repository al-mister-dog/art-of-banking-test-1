import BalanceSheet from "../shared_ui/BalanceSheet";
import { BoardContainer, BalanceSheetList } from "../shared_ui/board-components";

const Board: React.FunctionComponent<{
  config?: any;
  partiesRowOne: any;
  partiesRowTwo: any;
  selectParty: (a: any) => void;
}> = ({ config, partiesRowOne, partiesRowTwo, selectParty }) => {
  return (
      <BoardContainer>
        <BalanceSheetList>
          {partiesRowTwo.map((party: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              party={party}
              selectParty={selectParty}
            />
          ))}
        </BalanceSheetList>
        <BalanceSheetList>
          {partiesRowOne.map((party: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              party={party}
              selectParty={selectParty}
            />
          ))}
        </BalanceSheetList>
      </BoardContainer>
  );
};

export default Board;
