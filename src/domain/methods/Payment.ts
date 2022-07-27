import { SystemMethods, partyFunctions} from "../methods";
import { IBank, InstrumentKey, Record } from "../types";
import { RecordMethods } from "./Record";

export class PaymentMethods {
  static creditAccount(
    a: IBank,
    b: IBank,
    amount: number,
    instruments: InstrumentKey[],
    records?: Partial<Record>
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      partyFunctions(a).increaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
      partyFunctions(b).increaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );

      PaymentMethods.mapBalance(
        a,
        b,
        creditInstrument,
        debtInstrument,
        account.amount
      );
      RecordMethods.createRecord(
        a,
        {
          instrumentType: creditInstrument,
          balance: account.amount,
          credit: true,
        },
        records
      );
      RecordMethods.createRecord(
        b,
        {
          transactionType: records?.transactionType,
          party: a.id,
          instrumentType: creditInstrument,
          amount,
          balance: account.amount,
          credit: true,
        }
      );
    }
  }

  static debitAccount(
    a: IBank,
    b: IBank,
    amount: number,
    instruments: InstrumentKey[],
    records?: Partial<Record>
  ) {
    const [creditInstrument, debtInstrument] = instruments;
    const id = `${a.id}-${b.id}`;
    const account = a.balances[creditInstrument].find(
      (account: any) => account.id === id
    );
    if (account) {
      partyFunctions(a).decreaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
      partyFunctions(b).decreaseInstrument(
        id,
        "balances",
        creditInstrument,
        amount
      );
      PaymentMethods.mapBalance(
        a,
        b,
        creditInstrument,
        debtInstrument,
        account.amount
      );
      // RecordMethods.createRecord(a, b, creditInstrument, amount, account.amount, false);
      RecordMethods.createRecord(
        a,
        {
          instrumentType: creditInstrument,
          balance: account.amount,
          credit: false,
        },
        records
      );
      RecordMethods.createRecord(
        b,
        {
          transactionType: records?.transactionType,
          party: a.id,
          instrumentType: creditInstrument,
          amount,
          balance: account.amount,
          credit: false,
        }
      );
    }
  }

  static mapBalance(
    a: IBank,
    b: IBank,
    creditInstrument: InstrumentKey,
    debtInstrument: InstrumentKey,
    balance: number
  ) {
    if (balance > 0) {
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, balance);
      partyFunctions(b).setAccount(
        a.id,
        "liabilities",
        creditInstrument,
        balance
      );
      partyFunctions(a).setAccount(b.id, "liabilities", debtInstrument, 0);
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, 0);
    } else if (balance < 0) {
      partyFunctions(a).setAccount(
        b.id,
        "liabilities",
        debtInstrument,
        -balance
      );
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, -balance);
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, 0);
      partyFunctions(b).setAccount(a.id, "liabilities", creditInstrument, 0);
    } else if (balance === 0) {
      partyFunctions(a).setAccount(b.id, "liabilities", debtInstrument, 0);
      partyFunctions(b).setAccount(a.id, "assets", debtInstrument, 0);
      partyFunctions(a).setAccount(b.id, "assets", creditInstrument, 0);
      partyFunctions(b).setAccount(a.id, "liabilities", creditInstrument, 0);
    }
  }

  static settleDues() {
    SystemMethods.settleDues();
  }

  static clearDues(a: IBank, b: IBank) {
    partyFunctions(a).setAccount(b.id, "assets", "dues", 0);
    partyFunctions(a).setAccount(b.id, "liabilities", "dues", 0);
  }
  static clearDue(a: IBank, b: IBank) {
    partyFunctions(a).setAccount(b.id, "assets", "dues", 0);
    partyFunctions(b).setAccount(a.id, "liabilities", "dues", 0);
  }
}

