import { IBank } from "../domain/types";
import { deCamelize } from "./parsers";

export function netAmount(selectedValueTo: IBank, selected: IBank) {
  let selectedAmount;

  const whatYouOwe = selected.liabilities.dues.find(
    (account: { id: string }) => account.id === selectedValueTo.id
  );
  const whatOtherBankOwes = selected.assets.dues.find(
    (account: { id: string }) => account.id === selectedValueTo.id
  );
  if (whatYouOwe && whatOtherBankOwes) {
    if (whatYouOwe.amount > whatOtherBankOwes.amount) {
      selectedAmount = `${selectedValueTo.name ? deCamelize(selectedValueTo.name) : deCamelize(selectedValueTo.id)} owed: $${
        whatYouOwe.amount - whatOtherBankOwes.amount
      }`;
      return selectedAmount;
    } else if (whatOtherBankOwes.amount > whatYouOwe.amount) {
      selectedAmount = `${selected.name ? deCamelize(selected.name) : deCamelize(selected.id)} owed: $${
        whatOtherBankOwes.amount - whatYouOwe.amount
      }`;
      return selectedAmount;
    }
  }
}
