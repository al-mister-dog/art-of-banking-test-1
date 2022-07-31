import { Record, IBank } from "../types";

export class RecordMethods {
  static createRecord(
    party: IBank,
    record: Partial<Record>,
    records?: Partial<Record>
  ) {
    const completeRecord = {
      ...records,
      ...record,
    };
    party.records.push(completeRecord);
  }

  static addToRecords(thisBank: IBank, record: Partial<Record>) {
    if (!record.recordId) {
      record.recordId = new Date().toISOString();
    }
    return record;
  }

  static createCorrespondingRecords(
    bankA: IBank,
    bankB: IBank,
    method: string,
    amount?: number
  ) {
    const recordA = RecordMethods.addToRecords(bankA, {
      transactionType: method,
      party: bankB.id,
      amount: amount,
    });
    RecordMethods.createRecord(bankA, recordA);
    const recordB = RecordMethods.addToRecords(bankB, {
      transactionType: method,
      party: bankA.id,
      amount: amount,
    });
    RecordMethods.createRecord(bankB, recordB);
  }
}
