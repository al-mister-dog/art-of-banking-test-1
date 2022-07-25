import { IBank } from "./types";

interface Record {
  recordId: string, transactionType: string, party: string, amount: number
}

export default function addToTecords(thisBank: IBank, record: Partial<Record>) {
  if (!record.recordId) {
    record.recordId = new Date().toISOString()
  }
  return record
}
