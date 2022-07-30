import BalanceSheet from "../../../ui/balance-sheet/BalanceSheet";
import { BoardContainer, BalanceSheetList } from "../../../ui/board";

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
