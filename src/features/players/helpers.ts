
import { exchangeRates, certaintyQuotes, currencies } from "./initialState";
interface Party {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
}
type Category = Pick<Party, "assets" | "liabilities">;

function replaceBill(
  partyConcerned: Party,
  category: keyof Category,
  bill: any
) {
  partyConcerned[category] = partyConcerned[category].filter(
    (b: { id: any }) => b.id !== bill.id
  );
  partyConcerned[category] = [...partyConcerned[category], bill];
}

function finaliseBill(holder: any, recipient: any, bill: any) {
  console.log(recipient)
  const recipientCopy = { ...bill };
  const holderCopy = { ...bill };
  recipientCopy.paid = true;
  holderCopy.paid = true;
  replaceBill(holder, "assets", holderCopy);
  replaceBill(recipient, "liabilities", recipientCopy);
}

function exchangeBill(
  holder: any,
  recipient: Party,
  presentedBill: any
) {
  const bill = holder.assets.find(
    (b: { id: any }) => b.id === presentedBill.id
  );
  const recipientCopy = { ...bill };
  const holderCopy = { ...bill };
  holderCopy.paid = true;
  replaceBill(holder, "assets", holderCopy);
  recipient.assets = [...recipient.assets, recipientCopy];
}

function exchangeMoney(payee: any, drawee: any, bill: any) {
  const unitOfAccount = bill.amount;
  const localCurrency = bill.amount * exchangeRates[bill.city];
  const cityQuotesCertain = certaintyQuotes[drawee.city];

  if (cityQuotesCertain) {
    drawee.coins[currencies[drawee.city]] =
      drawee.coins[currencies[drawee.city]] - unitOfAccount;
    payee.coins[currencies[drawee.city]] =
      payee.coins[currencies[drawee.city]] + unitOfAccount;
    payee.coinAsset = [...payee.coinAsset, {coinType: currencies[drawee.city], amount: unitOfAccount}]
    drawee.coinLiability = [...drawee.coinLiability, {coinType: currencies[drawee.city], amount: unitOfAccount}]
  } else {
    drawee.coins[currencies[drawee.city]] =
      drawee.coins[currencies[drawee.city]] - localCurrency;
    payee.coins[currencies[drawee.city]] =
      payee.coins[currencies[drawee.city]] + localCurrency;
      payee.coinAsset = [...payee.coinAsset, {coinType: currencies[drawee.city], amount: localCurrency}]
      drawee.coinLiability = [...drawee.coinLiability, {coinType: currencies[drawee.city], amount: localCurrency}]
  }
}

const helpers = {
  finaliseBill,
  exchangeBill,
  exchangeMoney
}

export default helpers;