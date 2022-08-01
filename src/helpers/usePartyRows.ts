import { IBank } from "../domain/types";
import usePartiesArray from "./useParties";
interface BankState {
  [index: string]: IBank;
}
const usePartyRows = (config: any, parties: BankState) => {
  const configPartiesOne = config.parties.filter(
    (party: string) => party.includes("central") || party.includes("customer")
  );
  
  const configPartiesTwo = config.parties.filter(
    (party: string) =>
      (party.includes("bank") || party.includes("clearinghouse")) &&
      !party.includes("central")
  );
  
  const [partiesArray] = usePartiesArray(parties);

  let partiesRowOne = partiesArray.filter((party) =>
    configPartiesOne.includes(party.id)
  );

  let partiesRowTwo = partiesArray.filter((party) =>
    configPartiesTwo.includes(party.id)
  );

  if (config.playground) {
    for (const party in parties) {
      
      if (!config.parties.includes(parties[party].id)) {
        console.log(parties[party].id)
        if (parties[party].type === "customer") {
          partiesRowOne = [...partiesRowOne, parties[party]]
        }
      }
    }
  }

  return [partiesRowOne, partiesRowTwo];
};

export default usePartyRows;
