import { systemCheck } from "../methods/System";
import { IBank } from "../types";

export class ErrorsService {
  static reserveErrors() {
    if (systemCheck === "centralbank") {
    }
  }
  static moveAmountErrors(
    selectedValueTo: IBank | null,
    selectedValueAmount: number
  ) {
    if (systemCheck === "centralbank") {
      console.log("HERE")
      if (
        selectedValueAmount < 1 ||
        selectedValueTo === null ||
        !selectedValueAmount
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        selectedValueAmount < 1 ||
        selectedValueTo === null ||
        !selectedValueAmount
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
}
