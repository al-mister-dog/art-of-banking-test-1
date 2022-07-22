import { partyFunctions } from "./instanceMethods";
import { lookup } from "./lookupTables";
import { PaymentMethods } from "./methods";
import { IBank } from "./types";

type SystemType = {
  increaseDues(bankA: IBank, bankB: IBank, amount: number): void;
  netDues(bank: IBank): void;
  settleDues(): void;
};

export let SystemMethods: SystemType;
export let systemCheck = "";

export class System {
  static setSystem(sys?: string) {
    if (!sys) {
      SystemMethods = new DefaultSystem();
      systemCheck = "default";
    } else if (sys === "correspondent") {
      SystemMethods = new CorrespondentSystem();
      systemCheck = "correspondent";
    } else if (sys === "clearinghouse") {
      SystemMethods = new ClearingHouseSystem();
      systemCheck = "clearinghouse";
    } else if (sys === "interbank") {
      SystemMethods = new InterbankSystem();
      systemCheck = "interbank";
    } else if (sys === "centralbank") {
      SystemMethods = new CentralBankSystem();
      systemCheck = "centralbank";
    }
  }
}

abstract class AbstractSystem {
  abstract increaseDues(bankA: IBank, bankB: IBank, amount: number): void;
  abstract netDues(bank: IBank): void;
  abstract settleDues(): void;
}

class InterbankSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      bankB.id,
      "liabilities",
      "dues",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      bankA.id,
      "assets",
      "dues",
      amount
    );
  }
  netDues(bank: IBank): void {
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
    for (const bank in lookup) {
      lookup[bank].liabilities.dues.forEach((due) => {
        PaymentMethods.creditAccount(lookup[due.id], lookup[bank], due.amount, [
          "dues",
          "dues",
        ]);
        PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
      });
    }
  }
}

class CorrespondentSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      bankB.id,
      "liabilities",
      "dues",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      bankA.id,
      "assets",
      "dues",
      amount
    );
  }
  netDues(bank: IBank): void {
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
    for (const bank in lookup) {
      lookup[bank].liabilities.dues.forEach((due) => {
        PaymentMethods.creditAccount(lookup[due.id], lookup[bank], due.amount, [
          "bankDeposits",
          "bankOverdrafts",
        ]);
        PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
      });
    }
  }
}

class ClearingHouseSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      lookup["clearinghouse"].id,
      "liabilities",
      "dues",
      amount
    );
    partyFunctions(lookup["clearinghouse"]).increaseInstrument(
      bankA.id,
      "assets",
      "dues",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      lookup["clearinghouse"].id,
      "assets",
      "dues",
      amount
    );
    partyFunctions(lookup["clearinghouse"]).increaseInstrument(
      bankB.id,
      "liabilities",
      "dues",
      amount
    );
  }

  netDues(bank: IBank): void {
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
      (due) => due.id === lookup["clearinghouse"].id
    );
    let clearinghouseDueFrom = lookup["clearinghouse"].liabilities.dues.find(
      (due) => due.id === bank.id
    );

    if (clearinghouseDueFrom && bankDueFrom) {
      clearinghouseDueFrom.amount = bankDueFrom.amount;
    }
    let bankDueTo = bank.liabilities.dues.find(
      (due) => due.id === lookup["clearinghouse"].id
    );
    let clearinghouseDueTo = lookup["clearinghouse"].assets.dues.find(
      (due) => due.id === bank.id
    );
    if (clearinghouseDueTo && bankDueTo) {
      clearinghouseDueTo.amount = bankDueTo.amount;
    }
  }

  // settleDues(): void {
  //   for (const bank in lookup) {
  //     lookup[bank].liabilities.dues.forEach((due) => {
  //       if (due.amount > 0 && lookup[bank].id === "clearinghouse") {
  //         PaymentMethods.creditAccount(
  //           lookup[due.id],
  //           lookup[bank],
  //           due.amount,
  //           ["bankDeposits", "daylightOverdrafts"]
  //         );
  //       } else if (due.amount > 0 && lookup[bank].id !== "clearinghouse") {
  //         PaymentMethods.debitAccount(
  //           lookup[bank],
  //           lookup[due.id],
  //           due.amount,
  //           ["bankDeposits", "daylightOverdrafts"]
  //         );
  //       }
  //       PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
  //     });
  //   }
  // }
  settleDues(): void {
    for (const bank in lookup) {
      if (
        lookup[bank].id.includes("bank") ||
        lookup[bank].id.includes("clearinghouse")
      ) {
        lookup[bank].liabilities.dues.forEach((due) => {
          if (due.amount > 0 && lookup[bank].id === "clearinghouse") {
            PaymentMethods.creditAccount(
              lookup[due.id],
              lookup[bank],
              due.amount,
              ["chCertificates", "chOverdrafts"]
            );
          } else if (due.amount > 0 && lookup[bank].id !== "clearinghouse") {
            PaymentMethods.debitAccount(
              lookup[bank],
              lookup[due.id],
              due.amount,
              ["chCertificates", "chOverdrafts"]
            );
          }
          PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
        });
      }
    }
  }
}

class CentralBankSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number) {
    partyFunctions(bankA).increaseInstrument(
      lookup["centralbank"].id,
      "liabilities",
      "daylightOverdrafts",
      amount
    );
    partyFunctions(lookup["centralbank"]).increaseInstrument(
      bankA.id,
      "assets",
      "daylightOverdrafts",
      amount
    );
    partyFunctions(bankB).increaseInstrument(
      lookup["centralbank"].id,
      "assets",
      "bankDeposits",
      amount
    );
    partyFunctions(lookup["centralbank"]).increaseInstrument(
      bankB.id,
      "liabilities",
      "bankDeposits",
      amount
    );
  }

  netDues(bank: IBank): void {
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
      (due) => due.id === lookup["centralbank"].id
    );
    let centralbankDueFrom = lookup["centralbank"].liabilities.dues.find(
      (due) => due.id === bank.id
    );

    if (centralbankDueFrom && bankDueFrom) {
      centralbankDueFrom.amount = bankDueFrom.amount;
    }
    let bankDueTo = bank.liabilities.dues.find(
      (due) => due.id === lookup["centralbank"].id
    );
    let centralbankDueTo = lookup["centralbank"].assets.dues.find(
      (due) => due.id === bank.id
    );
    if (centralbankDueTo && bankDueTo) {
      centralbankDueTo.amount = bankDueTo.amount;
    }
  }

  // settleDues(): void {
  //   for (const bank in lookup) {
  //     lookup[bank].liabilities.dues.forEach((due) => {
  //       if (due.amount > 0 && lookup[bank].id === "clearinghouse") {
  //         PaymentMethods.creditAccount(
  //           lookup[due.id],
  //           lookup[bank],
  //           due.amount,
  //           ["bankDeposits", "daylightOverdrafts"]
  //         );
  //       } else if (due.amount > 0 && lookup[bank].id !== "clearinghouse") {
  //         PaymentMethods.debitAccount(
  //           lookup[bank],
  //           lookup[due.id],
  //           due.amount,
  //           ["bankDeposits", "daylightOverdrafts"]
  //         );
  //       }
  //       PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
  //     });
  //   }
  // }
  settleDues(): void {
    for (const bank in lookup) {
      if (
        lookup[bank].id.includes("bank") ||
        lookup[bank].id.includes("centralbank")
      ) {
        lookup[bank].liabilities.dues.forEach((due) => {
          if (due.amount > 0 && lookup[bank].id === "centralbank") {
            PaymentMethods.creditAccount(
              lookup[due.id],
              lookup[bank],
              due.amount,
              ["bankDeposits", "daylightOverdrafts"]
            );
          } else if (due.amount > 0 && lookup[bank].id !== "centralbank") {
            PaymentMethods.debitAccount(
              lookup[bank],
              lookup[due.id],
              due.amount,
              ["bankDeposits", "daylightOverdrafts"]
            );
          }
          PaymentMethods.clearDues(lookup[bank], lookup[due.id]);
        });
      }
    }
  }
}

class DefaultSystem extends AbstractSystem {
  increaseDues(bankA: IBank, bankB: IBank, amount: number): void {}
  netDues(bank: IBank): void {}
  settleDues(): void {}
}
