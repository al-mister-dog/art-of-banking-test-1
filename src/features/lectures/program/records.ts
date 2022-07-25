import { IBank } from "./types";

//shared-ui
interface Record {
  recordId: string, transactionType: string, party: string, amount: number
}

export default function addToTecords(thisBank: IBank, record: Partial<Record>) {
  if (!record.recordId) {
    record.recordId = new Date().toISOString()
  }
  return record
}

//  interface BaseEvent {
//   time: number;
//   user: string;
// }

// interface EventMap {
//   addToCart: BaseEvent & { quantity: number; productId: string };
//   checkout: BaseEvent;
// }

// function sendEvent<Name extends keyof EventMap>(
//   name: Name,
//   data: EventMap[Name]
// ): void {
//   console.log([name, data]);
// }


/**
 * record flow
 * customerservice.deposit
 * because this is first function add id
 * adds transaction type and amount to record
 * adds record to parties
 * goes on to next function
 * 
 * 
 */