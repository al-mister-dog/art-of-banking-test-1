import { partyFunctions } from "../methods";
import { IBank, InstrumentKey } from "../types";

export class AccountMethods {
  static createBalance(
    a: IBank,
    b: IBank,
    amount: number = 0,
    creditInstrument: InstrumentKey
  ) {
    const id = `${a.id}-${b.id}`;
    partyFunctions(a).createInstrument(
      id,
      "balances",
      creditInstrument,
      amount
    );
    partyFunctions(b).createInstrument(
      id,
      "balances",
      creditInstrument,
      amount
    );
  }

  static createSubordinateAccount(
    a: IBank,
    b: IBank,
    amount: number,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey
  ) {
    partyFunctions(a).createInstrument(
      b.id,
      "assets",
      creditInstrument,
      amount
    );
    partyFunctions(a).createInstrument(b.id, "liabilities", debtInstrument, 0);
    partyFunctions(b).createInstrument(a.id, "assets", debtInstrument, 0);
    partyFunctions(b).createInstrument(
      a.id,
      "liabilities",
      creditInstrument,
      amount
    );
    if (b.id !== "centralbank") {
    }

    AccountMethods.createBalance(a, b, amount, creditInstrument);
  }
}
