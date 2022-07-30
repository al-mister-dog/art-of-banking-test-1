import { IBank } from "../domain/types";

type Parties = {
  [index: string]: IBank;
};

const usePartiesCopyArray = (
  parties: Parties,
  selected?: IBank,
  filterMethod?: (a: IBank, b: IBank[]) => IBank[]
) => {
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, JSON.parse(JSON.stringify(parties[key]))]
  }
  if (filterMethod && selected) {
    const selectedParties = filterMethod(selected, partiesArray);
    return [selectedParties];
  } else {
    return [partiesArray];
  }
};

export default usePartiesCopyArray;
