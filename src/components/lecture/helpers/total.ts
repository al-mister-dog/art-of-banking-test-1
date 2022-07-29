import { Account } from "../../../domain/types";

export const total = (instruments: Account[]) => {
  return instruments.reduce(
    (a, c) => {
      return { amount: a.amount + c.amount };
    },
    { amount: 0 }
  );
};
