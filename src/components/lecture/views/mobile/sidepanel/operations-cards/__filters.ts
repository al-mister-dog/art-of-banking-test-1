import { IBank } from "../../../../../../features/lectures/program/types";


export const findBankByCustomersAccounts = (
  selected: IBank,
  partiesArray: IBank[]
) => {
  return partiesArray.filter((party: IBank) =>
    selected.assets.customerDeposits.find((acc: any) => acc.id === party.id)
  );
};

export const findAllCustomers = (selected: IBank, partiesArray: IBank[]) => {
  return partiesArray.filter(
    (party: IBank) => party.id.includes("customer") && selected.id !== party.id
  );
};

export const findAllBanks = (selected: IBank, partiesArray: IBank[]) => {
  return partiesArray.filter(
    (party: IBank) => party.id.includes("bank") && selected.id !== party.id
  );
};

export const findOweingBanks = (selected: IBank, partiesArray: IBank[]) => {
  return partiesArray.filter(
    (party) =>
      party.id.includes("bank") &&
      party.liabilities.dues.find(
        (account) => account.id === selected.id && account.amount > 0
      )
  );
};
export const findOwedBanks = (selected: IBank, partiesArray: IBank[]) => {
  return partiesArray.filter(
    (party) =>
      party.id.includes("bank") &&
      party.assets.dues.find(
        (account) => account.id === selected.id && account.amount > 0
      )
  );
};

export const findOwedandOweingBanks = (
  selected: IBank,
  partiesArray: IBank[]
) => {
  const owedBanks = findOwedBanks(selected, partiesArray);
  const oweingBanks = findOweingBanks(selected, partiesArray);
  const owedAndOweingBanks = Array.from(
    new Set([...owedBanks, ...oweingBanks])
  );
  const safeOption = partiesArray.filter(
    (party) =>
      party.id.includes("bank") &&
      (party.assets.dues.find(
        (account) => account.id === selected.id && account.amount > 0
      ) ||
        party.assets.dues.find(
          (account) => account.id === selected.id && account.amount > 0
        ))
  );
  return owedAndOweingBanks;
};