import BalanceSheet from "../ui/mobile/BalanceSheet";
const Board: React.FunctionComponent<{
  florencePlayers: any;
  lyonsPlayers: any;
  selectPlayer: (a: any) => void;
}> = ({ florencePlayers, lyonsPlayers, selectPlayer }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",          
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {florencePlayers.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectPlayer={selectPlayer} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {lyonsPlayers.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectPlayer={selectPlayer} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
