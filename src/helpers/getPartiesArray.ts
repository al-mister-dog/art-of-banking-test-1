import { IBank } from "../domain/types";

type Parties = {
  [index: string]: IBank;
};

const getPartiesArray = (parties: Parties[], type?: string) => {
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, JSON.parse(JSON.stringify(parties[key]))];
  }
  if (type) {
    return partiesArray.filter((party) => party.type === type);
  }
  return partiesArray;
};

export default getPartiesArray;
