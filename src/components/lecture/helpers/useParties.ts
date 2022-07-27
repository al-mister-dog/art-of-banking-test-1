import { IBank } from "../../../domain/types";

type Parties = {
  [index: string]: IBank;
};

const usePartiesArray = (
  parties: Parties,
  selected?: IBank,
  filterMethod?: (a: IBank, b: IBank[]) => IBank[]
) => {
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  if (filterMethod && selected) {
    const selectedParties = filterMethod(selected, partiesArray);
    return [selectedParties];
  } else {
    return [partiesArray];
  }
};

export default usePartiesArray;
