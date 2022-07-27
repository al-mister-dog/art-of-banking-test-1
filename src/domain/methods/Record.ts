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
}
