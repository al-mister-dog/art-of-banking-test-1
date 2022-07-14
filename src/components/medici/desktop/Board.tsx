import BalanceSheet from "../ui/desktop/BalanceSheet";

const Board: React.FunctionComponent<{
  florencePlayers: any;
  lyonsPlayers: any;
  selectPlayer: (a: any) => void;
}> = ({ florencePlayers, lyonsPlayers, selectPlayer }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {florencePlayers.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectPlayer={selectPlayer} />
          ))}
        </div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
