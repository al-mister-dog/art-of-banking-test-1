import { IBank } from "../../../domain/types";
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

  const partiesRowOne = partiesArray.filter((party) =>
    configPartiesOne.includes(party.id)
  );

  const partiesRowTwo = partiesArray.filter((party) =>
    configPartiesTwo.includes(party.id)
  );

  return [partiesRowOne, partiesRowTwo];
};

export default usePartyRows;
