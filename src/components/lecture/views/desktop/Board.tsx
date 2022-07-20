import BalanceSheet from "../../ui/desktop/BalanceSheet";

const Board: React.FunctionComponent<{
  config?: any;
  partiesRowOne: any;
  partiesRowTwo: any;
  selectParty: (a: any) => void;
}> = ({ config, partiesRowOne, partiesRowTwo, selectParty }) => {
  return (
    <>
      <div style={{ display: "flex", height: "60vh", justifyContent: "space-around" }}>
        <div style={{ overflowX: "hidden" }}>
          {partiesRowTwo.map((player: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              bank={player}
              selectParty={selectParty}
            />
          ))}
        </div>
        <div style={{ overflowX: "hidden" }}>
          {partiesRowOne.map((player: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              bank={player}
              selectParty={selectParty}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
