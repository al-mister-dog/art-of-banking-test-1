import { IBank } from "../../../features/lectures/program/types";

type Parties = {
  [index: string]: IBank;
};
const usePartiesArray = (
  selected: IBank,
  parties: Parties,
  filterMethod?: (a: IBank, b: IBank[]) => IBank[]
) => {
  if (filterMethod) {
    let partiesArray: IBank[] = [];
    for (const key in parties) {
      partiesArray = [...partiesArray, parties[key]];
    }
    const selectedParties = filterMethod(selected, partiesArray);
    return [selectedParties];
  } else {
    return [];
  }
};

export default usePartiesArray;
