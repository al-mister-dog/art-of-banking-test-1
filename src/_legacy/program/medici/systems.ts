import { Bank } from "./instances";
import { bankLookup } from "./lookupTables";
import { PaymentMethods } from "./methods";

type SystemType = {
  increaseDues(bankA: Bank, bankB: Bank, amount: number): void;
  netDues(bank: Bank): void;
  settleDues(): void;
};

export let SystemMethods: SystemType;
export let systemCheck = "";

export class System {
  static setSystem(sys?: string) {
    if (!sys) {
      SystemMethods = new DefaultSystem();
      systemCheck = "default";
    }
    else if (sys === "correspondent") {
      SystemMethods = new CorrespondentSystem();
      systemCheck = "correspondent";
    }
    else if (sys === "clearinghouse") {
      SystemMethods = new ClearingHouseSystem();
      systemCheck = "clearinghouse";
    }
    
  }
}

abstract class AbstractSystem {
  abstract increaseDues(bankA: Bank, bankB: Bank, amount: number): void;
  abstract netDues(bank: Bank): void;
  abstract settleDues(): void;
}
class CorrespondentSystem extends AbstractSystem {
  increaseDues(bankA: Bank, bankB: Bank, amount: number) {
    bankA.increaseInstrument(bankB.id, "liabilities", "dues", amount);
    bankB.increaseInstrument(bankA.id, "assets", "dues", amount);
  }
  netDues(bank: Bank): void {
    bank.assets.dues.forEach((thisDue) => {
      let dueFrom = thisDue;
      let dueTo = bank.liabilities.dues.find((due) => (due.id = thisDue.id));
      if (!dueTo) {
        return;
      }
      if (dueFrom.amount > dueTo.amount) {
        dueFrom.amount = dueFrom.amount - dueTo.amount;
        dueTo.amount = 0;
      }
      if (dueTo.amount > dueFrom.amount) {
        dueTo.amount = dueTo.amount - dueFrom.amount;
        dueFrom.amount = 0;
      }
      if (dueTo.amount === dueFrom.amount) {
        dueTo.amount = 0;
        dueFrom.amount = 0;
      }
    });
  }
  settleDues(): void {
    for (const bank in bankLookup) {
      bankLookup[bank].liabilities.dues.forEach((due) => {
        PaymentMethods.creditAccount(
          bankLookup[due.id],
          bankLookup[bank],
          due.amount,
          ["bankDeposits", "bankOverdrafts"]
        );
        PaymentMethods.clearDues(bankLookup[bank], bankLookup[due.id]);
      });
    }
  }
}

class ClearingHouseSystem extends AbstractSystem {
  increaseDues(bankA: Bank, bankB: Bank, amount: number) {
    bankA.increaseInstrument(bankLookup["clearinghouse"].id, "liabilities", "dues", amount);
    bankLookup["clearinghouse"].increaseInstrument(bankA.id, "assets", "dues", amount);
    bankB.increaseInstrument(bankLookup["clearinghouse"].id, "assets", "dues", amount);
    bankLookup["clearinghouse"].increaseInstrument(bankB.id, "liabilities", "dues", amount);
  }

  netDues(bank: Bank): void {
    bank.assets.dues.forEach((thisDue) => {
      let dueFrom = thisDue;
      let dueTo = bank.liabilities.dues.find((due) => (due.id = thisDue.id));
      if (!dueTo) {
        return;
      }
      if (dueFrom.amount > dueTo.amount) {
        dueFrom.amount = dueFrom.amount - dueTo.amount;
        dueTo.amount = 0;
      }
      if (dueTo.amount > dueFrom.amount) {
        dueTo.amount = dueTo.amount - dueFrom.amount;
        dueFrom.amount = 0;
      }
      if (dueTo.amount === dueFrom.amount) {
        dueTo.amount = 0;
        dueFrom.amount = 0;
      }
    });

    let bankDueFrom = bank.assets.dues.find(
      (due) => due.id === bankLookup["clearinghouse"].id
    );
    let clearinghouseDueFrom = bankLookup[
      "clearinghouse"
    ].liabilities.dues.find((due) => due.id === bank.id);

    if (clearinghouseDueFrom && bankDueFrom) {
      clearinghouseDueFrom.amount = bankDueFrom.amount;
    }
    let bankDueTo = bank.liabilities.dues.find(
      (due) => due.id === bankLookup["clearinghouse"].id
    );
    let clearinghouseDueTo = bankLookup["clearinghouse"].assets.dues.find(
      (due) => due.id === bank.id
    );
    if (clearinghouseDueTo && bankDueTo) {
      clearinghouseDueTo.amount = bankDueTo.amount;
    }
  }

  settleDues(): void {
    for (const bank in bankLookup) {
      bankLookup[bank].liabilities.dues.forEach((due) => {
        if (due.amount > 0 && bankLookup[bank].id === "clearinghouse") {
          PaymentMethods.creditAccount(
            bankLookup[due.id],
            bankLookup[bank],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        } else if (due.amount > 0 && bankLookup[bank].id !== "clearinghouse") {
          PaymentMethods.debitAccount(
            bankLookup[bank],
            bankLookup[due.id],
            due.amount,
            ["chCertificates", "chOverdrafts"]
          );
        }
        PaymentMethods.clearDues(bankLookup[bank], bankLookup[due.id]);
      });
    }
  }
}

class DefaultSystem extends AbstractSystem {
  increaseDues(bankA: Bank, bankB: Bank, amount: number): void {}
  netDues(bank: Bank): void {}
  settleDues(): void {}
}

