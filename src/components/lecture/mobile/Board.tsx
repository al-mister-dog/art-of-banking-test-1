import BalanceSheet from "../ui/mobile/BalanceSheet";

const Board: React.FunctionComponent<{
  config?: any;
  customerParties: any;
  bankParties: any;
  selectParty: (a: any) => void;
}> = ({ config, customerParties, bankParties, selectParty }) => {
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
          {bankParties.map((player: any, i: any) => (
            <BalanceSheet
              key={i}
              config={config}
              bank={player}
              selectParty={selectParty}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {customerParties.map((player: any, i: any) => (
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
